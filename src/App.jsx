import { RouterProvider } from 'react-router-dom';
import { AntdConfigProvider } from './config/antd.config.jsx';
import ThemeCustomization from './themes';
import router from './routes/index.jsx';

// project import
import ScrollTop from 'components/ScrollTop';

// ==============================|| APP - THEME, ROUTER, LOCAL ||============================== //

export default function App() {
  return (
    <ThemeCustomization>
      <AntdConfigProvider>
        <ScrollTop>
          <RouterProvider router={router} />
        </ScrollTop>
      </AntdConfigProvider>
    </ThemeCustomization>
  );
}
