import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { Button, Form, Input, Typography, message, Card } from 'antd'
import { login } from '../api/auth'

const { Title } = Typography

const AdminLogin = () => {
  const [loading, setLoading] = useState(false)
  const navigate = useNavigate()

  const onFinish = async (values) => {
    try {
      setLoading(true)
      await login(values.username, values.password)
      message.success('Logged in successfully')
      navigate('/admin/dashboard')
    } catch (err) {
      // eslint-disable-next-line no-console
      console.error('Login failed', err)
      message.error(err?.response?.data?.message || 'Invalid credentials')
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-900">
      <Card className="w-full max-w-md shadow-xl bg-gray-800 border border-gray-700">
        <Title level={3} style={{ color: '#e5e7eb', textAlign: 'center', marginBottom: 24 }}>
          Admin Login
        </Title>
        <Form layout="vertical" onFinish={onFinish}>
          <Form.Item
            label="Username"
            name="username"
            rules={[{ required: true, message: 'Please enter your username' }]}
          >
            <Input placeholder="Enter username" />
          </Form.Item>
          <Form.Item
            label="Password"
            name="password"
            rules={[{ required: true, message: 'Please enter your password' }]}
          >
            <Input.Password placeholder="Enter password" />
          </Form.Item>
          <Form.Item>
            <Button type="primary" htmlType="submit" block loading={loading}>
              Login
            </Button>
          </Form.Item>
        </Form>
      </Card>
    </div>
  )
}

export default AdminLogin


