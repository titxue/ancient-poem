import React from 'react';
import { Button } from 'antd';
import { useDispatch, useSelector } from 'react-redux';
import { SunOutlined, MoonOutlined } from '@ant-design/icons';
import { toggleTheme, selectIsDarkMode } from '../../store/slices/themeSlice';
import type { AppDispatch } from '../../store';
import styles from './ThemeToggle.module.scss';

export const ThemeToggle: React.FC = () => {
  const dispatch = useDispatch<AppDispatch>();
  const isDarkMode = useSelector(selectIsDarkMode);

  return (
    <Button
      type="text"
      icon={isDarkMode ? <MoonOutlined /> : <SunOutlined />}
      className={styles.themeToggle}
      onClick={() => dispatch(toggleTheme())}
      title={isDarkMode ? '切换到亮色主题' : '切换到暗色主题'}
    />
  );
}; 