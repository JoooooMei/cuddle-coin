import { beforeEach, describe, expect, it } from 'vitest';
import Wallet from './Wallet.mjs';
import { verifySignature } from '../../utilities/keyManager.mjs';
import Transaction from './Transaction.mjs';

describe('Wallet', () => {
  let wallet;

  beforeEach(() => {
    wallet = new Wallet();
  });

  it('should have property: publicKey', () => {
    console.log('Public key:', wallet.publicKey);
    expect(wallet).toHaveProperty('publicKey');
  });

  it('should have property: balance', () => {
    expect(wallet).toHaveProperty('balance');
  });

  describe('Signing data', () => {
    const data = 'Dummy data';

    it('should verify a valid signature', () => {
      expect(
        verifySignature({
          publicKey: wallet.publicKey,
          data: data,
          signature: wallet.sign(data),
        })
      ).toBeTruthy();
    });

    it('should not verify an invalid signature', () => {
      expect(
        verifySignature({
          publicKey: wallet.publicKey,
          data: data,
          signature: new Wallet().sign(data),
        })
      ).toBeFalsy();
    });
  });

  describe('Create transaction', () => {
    it('Should throw error if transaction amount is larger than balance', () => {
      expect(() => {
        wallet.createTransaction({
          recipient: 'Joachim Von Anka',
          amount: 5000000000000000,
        });
      }).toThrow('Insufficient founds');
    });

    describe('and the amount is valid', () => {
      let transaction, amount, recipient;

      beforeEach(() => {
        amount = 25;
        recipient = 'Kalle Anka';
        transaction = wallet.createTransaction({ amount, recipient });
        console.log(transaction);
      });

      it('should creata a Transaction object', () => {
        expect(transaction).toBeInstanceOf(Transaction);
      });

      it('should match the wallet input', () => {
        expect(transaction.input.address).toEqual(wallet.publicKey);
      });

      it('should output the amount to the recipient', () => {
        expect(transaction.outputMap[recipient]).toEqual(amount);
      });
    });
  });
});
