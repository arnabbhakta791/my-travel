import { Form, Input, Button, message } from 'antd'
import { SendOutlined, MailOutlined, PhoneOutlined, EnvironmentOutlined } from '@ant-design/icons'
import TextArea from 'antd/es/input/TextArea'

const ContactSection = () => {
  const [form] = Form.useForm()

  const onFinish = (values) => {
    console.log('Form values:', values)
    message.success('Thank you for your message! I will get back to you soon.')
    form.resetFields()
  }

  const onFinishFailed = (errorInfo) => {
    console.log('Failed:', errorInfo)
    message.error('Please fill in all required fields.')
  }

  return (
    <section id="contact" className="min-h-screen py-20 px-4 sm:px-6 lg:px-8 bg-gray-900">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold mb-4 bg-gradient-to-r from-travel-blue-light via-travel-green-base to-travel-earth-light bg-clip-text text-transparent">
            Get In Touch
          </h2>
          <p className="text-gray-400 text-lg max-w-2xl mx-auto">
            Have a question or want to collaborate? I'd love to hear from you!
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          {/* Contact Information */}
          <div>
            <h3 className="text-2xl font-bold text-white mb-6">Contact Information</h3>
            <div className="space-y-6">
              <div className="flex items-start gap-4">
                <div className="bg-travel-blue-dark rounded-full p-3">
                  <MailOutlined className="text-2xl text-travel-blue-light" />
                </div>
                <div>
                  <h4 className="text-white font-semibold mb-1">Email</h4>
                  <p className="text-gray-400">traveler@example.com</p>
                </div>
              </div>

              <div className="flex items-start gap-4">
                <div className="bg-travel-green-dark rounded-full p-3">
                  <PhoneOutlined className="text-2xl text-travel-green-light" />
                </div>
                <div>
                  <h4 className="text-white font-semibold mb-1">Phone</h4>
                  <p className="text-gray-400">+1 (555) 123-4567</p>
                </div>
              </div>

              <div className="flex items-start gap-4">
                <div className="bg-travel-earth-dark rounded-full p-3">
                  <EnvironmentOutlined className="text-2xl text-travel-earth-light" />
                </div>
                <div>
                  <h4 className="text-white font-semibold mb-1">Location</h4>
                  <p className="text-gray-400">Currently exploring the world</p>
                </div>
              </div>
            </div>

            <div className="mt-12 bg-gray-800 rounded-lg p-6 border border-gray-700">
              <h4 className="text-white font-semibold mb-3">Follow My Journey</h4>
              <p className="text-gray-400 text-sm mb-4">
                Stay updated with my latest adventures and travel photography on social media.
              </p>
              <div className="flex gap-4">
                <a
                  href="https://instagram.com"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-travel-green-light hover:text-travel-green-base transition-colors"
                >
                  Instagram
                </a>
                <a
                  href="https://twitter.com"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-travel-blue-light hover:text-travel-blue-base transition-colors"
                >
                  Twitter
                </a>
                <a
                  href="https://linkedin.com"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-travel-blue-base hover:text-travel-blue-light transition-colors"
                >
                  LinkedIn
                </a>
              </div>
            </div>
          </div>

          {/* Contact Form */}
          <div className="bg-gray-800 rounded-lg p-8 border border-gray-700">
            <Form
              form={form}
              name="contact"
              layout="vertical"
              onFinish={onFinish}
              onFinishFailed={onFinishFailed}
              autoComplete="off"
            >
              <Form.Item
                label={<span className="text-gray-300">Name</span>}
                name="name"
                rules={[{ required: true, message: 'Please input your name!' }]}
              >
                <Input
                  size="large"
                  placeholder="Your name"
                  className="bg-gray-900 border-gray-700 text-white"
                />
              </Form.Item>

              <Form.Item
                label={<span className="text-gray-300">Email</span>}
                name="email"
                rules={[
                  { required: true, message: 'Please input your email!' },
                  { type: 'email', message: 'Please enter a valid email!' },
                ]}
              >
                <Input
                  size="large"
                  placeholder="your.email@example.com"
                  className="bg-gray-900 border-gray-700 text-white"
                />
              </Form.Item>

              <Form.Item
                label={<span className="text-gray-300">Subject</span>}
                name="subject"
                rules={[{ required: true, message: 'Please input a subject!' }]}
              >
                <Input
                  size="large"
                  placeholder="What's this about?"
                  className="bg-gray-900 border-gray-700 text-white"
                />
              </Form.Item>

              <Form.Item
                label={<span className="text-gray-300">Message</span>}
                name="message"
                rules={[{ required: true, message: 'Please input your message!' }]}
              >
                <TextArea
                  rows={6}
                  placeholder="Tell me what's on your mind..."
                  className="bg-gray-900 border-gray-700 text-white"
                />
              </Form.Item>

              <Form.Item>
                <Button
                  type="primary"
                  htmlType="submit"
                  size="large"
                  icon={<SendOutlined />}
                  className="w-full bg-gradient-to-r from-travel-blue-base to-travel-green-base border-none hover:from-travel-blue-light hover:to-travel-green-light h-12 font-semibold"
                >
                  Send Message
                </Button>
              </Form.Item>
            </Form>
          </div>
        </div>
      </div>
    </section>
  )
}

export default ContactSection

