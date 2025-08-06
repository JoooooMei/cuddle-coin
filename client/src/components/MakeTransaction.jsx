import React, { useEffect, useState } from 'react';
import { getBalance, submitTransaction } from '../services/blockchainServices';

const MakeTransaction = ({ JWT, trxPending, setTrxPending }) => {
  const [recipient, setRecipient] = useState('');
  const [amount, setAmount] = useState('');
  const [trxSubmitted, setTrxSubmitted] = useState(false);
  const [balance, setBalance] = useState('');

  useEffect(() => {
    const getWalletBalance = async () => {
      console.log('Looking for balance');
      const walletBalance = await getBalance(JWT);

      setBalance(walletBalance.data.balance);
    };

    getWalletBalance();
  }, [trxSubmitted]);

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
    <div className="transaction-wrapper">
      <div className="wallet">
        {trxSubmitted ? (
          <div>
            <div>
              <h3>Transaction submitted!</h3>
            </div>
            <button
              onClick={() => {
                setTrxSubmitted(false);
              }}>
              New transaction
            </button>
          </div>
        ) : (
          <form onSubmit={(e) => handleSubmit(e)}>
            <h4>Balance: {balance}</h4>
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
        )}
      </div>

      <div className="transactions-pending">
        <h2>Transaction Submitted</h2>
        {console.log('trxPending:', trxPending)}
        <div className="transaction-list">
          {trxPending.outputMap ? (
            <>
              <h4>Transaction(s) in mempool</h4>
              <ul>
                {Object.entries(trxPending.outputMap)
                  .filter(
                    ([recipient]) => recipient !== trxPending.input.address
                  )
                  .map(([recipient, amount], index) => (
                    <li key={index}>
                      {recipient}: {amount}
                    </li>
                  ))}
              </ul>
            </>
          ) : (
            <h4>No transactions submitted</h4>
          )}
        </div>
      </div>
    </div>
  );
};

export default MakeTransaction;
