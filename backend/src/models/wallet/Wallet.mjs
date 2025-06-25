import { INITIAL_BALANCE } from '../../utilities/config.mjs';

export default class Wallet {
  constructor() {
    this.balance = INITIAL_BALANCE;
    this.publicKey = '';
  }
}
