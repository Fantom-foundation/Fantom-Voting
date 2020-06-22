#!/usr/bin/env node
// Fantom Voting smart contract vote testing script
const fs = require('fs');
const net = require("net");
const Web3 = require("web3");

// parse the arguments
const fileArgs = process.argv.slice(2);
if (fileArgs.length < 3) {
    console.log("\nPlease provide ballot address and voters address unlock password and the vote.\n");
    return 1;
}

// setups
const ipcPath = "/home/jirim/testnet/data/lachesis.ipc";
const voterAddress = "0x3a7952c135e7b40942e57ea01396b71bf9eb5b90";
const ballotAddress = fileArgs.shift();
const unlockPassword = fileArgs.shift();
const gasLimit = 2000000;
const abiFilePath = "../build/FantomBallot.abi";

// init the web3 provider and configure local client connection
const client = new Web3(new Web3.providers.IpcProvider(ipcPath, net));

/**
 * Deploy precompiled contract with parameters specified.
 *
 * @param {Web3} client
 * @param {string} abiFile
 * @param {string} ballotAddress
 * @param {number} vote
 * @returns {Promise<{}>}
 */
async function vote(
    client,
    abiFile,
    ballotAddress,
    vote
) {
    let abi;

    // read needed files
    try {
        // try to rad the ABI and binary data of the compiled contract
        abi = JSON.parse(fs.readFileSync(abiFile, "utf8"));
    } catch (e) {
        console.log("Error reading contract data.", e.toString());
        return e;
    }

    // unlock the sending account
    await client.eth.personal.unlockAccount(voterAddress, unlockPassword, 120);

    // prep the contract
    const contract = new client.eth.Contract(abi, ballotAddress);
    return contract.methods.vote(client.utils.toHex(vote)).send({
        from: voterAddress,
        gas: client.utils.toHex(gasLimit),
    });
}

// deploy the contract as needed
vote(
    client,
    abiFilePath,
    ballotAddress,
    parseInt(fileArgs.shift())
).then((res) => {
    // log the success
    console.log(res, "\nVoted.\n");
    return 0;
}).catch(err => {
    // log the error
    console.log("\nError happened.\n", err, "\n");
    return 1;
});
