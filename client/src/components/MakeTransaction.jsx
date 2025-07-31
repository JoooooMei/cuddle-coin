import React, { useState } from 'react';
import { submitTransaction } from '../services/blockchainServices';

const MakeTransaction = ({ JWT }) => {
  const [recipient, setRecipient] = useState('');
  const [amount, setAmount] = useState('');
  const [trxSubmitted, setTrxSubmitted] = useState(false);
  const [trxPending, setTrxPending] = useState({});

  const handleSubmit = async (e) => {
    e.preventDefault();
    const trx = {
      recipient: recipient,
      amount: Number(amount),
    };

    console.log('trx: ', trx);

    const transaction = await submitTransaction(trx, JWT);

    if (transaction.success) {
      setTrxSubmitted(true);
      setTrxPending(transaction.data);
      setRecipient('');
      setAmount('');
    }

    console.log('The respons of trx: ', transaction);
  };

  return (
    <>
      {trxSubmitted ? (
        <div className="transactions-pending">
          <h2>Transaction Submitted</h2>
          <div className="transaction-list">
            <h4>Transaction(s) pending in mempool</h4>
            <ul>
              {Object.entries(trxPending.outputMap)
                .filter(([recipient]) => recipient !== trxPending.input.address)
                .map(([recipient, amount], index) => (
                  <li key={index}>
                    {recipient}: {amount}
                  </li>
                ))}
            </ul>
          </div>
          <button
            onClick={() => {
              setTrxSubmitted(false);
            }}>
            New transaction
          </button>
        </div>
      ) : (
        <div>
          <form onSubmit={(e) => handleSubmit(e)}>
            <div>
              <label htmlFor="recipient">Recipient</label>
              <input
                type="text"
                name="recipient"
                value={recipient}
                onChange={(e) => setRecipient(e.target.value)}
                required
              />
            </div>

            <div>
              <label htmlFor="amount">Amount</label>
              <input
                type="number"
                name="amount"
                value={amount}
                onChange={(e) => setAmount(e.target.value)}
                required
              />
            </div>

            <button type="submit">Submit transaction</button>
          </form>
        </div>
      )}
    </>
  );
};

export default MakeTransaction;
