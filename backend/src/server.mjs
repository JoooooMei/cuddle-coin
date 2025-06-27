import { app } from './app.mjs';
import errorHandeler from './middleware/errorHandler.mjs';
import blockchainRouter from './routes/blockchain-routes.mjs';
import transactionRoutes from './routes/transaction-routes.mjs';
import { logger } from './middleware/logger.mjs';
import networkServer from './network.mjs';
import Blockchain from './models/blockchain/Blockchain.mjs';
import TransactionPool from './models/wallet/TransactionPool.mjs';
import Wallet from './models/wallet/Wallet.mjs';

export const blockChain = new Blockchain();
export const server = new networkServer({ blockchain: blockChain });
export const transactionPool = new TransactionPool();
export const wallet = new Wallet();

const DEFAULT_PORT = 3000;
let NODE_PORT;

setTimeout(() => {
  server.broadcast();
}, 1000);

// const PORT = process.env.PORT || 3010;

app.use('/api/v1/blocks', blockchainRouter);
app.use('/api/wallet', transactionRoutes);

if (process.env.GENERATE_NODE_PORT === 'true') {
  NODE_PORT = DEFAULT_PORT + Math.ceil(Math.random() * 1000);
}

if (process.env.NODE_ENV === 'development') {
  app.use(logger);
}

const PORT = NODE_PORT || DEFAULT_PORT;

app.use(errorHandeler);

app.listen(PORT, () =>
  console.log(
    `Servern är startad på adress http://localhost:${PORT} och kör i läget ${process.env.NODE_ENV}`
  )
);
