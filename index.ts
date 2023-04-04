import * as dotenv from "dotenv";
import { ethers } from 'ethers';
import * as myContractAbi from './abi/abi.json';

dotenv.config();
const rpcURL = process.env.ETH_GOERLI_API_URL;
// Create a provider instance to connect to the Ethereum network
const provider = new ethers.providers.JsonRpcProvider(rpcURL);
// Create an instance of the Contract class
const contractAddress = '0x07865c6E87B9F70255377e024ace6630C1Eaa37F';
const abi = myContractAbi;
const contract = new ethers.Contract(contractAddress, abi, provider);


const signer = new ethers.Wallet(process.env.PRIVATE_KEY, provider);
console.log(signer.address);


async function getGasCost(address: string, amount: number) {
    const usdcAmount = amount;

    const balance = await contract.balanceOf(address);
    console.log("balance is ", parseInt(balance.toString()));
    let gasCost;
    console.log("Gas cost:");
    
    if(usdcAmount <= balance){
        gasCost = await (contract.estimateGas.transfer("0x922F709CE161b2B80fc626f65bAA52112752489A", usdcAmount, {from: address}));    
        gasCost = parseInt(gasCost.toString());
        return gasCost;
    }
    else{
        return -1;  
    }
    
}
const addressWithSufficientBalance1 = signer.address;
const addressWithSufficientBalance2 = "0x99767C57701afac09D1D2a1Cb5d3BF30f63e3964";
const addressWithInsufficientBalance = "0xB59313B00116F7e729dBCB8CF2b868bcD7629533";
async function main() {
    console.log(await getGasCost(addressWithSufficientBalance1, 1000));
    console.log(await getGasCost(addressWithSufficientBalance2, 1000));
    console.log(await getGasCost(addressWithInsufficientBalance, 1000)); 
}
main();


