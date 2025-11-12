import { Select, Space } from 'antd'
import { FilterOutlined } from '@ant-design/icons'

const { Option } = Select

const FilterBar = ({ filters, onFilterChange, locations, categories, years }) => {
  return (
    <div className="bg-gray-800/50 backdrop-blur-sm rounded-lg p-4 mb-8 border border-gray-700">
      <div className="flex items-center mb-4">
        <FilterOutlined className="text-travel-blue-light text-xl mr-2" />
        <h3 className="text-lg font-semibold text-gray-100">Filter Photos</h3>
      </div>
      <Space wrap className="w-full">
        <Select
          placeholder="All Locations"
          style={{ width: 200 }}
          value={filters.location || undefined}
          onChange={(value) => onFilterChange({ ...filters, location: value || null })}
          allowClear
        >
          {locations.map((location) => (
            <Option key={location} value={location}>
              {location}
            </Option>
          ))}
        </Select>

        <Select
          placeholder="All Categories"
          style={{ width: 200 }}
          value={filters.category || undefined}
          onChange={(value) => onFilterChange({ ...filters, category: value || null })}
          allowClear
        >
          {categories.map((category) => (
            <Option key={category} value={category}>
              {category}
            </Option>
          ))}
        </Select>

        <Select
          placeholder="All Years"
          style={{ width: 150 }}
          value={filters.year || undefined}
          onChange={(value) => onFilterChange({ ...filters, year: value || null })}
          allowClear
        >
          {years.map((year) => (
            <Option key={year} value={year}>
              {year}
            </Option>
          ))}
        </Select>
      </Space>
    </div>
  )
}

export default FilterBar

