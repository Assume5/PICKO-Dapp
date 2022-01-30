import React from 'react'
import './App.css'
import Web3 from 'web3'
import SimpleStorageContract from './contracts/SimpleStorage.json'
import { Abi } from './types/index'
import './dist/main.css'

declare var window: any;

const runExample = async () => {
  if (window.ethereum) {
    const web3 = new Web3(window.ethereum)
    await window.ethereum.enable()

    const accounts = await web3.eth.getAccounts()
    const networkId = await web3.eth.net.getId()
    const contractNetwork: any= SimpleStorageContract.networks;
    const deployedNetwork = contractNetwork[networkId]

    const contract = await new web3.eth.Contract(
      SimpleStorageContract.abi as Abi[],
      deployedNetwork && deployedNetwork.address,
    )

    // Stores a given value, 5 by default.
    await contract.methods.set(5).send({ from: accounts[0] })
    const response = await contract.methods.get().call()
    console.log(response)
  }
}

function App() {
  return (
    <div className="App">
      <button onClick={runExample}>Run Example</button>
    </div>
  )
}

export default App
