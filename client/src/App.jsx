import { useEffect, useState } from 'react';
import './App.css';
import './styles/styles.css';
import { getAllUsers } from './services/userServices';
import { getBlockchain } from './services/blockchainServices';
import UserAmdin from './components/UserAmdin';
import Header from './components/header/Header';
import MakeTransaction from './components/MakeTransaction';

function App() {
  const [newUser, setNewUser] = useState(undefined);
  const [blockchain, setBlockchain] = useState(undefined);
  const [allUsers, setAllUsers] = useState(undefined);
  const [JWT, setJWT] = useState('');
  const [updateUserList, setUpdateUserlist] = useState(1);
  const [user, setUser] = useState({});
  const [mainMenu, setMainMenu] = useState('home');

  useEffect(() => {
    const fetcBlockchain = async () => {
      const blockchain = await getBlockchain();

      setBlockchain(blockchain.data);
    };

    fetcBlockchain();
  }, []);

  useEffect(() => {
    console.log('Fetching users');
    const fetchUsers = async () => {
      const users = await getAllUsers(JWT);

      if (users) setAllUsers(users.data);
    };

    if (JWT) {
      fetchUsers();
    }
  }, [newUser, updateUserList, JWT]);

  useEffect(() => {
    console.log('Running setJWT and Storage');
    const token = localStorage.getItem('jwt-cuddle');

    if (JWT) localStorage.setItem('jwt-cuddle', JWT);
    if (token) setJWT(token);

    console.log('Token and localStorage set');
  }, [JWT]);

  return (
    <>
      <Header
        setNewUser={setNewUser}
        setJWT={setJWT}
        JWT={JWT}
        setUser={setUser}
        user={user}
        setMainMenu={setMainMenu}
      />
      <section>
        {mainMenu === 'home' && <div>Im home</div>}
        {mainMenu === 'transaction' && <MakeTransaction JWT={JWT} />}
        {mainMenu === 'mine' && <div>Lets mine</div>}

        {mainMenu === 'admin' && (
          <UserAmdin
            allUsers={allUsers}
            setUpdateUserlist={setUpdateUserlist}
            JWT={JWT}
          />
        )}
      </section>
    </>
  );
}

export default App;
