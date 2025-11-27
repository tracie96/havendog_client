import { Link } from 'react-router-dom';
import { Layout, Typography, Space } from 'antd';

// project import
import AuthWrapper from './AuthWrapper';
import AdminRegister from './auth-forms/AdminRegister';

const { Title, Text } = Typography;

// ================================|| ADMIN REGISTER ||================================ //

export default function AdminRegisterPage() {
  return (
    <AuthWrapper>
      <Layout.Content style={{ maxWidth: '100%', width: '100%', margin: '0 auto', padding: '0 16px' }}>
        <Space direction="vertical" size="large" style={{ width: '100%' }}>
          <Space direction="horizontal" justify="space-between" align="baseline" style={{ width: '100%' }}>
            <Title level={2}>Create Admin Account</Title>
            <Link to="/admin/login" style={{ textDecoration: 'none', color: '#FF0080' }}>
              <Text>Already have an admin account?</Text>
            </Link>
          </Space>
          <AdminRegister />
          <Space direction="horizontal" justify="center" style={{ width: '100%' }}>
            <Link to="/login" style={{ textDecoration: 'none', color: '#666' }}>
              <Text type="secondary">Regular User Login</Text>
            </Link>
          </Space>
        </Space>
      </Layout.Content>
    </AuthWrapper>
  );
}

