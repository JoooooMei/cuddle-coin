import { app } from './app.mjs';
import errorHandeler from './middleware/errorHandler.mjs';
import { logger } from './middleware/logger.mjs';
import blockchainRoutes from './routes/blockchain-routes.mjs';
import transactionRoutes from './routes/transaction-routes.mjs';
import userRoutes from './routes/user-routes.mjs';
import authRoutes from './routes/authRoutes.mjs';
import networkServer from './network.mjs';
import Blockchain from './models/blockchain/Blockchain.mjs';
import TransactionPool from './models/wallet/TransactionPool.mjs';
import Wallet from './models/wallet/Wallet.mjs';
import AppError from './models/blockchain/appError.mjs';

export const blockChain = new Blockchain();
export const transactionPool = new TransactionPool();
export const wallet = new Wallet();
export const server = new networkServer({
  blockchain: blockChain,
  transactionPool,
  wallet,
});

const DEFAULT_PORT = 3000;
const ROOT_NODE = `http://localhost:${DEFAULT_PORT}`;
let NODE_PORT;

app.use('/api/blocks', blockchainRoutes);
app.use('/api/wallet', transactionRoutes);
app.use('/api/users', userRoutes);
app.use('/api/auth', authRoutes);

app.all('*', (req, res, next) => {
  next(
    new AppError(
      `Cant find the resource you are looking for ${req.originalUrl}`
    )
  );
});

const synchronize = async () => {
  let response = await fetch(`${ROOT_NODE}/api/blocks`);
  if (response) {
    const result = await response.json();
    console.log('Replacing chain on sync with:', result.data);
    blockChain.replaceChain(result.data);
  }

  response = await fetch(`${ROOT_NODE}/api/wallet/transactions`);
  if (response) {
    const result = await response.json();
    console.log('Replacing transactionPool map on sync with', result.data);
    transactionPool.replaceMap(result.data);
  }
};

if (process.env.GENERATE_NODE_PORT === 'true') {
  NODE_PORT = DEFAULT_PORT + Math.ceil(Math.random() * 1000);
}

if (process.env.NODE_ENV === 'development') {
  app.use(logger);
}

const PORT = NODE_PORT || DEFAULT_PORT;

app.use(errorHandeler);

app.listen(PORT, () => {
  console.log(
    `Servern är startad på adress ${PORT} och kör i läget ${process.env.NODE_ENV}`
  );

  if (PORT !== DEFAULT_PORT) {
    synchronize();
  }
});
