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

