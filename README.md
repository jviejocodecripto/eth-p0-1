# Ejemplo de genesis.json
```json
{
    "config": {
        "chainId": 3333,
        "homesteadBlock": 0,
        "eip150Block": 0,
        "eip150Hash": "0x0000000000000000000000000000000000000000000000000000000000000000",
        "eip155Block": 0,
        "eip158Block": 0,
        "byzantiumBlock": 0,
        "constantinopleBlock": 0,
        "petersburgBlock": 0,
        "istanbulBlock": 0,
        "clique": {
            "period": 0,
            "epoch": 30000
        }
    },
    "nonce": "0x0",
    "timestamp": "0x632f67d7",
    "extraData": "0x00000000000000000000000000000000000000000000000000000000000000006f4094b7455e9df89022a2add93d979b56be11040000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000",
    "gasLimit": "0x47b760",
    "difficulty": "0x1",
    "mixHash": "0x0000000000000000000000000000000000000000000000000000000000000000",
    "coinbase": "0x0000000000000000000000000000000000000000",
    "alloc": {
        "6f4094b7455e9df89022a2add93d979b56be1104": {
            "balance": "0x200000000000000000000000000000000000000000000000000000000000000"
        },
        "0x603f42e15F6518aE60246026564a19E9837F3D8e": {
            "balance": "0x200000000000000000000000000000000000000000000000000000000000000"
        },
        "0x33922D431E9289Bb6fD07EA1e40CD2D1AB14130a": {
            "balance": "0x200000000000000000000000000000000000000000000000000000000000000"
        },
        "0x23075ae29DD791D8a28af28e2BC978F61c9D6773": {
            "balance": "0x200000000000000000000000000000000000000000000000000000000000000"
        }
    },
    "number": "0x0",
    "gasUsed": "0x0",
    "parentHash": "0x0000000000000000000000000000000000000000000000000000000000000000",
    "baseFeePerGas": null
}
```
# Creacion del nodo con docker
```
docker run \
     --rm \
     -v ${PWD}:/data ethereum/client-go account \
     new --password /data/password.txt --datadir /data/data

docker run \
   --rm \
   -v ${PWD}/data:/data \
   -v ${PWD}/genesis.json:/genesis.json \
   ethereum/client-go init \
   --datadir /data /genesis.json


Cambiar las address de unlock y miner.etherbase

docker run  -p 8545:8545 \
    --rm \
    -d \
    --name eth-node1 \
    -v ${PWD}/data:/data \
    -v ${PWD}/password.txt:/password.txt \
    ethereum/client-go \
    --nodiscover  \
    --allow-insecure-unlock \
    --datadir /data \
    --http \
    --http.api personal,admin,eth,net,web3 \
    --http.addr 0.0.0.0 \
    --http.port 8545 \
    --http.corsdomain="*" \
    --unlock 6f4094b7455e9df89022a2add93d979b56be1104 \
    --password /password.txt   \
    --mine \
    --miner.etherbase 6f4094b7455e9df89022a2add93d979b56be1104





```    
# Smart contract
```solidity
// SPDX-License-Identifier: UNLICENSED
pragma solidity >= 0.4.22 <0.9.0;

contract Contador {
    uint256 public contador;

    constructor() {
        contador = 100;
    }

    function inc() public  {
        contador = contador + 1;
    }

    function dec() public  {
        contador = contador - 1;
    }

}

```
# Compilar con la version 0.8.18
```
npx solc@0.8.18 -o out --bin --abi contador.sol
```
# Deploy contrato
```js
const {  ethers, JsonRpcProvider } = require('ethers');
const fs = require("fs");
// conexion al nodo desde nodejs
let httpProvider = new JsonRpcProvider("http://localhost:8545")
// lectura de los resultados de la compilacion
contractByteCode = fs.readFileSync('./out/contador_sol_Contador.bin').toString();
contractAbi = JSON.parse(fs.readFileSync('./out/contador_sol_Contador.abi').toString());
// wallet con una clave creada en el genesis
const jsonWallet = `{"address":"6f4094b7455e9df89022a2add93d979b56be1104","crypto":{"cipher":"aes-128-ctr","ciphertext":"0189cfecab7004c2a984939cfd368a608ab2c59d9e216fb2bb1bb444d4af5d37","cipherparams":{"iv":"61bd7f7a96bde58af66f5ab32bdbd35f"},"kdf":"scrypt","kdfparams":{"dklen":32,"n":262144,"p":1,"r":8,"salt":"9fe87a19d813c41aa66562c235331e323a6c873a0e38c67d6fe702da20562524"},"mac":"5522976e3309e8e2d9309aa4defb2336c5506c5d84aeb6399e70081728db6f73"},"id":"294f7140-487b-485f-9c03-7d426dd47d52","version":3}`


async function main() {
    // crear una wallet con la clave privada y la pwd
    let wallet = await ethers.Wallet.fromEncryptedJson(jsonWallet, "123456")
    wallet = wallet.connect(httpProvider)
    // crear el contrato
    const factory = await new ethers.ContractFactory(contractAbi, contractByteCode, wallet)
    // hacer el deploy
    let contract = await factory.deploy();  
    await contract.waitForDeployment()
    const addressContract = await contract.getAddress()
    fs.writeFileSync("./smartContractAddress.txt", addressContract)
    console.log(addressContract);    
}
main()


```

