export default class Miner {
  constructor({ transactionPool }) {
    this.transactionPool = transactionPool;
  }

  mineTransaction() {
    // 1 Hämta alla giltiga transaktioner från poolen
    const validateTransactions = this.transactionPool.validateTransactions();
    // 2 Skapa en belöningstransaktion

    // 3 Skapa ett block med alla giltiga transaktioner
    //   och placera dessa i ett nytt block
    // 4 Distrubuera blockkedjan till alla noder i nätverket
    // 5 Rensa eller tömma transaktionspoolen
  }
}
