import React, { useEffect, useState } from 'react';
import { getAllTransactions, mine } from '../services/blockchainServices';

const Mine = ({ JWT }) => {
  const [mempool, setMempool] = useState({});

  useEffect(() => {
    const getMempool = async () => {
      const allTrx = await getAllTransactions();

      setMempool(allTrx);
      console.log('mempool: ', allTrx);
    };

    getMempool();
  }, []);

  const mineTransactions = async () => {
    const mined = await mine(JWT);

    if (mined.success) setMempool({});

    console.log(minedTrx);
  };

  return (
    <>
      <div>
        <h2>Mempool Transactions</h2>
        {mempool.data && Object.keys(mempool.data).length > 0 ? (
          Object.entries(mempool.data).map(([txId, trx]) => (
            <div key={txId}>
              <h4>Transaction ID: {txId}</h4>

              <p>
                <strong>Timestamp:</strong>{' '}
                {new Date(trx.input?.timestamp).toLocaleString()}
              </p>

              <h5>Recipients:</h5>
              <ul>
                {Object.entries(trx.outputMap)
                  .filter(([recipient]) => recipient !== trx.input.address)
                  .map(([recipient, amount]) => (
                    <li key={recipient}>
                      {recipient}: {amount}
                    </li>
                  ))}
              </ul>
            </div>
          ))
        ) : (
          <p>No transactions in mempool.</p>
        )}
      </div>
      <button onClick={() => mineTransactions()}>Mine transactions</button>
    </>
  );
};

export default Mine;
