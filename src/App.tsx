import React, { Suspense } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { Provider } from 'react-redux';
import { ConfigProvider } from 'antd';
import zhCN from 'antd/locale/zh_CN';
import { store } from './store';
import { Layout } from './components/Layout';
import { Loading } from './components/Loading';
import { ErrorBoundary } from './components/ErrorBoundary';

// Lazy load page components
const Home = React.lazy(() => import('./pages/Home').then(module => ({ default: module.Home })));
const PoemDetail = React.lazy(() => import('./pages/PoemDetail').then(module => ({ default: module.PoemDetail })));
const Favorites = React.lazy(() => import('./pages/Favorites').then(module => ({ default: module.Favorites })));

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
              <Suspense fallback={<Loading />}>
                <Routes>
                  <Route path="/" element={<Home />} />
                  <Route path="/poems/:id" element={<PoemDetail />} />
                  <Route path="/favorites" element={<Favorites />} />
                </Routes>
              </Suspense>
            </Layout>
          </Router>
        </ErrorBoundary>
      </ConfigProvider>
    </Provider>
  );
}; 