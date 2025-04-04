// ==============================|| PRESET THEME - THEME SELECTOR ||============================== //

export default function Theme(colors) {
  const { grey } = colors;
  const greyColors = {
    0: grey[0],
    50: grey[1],
    100: grey[2],
    200: grey[3],
    300: grey[4],
    400: grey[5],
    500: grey[6],
    600: grey[7],
    700: grey[8],
    800: grey[9],
    900: grey[10],
    A50: grey[15],
    A100: grey[11],
    A200: grey[12],
    A400: grey[13],
    A700: grey[14],
    A800: grey[16]
  };
  const contrastText = '#fff';

  return {
    primary: {
      lighter: '#fce4f2',
      100: '#f9c9e5',
      200: '#f5d1e0',
      light: '#a80c5c',
      400: '#a80c5c',
      main: '#a80c5c',
      dark: '#a80c5c',
      700: '#a80c5c',
      darker: '#a80c5c',
      900: '#a80c5c',
      contrastText
    },
    secondary: {
      lighter: '#f5d1e0',
      100: '#f5d1e0',
      200: '#f5d1e0',
      light: '#f5d1e0',
      400: '#f5d1e0',
      main: '#f5d1e0',
      600: '#f5d1e0',
      dark: '#f5d1e0',
      800: '#f5d1e0',
      darker: '#f5d1e0',
      A100: greyColors[0],
      A200: greyColors.A400,
      A300: greyColors.A700,
      contrastText: greyColors[0]
    },
    error: {
      lighter: '#fce4f2',
      light: '#f9c9e5',
      main: '#a80c5c',
      dark: '#a80c5c',
      darker: '#a80c5c',
      contrastText
    },
    warning: {
      lighter: '#fce4f2',
      light: '#f9c9e5',
      main: '#a80c5c',
      dark: '#a80c5c',
      darker: '#a80c5c',
      contrastText: greyColors[100]
    },
    info: {
      lighter: '#fce4f2',
      light: '#f9c9e5',
      main: '#a80c5c',
      dark: '#a80c5c',
      darker: '#a80c5c',
      contrastText
    },
    success: {
      lighter: '#fce4f2',
      light: '#f9c9e5',
      main: '#a80c5c',
      dark: '#a80c5c',
      darker: '#a80c5c',
      contrastText
    },
    grey: greyColors,
    // Ant Design specific colors
    antd: {
      primary: '#a80c5c',
      link: '#a80c5c',
      success: '#a80c5c',
      warning: '#a80c5c',
      error: '#a80c5c',
      spin: '#a80c5c'
    }
  };
}
