import React, { useEffect, useState } from 'react';
import { getAllTransactions, mine } from '../services/blockchainServices';
import Blockchain from './Blockchain';
import Unauthorized from './Unauthorized';

const Mine = ({ JWT, setTrxPending, setMineCount, blockchain }) => {
  const [mempool, setMempool] = useState({});
  const [access, setAccess] = useState(false);

  useEffect(() => {
    const getMempool = async () => {
      const allTrx = await getAllTransactions(JWT);

      if (allTrx.succsess) {
        setMempool(allTrx);
      }
      setAccess(allTrx.succsess);
    };

    getMempool();
  }, []);

  const mineTransactions = async () => {
    const mined = await mine(JWT);

    if (mined.success) {
      setMempool({});
      setTrxPending({});
      setMineCount((prev) => prev + 1);
    } else {
      console.log('this happened ', mined);
    }
  };

  return (
    <>
      {access ? (
        <div className="mine-section">
          <div className="mempool-column transactions-pending">
            <h2>Mempool Transactions</h2>
            {mempool.data && Object.keys(mempool.data).length > 0 ? (
              Object.entries(mempool.data).map(([txId, trx]) => (
                <>
                  <div className="transaction-list" key={txId}>
                    <h4>Transaction ID: {txId}</h4>

                    <p>
                      <strong>Timestamp:</strong>{' '}
                      {new Date(trx.input?.timestamp).toLocaleString()}
                    </p>

                    <h5>Recipients:</h5>
                    <ul>
                      {Object.entries(trx.outputMap)
                        .filter(
                          ([recipient]) => recipient !== trx.input.address
                        )
                        .map(([recipient, amount]) => (
                          <li key={recipient}>
                            {recipient}: {amount}
                          </li>
                        ))}
                    </ul>
                  </div>
                  <button onClick={() => mineTransactions()}>
                    Mine transactions
                  </button>
                </>
              ))
            ) : (
              <p>No transactions in mempool.</p>
            )}
          </div>
          <div className="blocks-column">
            <h2>Blocks</h2>
            <Blockchain blockchain={blockchain} />
          </div>
        </div>
      ) : (
        <Unauthorized />
      )}
    </>
  );
};

export default Mine;
