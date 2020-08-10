chainlink-demo
==================

**Application Flow**
<!-- - [] authorize oracle-node to oracle contract -->
<!-- - [X] check if authorization worked (bool) -->
<!-- - [] give 50 NEAR-LINK (FT) to client -->
<!-- - [X] check client's balance to confirm -->
<!-- - [] client gives oracle contract 20 NEAR-LINK (FT) allowance -->
<!-- - [X] check allowance to confirm -->
<!-- - [X] view pending requests on oracle -->
<!-- - [] tell oracle to fulfill the request -->
<!-- - [x] check client to confirm values -->
<!-- - [x] check client's balance -->
<!-- - [x] check oracle's balance -->
<!-- - [x] check root account's balance -->
<!-- - [] withdraw tokens from oracle to root account -->
<!-- - [x] check balances to confirm transaction -->

- [] make a request from frontEnd to client contract 
  - should return a nonce (this is number is the Nth request from the client contract) 
  - nonce will also have a block Id
- [] make a function that checks nonce for answer (timer)
- [] once answer is fulfilled get last block (useEffect)
  - block will have an id
- [] get all blocks in between request and answer 
  - these will include all of the transaction information
- [] iterate through blocks and return links to front page 
- [x] check oracle's allowance 
- [x] check oracle's withdrawable tokens 