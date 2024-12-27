import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { Provider } from 'react-redux';
import { ConfigProvider } from 'antd';
import zhCN from 'antd/locale/zh_CN';
import { store } from './store';
import { Layout } from './components/Layout';
import { Home } from './pages/Home';
import { PoemDetail } from './pages/PoemDetail';
import { Favorites } from './pages/Favorites';
import { ErrorBoundary } from './components/ErrorBoundary';

export const App: React.FC = () => {
  return (
    <Provider store={store}>
      <ConfigProvider
        locale={zhCN}
        theme={{
          token: {
            colorPrimary: '#1890ff',
            borderRadius: 4,
          },
        }}
      >
        <ErrorBoundary>
          <Router>
            <Layout>
              <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/poems/:id" element={<PoemDetail />} />
                <Route path="/favorites" element={<Favorites />} />
              </Routes>
            </Layout>
          </Router>
        </ErrorBoundary>
      </ConfigProvider>
    </Provider>
  );
}; 