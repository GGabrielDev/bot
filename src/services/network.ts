import dns from "dns"
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
