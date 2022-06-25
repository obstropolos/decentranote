import React from "react";
import { ListItemIcon, Stack, Divider } from "@mui/material";
import {
  Copyright as CopyrightIcon,
} from "@mui/icons-material";

export default function Footer() {
  return (
    <>
      <Stack
        position="fixed"
        sx={{
          top: "auto",
          bottom: 0,
          left: 0,
          width: 240,
          paddingBottom: "10px",
          textAlign: "center",
          fontSize: "12px",
          backgroundColor: "palette.primary",
        }}
      >
        <Divider flexItem />
        <Stack
          direction="row"
          justifyContent="space-around"
          alignItems="center"
          sx={{
            paddingTop: "20px",
            paddingBottom: "15px",
          }}
        >
        </Stack>
        <Stack
          direction="row"
          justifyContent="center"
          alignItems="center"
          sx={{ color: "text.primary" }}
        >
          <CopyrightIcon sx={{ mr: 0.3, fontSize: 14 }} />
          {process.env.REACT_APP_COPY_RIGHT_YEAR}{" "}
          {process.env.REACT_APP_COMPANY_NAME}
        </Stack>
      </Stack>
    </>
  );
}
