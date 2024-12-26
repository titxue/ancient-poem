import type { Poem, PoemListResponse, PoemQueryParams } from '../types/poem';
import { getPoems, getPoemById, searchPoems } from '../mock/poems';

// 模拟网络延迟
const delay = (ms: number) => new Promise(resolve => setTimeout(resolve, ms));

export const fetchPoems = async (params: PoemQueryParams): Promise<PoemListResponse> => {
  await delay(500); // 模拟网络延迟
  return getPoems(params.page, params.pageSize);
};

export const fetchPoemById = async (id: number): Promise<Poem | undefined> => {
  await delay(500); // 模拟网络延迟
  return getPoemById(id);
};

export const searchPoemsApi = async (params: PoemQueryParams): Promise<PoemListResponse> => {
  await delay(500); // 模拟网络延迟
  return searchPoems(params);
};

// 模拟 API 响应
const mockResponse = async <T>(data: T): Promise<T> => {
  await delay(500); // 模拟网络延迟
  return data;
};

export const favoritesApi = {
  // 获取收藏列表
  getFavorites: async (): Promise<Poem[]> => {
    // 这里可以替换为真实的 API 调用
    return mockResponse([]);
  },

  // 同步收藏列表
  syncFavorites: async (favorites: Poem[]): Promise<Poem[]> => {
    // 这里可以替换为真实的 API 调用
    return mockResponse(favorites);
  },
}; 