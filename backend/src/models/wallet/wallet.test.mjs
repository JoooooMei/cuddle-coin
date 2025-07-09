import { beforeEach, describe, expect, it, vi } from 'vitest';
import Wallet from './Wallet.mjs';
import { verifySignature } from '../../utilities/keyManager.mjs';
import Transaction from './Transaction.mjs';
import Blockchain from '../blockchain/Blockchain.mjs';
import { INITIAL_BALANCE } from '../../utilities/config.mjs';

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

    describe('and a chain is supplied', () => {
      it('should call Wallet.calculateBalance()', () => {
        const calculateBalanceMockFn = vi.fn();

        const orgCalculateBalance = Wallet.calculateBalance;

        Wallet.calculateBalance = calculateBalanceMockFn;

        wallet.createTransaction({
          recipient: 'Herr Anka',
          amount: 20,
          chain: new Blockchain().chain,
        });

        expect(calculateBalanceMockFn).toHaveBeenCalled();

        Wallet.calculateBalance = orgCalculateBalance;
      });
    });
  });

  describe('Calculate the balance', () => {
    let blockchain;

    beforeEach(() => {
      blockchain = new Blockchain();
    });

    describe('and there are no output for the wallet (no transactions)', () => {
      it("should return the initial balance 'INITIAL_BALANCE'", () => {
        expect(
          Wallet.calculateBalance({
            chain: blockchain.chain,
            address: wallet.publicKey,
          })
        ).toEqual(INITIAL_BALANCE);
      });
    });

    describe('and thera are outputs (transactions) for the wallet', () => {
      let transaction1, transaction2;
      beforeEach(() => {
        transaction1 = new Wallet().createTransaction({
          recipient: wallet.publicKey,
          amount: 10,
        });
        transaction2 = new Wallet().createTransaction({
          recipient: wallet.publicKey,
          amount: 20,
        });

        blockchain.addBlock({ data: [transaction1, transaction2] });
      });

      it('should calculate the sum of all transactions for the wallet', () => {
        expect(
          Wallet.calculateBalance({
            chain: blockchain.chain,
            address: wallet.publicKey,
          })
        ).toEqual(
          INITIAL_BALANCE +
            transaction1.outputMap[wallet.publicKey] +
            transaction2.outputMap[wallet.publicKey]
        );
      });

      describe('and the wallet has made a transaction', () => {
        let recentTransaction;

        beforeEach(() => {
          recentTransaction = wallet.createTransaction({
            reciptient: 'DONALD DUCK',
            amount: 100,
          });

          blockchain.addBlock({ data: [recentTransaction] });
        });

        it('should return the amount from recent transaction', () => {
          expect(
            Wallet.calculateBalance({
              chain: blockchain.chain,
              address: wallet.publicKey,
            })
          ).toEqual(recentTransaction.outputMap[wallet.publicKey]);
        });

        describe('and there is outputs(transactions) before and after the recent transaction', () => {
          let recentBlockTransaction, nextBlockTransaction;

          beforeEach(() => {
            recentTransaction = wallet.createTransaction({
              recipient: 'Kalle Duck',
              amount: 35,
            });

            recentBlockTransaction = Transaction.transactionReward({
              miner: wallet,
            });

            blockchain.addBlock({
              data: [recentTransaction, recentBlockTransaction],
            });

            nextBlockTransaction = new Wallet().createTransaction({
              recipient: wallet.publicKey,
              amount: 110,
            });

            blockchain.addBlock({ data: [nextBlockTransaction] });
          });

          it('should include the amounts from the returned balance', () => {
            expect(
              Wallet.calculateBalance({
                chain: blockchain.chain,
                address: wallet.publicKey,
              })
            ).toEqual(
              recentTransaction.outputMap[wallet.publicKey] +
                recentBlockTransaction.outputMap[wallet.publicKey] +
                nextBlockTransaction.outputMap[wallet.publicKey]
            );
          });
        });
      });
    });
  });
});
