import { INITIAL_DIFFICULTY } from '../../utilities/config.mjs';

export const GENESIS_BLOCK = {
  timestamp: 1,
  data: [],
  hash: '#1 genesis block',
  difficulty: INITIAL_DIFFICULTY,
  nonce: 0,
  lastHash: '############',
  message: `Decentralized, yet side by side,
No third-party could override.
Our keys are shared, our secrets too,
Cuddle and smiles between us two.`,
};
