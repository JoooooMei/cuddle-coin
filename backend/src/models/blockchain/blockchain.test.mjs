import Blockchain from './Blockchain.mjs';
import Block from './Block.mjs';
import { beforeEach, describe, expect, it, vi } from 'vitest';
import Wallet from '../wallet/Wallet.mjs';
import Transaction from '../wallet/Transaction.mjs';

describe('Blockchain', () => {
  let blockchain, blockchain_2, org_chain;

  beforeEach(() => {
    blockchain = new Blockchain();
    blockchain_2 = new Blockchain();
    org_chain = blockchain.chain;
  });

  it('should contain an array of blocks', () => {
    expect(blockchain.chain instanceof Array).toBeTruthy();
  });

  it('should start with the genesis block', () => {
    expect(blockchain.chain.at(0)).toEqual(Block.genesis());
  });

  it('should add a new block to the chain', () => {
    const data = 'Polestar';
    blockchain.addBlock({ data });
    expect(blockchain.chain.at(-1).data).toEqual(data);
  });

  describe('isValid() chain function', () => {
    describe('the genesis block is missing or not the first block in the chain', () => {
      it('should return false', () => {
        blockchain.chain[0] = 'strange-block';
        expect(Blockchain.isValid(blockchain.chain)).toBeFalsy();
      });
    });

    describe('when the chain starts with the genesis block and consist of multiple blocks', () => {
      beforeEach(() => {
        blockchain.addBlock({ data: 'Åsa-Nisse' });
        blockchain.addBlock({ data: 'Nisse Hult' });
        blockchain.addBlock({ data: 'Eva Olsson' });
        blockchain.addBlock({ data: 'Emelie Höglund' });
        blockchain.addBlock({ data: 'Bertil Bertilsson' });
      });

      describe('and the lastHash has changed', () => {
        it('should return false', () => {
          blockchain.chain.at(2).lastHash = 'Ooops!';
          expect(Blockchain.isValid(blockchain.chain)).toBeFalsy();
        });
      });

      describe('and the chain contains a block with invalid information', () => {
        it('should return false', () => {
          blockchain.chain.at(1).data = 'You are hacked!!!';
          expect(Blockchain.isValid(blockchain.chain)).toBeFalsy();
        });
      });

      describe('and the chain does not contain any invalid blocks', () => {
        it('returns true', () => {
          expect(Blockchain.isValid(blockchain.chain)).toBeTruthy();
        });
      });
    });
  });

  describe('Replace chain', () => {
    describe('when the new chain is not longer', () => {
      it('should not replace the chain', () => {
        blockchain_2.chain[0] = { data: 'New data in block' };

        blockchain.replaceChain(blockchain_2.chain);

        expect(blockchain.chain).toEqual(org_chain);
      });
    });

    describe('when the new chain is longer', () => {
      beforeEach(() => {
        blockchain_2.addBlock({ data: 'Åsa-Nisse' });
        blockchain_2.addBlock({ data: 'Nisse Hult' });
      });

      describe('but is invalid', () => {
        it('should not replace the chain', () => {
          blockchain_2.chain[1].hash = 'You-have-been-hacked';
          blockchain.replaceChain(blockchain_2.chain);

          expect(blockchain.chain).toEqual(org_chain);
        });
      });
      describe('but is valid', () => {
        beforeEach(() => {
          blockchain.replaceChain(blockchain_2.chain);
        });

        it('should replace the chain', () => {
          expect(blockchain.chain).toEqual(blockchain_2.chain);
        });
      });
    });

    describe('when the shouldVlaidate flag is not set to true', () => {
      it('should call the validateTransactionData method', () => {
        const validateTransactionDataMockFn = vi.fn();

        const originalValidateTransactionData =
          blockchain.validateTransactionData;

        blockchain.validateTransactionData = validateTransactionDataMockFn;

        blockchain_2.addBlock({ data: 'dummy_data' });
        blockchain.replaceChain(blockchain_2.chain, true);

        expect(validateTransactionDataMockFn).toHaveBeenCalled();

        blockchain.validateTransactionData = originalValidateTransactionData;
      });
    });
  });

  describe('Validate transaction data', () => {
    let transaction, rewardTransaction, wallet;

    beforeEach(() => {
      wallet = new Wallet();
      transaction = wallet.createTransaction({
        recipient: 'Donald Duck',
        amount: 50,
      });

      rewardTransaction = Transaction.transactionReward({ miner: wallet });
    });

    describe('and the transaction data is valid', () => {
      it('should return true', () => {
        blockchain_2.addBlock({
          data: [transaction, rewardTransaction],
        });
        expect(
          blockchain.validateTransactionData({ chain: blockchain_2 })
        ).toBeTruthy();
      });
    });

    describe('and the transaction data has multiple reward transactions', () => {
      it('should return false', () => {
        blockchain_2.addBlock({
          data: [transaction, rewardTransaction, rewardTransaction],
        });
        expect(
          blockchain.validateTransactionData({ chain: blockchain_2.chain })
        ).toBeFalsy();
      });
    });

    describe('and the transaction has a badly formatted outputMap', () => {
      describe('and the transaction is NOT a reward transaction', () => {
        it('should return false', () => {
          transaction.outputMap[wallet.publicKey] = 515151515151;

          blockchain_2.addBlock({ data: [transaction, rewardTransaction] });

          expect(
            blockchain.validateTransactionData({ chain: blockchain_2.chain })
          ).toBeFalsy();
        });
      });
      describe('and the transaction is a reward transaction', () => {
        it('should return false', () => {
          transaction.outputMap[wallet.publicKey] = 878787878787;

          blockchain_2.addBlock({ data: [transaction, rewardTransaction] });

          expect(
            blockchain.validateTransactionData({ chain: blockchain_2.chain })
          ).toBeFalsy();
        });
      });
    });

    describe('and the transaction data has at least one badly formatted input', () => {
      it('should return false', () => {
        wallet.balance = 10000;
        const hackerMap = {
          [wallet.publicKey]: 9900,
          hackerRecipient: 100,
        };

        const hackerTransaction = {
          input: {
            timestamp: Date.now(),
            amount: wallet.balance,
            address: wallet.publicKey,
            signature: wallet.sign(hackerMap),
          },
          outputMap: hackerMap,
        };

        blockchain_2.addBlock({ data: [hackerTransaction, rewardTransaction] });

        expect(
          blockchain.validateTransactionData({ chain: blockchain_2.chain })
        ).toBeFalsy();
      });
    });

    describe('anda a block contains multiple identical transactions', () => {
      it('should return falsa', () => {
        blockchain_2.addBlock({
          data: [transaction, transaction, transaction, transaction],
        });

        expect(
          blockchain.validateTransactionData({ chain: blockchain_2.chain })
        ).toBeFalsy();
      });
    });
  });
});
