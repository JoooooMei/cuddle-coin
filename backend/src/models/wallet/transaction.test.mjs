import { beforeEach, describe, expect, it } from 'vitest';
import Wallet from './Wallet.mjs';
import Transaction from './Transaction.mjs';

describe('Transaction', () => {
  let transaction, sender, recipient, amount;

  beforeEach(() => {
    sender = new Wallet();
    recipient = 'Johan';
    amount = 20;

    transaction = new Transaction({
      sender: sender,
      recipient: recipient,
      amount: amount,
    });
  });

  // en transaktion ska ha egenskaperna id, outoutMap, input
  // outputmap kommer att testa för egenskaper som det objektet behöver
  // outputMap och input  kommer ha en egen describe svit.

  it('should have a "id" property ', () => {
    expect(transaction).toHaveProperty('id');
  });

  describe('OutputMap', () => {
    it('should have a "outputMap" property ', () => {
      expect(transaction).toHaveProperty('outputMap');
    });

    it('should display the amount to the recipient', () => {
      // expect(transaction.outputMap[recipient].toEqual(sender.amount));
    });

    it('Should display the balance for the senders wallet', () => {
      expect(transaction.outputMap[sender.publicKey]).toEqual(
        sender.balance - amount
      );
    });
  });

  describe('input', () => {
    it('should have a "input" property ', () => {
      expect(transaction).toHaveProperty('input');
    });
  });
});
