import React from 'react'
import ReactDOM from 'react-dom/client'
import { ConfigProvider, theme } from 'antd'
import App from './App.jsx'
import './styles/index.css'

// Ant Design dark theme configuration
const darkTheme = {
  token: {
    colorPrimary: '#3b82f6', // travel blue base
    colorBgBase: '#111827', // gray-900
    colorTextBase: '#f3f4f6', // gray-100
    colorBgContainer: '#1f2937', // gray-800
    colorBorder: '#374151', // gray-700
    borderRadius: 8,
  },
  algorithm: theme.darkAlgorithm,
}

// Add dark class to html element
document.documentElement.classList.add('dark')

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <ConfigProvider theme={darkTheme}>
      <App />
    </ConfigProvider>
  </React.StrictMode>,
)

