import { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { Button, Form, Input, Checkbox, Upload, Typography, message, Table, Space, Modal, Progress, Tabs } from 'antd'
import { UploadOutlined, EditOutlined, InboxOutlined } from '@ant-design/icons'
import { apiClient } from '../api/client'
import { logout } from '../api/auth'

const { Title } = Typography
const { Dragger } = Upload

const AdminDashboard = () => {
  const [loading, setLoading] = useState(false)
  const [photos, setPhotos] = useState([])
  const [tableLoading, setTableLoading] = useState(false)
  const [fileList, setFileList] = useState([])
  const [editModalVisible, setEditModalVisible] = useState(false)
  const [editingPhoto, setEditingPhoto] = useState(null)
  const [editForm] = Form.useForm()
  const [editLoading, setEditLoading] = useState(false)
  
  // Bulk upload state
  const [bulkFileList, setBulkFileList] = useState([])
  const [bulkUploading, setBulkUploading] = useState(false)
  const [bulkProgress, setBulkProgress] = useState({ current: 0, total: 0, failed: 0 })
  const [bulkLocation, setBulkLocation] = useState('')
  
  const navigate = useNavigate()

  const fetchPhotos = async () => {
    try {
      setTableLoading(true)
      const res = await apiClient.get('/photos')
      setPhotos(res.data.items || [])
    } catch (err) {
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
      if (values.title) formData.append('title', values.title)
      if (values.description) formData.append('description', values.description)
      formData.append('location', values.location)
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
      console.error('Upload failed', err)
      message.error(err?.response?.data?.message || 'Upload failed')
    } finally {
      setLoading(false)
    }
  }

  // Bulk upload handler
  const handleBulkUpload = async () => {
    if (bulkFileList.length === 0) {
      message.error('Please select images to upload')
      return
    }
    if (!bulkLocation.trim()) {
      message.error('Please enter a location for bulk upload')
      return
    }

    setBulkUploading(true)
    setBulkProgress({ current: 0, total: bulkFileList.length, failed: 0 })

    let successCount = 0
    let failCount = 0

    for (let i = 0; i < bulkFileList.length; i++) {
      const file = bulkFileList[i]
      
      try {
        const formData = new FormData()
        formData.append('image', file.originFileObj)
        formData.append('location', bulkLocation.trim())
        formData.append('location', values.location)

        await apiClient.post('/admin/photos', formData, {
          headers: {
            'Content-Type': 'multipart/form-data',
          },
        })
        successCount++
      } catch (err) {
        console.error(`Failed to upload ${file.name}:`, err)
        failCount++
      }

      setBulkProgress({ current: i + 1, total: bulkFileList.length, failed: failCount })
    }

    setBulkUploading(false)
    setBulkFileList([])
    setBulkLocation('')
    
    if (failCount === 0) {
      message.success(`Successfully uploaded ${successCount} photos!`)
    } else {
      message.warning(`Uploaded ${successCount} photos, ${failCount} failed`)
    }
    
    fetchPhotos()
  }

  const handleDelete = async (id) => {
    try {
      await apiClient.delete(`/admin/photos/${id}`)
      message.success('Photo deleted')
      fetchPhotos()
    } catch (err) {
      console.error('Delete failed', err)
      message.error('Failed to delete photo')
    }
  }

  const handleEdit = (photo) => {
    setEditingPhoto(photo)
    const dateValue = photo.date ? new Date(photo.date).toISOString().split('T')[0] : ''
    const tagsValue = photo.tags && Array.isArray(photo.tags) ? photo.tags.join(', ') : ''
    
    editForm.setFieldsValue({
      title: photo.title,
      description: photo.description || '',
      location: photo.location || '',
      country: photo.country || '',
      date: dateValue,
      category: photo.category || '',
      tags: tagsValue,
      featured: photo.featured || false,
    })
    setEditModalVisible(true)
  }

  const handleEditCancel = () => {
    setEditModalVisible(false)
    setEditingPhoto(null)
    editForm.resetFields()
  }

  const handleEditSubmit = async (values) => {
    if (!editingPhoto) return

    try {
      setEditLoading(true)
      const updateData = {
        title: values.title || '',
        description: values.description || '',
        location: values.location || '',
        country: values.country || '',
        date: values.date || undefined,
        category: values.category || '',
        tags: values.tags ? values.tags.split(',').map(t => t.trim()).filter(t => t) : [],
        featured: values.featured || false,
      }

      await apiClient.put(`/admin/photos/${editingPhoto._id}`, updateData)
      message.success('Photo updated successfully')
      setEditModalVisible(false)
      setEditingPhoto(null)
      editForm.resetFields()
      fetchPhotos()
    } catch (err) {
      console.error('Update failed', err)
      message.error(err?.response?.data?.message || 'Failed to update photo')
    } finally {
      setEditLoading(false)
    }
  }

  const columns = [
    {
      title: 'Location',
      dataIndex: 'location',
      key: 'location',
    },
    {
      title: 'Country',
      dataIndex: 'country',
      key: 'country',
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
          <Button 
            type="primary" 
            size="small" 
            icon={<EditOutlined />}
            onClick={() => handleEdit(record)}
          >
            Edit
          </Button>
          <Button danger size="small" onClick={() => handleDelete(record._id)}>
            Delete
          </Button>
        </Space>
      ),
    },
  ]

  const uploadTabItems = [
    {
      key: 'single',
      label: 'Single Upload',
      children: (
        <Form layout="vertical" onFinish={onFinish}>
          <Form.Item label="Description" name="description">
            <Input.TextArea rows={3} />
          </Form.Item>
          <Form.Item
            label="Location"
            name="location"
            rules={[{ required: true, message: 'Please enter a location' }]}
          >
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
      ),
    },
    {
      key: 'bulk',
      label: 'Bulk Upload',
      children: (
        <div className="space-y-4">
          <div>
            <label className="block text-gray-300 mb-2">Location (required for all photos)</label>
            <Input
              value={bulkLocation}
              onChange={(e) => setBulkLocation(e.target.value)}
              placeholder="Enter location for all photos"
              disabled={bulkUploading}
            />
          </div>
          
          <div>
            <label className="block text-gray-300 mb-2">Select Images</label>
            <Dragger
              multiple
              fileList={bulkFileList}
              beforeUpload={() => false}
              onChange={({ fileList }) => setBulkFileList(fileList)}
              disabled={bulkUploading}
              accept="image/*"
            >
              <p className="ant-upload-drag-icon">
                <InboxOutlined />
              </p>
              <p className="ant-upload-text">Click or drag images to upload</p>
              <p className="ant-upload-hint">
                Select multiple images. They will all be uploaded with the location above.
              </p>
            </Dragger>
          </div>

          {bulkFileList.length > 0 && (
            <p className="text-gray-400">
              {bulkFileList.length} {bulkFileList.length === 1 ? 'image' : 'images'} selected
            </p>
          )}

          {bulkUploading && (
            <div className="space-y-2">
              <Progress 
                percent={Math.round((bulkProgress.current / bulkProgress.total) * 100)} 
                status={bulkProgress.failed > 0 ? 'exception' : 'active'}
              />
              <p className="text-gray-400 text-sm">
                Uploading {bulkProgress.current} of {bulkProgress.total}...
                {bulkProgress.failed > 0 && ` (${bulkProgress.failed} failed)`}
              </p>
            </div>
          )}

          <Button
            type="primary"
            onClick={handleBulkUpload}
            loading={bulkUploading}
            disabled={bulkFileList.length === 0 || !bulkLocation.trim()}
          >
            Upload {bulkFileList.length > 0 ? `${bulkFileList.length} Photos` : 'Photos'}
          </Button>
        </div>
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
              Upload Photos
            </Title>
            <Tabs items={uploadTabItems} />
          </div>

          <div className="bg-gray-800 p-4 rounded-lg border border-gray-700">
            <Title level={4} style={{ color: '#e5e7eb' }}>
              Existing Photos ({photos.length})
            </Title>
            <Table
              rowKey="_id"
              columns={columns}
              dataSource={photos}
              loading={tableLoading}
              size="small"
              pagination={{ pageSize: 10 }}
              scroll={{ x: true }}
            />
          </div>
        </div>
      </div>

      {/* Edit Photo Modal */}
      <Modal
        title="Edit Photo Details"
        open={editModalVisible}
        onCancel={handleEditCancel}
        footer={null}
        width={600}
      >
        <Form
          form={editForm}
          layout="vertical"
          onFinish={handleEditSubmit}
          className="mt-4"
        >
          <Form.Item label="Description" name="description">
            <Input.TextArea rows={3} />
          </Form.Item>
          <Form.Item
            label="Location"
            name="location"
            rules={[{ required: true, message: 'Please enter a location' }]}
          >
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
            <Input placeholder="e.g., mountain, sunrise, nature" />
          </Form.Item>
          <Form.Item name="featured" valuePropName="checked">
            <Checkbox>Featured</Checkbox>
          </Form.Item>
          {editingPhoto && (
            <div className="mb-4">
              <p className="text-gray-400 text-sm mb-2">Current Image:</p>
              <img 
                src={editingPhoto.imageUrl} 
                alt={editingPhoto.title}
                className="w-full max-w-xs h-48 object-cover rounded"
              />
              <p className="text-gray-500 text-xs mt-2">
                Note: Image cannot be changed. To change the image, delete and re-upload.
              </p>
            </div>
          )}
          <Form.Item className="mb-0">
            <Space>
              <Button type="primary" htmlType="submit" loading={editLoading}>
                Update Photo
              </Button>
              <Button onClick={handleEditCancel}>Cancel</Button>
            </Space>
          </Form.Item>
        </Form>
      </Modal>
    </div>
  )
}

export default AdminDashboard
