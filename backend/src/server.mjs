import { app } from './app.mjs';
import errorHandeler from './middleware/errorHandler.mjs';
import blockchainRouter from './routes/blockchain-routes.mjs';
import { logger } from './middleware/logger.mjs';

const PORT = process.env.PORT || 3010;

app.use('/api/v1/blocks', blockchainRouter);

if (process.env.NODE_ENV === 'development') {
  app.use(logger);
}
app.use(errorHandeler);

app.listen(PORT, () =>
  console.log(
    `Servern är startad på adress http://localhost:${PORT} och kör i läget ${process.env.NODE_ENV}`
  )
);
