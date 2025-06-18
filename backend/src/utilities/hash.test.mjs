import { createHash } from './hash.mjs';

describe('createHash function', () => {
  it('should generate a SHA-256 hash as output', () => {
    expect(createHash('hash this please')).toEqual(
      '83e7a3ad7eca7ba4f5e86e46fa1a49bab17a6d274f3555b5cf199f60fae94af0'
    );
  });

  it('should generate the same output with the same input regardless of order', () => {
    expect(createHash('kan', 'johan', 'hasha')).toEqual(
      createHash('johan', 'kan', 'hasha')
    );
  });
});
