import * as dotenv from "dotenv";
import { ethers } from 'ethers';
import * as myContractAbi from './abi/abi.json';

dotenv.config();
const rpcURL = process.env.ETH_GOERLI_API_URL;

// Create a provider instance to connect to the Ethereum network
const provider = new ethers.providers.JsonRpcProvider(rpcURL);

// Create an instance of the Contract class
const contractAddress = '0x2f3A40A3db8a7e3D09B0adfEfbCe4f6F81927557';
const signer = new ethers.Wallet(process.env.PRIVATE_KEY, provider);
const abi = myContractAbi;
const contract = new ethers.Contract(contractAddress, abi, provider);
console.log(contract);


async function main() {
    const amountInEther = "0.1";
    const amount = ethers.utils.parseEther(amountInEther);
    const gasCost = await contract.estimateGas.transfer("0x922F709CE161b2B80fc626f65bAA52112752489A", amount, {from: signer.address, gasPrice: provider.getGasPrice()});    
    console.log(gasCost);
    
}
main();
