import React, { useState, useEffect } from 'react';
import { Input, Button, Drawer, Form, Select, Space, AutoComplete } from 'antd';
import { SettingOutlined, CloseOutlined } from '@ant-design/icons';
import { useDispatch, useSelector } from 'react-redux';
import type { AppDispatch, RootState } from '../../store';
import {
  setKeyword,
  addToHistory,
  setAdvancedSearch,
  clearAdvancedSearch,
} from '../../store/slices/searchSlice';
import { searchPoems, fetchPoems } from '../../store/slices/poemSlice';
import { getSuggestions } from '../../mock/poems';
import styles from './Search.module.scss';

const { Option } = Select;

// 预设选项
const DYNASTIES = [
  { label: '先秦', value: '先秦' },
  { label: '两汉', value: '汉' },
  { label: '魏晋', value: '魏晋' },
  { label: '南北朝', value: '南北朝' },
  { label: '隋代', value: '隋' },
  { label: '唐代', value: '唐' },
  { label: '五代', value: '五代' },
  { label: '宋代', value: '宋' },
  { label: '金朝', value: '金' },
  { label: '元代', value: '元' },
  { label: '明代', value: '明' },
  { label: '清代', value: '清' },
];

const CATEGORIES = [
  { label: '诗经', value: '诗经' },
  { label: '楚辞', value: '楚辞' },
  { label: '乐府', value: '乐府' },
  { label: '古体诗', value: '古体诗' },
  { label: '近体诗', value: '近体诗' },
  { label: '词', value: '词' },
  { label: '曲', value: '曲' },
];

const TAGS = [
  { label: '山水', value: '山水' },
  { label: '田园', value: '田园' },
  { label: '边塞', value: '边塞' },
  { label: '怀古', value: '怀古' },
  { label: '咏物', value: '咏物' },
  { label: '节日', value: '节日' },
  { label: '送别', value: '送别' },
  { label: '思乡', value: '思乡' },
  { label: '爱情', value: '爱情' },
  { label: '友情', value: '友情' },
  { label: '��别', value: '离别' },
  { label: '思念', value: '思念' },
  { label: '写景', value: '写景' },
  { label: '抒情', value: '抒情' },
  { label: '咏史', value: '咏史' },
];

const SearchComponent: React.FC = () => {
  const dispatch = useDispatch<AppDispatch>();
  const [showAdvanced, setShowAdvanced] = useState(false);
  const [suggestions, setSuggestions] = useState<string[]>([]);
  const { keyword, advancedSearch } = useSelector(
    (state: RootState) => state.search
  );

  const [form] = Form.useForm();

  useEffect(() => {
    if (keyword) {
      const newSuggestions = getSuggestions(keyword);
      setSuggestions(newSuggestions);
    } else {
      setSuggestions([]);
    }
  }, [keyword]);

  const handleSearch = (value: string) => {
    dispatch(setKeyword(value));
    if (value.trim()) {
      dispatch(addToHistory(value.trim()));
      void dispatch(searchPoems({
        page: 1,
        pageSize: 12,
        keyword: value.trim(),
        dynasty: advancedSearch?.dynasty,
        category: advancedSearch?.category,
        tag: advancedSearch?.tag,
      }));
    } else {
      void dispatch(fetchPoems({ page: 1, pageSize: 12 }));
    }
  };

  const handleAdvancedSearch = (values: any) => {
    dispatch(setAdvancedSearch(values));
    setShowAdvanced(false);
    void dispatch(searchPoems({
      page: 1,
      pageSize: 12,
      keyword,
      ...values,
    }));
  };

  const handleClearAdvancedSearch = () => {
    dispatch(clearAdvancedSearch());
    form.resetFields();
    if (keyword) {
      void dispatch(searchPoems({
        page: 1,
        pageSize: 12,
        keyword,
      }));
    } else {
      void dispatch(fetchPoems({ page: 1, pageSize: 12 }));
    }
  };

  const options = suggestions.map((suggestion) => ({
    value: suggestion,
    label: suggestion,
  }));

  return (
    <div className={styles.searchContainer}>
      <div className={styles.searchBar}>
        <AutoComplete
          options={options}
          style={{ width: '100%' }}
          value={keyword}
          onChange={(value) => dispatch(setKeyword(value))}
          onSelect={handleSearch}
        >
          <Input.Search
            size="large"
            placeholder="搜索诗词、作者、朝代..."
            allowClear
            enterButton="搜索"
            onSearch={handleSearch}
          />
        </AutoComplete>
        <Button
          type="text"
          icon={<SettingOutlined />}
          onClick={() => setShowAdvanced(true)}
          className={styles.settingButton}
        />
      </div>

      <Drawer
        title="高级搜索"
        placement="right"
        onClose={() => setShowAdvanced(false)}
        open={showAdvanced}
        extra={
          <Button
            type="text"
            icon={<CloseOutlined />}
            onClick={handleClearAdvancedSearch}
          >
            清空筛选
          </Button>
        }
      >
        <Form
          form={form}
          layout="vertical"
          onFinish={handleAdvancedSearch}
          initialValues={advancedSearch}
        >
          <Form.Item name="dynasty" label="朝代">
            <Select
              placeholder="选择朝代"
              allowClear
              showSearch
              optionFilterProp="label"
            >
              {DYNASTIES.map(({ label, value }) => (
                <Option key={value} value={value}>
                  {label}
                </Option>
              ))}
            </Select>
          </Form.Item>

          <Form.Item name="category" label="分类">
            <Select
              placeholder="选择分类"
              allowClear
              showSearch
              optionFilterProp="label"
            >
              {CATEGORIES.map(({ label, value }) => (
                <Option key={value} value={value}>
                  {label}
                </Option>
              ))}
            </Select>
          </Form.Item>

          <Form.Item name="tag" label="标签">
            <Select
              mode="multiple"
              placeholder="选择标签"
              allowClear
              showSearch
              optionFilterProp="label"
              maxTagCount="responsive"
            >
              {TAGS.map(({ label, value }) => (
                <Option key={value} value={value}>
                  {label}
                </Option>
              ))}
            </Select>
          </Form.Item>

          <Form.Item>
            <Space style={{ width: '100%' }}>
              <Button type="primary" htmlType="submit" block>
                应用筛选
              </Button>
            </Space>
          </Form.Item>
        </Form>
      </Drawer>
    </div>
  );
};

export default SearchComponent; 