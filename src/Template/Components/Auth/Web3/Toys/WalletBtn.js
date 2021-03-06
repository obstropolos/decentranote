import React from "react";
import { Button } from "@mui/material";
import { AccountBalanceWallet as AccountBalanceWalletIcon } from "@mui/icons-material";
import { LoginWallet, LogoutWallet } from "../WalletWeb3";
import { PublicContext } from "../../../../Context/Public";

export default function WalletBtn() {
  const { publicCtx, setPublicCtx } = React.useContext(PublicContext);
  const { documentPrefix } = publicCtx;
  // const ssx = new SSX({ web3ModalOptions: { infuraId: 'a75b179c937e4d7a936cb4502f5b0a59'} });
  // setPublicCtx({ ...publicCtx, ssx });
  // ssx.signIn().then((data) => {console.log(data)}).catch((e) => {console.log(e)});
  
  const walletClick = async () => {
    // let ssx;
    // if (!publicCtx.ssx) {
    //     ssx = new SSX({ web3ModalOptions: { infuraId: 'a75b179c937e4d7a936cb4502f5b0a59'}, persistSessionData: false });
    //     setPublicCtx({ ...publicCtx, ssx });
    // }
    // console.log(ssx)
    // await ssx.signIn();
    await publicCtx.ssx.connect();
    await publicCtx.ssx.connectToOrbit();
    const { ok, data } = await publicCtx.ssx.orbitList();
    if (ok) {
      console.log(data)
      const documents = data.filter((documentName) => documentName.startsWith(documentPrefix));
      setPublicCtx({
        ...publicCtx,
        documents,
      });
    }
    // let _loginLogout = publicCtx.wallet.connected
    //   ? await LogoutWallet()
    //   : await LoginWallet(publicCtx.device);

    // setPublicCtx({
    //   ...publicCtx,
    //   ssx,
    //   // wallet: _loginLogout.wallet,
    //   // alertBar: _loginLogout.alert,
    // });
  };

  return (
    <Button color="inherit" onClick={walletClick}>
      <AccountBalanceWalletIcon sx={{ mr: 1 }} />
      {publicCtx.wallet.connected ? "Logout" : "Login"}
    </Button>
  );
}
