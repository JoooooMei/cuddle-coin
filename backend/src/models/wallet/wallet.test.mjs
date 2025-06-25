import { beforeEach, describe, expect, it } from 'vitest';

import Wallet from './Wallet.mjs';

describe('Wallet', () => {
  let wallet;

  beforeEach(() => {
    wallet = new Wallet();
  });

  it('should have property: publicKey', () => {
    expect(wallet).toHaveProperty('publicKey');
  });

  it('should have property: balance', () => {
    expect(wallet).toHaveProperty('balance');
  });
});
