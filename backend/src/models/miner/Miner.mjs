import Transaction from '../wallet/Transaction.mjs';

export default class Miner {
  constructor({ transactionPool, wallet, blockchain, server }) {
    this.transactionPool = transactionPool;
    this.wallet = wallet;
    this.blockchain = blockchain;
    this.server = server;
  }

  mineTransactions() {
    // 1 Hämta alla giltiga transaktioner från poolen
    const validateTransactions = this.transactionPool.validateTransactions();
    // 2 Skapa en belöningstransaktion
    validateTransactions.push(
      Transaction.transactionReward({ miner: this.wallet })
    );
    // 3 Skapa ett block med alla giltiga transaktioner
    this.blockchain.addBlock({ data: validateTransactions });
    //   och placera dessa i ett nytt block
    // 4 Distrubuera blockkedjan till alla noder i nätverket
    this.server.broadcastChain();
    // 5 Rensa eller tömma transaktionspoolen
    this.transactionPool.clearTransactions();
  }
}
