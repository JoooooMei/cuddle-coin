import { INITIAL_DIFFICULTY } from '../utilities/config.mjs';

export const GENESIS_BLOCK = {
  timestamp: Date.now(),
  data: [],
  hash: '#1 genesis block',
  difficulty: INITIAL_DIFFICULTY,
  nonce: 0,
  lastHash: '############',
  message: `In ledgers wide, no king, no chain. 
    Each block a voice, none speak in vain. 
    From roots of code, the truth shall grow. 
    Where none command, yet all shall know.`,
};
