import {time} from "console";
import dns from "dns"
import {performance} from "perf_hooks";
import speedTest from 'speedtest-net';
import { formatTimestamp } from "./timestamp";

const checkDnsConnectivity = (): Promise<boolean> => {
  return new Promise((resolve) => {
    dns.resolve('google.com', (err) => {
      resolve(!err); // Resolve to true if err is falsy (i.e., DNS resolution was successful)
    });
  });
};

const printConnectivityStatus = (isConnected: boolean) => {
  const timestamp = formatTimestamp(new Date());
  const message = `[${timestamp}] Internet connectivity is ${isConnected ? 'OK' : 'lost'}.`;
  console.log(message);
};

export const checkConnectivity = async () => {
  const isConnected = await checkDnsConnectivity();
  printConnectivityStatus(isConnected);
};

type BandwithValues = Record<"uploadSpeed" | "downloadSpeed" | "ping" | "timeElapsed", number>

export const checkBandwidthValues = async (): Promise<BandwithValues> => {
  const start = performance.now()
  const results = await speedTest({ acceptLicense: true });
  const end = performance.now()
  return {
    downloadSpeed: results.download.bandwidth / 100000,
    uploadSpeed: results.upload.bandwidth / 100000,
    ping: results.ping.latency,
    timeElapsed: end - start
  };
}

const printBandwidthValues = (values: BandwithValues) => {
  const timestamp = formatTimestamp(new Date());
  const message = `[${timestamp}] Bandwidth Rates
  - Download: ${values.downloadSpeed.toFixed(2)}Mbps 
  - Upload: ${values.uploadSpeed.toFixed(2)}Mpbs
  - Ping: ${values.ping}ms
  - Time Elapsed: ${(values.timeElapsed / 1000).toFixed(1)}s`
  console.log(message)
}

export const checkBandwidth = async () => {
  const isConnected = await checkDnsConnectivity()
  if (isConnected) {
    const values = await checkBandwidthValues()
    printBandwidthValues(values)
  }
}
