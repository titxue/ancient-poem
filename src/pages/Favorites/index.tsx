import React, { useState } from 'react';
import { useSelector } from 'react-redux';
import { Typography, Empty, Button, Radio, Input, Space } from 'antd';
import { Link } from 'react-router-dom';
import { HeartOutlined, UnorderedListOutlined, AppstoreOutlined, SearchOutlined } from '@ant-design/icons';
import type { RootState } from '../../store';
import { selectFavorites } from '../../store/slices/favoritesSlice';
import { PoemCard } from '../../components/Poem/PoemCard';
import styles from './Favorites.module.scss';

const { Title, Text } = Typography;
const { Search } = Input;

type ViewMode = 'grid' | 'list';

export const Favorites: React.FC = () => {
  const favorites = useSelector((state: RootState) => selectFavorites(state));
  const [viewMode, setViewMode] = useState<ViewMode>('grid');
  const [searchText, setSearchText] = useState('');

  const filteredFavorites = favorites.filter(poem => 
    poem.title.toLowerCase().includes(searchText.toLowerCase()) ||
    poem.author.toLowerCase().includes(searchText.toLowerCase()) ||
    poem.content.some(line => line.toLowerCase().includes(searchText.toLowerCase()))
  );

  const handleSearch = (value: string) => {
    setSearchText(value);
  };

  if (!favorites.length) {
    return (
      <div className={styles.empty}>
        <Empty
          description="暂无收藏的诗词"
          image={Empty.PRESENTED_IMAGE_SIMPLE}
        />
        <Link to="/">
          <Button type="primary">浏览诗词</Button>
        </Link>
      </div>
    );
  }

  return (
    <div className={styles.container}>
      <div className={styles.header}>
        <Title level={2} className={styles.title}>
          我的收藏
        </Title>
        <div className={styles.stats}>
          <div className={styles.stat}>
            <div className={styles.number}>{favorites.length}</div>
            <div className={styles.label}>收藏总数</div>
          </div>
          <div className={styles.stat}>
            <div className={styles.number}>
              {new Set(favorites.map(poem => poem.dynasty)).size}
            </div>
            <div className={styles.label}>朝代</div>
          </div>
          <div className={styles.stat}>
            <div className={styles.number}>
              {new Set(favorites.map(poem => poem.author)).size}
            </div>
            <div className={styles.label}>诗人</div>
          </div>
        </div>
      </div>

      <div className={styles.content}>
        <Space className={styles.toolbar} size={24}>
          <Search
            placeholder="搜索诗词、作者..."
            allowClear
            onSearch={handleSearch}
            style={{ width: 250 }}
          />
          <Radio.Group value={viewMode} onChange={e => setViewMode(e.target.value)}>
            <Radio.Button value="grid">
              <AppstoreOutlined /> 网格
            </Radio.Button>
            <Radio.Button value="list">
              <UnorderedListOutlined /> 列表
            </Radio.Button>
          </Radio.Group>
        </Space>

        <div className={`${styles.list} ${styles[viewMode]}`}>
          {filteredFavorites.map((poem) => (
            <PoemCard key={poem.id} poem={poem} />
          ))}
        </div>

        {filteredFavorites.length === 0 && (
          <div className={styles.empty}>
            <Empty
              description="未找到匹配的诗词"
              image={Empty.PRESENTED_IMAGE_SIMPLE}
            />
          </div>
        )}
      </div>
    </div>
  );
}; 