import React from 'react'
import { Alert, Button, Card, Flex, Form, Input, Spin, Typography } from 'antd';
import { Link } from 'react-router-dom';
import useLogin from '../hooks/useLogin';
import loginImg from '../assets/signup5.jpg';

const Login = () => {
  const {error, loading, loginUser} = useLogin();
  const handleLogin = async (values) => {
    await loginUser(values);
  };
  return (
    <Card className="form-container">
    <Flex gap="large" align='center'>
{/* Image */}
<Flex flex={1}>
        <img src={loginImg} className='auth-image' />
      </Flex>
{/* form */}
      <Flex vertical flex={1}>
        
        <Typography.Title level={3} strong className="title">
        Sign In
        </Typography.Title>

        <Typography.Text type="secondary" strong className="slogan">
        Welcome to Library Drive Thru!
        </Typography.Text>

       <Form layout="vertical" onFinish={handleLogin} autoComplete="off">

{/* email */}
        <Form.Item 
          label="Email" 
          name="email" 
          rules={[
            {
              required: true, 
              message: 'please input your Email!',
            },
            {
              type: 'email',
              message: 'email is not valid',
            },
          ]}
        >
          <Input size="large" placeholder="Enter your email" />
        </Form.Item>

{/* password */}
        <Form.Item 
          label="Password" 
          name="password" 
          rules={[
            {
              required: true, 
              message: 'please input your password!',
            },
          ]}
        >
          <Input.Password size="large" placeholder="Enter your Password" />
        </Form.Item>

{error && (
<Alert 
description={error} 
type='error' 
showIcon 
closable 
className='alert' 
/>
)}

{/* btn create account */}
        <Form.Item>
          <Button 
          type={`${loading ? '' : 'primary'}`}
          htmlType="submit" 
          size="large" 
          className="btn"
          >
          
          {loading ? <Spin /> : 'Sign In'}
          
          </Button>
        </Form.Item>
        <Form.Item>

{/* btn signup */}
          <Link to="/register">
          <Button 
          size="large" 
          className="btn">
            Create Account
          </Button>
          </Link>
        </Form.Item>
       </Form>
      </Flex>

      {/* Image */}
      <Flex flex={1}>
        {/* <img src={loginImg} className='auth-image' /> */}
      </Flex>
    </Flex>
  </Card>
  )
};

export default Login