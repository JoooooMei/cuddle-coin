import React from 'react';
const Blockchain = ({ blockchain }) => {
  return (
    <div className="blockchain">
      {blockchain?.map((block, index) => (
        <div className="block" key={block.hash}>
          <div className="block-header">
            <h2>#{index === 0 ? index + ' Genesis Block' : index}</h2>
            <ul>
              <li>
                <b>Timestamp: {new Date(block.timestamp).toLocaleString()}</b>
              </li>
              <li>
                <b>Difficulty: </b>
                {block.difficulty}
              </li>
              <li className="string-wrap">
                <b>Hash:</b> {block.hash}
              </li>
              <li className="string-wrap">
                <b>Last Hash:</b> {block.lastHash}
              </li>
            </ul>
          </div>

          {block.data.length === 0 ? (
            <div className="trx-details">
              <h3>No transactions</h3>
            </div>
          ) : (
            block.data.map((trx) => {
              const isReward = trx.input.address === '#reward-address';

              return (
                <div key={trx.id} className="trx-details">
                  <h3>{isReward ? 'Miner Reward' : 'Transactions'}</h3>
                  {!isReward && (
                    <p className="string-wrap">
                      <strong>Sender:</strong> {trx.input.address}
                    </p>
                  )}

                  <table>
                    <thead>
                      <tr>
                        <th>
                          <b>Recipient</b>
                        </th>
                        <th>
                          <b>Amount</b>
                        </th>
                      </tr>
                    </thead>
                    <tbody>
                      {trx.outputMap &&
                        Object.entries(trx.outputMap)
                          .filter(
                            ([recipient]) => recipient !== trx.input.address
                          )
                          .map(([recipient, amount]) => (
                            <tr key={recipient}>
                              <td>{recipient}</td>
                              <td>{amount}</td>
                            </tr>
                          ))}
                    </tbody>
                  </table>
                </div>
              );
            })
          )}
        </div>
      ))}
    </div>
  );
};

export default Blockchain;
