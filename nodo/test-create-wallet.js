const { Wallet, Mnemonic, HDNodeWallet } = require('ethers');
const fs = require("fs/promises")
const os = require("os")
const nemonic = Mnemonic.fromEntropy(new Uint8Array(32).fill(1))

const wallet = HDNodeWallet.fromMnemonic(nemonic)

const walletChid = []

for (var i of [1,2,3,4,5,6,7,8,9,10,11,12])
    walletChid.push(wallet.deriveChild(i))

async function mainModule() {
    for await (var  item of walletChid)
    {
        console.log(item.address)
        const filename = item.path.replaceAll("/","_").replaceAll("'","")
        await fs.appendFile(`./wallet.json`, (await item.encrypt("1234")) + os.EOL);
    }
    console.log("end storage")
}



mainModule()
