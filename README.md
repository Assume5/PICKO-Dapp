# PICKO Dapp

## Requirement
##### Truffle
##### MetaMask
##### Ganache
##### Node version >= 14.18
##### MySQL

## Installation
##### Truffle: Run command ```npm install -g truffle```
##### Metamask: Download in [Metamask Official Site](https://metamask.io/download/)
##### Ganache: Download in [Ganache Official Site](https://trufflesuite.com/ganache/)
##### Node: Download in [Node.js Official Site](https://nodejs.org/en/)
##### MySQL: Download in [MySQL Official Site](https://dev.mysql.com/downloads/windows/installer/8.0.html). Make sure you download the installer itself (not web base installer).

## Using Ganache and Metamask
##### Open Ganache and click NEW WORKSPACE.
    WORKSPACE NAME: PICKO
##### Below the tool, copy MNEMONIC
##### Open Metamask chrome extension and add new network
    Network Name: Localhost 7545
    New RPC URL: http://localhost:7545
    Chain ID: 1337
### After new network is added, you may import account click import using MNEMONIC or PRIVATE KEY
### Using PRIVATE KEY
##### Open Ganache and click show key(key icon on the right of addresses). Copy PRIVATE KEY.
##### Click on the account icon on top right, then click import account and paste your private key.
### Using MNEMONIC
##### Open Ganache and click PICKO workspace. Below the tools copy your MNEMONIC.
##### Open Metamask, lock your account, and use Localhost 7545 network
##### Click import using Secret Recovery Phrase 
    Wallet Secret Recovery Phrase: Paste your MNEMONIC here
    Add a password then click restore.


## Using the App
### Dapp
##### Running the developer console
    truffle develop
##### Compile and migrate the smart contracts inside the developer console.
    compile
    migrate
##### Testing Solidity
    // inside the development console.
    test

    // outside the development console..
    truffle test

##### Starting the server
    npm install
    npm start
### Client
##### We are using React typescript for client side. Smart contract changes must be manually recompile and migrated.
    cd client
    npm install
    npm run start


