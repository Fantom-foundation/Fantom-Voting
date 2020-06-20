# Fantom Voting

The application implements Solidity smart contract and backend 
account full total Oracle for Fantom Opera network simple voting.

A deployed smart contract collects votes. The question, 
voting options, and date range of the voting are predefined at the contract
deployment. The backend service keeps track of the active voting
contracts and feeds the voting with participants' total account balance 
at the vote finalization. 

The winning vote option is the one with the highest amount of total tokens
of the participants voting for that options.

## Contract compilation

1. Install appropriate [Solidity](https://solidity.readthedocs.io) compiler. 
    The contract expects Solidity version to be from the branch 0.5.0. The latest available Solidity 
    compiler of this branch is the [Solidity Version 0.5.17](https://github.com/ethereum/solidity/releases/tag/v0.5.17).
2. Compile the contract for deployment.
    
    `solc -o ./build --optimize --optimize-runs=200 --abi --bin ./contract/FantomBallot.sol`
    
3. Deploy compiled binary file `./build/FantomBallot.bin` into the blockchain.

4. Use generated ABI file `./build/FantomBallot.abi` to interact with the contract.
