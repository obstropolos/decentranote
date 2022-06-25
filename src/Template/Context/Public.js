import React from "react";

import { DefaultPublic } from "./Default";
import SetColor from "../Layout/Theme/SetColor";

export const PublicContext = React.createContext({
  publicCtx: "",
  setPublicCtx: () => {},
});

export const PublicProvider = ({ children }) => {
  let Default = FillDefaulePublic();
  const [publicCtx, setPublicCtx] = React.useState(Default);
  const value = React.useMemo(() => ({ publicCtx, setPublicCtx }), [publicCtx]);

  return (
    <PublicContext.Provider value={value}>{children}</PublicContext.Provider>
  );
};

const FillDefaulePublic = () => {
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

  return Default;
};
