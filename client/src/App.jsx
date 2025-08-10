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
import Home from './components/Home';

function App() {
  const [newUser, setNewUser] = useState(undefined);
  const [blockchain, setBlockchain] = useState(undefined);
  const [allUsers, setAllUsers] = useState(undefined);
  const [JWT, setJWT] = useState('');
  const [updateUserList, setUpdateUserlist] = useState(1);
  const [user, setUser] = useState({});
  const [mainMenu, setMainMenu] = useState('home');
  const [trxPending, setTrxPending] = useState({});
  const [mineCount, setMineCount] = useState(0);

  useEffect(() => {
    const fetcBlockchain = async () => {
      const blockchain = await getBlockchain();

      setBlockchain(blockchain.data);
    };

    fetcBlockchain();
  }, [mineCount]);

  useEffect(() => {
    const fetchUsers = async () => {
      const users = await getAllUsers(JWT);

      if (users) setAllUsers(users.data);
    };

    if (JWT) {
      fetchUsers();
    }
  }, [newUser, updateUserList, JWT]);

  useEffect(() => {
    const token = localStorage.getItem('jwt-cuddle');

    if (JWT) localStorage.setItem('jwt-cuddle', JWT);
    if (token) setJWT(token);
  }, [JWT]);

  useEffect(() => {
    if (JWT) {
      const decode = jwtDecode(JWT);

      const getUser = async (id) => {
        const userInfo = await getUserById(id, JWT);

        setUser(userInfo.data);
      };

      getUser(decode.id);
    }
  }, [JWT]);

  return (
    <>
      {console.log('user:', user)}
      <Header
        setNewUser={setNewUser}
        setJWT={setJWT}
        JWT={JWT}
        setUser={setUser}
        user={user}
        setMainMenu={setMainMenu}
      />
      <section>
        {mainMenu === 'home' && <Home blockchain={blockchain} />}
        {mainMenu === 'transaction' && (
          <MakeTransaction
            JWT={JWT}
            trxPending={trxPending}
            setTrxPending={setTrxPending}
            user={user}
          />
        )}
        {mainMenu === 'mine' && (
          <Mine
            JWT={JWT}
            setTrxPending={setTrxPending}
            mineCount={mineCount}
            setMineCount={setMineCount}
            blockchain={blockchain}
          />
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
