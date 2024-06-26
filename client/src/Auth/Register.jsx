import React from 'react';
import { Alert, Button, Card, Flex, Form, Input, Spin, Typography } from 'antd';
import { Link } from 'react-router-dom';
import registerImg from '../assets/signup5.jpg';
import useSignup from '../hooks/useSignup';

const Register = () => {
  const{ loading, error, registerUser } = useSignup();
  const handleRegister = (values) => {
    registerUser(values);
  };

  return ( 
  <Card className="form-container">
    <Flex gap="large" align='center'>
      {/* form */}
      <Flex vertical flex={1}>
        
        <Typography.Title level={3} strong className="title">
        Create an account
        </Typography.Title>

        <Typography.Text type="secondary" strong className="slogan">
        Join for library access!
        </Typography.Text>

       <Form layout="vertical" onFinish={handleRegister} autoComplete="off">
{/* full name */}
        <Form.Item 
          label="Full Name" 
          name="name" 
          rules={[
            {
              required: true, 
              message: 'please input your full name!',
            },
          ]}
        >
          <Input size="large" placeholder="Enter your Full name" />
        </Form.Item>
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
{/* confirm password */}
        <Form.Item 
          label="Confirm Password" 
          name="passwordConfirm" 
          rules={[
            {
              required: true, 
              message: 'please input your confirm password!',
            },
          ]}
        >
          <Input.Password size="large" placeholder="Re-enter your Password" />
        </Form.Item>

{/* error alert */}
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
          className="btn">
          {loading ? <Spin /> : 'Create Account'}
          
          </Button>
        </Form.Item>
        <Form.Item>
{/* btn sign in */}
          <Link to="/login">
          <Button size="large" className="btn">Sign In</Button>
          </Link>
        </Form.Item>
       </Form>
      </Flex>

      {/* Image */}
      <Flex flex={1}>
        <img src={registerImg} className='auth-image' />
      </Flex>
    </Flex>
  </Card>
  );
};

export default Register;