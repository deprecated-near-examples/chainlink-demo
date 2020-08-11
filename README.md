chainlink-demo
==================

**Application Checklist**

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