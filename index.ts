import express from 'express';
import dotenv from "dotenv";
import { formatTimestamp } from './src/services/timestamp';
import { checkBandwidth, checkConnectivity } from './src/services/network';

dotenv.config()
const { BANDWIDTH_INTERVAL, CONNECTIVITY_INTERVAL, PORT } = process.env

let bandwidthInt = BANDWIDTH_INTERVAL ? parseInt(BANDWIDTH_INTERVAL) : 1.5 * 60 * 60 * 1000
let connectivityInt = CONNECTIVITY_INTERVAL ? parseInt(CONNECTIVITY_INTERVAL) : 60 * 1000

const app = express();

app.get('/', (req, res) => {
  res.send('Hello, world!');
});

app.listen(PORT ?? 3000, async () => {
  console.log(`[${formatTimestamp(new Date)}] Server listening on port ${PORT ?? 3000}.`);

  await checkBandwidth()

  setInterval(checkBandwidth, bandwidthInt)
  setInterval(checkConnectivity, connectivityInt);
});

