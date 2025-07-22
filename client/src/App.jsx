import { useEffect, useState } from 'react';
import reactLogo from './assets/react.svg';
import viteLogo from '/vite.svg';
import './App.css';
import './styles/styles.css';
import RegisterNewUser from './components/RegisterNewUser';
import { getAllUsers } from './services/userServices';
import { getBlockchain } from './services/blockchainServices';
import AllUsers from './components/AllUsers';

function App() {
  const [newUser, setNewUser] = useState({});
  const [blockchain, setBlockchain] = useState(undefined);
  const [allUsers, setAllUsers] = useState(undefined);

  useEffect(() => {
    const fetcBlockchain = async () => {
      const blockchain = await getBlockchain();

      setBlockchain(blockchain.data);
    };

    fetcBlockchain();
  }, []);

  useEffect(() => {
    const fetchUsers = async () => {
      const users = await getAllUsers();

      setAllUsers(users.data);
    };

    fetchUsers();
  }, [, newUser]);

  return (
    <>
      <div>
        <h1>Hello</h1>
        <RegisterNewUser setNewUser={setNewUser} />
        <AllUsers allUsers={allUsers} />
      </div>
    </>
  );
}

export default App;
