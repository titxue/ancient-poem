import axios from 'axios';
import type { Poem, PoemListResponse, PoemQueryParams } from '../types/poem';

const api = axios.create({
  baseURL: import.meta.env.VITE_API_BASE_URL,
  timeout: Number(import.meta.env.VITE_API_TIMEOUT) || 5000,
});

export const getPoems = async (params: PoemQueryParams): Promise<PoemListResponse> => {
  const response = await api.get('/poems', { params });
  return response.data;
};

export const getPoemById = async (id: number): Promise<Poem> => {
  const response = await api.get(`/poems/${id}`);
  return response.data;
};

export const searchPoems = async (params: PoemQueryParams): Promise<PoemListResponse> => {
  const response = await api.get('/poems/search', { params });
  return response.data;
};

// 添加错误处理拦截器
api.interceptors.response.use(
  (response) => response,
  (error) => {
    console.error('API Error:', error);
    return Promise.reject(error);
  }
); 