import { beforeEach, describe, expect, it } from 'vitest';
import Wallet from './Wallet.mjs';
import Transaction from './Transaction.mjs';
import TransactionPool from './TransactionPool.mjs';

describe('TransactionPool', () => {
  let transactionPool, transaction, sender;

  sender = new Wallet();

  beforeEach(() => {
    transaction = new Transaction({
      sender,
      recipient: 'Donald Duck',
      amount: 30,
    });
  });

  transactionPool = new TransactionPool();

  describe('validate transactions', () => {
    let transactions = [];

    beforeEach(() => {
      transactions = [];

      for (let i = 0; i < 10; i++) {
        transaction = new Transaction({
          sender,
          recipient: 'Fnatte',
          amount: 30,
        });

        if (i % 3 === 0) {
          transaction.input.amount = 1500;
        } else if (i % 3 === 1) {
          transaction.input.signature = new Wallet().sign('Wrong Signature');
        } else {
          transactions.push(transaction);
        }

        transactionPool.addTransaction(transaction);
      }
    });

    it('should only return valid transactions', () => {
      expect(transactionPool.validateTransactions()).toStrictEqual(
        transactions
      );
    });
  });
});
