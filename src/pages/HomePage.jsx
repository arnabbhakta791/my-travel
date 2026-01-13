import { motion } from 'framer-motion'
import { Button } from 'antd'
import { ArrowRightOutlined } from '@ant-design/icons'
import { Link } from 'react-router-dom'

const HomePage = () => {
  // Animation variants
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2,
        delayChildren: 0.3,
      },
    },
  }

  const itemVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.8, ease: 'easeOut' },
    },
  }

  return (
    <div className="min-h-screen flex items-center justify-center relative overflow-hidden">
      {/* Background with gradient overlay */}
      <motion.div
        className="absolute inset-0 bg-gradient-to-br from-travel-blue-dark via-gray-900 to-travel-green-dark opacity-90"
        initial={{ opacity: 0 }}
        animate={{ opacity: 0.9 }}
        transition={{ duration: 1.5 }}
      />

      {/* Animated background image with parallax effect */}
      <motion.div
        className="absolute inset-0 bg-cover bg-center opacity-20"
        style={{
          backgroundImage:
            "url('https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=1920&h=1080&fit=crop')",
        }}
        initial={{ scale: 1.1 }}
        animate={{ scale: 1 }}
        transition={{ duration: 2, ease: 'easeOut' }}
      />

      {/* Floating particles effect */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        {[...Array(20)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute w-2 h-2 rounded-full bg-white/10"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
            }}
            animate={{
              y: [0, -30, 0],
              opacity: [0.2, 0.5, 0.2],
            }}
            transition={{
              duration: 3 + Math.random() * 2,
              repeat: Infinity,
              delay: Math.random() * 2,
            }}
          />
        ))}
      </div>

      {/* Content */}
      <motion.div
        className="relative z-10 text-center px-4 sm:px-6 lg:px-8 max-w-4xl mx-auto"
        variants={containerVariants}
        initial="hidden"
        animate="visible"
      >
        <motion.h1
          className="text-5xl md:text-7xl font-bold mb-6 bg-gradient-to-r from-travel-blue-light via-travel-green-base to-travel-earth-light bg-clip-text text-transparent"
          variants={itemVariants}
        >
          My Travel Journey
        </motion.h1>

        <motion.p
          className="text-xl md:text-2xl text-gray-300 mb-8 leading-relaxed"
          variants={itemVariants}
        >
          Exploring the world, one photograph at a time. Discover breathtaking
          landscapes, vibrant cultures, and unforgettable moments from my
          adventures around the globe.
        </motion.p>

        <motion.div variants={itemVariants} className="flex gap-4 justify-center flex-wrap">
          <Link to="/gallery">
            <Button
              type="primary"
              size="large"
              icon={<ArrowRightOutlined />}
              className="bg-gradient-to-r from-travel-blue-base to-travel-green-base border-none hover:from-travel-blue-light hover:to-travel-green-light h-12 px-8 text-lg font-semibold shadow-lg hover:shadow-xl transition-shadow"
            >
              Explore Gallery
            </Button>
          </Link>
          <Link to="/about">
            <Button
              size="large"
              className="h-12 px-8 text-lg font-semibold border-gray-600 text-gray-300 hover:border-travel-blue-base hover:text-travel-blue-light"
            >
              About Me
            </Button>
          </Link>
        </motion.div>
      </motion.div>
    </div>
  )
}

export default HomePage
