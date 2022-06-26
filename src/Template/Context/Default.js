const markdown = `A paragraph with *emphasis* and **strong importance**.

> A block quote with ~strikethrough~ and a URL: https://reactjs.org.

* Lists
* [ ] todo
* [x] done

A table:

| a | b |
| - | - |
`

export const DefaultPublic = {
  device: "web",
  theme: {
    mode: "light",
    color: "blue",
    primary: { main: "#00bcd4" },
    secondary: { main: "#00bcd4" },
  },
  wallet: {
    connected: false,
    library: null,
    network: null,
    networkId: 0,
    account: "0x",
    chainId: 0,
    balance: {
      eth: 0,
      wei: 0,
    },
    gasLimit: "30000000",
  },
  auth: {
    connected: false,
    user: "",
    token: "",
    refreshToken: "",
  },
  alertBar: {
    open: false,
    message: "",
    severity: "info",
  },
  documents: [],
  currentDocument: markdown,
  currentKey: "default",
  documentPrefix: "md/",
  ssx: null
};
