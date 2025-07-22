import { useEffect, useState } from 'react';
import './App.css';
import './styles/styles.css';
import { getAllUsers } from './services/userServices';
import { getBlockchain } from './services/blockchainServices';
import AllUsers from './components/AllUsers';
import Header from './components/Header';

function App() {
  const [newUser, setNewUser] = useState(undefined);
  const [blockchain, setBlockchain] = useState(undefined);
  const [allUsers, setAllUsers] = useState(undefined);
  const [JWT, setJWT] = useState('');

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
      <Header setNewUser={setNewUser} />
      <section>
        <h1>Hello</h1>

        <AllUsers allUsers={allUsers} />
      </section>
    </>
  );
}

export default App;
