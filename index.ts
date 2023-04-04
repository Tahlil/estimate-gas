import * as dotenv from "dotenv";
import { ethers } from 'ethers';
import * as myContractAbi from './abi/abi.json';

dotenv.config();
const rpcURL = process.env.ETH_GOERLI_API_URL;

// Create a provider instance to connect to the Ethereum network
const provider = new ethers.JsonRpcProvider(rpcURL);

// Create an instance of the Contract class
const contractAddress = '0x2f3A40A3db8a7e3D09B0adfEfbCe4f6F81927557';
const abi = myContractAbi;
const contract = new ethers.Contract(contractAddress, abi, provider);
