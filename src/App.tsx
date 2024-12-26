import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { Provider } from 'react-redux';
import { ConfigProvider } from 'antd';
import zhCN from 'antd/locale/zh_CN';
import { store } from './store';
import { Home } from './pages/Home';
import { PoemDetail } from './pages/PoemDetail';

export const App: React.FC = () => {
  return (
    <Provider store={store}>
      <ConfigProvider locale={zhCN}>
        <Router>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/poems/:id" element={<PoemDetail />} />
          </Routes>
        </Router>
      </ConfigProvider>
    </Provider>
  );
}; 