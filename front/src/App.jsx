import { useEffect, useState } from 'react'
import './App.css'
import { ethers, parseEther } from "ethers";
import artifact from "../../sc/artifacts/contracts/Contador.sol/Contador.json"


const ethereum = (window).ethereum;

function App() {
  const [address, setAddress] = useState(null)
  const [sc, setSC] = useState(null)
  const [balance, setBalance] = useState(0)

  const SC = "0xB7f8BC63BbcaD18155201308C8f3540b07f84F5e"
  const provider = new ethers.BrowserProvider(window.ethereum);

  useEffect(()=>{
    const accounts = ethereum.request({
      method: "eth_requestAccounts",
    }).then(cuentas =>{
      setCuenta(cuentas[0])
      window.ethereum.on("accountsChanged", (account) => {
        console.log("cambiado")
        setCuenta(account[0])
      })

    })
  },[])

  useEffect(() => {
    const accounts = ethereum.request({
      method: "eth_requestAccounts",
    }).then(async result => {
      setAddress(result[0])
      const signer = await provider.getSigner();
      const sc = new ethers.Contract(SC, artifact.abi, signer)
      setSC(sc)
      setBalance((await sc.contador()).toString())
    });
  }
    , [])

    async function updateBalance(fn) {
      const tx = await fn()
      await tx.wait()
      const balance1 = await sc.contador();
      setBalance((await sc.contador()).toString())
    }


    async function inc() {
      await updateBalance(async () => await sc.inc({value: parseEther("1")}))
    }

    async function dec() {
      await updateBalance(async () => await sc.dec({value: parseEther("1")}))
    }
    
  return (
    <>

      <p>SMART CONTRACT {SC}</p>
      {address && <p>DIRECCION METAMASK {address}</p>}
      <button onClick={() => inc()}>INC</button>
       <span>{balance}</span>
      <button onClick={() => dec()}>DEC</button>
    </>
  )
}

export default App
