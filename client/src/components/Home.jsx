import React from 'react';
import Blockchain from './Blockchain';

const Home = ({ blockchain }) => {
  return (
    <div>
      <h1>CuddleCoin</h1>
      <div className="home-feed">
        <Blockchain blockchain={blockchain} />
        <b>..make transactions and add more blocks :)</b>
      </div>
    </div>
  );
};

export default Home;
