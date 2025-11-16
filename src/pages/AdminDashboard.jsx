import { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { Button, Form, Input, Checkbox, Upload, Typography, message, Table, Space } from 'antd'
import { UploadOutlined } from '@ant-design/icons'
import { apiClient } from '../api/client'
import { logout } from '../api/auth'

const { Title } = Typography

const AdminDashboard = () => {
  const [loading, setLoading] = useState(false)
  const [photos, setPhotos] = useState([])
  const [tableLoading, setTableLoading] = useState(false)
  const [fileList, setFileList] = useState([])
  const navigate = useNavigate()

  const fetchPhotos = async () => {
    try {
      setTableLoading(true)
      const res = await apiClient.get('/photos')
      setPhotos(res.data.items || [])
    } catch (err) {
      // eslint-disable-next-line no-console
      console.error('Fetch photos failed', err)
      message.error('Failed to load photos')
    } finally {
      setTableLoading(false)
    }
  }

  useEffect(() => {
    fetchPhotos()
  }, [])

  const handleLogout = () => {
    logout()
    navigate('/admin/login')
  }

  const onFinish = async (values) => {
    if (fileList.length === 0) {
      message.error('Please upload an image')
      return
    }

    try {
      setLoading(true)
      const formData = new FormData()
      formData.append('image', fileList[0].originFileObj)
      formData.append('title', values.title)
      if (values.description) formData.append('description', values.description)
      if (values.location) formData.append('location', values.location)
      if (values.country) formData.append('country', values.country)
      if (values.date) formData.append('date', values.date)
      if (values.category) formData.append('category', values.category)
      if (values.tags) formData.append('tags', values.tags)
      if (values.featured) formData.append('featured', 'true')

      await apiClient.post('/admin/photos', formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      })

      message.success('Photo uploaded successfully')
      setFileList([])
      fetchPhotos()
    } catch (err) {
      // eslint-disable-next-line no-console
      console.error('Upload failed', err)
      message.error(err?.response?.data?.message || 'Upload failed')
    } finally {
      setLoading(false)
    }
  }

  const handleDelete = async (id) => {
    try {
      await apiClient.delete(`/admin/photos/${id}`)
      message.success('Photo deleted')
      fetchPhotos()
    } catch (err) {
      // eslint-disable-next-line no-console
      console.error('Delete failed', err)
      message.error('Failed to delete photo')
    }
  }

  const columns = [
    {
      title: 'Title',
      dataIndex: 'title',
      key: 'title',
    },
    {
      title: 'Country',
      dataIndex: 'country',
      key: 'country',
    },
    {
      title: 'Category',
      dataIndex: 'category',
      key: 'category',
    },
    {
      title: 'Featured',
      dataIndex: 'featured',
      key: 'featured',
      render: (val) => (val ? 'Yes' : 'No'),
    },
    {
      title: 'Actions',
      key: 'actions',
      render: (_, record) => (
        <Space>
          <Button danger size="small" onClick={() => handleDelete(record._id)}>
            Delete
          </Button>
        </Space>
      ),
    },
  ]

  return (
    <div className="min-h-screen bg-gray-900 text-gray-100 p-6">
      <div className="max-w-6xl mx-auto">
        <div className="flex items-center justify-between mb-6">
          <Title level={3} style={{ color: '#e5e7eb', margin: 0 }}>
            Admin Dashboard
          </Title>
          <Button onClick={handleLogout}>Logout</Button>
        </div>

        <div className="grid gap-6 md:grid-cols-2">
          <div className="bg-gray-800 p-4 rounded-lg border border-gray-700">
            <Title level={4} style={{ color: '#e5e7eb' }}>
              Upload New Photo
            </Title>
            <Form layout="vertical" onFinish={onFinish}>
              <Form.Item
                label="Title"
                name="title"
                rules={[{ required: true, message: 'Please enter a title' }]}
              >
                <Input />
              </Form.Item>
              <Form.Item label="Description" name="description">
                <Input.TextArea rows={3} />
              </Form.Item>
              <Form.Item label="Location" name="location">
                <Input />
              </Form.Item>
              <Form.Item label="Country" name="country">
                <Input />
              </Form.Item>
              <Form.Item label="Date" name="date">
                <Input type="date" />
              </Form.Item>
              <Form.Item label="Category" name="category">
                <Input />
              </Form.Item>
              <Form.Item label="Tags (comma separated)" name="tags">
                <Input />
              </Form.Item>
              <Form.Item name="featured" valuePropName="checked">
                <Checkbox>Featured</Checkbox>
              </Form.Item>
              <Form.Item label="Image">
                <Upload
                  fileList={fileList}
                  beforeUpload={() => false}
                  onRemove={() => setFileList([])}
                  onChange={({ fileList: newList }) => setFileList(newList.slice(-1))}
                  maxCount={1}
                >
                  <Button icon={<UploadOutlined />}>Select Image</Button>
                </Upload>
              </Form.Item>
              <Form.Item>
                <Button type="primary" htmlType="submit" loading={loading}>
                  Upload
                </Button>
              </Form.Item>
            </Form>
          </div>

          <div className="bg-gray-800 p-4 rounded-lg border border-gray-700">
            <Title level={4} style={{ color: '#e5e7eb' }}>
              Existing Photos
            </Title>
            <Table
              rowKey="_id"
              columns={columns}
              dataSource={photos}
              loading={tableLoading}
              size="small"
              pagination={false}
            />
          </div>
        </div>
      </div>
    </div>
  )
}

export default AdminDashboard


