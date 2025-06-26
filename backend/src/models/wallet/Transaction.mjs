import { v4 as uuidv4 } from 'uuid';

export default class Transaction {
  constructor({ sender, recipient, amount }) {
    this.id = uuidv4().replaceAll('-', '');
    this.outputMap = this.createOutputMap({ sender, recipient, amount });
    this.input = {};
  }

  createOutputMap({ sender, recipient, amount }) {
    const map = {};

    map[recipient] = amount;
    map[sender.publicKey] = sender.balance - amount;

    return map;
  }
}
