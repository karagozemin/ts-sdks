---
'@mysten/enoki': minor
---

Split the `enoki:getMetadata` feature into `enoki:getWalletMetadata` and `enoki:getSession`. `getWalletMetadata` now only returns the wallet provider, while `getEnokiSession` returns the session data.
