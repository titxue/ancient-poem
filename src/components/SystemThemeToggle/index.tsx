import React, { useEffect } from 'react';
import { Button, Tooltip } from 'antd';
import { useDispatch, useSelector } from 'react-redux';
import { DesktopOutlined } from '@ant-design/icons';
import { setTheme, selectIsDarkMode } from '../../store/slices/themeSlice';
import type { AppDispatch } from '../../store';
import styles from './SystemThemeToggle.module.scss';

export const SystemThemeToggle: React.FC = () => {
  const dispatch = useDispatch<AppDispatch>();
  const isDarkMode = useSelector(selectIsDarkMode);

  useEffect(() => {
    // 监听系统主题变化
    const mediaQuery = window.matchMedia('(prefers-color-scheme: dark)');
    
    const handleThemeChange = (e: MediaQueryListEvent | MediaQueryList) => {
      dispatch(setTheme(e.matches));
    };

    // 初始化时设置主题
    handleThemeChange(mediaQuery);

    // 监听系统主题变化
    mediaQuery.addEventListener('change', handleThemeChange);

    return () => {
      mediaQuery.removeEventListener('change', handleThemeChange);
    };
  }, [dispatch]);

  return (
    <Tooltip title="跟随系统主题">
      <Button
        type="text"
        icon={<DesktopOutlined />}
        className={`${styles.systemThemeToggle} ${isDarkMode ? styles.dark : ''}`}
      />
    </Tooltip>
  );
}; 