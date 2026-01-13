import { motion } from 'framer-motion'
import { Form, Input, Button, message } from 'antd'
import { SendOutlined, MailOutlined, PhoneOutlined, EnvironmentOutlined } from '@ant-design/icons'
import TextArea from 'antd/es/input/TextArea'

const ContactPage = () => {
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

  const sectionVariants = {
    hidden: { opacity: 0, y: 40 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.6, ease: 'easeOut' },
    },
  }

  const contactInfo = [
    {
      icon: <MailOutlined className="text-2xl text-travel-blue-light" />,
      bgColor: 'bg-travel-blue-dark',
      title: 'Email',
      value: 'traveler@example.com',
    },
    {
      icon: <PhoneOutlined className="text-2xl text-travel-green-light" />,
      bgColor: 'bg-travel-green-dark',
      title: 'Phone',
      value: '+1 (555) 123-4567',
    },
    {
      icon: <EnvironmentOutlined className="text-2xl text-travel-earth-light" />,
      bgColor: 'bg-travel-earth-dark',
      title: 'Location',
      value: 'Currently exploring the world',
    },
  ]

  return (
    <div className="min-h-screen py-20 px-4 sm:px-6 lg:px-8 bg-gray-900">
      <div className="max-w-7xl mx-auto">
        <motion.div
          className="text-center mb-16"
          initial="hidden"
          animate="visible"
          variants={sectionVariants}
        >
          <h1 className="text-4xl md:text-5xl font-bold mb-4 bg-gradient-to-r from-travel-blue-light via-travel-green-base to-travel-earth-light bg-clip-text text-transparent">
            Get In Touch
          </h1>
          <p className="text-gray-400 text-lg max-w-2xl mx-auto">
            Have a question or want to collaborate? I'd love to hear from you!
          </p>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          {/* Contact Information */}
          <motion.div
            initial="hidden"
            animate="visible"
            variants={sectionVariants}
          >
            <h3 className="text-2xl font-bold text-white mb-6">Contact Information</h3>
            <div className="space-y-6">
              {contactInfo.map((info, index) => (
                <motion.div
                  key={info.title}
                  className="flex items-start gap-4"
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: index * 0.1 }}
                >
                  <motion.div
                    className={`${info.bgColor} rounded-full p-3`}
                    whileHover={{ scale: 1.1, rotate: 5 }}
                    transition={{ type: 'spring', stiffness: 400 }}
                  >
                    {info.icon}
                  </motion.div>
                  <div>
                    <h4 className="text-white font-semibold mb-1">{info.title}</h4>
                    <p className="text-gray-400">{info.value}</p>
                  </div>
                </motion.div>
              ))}
            </div>

            <motion.div
              className="mt-12 bg-gray-800 rounded-xl p-6 border border-gray-700"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 }}
            >
              <h4 className="text-white font-semibold mb-3">Follow My Journey</h4>
              <p className="text-gray-400 text-sm mb-4">
                Stay updated with my latest adventures and travel photography on social media.
              </p>
              <div className="flex gap-4">
                {[
                  { name: 'Instagram', href: 'https://instagram.com', color: 'text-travel-green-light hover:text-travel-green-base' },
                  { name: 'Twitter', href: 'https://twitter.com', color: 'text-travel-blue-light hover:text-travel-blue-base' },
                  { name: 'LinkedIn', href: 'https://linkedin.com', color: 'text-travel-blue-base hover:text-travel-blue-light' },
                ].map((social) => (
                  <motion.a
                    key={social.name}
                    href={social.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className={`${social.color} transition-colors`}
                    whileHover={{ scale: 1.05, y: -2 }}
                  >
                    {social.name}
                  </motion.a>
                ))}
              </div>
            </motion.div>
          </motion.div>

          {/* Contact Form */}
          <motion.div
            className="bg-gray-800 rounded-xl p-8 border border-gray-700"
            initial="hidden"
            animate="visible"
            variants={sectionVariants}
            transition={{ delay: 0.2 }}
          >
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
                <motion.div whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }}>
                  <Button
                    type="primary"
                    htmlType="submit"
                    size="large"
                    icon={<SendOutlined />}
                    className="w-full bg-gradient-to-r from-travel-blue-base to-travel-green-base border-none hover:from-travel-blue-light hover:to-travel-green-light h-12 font-semibold"
                  >
                    Send Message
                  </Button>
                </motion.div>
              </Form.Item>
            </Form>
          </motion.div>
        </div>
      </div>
    </div>
  )
}

export default ContactPage
