import { Row, Col, Statistic } from 'antd'
import { GlobalOutlined, CameraOutlined, HeartOutlined } from '@ant-design/icons'

const AboutSection = () => {
  return (
    <section id="about" className="min-h-screen py-20 px-4 sm:px-6 lg:px-8 bg-gray-800">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold mb-4 bg-gradient-to-r from-travel-blue-light via-travel-green-base to-travel-earth-light bg-clip-text text-transparent">
            About Me
          </h2>
          <p className="text-gray-400 text-lg max-w-2xl mx-auto">
            A passionate traveler and photographer capturing moments around the world
          </p>
        </div>

        <Row gutter={[32, 32]} className="mb-16">
          <Col xs={24} md={12} lg={8}>
            <div className="bg-gray-900 rounded-lg p-8 text-center border border-gray-700 hover:border-travel-blue-base transition-colors">
              <GlobalOutlined className="text-5xl text-travel-blue-light mb-4" />
              <Statistic
                title={<span className="text-gray-300">Countries Visited</span>}
                value={25}
                valueStyle={{ color: '#60a5fa', fontSize: '2.5rem', fontWeight: 'bold' }}
              />
            </div>
          </Col>
          <Col xs={24} md={12} lg={8}>
            <div className="bg-gray-900 rounded-lg p-8 text-center border border-gray-700 hover:border-travel-green-base transition-colors">
              <CameraOutlined className="text-5xl text-travel-green-light mb-4" />
              <Statistic
                title={<span className="text-gray-300">Photos Captured</span>}
                value={1000}
                suffix="+"
                valueStyle={{ color: '#34d399', fontSize: '2.5rem', fontWeight: 'bold' }}
              />
            </div>
          </Col>
          <Col xs={24} md={12} lg={8}>
            <div className="bg-gray-900 rounded-lg p-8 text-center border border-gray-700 hover:border-travel-earth-base transition-colors">
              <HeartOutlined className="text-5xl text-travel-earth-light mb-4" />
              <Statistic
                title={<span className="text-gray-300">Years Traveling</span>}
                value={8}
                suffix="+"
                valueStyle={{ color: '#f59e0b', fontSize: '2.5rem', fontWeight: 'bold' }}
              />
            </div>
          </Col>
        </Row>

        <Row gutter={[32, 32]}>
          <Col xs={24} lg={12}>
            <div className="bg-gray-900 rounded-lg p-8 border border-gray-700">
              <h3 className="text-2xl font-bold text-white mb-4">My Story</h3>
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
          </Col>
          <Col xs={24} lg={12}>
            <div className="bg-gray-900 rounded-lg p-8 border border-gray-700">
              <h3 className="text-2xl font-bold text-white mb-4">My Mission</h3>
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
          </Col>
        </Row>

        <div className="mt-16 text-center">
          <div className="inline-block bg-gray-900 rounded-lg p-8 border border-gray-700">
            <img
              src="profile-pic.jpg"
              alt="Traveler"
              className="w-48 h-48 rounded-full object-cover mx-auto mb-4 border-4 border-travel-blue-base"
            />
            <h4 className="text-xl font-semibold text-white mb-2">The Traveler</h4>
            <p className="text-gray-400">Always on the move, always exploring</p>
          </div>
        </div>
      </div>
    </section>
  )
}

export default AboutSection

