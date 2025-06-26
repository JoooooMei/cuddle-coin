import { beforeEach, describe, expect, it } from 'vitest';
import Wallet from './Wallet.mjs';
import { verifySignature } from '../../utilities/keyManager.mjs';

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
});
