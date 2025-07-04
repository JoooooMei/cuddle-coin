import { describe, expect, it } from 'vitest';
import Block from './Block.mjs';
import { GENESIS_BLOCK } from './genesis.mjs';
import { createHash } from '../../utilities/hash.mjs';
import { MINE_RATE } from '../../utilities/config.mjs';

describe('Block', () => {
  const timestamp = 2000;
  const currentHash = 'current-hash';
  const lastHash = 'prev-hash';
  const data = [1, 2, 3, 4, 5, 6, 7, 8, 9];
  const nonce = 1;
  const difficulty = 1;
  const message = 'A testdriven message';

  const block = new Block({
    hash: currentHash,
    lastHash,
    timestamp,
    data,
    nonce,
    difficulty,
    message,
  });

  describe('Should have the correct properties', () => {
    it('should have a timestamp property', () => {
      expect(block).toHaveProperty('timestamp');
    });

    it('Should have a hash property', () => {
      expect(block).toHaveProperty('hash');
    });

    it('should have a lastHash property', () => {
      expect(block).toHaveProperty('lastHash');
    });

    it('should have data property', () => {
      expect(block).toHaveProperty('data');
    });

    it('should have nonce property', () => {
      expect(block).toHaveProperty('nonce');
    });

    it('should have a message property', () => {
      expect(block).toHaveProperty('message');
    });

    it('should have difficulty property', () => {
      expect(block).toHaveProperty('difficulty');
    });
  });

  describe('Should have correct initaialization of its properties', () => {
    it('should set a timestamp value', () => {
      expect(block.timestamp).not.toEqual(undefined);
    });

    it('should have correct hash', () => {
      expect(block.hash).toEqual(currentHash);
    });

    it('should set lastHash to the hash of the previous block', () => {
      expect(block.lastHash).toEqual(lastHash);
    });

    it('should set the data property', () => {
      expect(block.data).toEqual(data);
    });

    it('should return an instance of the Block class', () => {
      expect(block instanceof Block).toBeTruthy();
    });
  });

  describe('genisis() function', () => {
    const genesisBlock = Block.genesis();

    it('should return an instance of the Block class', () => {
      expect(genesisBlock instanceof Block).toBeTruthy();
    });

    it('should return the genesis data', () => {
      expect(genesisBlock).toEqual(GENESIS_BLOCK);
    });
  });

  describe('mineblock function, mineBlock()', () => {
    const previousBlock = Block.genesis();
    const data = [5, 6, 7, 8, 9, 10];
    const minedBlock = Block.mineBlock({ previousBlock, data });

    it('shouild return an instance of Block class', () => {
      expect(minedBlock instanceof Block).toBeTruthy();
    });

    it('should set the lastHash to the hash of the previous block', () => {
      expect(minedBlock.lastHash).toEqual(previousBlock.hash);
    });

    it('should set the data', () => {
      expect(minedBlock.data).toEqual(data);
    });

    it('should set the timestamp', () => {
      expect(minedBlock.timestamp).not.toEqual(undefined);
    });

    it('should create a SHA-256 hash based on given and correct input', () => {
      expect(minedBlock.hash).toEqual(
        createHash(
          minedBlock.timestamp,
          previousBlock.hash,
          data,
          minedBlock.nonce,
          minedBlock.difficulty,
          minedBlock.message
        )
      );
    });

    it('should create a hash based on the difficulty level', () => {
      expect(minedBlock.hash.substring(0, minedBlock.difficulty)).toEqual(
        '0'.repeat(minedBlock.difficulty)
      );
    });

    it('should adjust the difficulty level', () => {
      const results = [
        previousBlock.difficulty + 1,
        previousBlock.difficulty - 1,
      ];

      expect(results.includes(minedBlock.difficulty)).toBe(true);
    });
  });

  describe('Adjust the difficulty level', () => {
    it('should raise the difficulty level for a quickly mined block', () => {
      expect(
        Block.adjustDifficultyLevel({
          block,
          timestamp: block.timestamp + MINE_RATE - 100,
        })
      ).toEqual(block.difficulty + 1);
    });

    it('should lower the difficulty level for a slowly mined block', () => {
      expect(
        Block.adjustDifficultyLevel({
          block,
          timestamp: block.timestamp + MINE_RATE + 100,
        })
      ).toEqual(block.difficulty - 1);
    });

    it('should have a lower limit of 1 for difficulty level', () => {
      block.difficulty = -1;
      expect(Block.adjustDifficultyLevel({ block })).toEqual(1);
    });
  });
});