# Exec de metodos del contrato
```js
const {  ethers, JsonRpcProvider } = require('ethers');
const fs = require("fs");
// conexion al nodo desde nodejs
let httpProvider = new JsonRpcProvider("http://localhost:8545")
// lectura de los resultados de la compilacion
contractByteCode = fs.readFileSync('./out/contador_sol_Contador.bin').toString();
contractAbi = JSON.parse(fs.readFileSync('./out/contador_sol_Contador.abi').toString());
// wallet con una clave creada en el genesis
const jsonWallet = `{"address":"6f4094b7455e9df89022a2add93d979b56be1104","crypto":{"cipher":"aes-128-ctr","ciphertext":"0189cfecab7004c2a984939cfd368a608ab2c59d9e216fb2bb1bb444d4af5d37","cipherparams":{"iv":"61bd7f7a96bde58af66f5ab32bdbd35f"},"kdf":"scrypt","kdfparams":{"dklen":32,"n":262144,"p":1,"r":8,"salt":"9fe87a19d813c41aa66562c235331e323a6c873a0e38c67d6fe702da20562524"},"mac":"5522976e3309e8e2d9309aa4defb2336c5506c5d84aeb6399e70081728db6f73"},"id":"294f7140-487b-485f-9c03-7d426dd47d52","version":3}`


async function main() {
    // crear una wallet con la clave privada y la pwd
    let wallet = await ethers.Wallet.fromEncryptedJson(jsonWallet, "123456")
    wallet = wallet.connect(httpProvider)
    // crear el contrato
    const c = fs.readFileSync("smartContractAddress.txt").toString()
    const contract = new ethers.Contract(c, contractAbi, wallet);
    
    let tx = await contract.inc()
    console.log(tx.nonce)
    tx = await contract.inc({
        nonce:tx.nonce+1
    })
    console.log(await contract.contador())
}
main()


```
# Uso de metamask desde React
```js
import { useEffect, useState } from 'react'
import './App.css'

const ethereum = window.ethereum;
function App() {
  const [address, setAddress] = useState(null)
  useEffect(() => {
    ethereum.on("accountsChanged", addresses => {
      setAddress(addresses[0])
    })
    ethereum.request({
      method: "eth_requestAccounts",
    }).then(addresses => {
      setAddress(addresses[0])
    })
  }, [])
  useEffect(( ) =>{
        
  },[])

  return (
    <h1>LA CUENTA ES: {address}</h1>
    <p>El contador vale  {}</p>
  )
}

export default App

```
# Invocacion del smart contract desde react
```js
import { useEffect, useState } from 'react'
import { ethers, JsonRpcProvider } from 'ethers'
import './App.css'

const ABI = `
[{"inputs":[],"stateMutability":"nonpayable","type":"constructor"},{"inputs":[],"name":"contador","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"dec","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[],"name":"inc","outputs":[],"stateMutability":"nonpayable","type":"function"}]
`
const SC = "0x8ED2987b3d9DC513A7114Ab8142358d5fdAe1542"
let httpProvider = new JsonRpcProvider("http://localhost:8545")
const ethereum = window.ethereum;
function App() {
  const [address, setAddress] = useState(null)
  const [contador, setContador] = useState(null)
  const [tx, setTx] = useState(null)

  useEffect(() => {
    const contract = new ethers.Contract(SC, ABI, httpProvider);
    contract.contador().then(r => {
      console.log("exec", r)
      setContador(r.toString());
    })
  }, [address])

  useEffect(() => {
    ethereum.on("accountsChanged", addresses => {
      setAddress(addresses[0])
    })
    ethereum.request({
      method: "eth_requestAccounts",
    }).then(addresses => {
      setAddress(addresses[0])
    })
  }, [])
  async function op(valor) {
    const provider = new ethers.BrowserProvider(window.ethereum);
    const signer = await provider.getSigner();
    // console.log("Account:", await signer.getAddress());
    const contract = new ethers.Contract(SC, ABI, signer);
    let tx = null
    if (valor == 1) {
      tx = await contract.inc()
    } else {
      tx = await contract.dec()
    }
    const receipt = await tx.wait();
   
    setTx(JSON.stringify({tx, receipt}, null, 4))
    
    const c = await contract.contador()
    console.log("nuevo contador ", c)
    setContador(c.toString())
  }
  return (
    <div>
      <h3>LA CUENTA ES: {address}</h3>
      <p>Contador: {contador}</p>
      <pre>{tx}</pre>
      <button onClick={() => op(1)}>Incrementar</button>
      <button onClick={() => op(-1)}>Decrementar</button>
    </div>
  )
}

export default App

```