import { ConfigProvider } from 'antd';

export const antdTheme = {
  token: {
    colorPrimary: '#a80c5c',
    colorLink: '#a80c5c',
    colorSuccess: '#a80c5c',
    colorWarning: '#a80c5c',
    colorError: '#a80c5c',
    colorInfo: '#a80c5c',
    colorTextBase: '#151515',
    colorBgBase: '#ffffff',
    borderRadius: 6,
    controlHeight: 40,
    fontFamily: "'Public Sans', sans-serif"
  },
  components: {
    Button: {
      colorPrimary: '#a80c5c',
      colorLink: '#a80c5c',
      colorSuccess: '#a80c5c',
      colorWarning: '#a80c5c',
      colorError: '#a80c5c',
      borderRadius: 6,
      controlHeight: 40
    },
    Spin: {
      colorPrimary: '#a80c5c'
    }
  }
};

export const AntdConfigProvider = ({ children }) => {
  return <ConfigProvider theme={antdTheme}>{children}</ConfigProvider>;
};
