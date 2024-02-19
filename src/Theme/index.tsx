import { createTheme } from "@mui/material/styles";

const theme = createTheme({
  typography: {
    fontFamily: [
      "NanumSquareNeo-Lt",
      "NanumSquareNeo-Rg",
      "NanumSquareNeo-Bd",
      "NanumSquareNeo-Eb",
      "sans-serif",
    ].join(","),
  },
  components: {
    MuiCssBaseline: {
      styleOverrides: `
        @font-face {
          font-family: 'NanumSquareNeo-Lt';
          src: local('NanumSquareNeo-Lt'), url('/fonts/NanumSquareNeoTTF-aLt.woff') format('woff');
        }
        @font-face {
          font-family: 'NanumSquareNeo-Rg';
          src: local('NanumSquareNeo-Rg'), url('/fonts/NanumSquareNeoTTF-bRg.woff') format('woff');
        }
      `,
    },
  },
});

export default theme;
