import { motion } from 'framer-motion'
import { Row, Col, Statistic } from 'antd'
import { GlobalOutlined, CameraOutlined, HeartOutlined } from '@ant-design/icons'

const AboutPage = () => {
  const sectionVariants = {
    hidden: { opacity: 0, y: 40 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.6, ease: 'easeOut' },
    },
  }

  const cardVariants = {
    hidden: { opacity: 0, y: 30, scale: 0.95 },
    visible: {
      opacity: 1,
      y: 0,
      scale: 1,
      transition: { duration: 0.5 },
    },
  }

  const statCards = [
    {
      icon: <GlobalOutlined className="text-5xl text-travel-blue-light mb-4" />,
      title: 'Countries Visited',
      value: 2,
      color: '#60a5fa',
      borderHover: 'hover:border-travel-blue-base',
    },
    {
      icon: <CameraOutlined className="text-5xl text-travel-green-light mb-4" />,
      title: 'Photos Captured',
      value: 1000,
      suffix: '+',
      color: '#34d399',
      borderHover: 'hover:border-travel-green-base',
    },
    {
      icon: <HeartOutlined className="text-5xl text-travel-earth-light mb-4" />,
      title: 'Years Traveling',
      value: 3,
      suffix: '+',
      color: '#f59e0b',
      borderHover: 'hover:border-travel-earth-base',
    },
  ]

  return (
    <div className="min-h-screen py-20 px-4 sm:px-6 lg:px-8 bg-gray-800">
      <div className="max-w-7xl mx-auto">
        <motion.div
          className="text-center mb-16"
          initial="hidden"
          animate="visible"
          variants={sectionVariants}
        >
          <h1 className="text-4xl md:text-5xl font-bold mb-4 bg-gradient-to-r from-travel-blue-light via-travel-green-base to-travel-earth-light bg-clip-text text-transparent">
            About Me
          </h1>
          <p className="text-gray-400 text-lg max-w-2xl mx-auto">
            A passionate traveler and photographer capturing moments around the world
          </p>
        </motion.div>

        <Row gutter={[32, 32]} className="mb-16">
          {statCards.map((card, index) => (
            <Col xs={24} md={12} lg={8} key={card.title}>
              <motion.div
                className={`bg-gray-900 rounded-xl p-8 text-center border border-gray-700 ${card.borderHover} transition-all duration-300 hover:shadow-xl hover:shadow-travel-blue-dark/10`}
                initial="hidden"
                animate="visible"
                variants={cardVariants}
                transition={{ delay: index * 0.1 }}
                whileHover={{ y: -5 }}
              >
                <motion.div
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  transition={{ delay: 0.2 + index * 0.1, type: 'spring' }}
                >
                  {card.icon}
                </motion.div>
                <Statistic
                  title={<span className="text-gray-300">{card.title}</span>}
                  value={card.value}
                  suffix={card.suffix}
                  valueStyle={{
                    color: card.color,
                    fontSize: '2.5rem',
                    fontWeight: 'bold',
                  }}
                />
              </motion.div>
            </Col>
          ))}
        </Row>

        <Row gutter={[32, 32]} className="items-stretch">
          <Col xs={24} lg={12}>
            <motion.div
              className="bg-gray-900 rounded-xl p-8 border border-gray-700 h-full flex flex-col hover:border-travel-blue-dark transition-colors"
              initial="hidden"
              animate="visible"
              variants={cardVariants}
            >
              <h3 className="text-2xl font-bold text-white mb-4">My Story</h3>
              <div className="flex-grow">
                <p className="text-gray-300 leading-relaxed mb-4">
                  Travel has always been my greatest passion. What started as weekend trips to nearby
                  destinations has evolved into a lifelong journey of exploration and discovery. Through
                  my camera lens, I capture not just images, but emotions, stories, and the essence of
                  each place I visit.
                </p>
                <p className="text-gray-300 leading-relaxed">
                  From the snow-capped peaks of the Alps to the vibrant streets of Tokyo, from the
                  serene beaches of the Maldives to the bustling markets of Marrakech, each destination
                  has left an indelible mark on my soul. This gallery is a window into my adventures,
                  a collection of moments that tell the story of my travels.
                </p>
              </div>
            </motion.div>
          </Col>
          <Col xs={24} lg={12}>
            <motion.div
              className="bg-gray-900 rounded-xl p-8 border border-gray-700 h-full flex flex-col hover:border-travel-green-dark transition-colors"
              initial="hidden"
              animate="visible"
              variants={cardVariants}
              transition={{ delay: 0.1 }}
            >
              <h3 className="text-2xl font-bold text-white mb-4">My Mission</h3>
              <div className="flex-grow">
                <p className="text-gray-300 leading-relaxed mb-4">
                  Through photography, I aim to inspire others to explore the world and appreciate its
                  incredible diversity. Every photograph represents a moment in time, a memory preserved,
                  and a story waiting to be told.
                </p>
                <p className="text-gray-300 leading-relaxed">
                  Whether it's the golden hour light on a mountain peak or the candid smile of a local
                  vendor, I believe that travel photography has the power to connect us, inspire
                  wanderlust, and remind us of the beauty that exists in every corner of our planet.
                </p>
              </div>
            </motion.div>
          </Col>
        </Row>

        <motion.div
          className="mt-16 text-center"
          initial="hidden"
          animate="visible"
          variants={sectionVariants}
        >
          <motion.div
            className="inline-block bg-gray-900 rounded-xl p-8 border border-gray-700"
            whileHover={{ scale: 1.02 }}
            transition={{ type: 'spring', stiffness: 300 }}
          >
            <motion.img
              src="/profile-pic.jpg"
              alt="Traveler"
              className="w-48 h-48 rounded-full object-cover mx-auto mb-4 border-4 border-travel-blue-base"
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ delay: 0.2 }}
            />
            <h4 className="text-xl font-semibold text-white mb-2">The Traveler</h4>
            <p className="text-gray-400">Always on the move, always exploring</p>
          </motion.div>
        </motion.div>
      </div>
    </div>
  )
}

export default AboutPage
