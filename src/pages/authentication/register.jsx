import { Link } from 'react-router-dom';
import { Layout, Typography, Space } from 'antd';

// project import
import AuthWrapper from './AuthWrapper';
import AuthRegister from './auth-forms/AuthRegister';

const { Title, Text } = Typography;

// ================================|| REGISTER ||================================ //

export default function Register() {
  return (
    <AuthWrapper>
      <Layout.Content style={{ maxWidth: '100%', width: '100%', margin: '0 auto', padding: '0 16px' }}>
        <Space direction="vertical" size="large" style={{ width: '100%' }}>
          <Space direction="horizontal" justify="space-between" align="baseline" style={{ width: '100%' }}>
            <Title level={2}>Sign up</Title>
            <Link to="/login" style={{ textDecoration: 'none', color: '#FF0080' }}>
              <Text>Already have an account?</Text>
            </Link>
          </Space>
          <AuthRegister />
        </Space>
      </Layout.Content>
    </AuthWrapper>
  );
}
