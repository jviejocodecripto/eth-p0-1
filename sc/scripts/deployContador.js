// We require the Hardhat Runtime Environment explicitly here. This is optional
// but useful for running the script in a standalone fashion through `node <script>`.
//
// You can also run a script with `npx hardhat run <script>`. If you do that, Hardhat
// will compile your contracts, add the Hardhat Runtime Environment's members to the
// global scope, and execute the script.
const hre = require("hardhat");
const ethers = require("ethers")

async function main() {


  const contador = await hre.ethers.deployContract("Contador", [], {
    
  });


  await contador.waitForDeployment();

  for await (var i of [1,2,3,4,5,5,1,2,3,4]) {
    console.log("inc " , await contador.inc({value: ethers.parseEther("1")}))

  }

 
  console.log("contador 111 " , await contador.getContador())
  console.log("contador 222" , await contador.contador())

  console.log(
     `contador  deployed to ${contador.target}`
  );
}

// We recommend this pattern to be able to use async/await everywhere
// and properly handle errors.
main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
