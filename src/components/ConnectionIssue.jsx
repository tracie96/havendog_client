import React from 'react';
import { Alert, Button, Space, Typography } from 'antd';
import { ReloadOutlined, WifiOutlined } from '@ant-design/icons';

const { Text } = Typography;

/**
 * Component to display when there are connection issues
 * Particularly useful for international users with slower connections
 */
const ConnectionIssue = ({ message, onRetry }) => {
  return (
    <Alert
      type="warning"
      showIcon
      icon={<WifiOutlined />}
      message="Connection Issue"
      description={
        <Space direction="vertical">
          <Text>
            {message || 'We are having trouble connecting to our servers. This may be due to your internet connection or our servers may be temporarily unavailable.'}
          </Text>
          <Text type="secondary">
            If you are in a region with limited connectivity, you might experience longer loading times. Please try again later.
          </Text>
          <Button 
            type="primary" 
            icon={<ReloadOutlined />} 
            onClick={onRetry}
          >
            Retry Connection
          </Button>
        </Space>
      }
    />
  );
};

export default ConnectionIssue; 