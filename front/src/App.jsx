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
