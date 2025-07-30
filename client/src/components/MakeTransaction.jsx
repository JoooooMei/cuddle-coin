import React, { useState } from 'react';
import { submitTransaction } from '../services/blockchainServices';

const MakeTransaction = () => {
  const [recipient, setRecipient] = useState('');
  const [amount, setAmount] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    const trx = {
      recipient: recipient,
      amount: Number(amount),
    };

    console.log('trx: ', trx);

    const transaction = await submitTransaction();
  };

  return (
    <div>
      <form onSubmit={(e) => handleSubmit(e)}>
        <div>
          <label htmlFor="recipient">recipient</label>
          <input
            type="text"
            name="recipient"
            value={recipient}
            onChange={(e) => setRecipient(e.target.value)}
          />
        </div>

        <div>
          <label htmlFor="amount">amount</label>
          <input
            type="number"
            name="amount"
            value={amount}
            onChange={(e) => setAmount(e.target.value)}
          />
        </div>

        <button type="submit">Submit transaction</button>
      </form>
    </div>
  );
};

export default MakeTransaction;
