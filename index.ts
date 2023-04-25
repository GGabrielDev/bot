import express from 'express';
import dotenv from "dotenv";
import { formatTimestamp } from './src/services/timestamp';
import { checkConnectivity } from './src/services/network';

dotenv.config()
const { PORT } = process.env

const app = express();

app.get('/', (req, res) => {
  res.send('Hello, world!');
});

app.listen(PORT ?? 3000, () => {
  console.log(`[${formatTimestamp(new Date)}] Server listening on port ${PORT ?? 3000}.`);

  const intervalMs = 60 * 1000; // 1 minute
  setInterval(checkConnectivity, intervalMs);
});

