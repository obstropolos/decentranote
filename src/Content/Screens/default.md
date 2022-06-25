# SSX SDK

SSX is a set of tools for building and integrating user management tools in web3 dapps.

- Zero configuration required, but highly customizable
- 

## Quick Start
You can add SSX to your dapp using your favorite package manager.

```bash
yarn add ssx-sdk
```
and then you can use it in your dapp.

```js
import { SSX } from 'ssx-sdk';

const buttonHandler = async () => {
    const ssx = new SSX({ web3ModalOptions: { infuraId: 'a75b179c937e4d7a936cb4502f5b0a59'} });
    await ssx.signIn();
    const { address } = await ssx.accountData();
};
```

## Documentation

For full documentation, see the [SSX SDK Docs](modules.md)

