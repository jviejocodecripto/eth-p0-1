const ethers = require("ethers")
const fs = require("fs")
const hre = require("hardhat");
const helpers = require("@nomicfoundation/hardhat-toolbox/network-helpers");


const abi = JSON.parse(fs.readFileSync("./artifacts/contracts/Contador.sol/Contador.json")).abi

let SC = "0x5FbDB2315678afecb367f032d93F642f64180aa3";


async function main() {
    const provider = new ethers.JsonRpcProvider("http://localhost:8545");
    const signer = await provider.getSigner()

   const Contador =  await hre.ethers.getContractFactory("Contador", signer)
   const contador = await Contador.deploy()
   SC = contador.target
   await contador.waitForDeployment();

   // console.log(contador)
   for await (var i of [1]) {
   await contador.inc({value: ethers.parseEther("1")})

  }
  const b = await provider.getBalance(contador.target);
  console.log(b)
  console.log("contador ", await contador.contador())
  console.log(contador.target)
}

async function getContador() { 
    SC = "0x5f3f1dBD7B74C6B46e8c44f98792A1dAf8d69154"
    const provider = new ethers.JsonRpcProvider("http://localhost:8545");
    const signer = await provider.getSigner()
    const c = new ethers.Contract(SC, abi, signer)
       // console.log(contador)
   for await (var i of [1,2,3,4,5,6,7]) {
    await c.inc({value: ethers.parseEther("1")})
 
   }
    const b = await provider.getBalance(SC);``
    console.log(b)
    console.log("contador ", await c.contador())
}

// main().then(i => getContador())
getContador()