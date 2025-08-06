import { useEffect, useState } from 'react';
import './App.css';
import './styles/styles.css';
import { getAllUsers, getUserById } from './services/userServices';
import { getBlockchain } from './services/blockchainServices';
import UserAmdin from './components/UserAmdin';
import Header from './components/header/Header';
import MakeTransaction from './components/MakeTransaction';
import Mine from './components/Mine';
import { jwtDecode } from 'jwt-decode';

function App() {
  const [newUser, setNewUser] = useState(undefined);
  const [blockchain, setBlockchain] = useState(undefined);
  const [allUsers, setAllUsers] = useState(undefined);
  const [JWT, setJWT] = useState('');
  const [updateUserList, setUpdateUserlist] = useState(1);
  const [user, setUser] = useState({});
  const [mainMenu, setMainMenu] = useState('home');
  const [trxPending, setTrxPending] = useState({});

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

  useEffect(() => {
    if (JWT) {
      console.log('JWT: ', JWT);
      const decode = jwtDecode(JWT);

      console.log('runnung get user data');
      const getUser = async (id) => {
        const userInfo = await getUserById(id, JWT);

        console.log(userInfo);

        setUser(userInfo.data);
      };

      getUser(decode.id);
    }
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
        {mainMenu === 'transaction' && (
          <MakeTransaction
            JWT={JWT}
            trxPending={trxPending}
            setTrxPending={setTrxPending}
          />
        )}
        {mainMenu === 'mine' && (
          <Mine JWT={JWT} setTrxPending={setTrxPending} />
        )}
        {mainMenu === 'admin' && (
          <UserAmdin
            user={user}
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
