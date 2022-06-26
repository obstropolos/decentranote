import React from "react";
import { SSX } from "@skgbafa/ssx-hackathon";

import { DefaultPublic } from "./Default";
import SetColor from "../Layout/Theme/SetColor";

export const PublicContext = React.createContext({
  publicCtx: "",
  setPublicCtx: () => {},
});

export const PublicProvider = ({ children }) => {
  let Default = FillDefaultPublic();
  // we should make an ssx provider instead
  Default.ssx = new SSX({ web3ModalOptions: { infuraId: 'a75b179c937e4d7a936cb4502f5b0a59'}, persistSessionData: false });

  const [publicCtx, setPublicCtx] = React.useState(Default);
  const value = React.useMemo(() => ({ publicCtx, setPublicCtx }), [publicCtx]);

  return (
    <PublicContext.Provider value={value}>{children}</PublicContext.Provider>
  );
};

const FillDefaultPublic = () => {
  let Default = { ...DefaultPublic };

  Default.device =
    "ontouchstart" in window || "onmsgesturechange" in window
      ? "mobile"
      : "web";

  Default.theme = {
    mode: process.env.REACT_APP_THEM_MODE,
    color: process.env.REACT_APP_THEM_COLOR,
    primary: {
      main: SetColor(
        process.env.REACT_APP_THEM_MODE,
        process.env.REACT_APP_THEM_COLOR,
        "Primary"
      ),
    },
    secondary: {
      main: SetColor(
        process.env.REACT_APP_THEM_MODE,
        process.env.REACT_APP_THEM_COLOR,
        "Secondary"
      ),
    },
  };

  Default.auth = JSON.parse(localStorage.getItem("auth")) || DefaultPublic.auth;
  Default.ssx = DefaultPublic.ssx;
  Default.documents = DefaultPublic.documents;
  Default.currentDocument = DefaultPublic.currentDocument;

  return Default;
};
