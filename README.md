# NEAR <> Chainlink Oracle Demo

A simple front-end dApp demonstrating how smart contracts on NEAR can access off-chain data using [Chainlink Oracles](https://chain.link/).

- This example allows users to search for and retrieve a token's current market price in USD. 

On initial page load, the application auto-connects to the NEAR blockchain using built in access keys configured by the dApp developer. When a search is performed, the application interacts with a `client` smart contract (already deployed on NEAR) by placing a contract call that invokes the `get_token_price` method within `client`. This triggers the following chain of events:

1) `Client Contract` makes a call to the ***on-chain*** `Oracle Contract`
2) ***on-chain*** `Oracle Contract` makes a request to ***off-chain*** `Oracle-Node` (Chainlink)
3) Chainlink `Oracle-Node` makes a request to an API
4) API responds with the token price to the Chainlink `Oracle-Node` 
5) Chainlink `Oracle-Node` passes API response to the ***on-Chain*** `Oracle contract`
6) ***on-chain*** `Oracle Contract` fulfills the original `Client Contract` request with the API result. 

![Chainlink and NEAR diagram](src/assets/chainlink-diagram.png)

Both the `client` and ***on-chain*** `oracle` contracts were created & deployed on the NEAR network using a walk-through from [this repository](https://github.com/smartcontractkit/near-protocol-contracts) which can also provide a deeper look into the inner workings of the above steps.

We welcome community feedback & bug reporting so please let us know of any suggestions or issues you may have!