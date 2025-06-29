import { describe, expect, it } from 'vitest';
import { createHash } from './hash.mjs';

describe('createHash function', () => {
  it('should generate a SHA-256 hash as output', () => {
    expect(createHash('hash this please')).toEqual(
      '6297d481df0b9574ec02535b64c079ca18bbd21a2a6ce50c670ec282b77d74e5'
    );
  });

  it('should generate the same output with the same input regardless of order', () => {
    expect(createHash('kan', 'johan', 'hasha')).toEqual(
      createHash('johan', 'kan', 'hasha')
    );
  });

  it('should create a unique hash when any property has changed', () => {
    const object = {};
    const orgHash = createHash(object);
    object['name'] = 'Musse Pigg';
    console.log(object);
    expect(createHash(object)).not.toEqual(orgHash);
  });
});
