import { blue,} from "@mui/material/colors";

export const Colors = Object.freeze({
  Primary: {
    PURPLE: { LIGHT: blue[100], DARK: blue[200] },
  },
  Secondary: {
    PURPLE: { LIGHT: blue[100], DARK: blue[200] },
  },
});

export const Colors_Secondary = Object.freeze();

export default function SetColor(mode, color, type) {
  return Colors[type][color][mode];
}
