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
