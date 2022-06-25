![decentranote header](assets/Decentranotebanner.png)

# Decentranote
Decentranote is a basic markdown editor using Sign-In with Ethereum and ENS for user-controlled identity, Kepler for user controlled storage, and permissioned access to files.

## Additional Information

Usage Requirements: 
- Node
- An existing wallet (MetaMask or WalletConnect-compatible)

This project uses experimental packaging for both: 
- [Sign-In with Ethereum](https://github.com/spruceid/siwe): which allows users to authenticate using their Ethereum accounts.
- [Kepler](https://github.com/spruceid/kepler-sdk): which is user-controlled storage, built using `rust-ipfs`

Both of which are individually available as open source software. 

## Additional Technologies Used
- WalletConnect for establishing a wallet connection
- IPFS via [Kepler](https://github.com/spruceid/kepler) usage 
- ENS for username resolution (if available)

## To-Dos 
- Sharing functionality via capabilities-based permissioning.