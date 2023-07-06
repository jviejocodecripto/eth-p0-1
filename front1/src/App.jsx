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
  return (
    <h1>LA CUENTA ES: {address}</h1>
  )
}

export default App
