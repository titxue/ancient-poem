import type { Poem, PoemListResponse, PoemQueryParams } from '../types/poem';
import type { FavoriteSync, FavoriteSyncResponse } from '../types/favorites';
import { getPoems, getPoemById, searchPoems } from '../mock/poems';

// 模拟网络延迟
const delay = (ms: number) => new Promise(resolve => setTimeout(resolve, ms));

// 模拟服务器端的收藏数据
const mockServerFavorites: FavoriteSync[] = [
  {
    id: 1,
    updatedAt: Date.now() - 86400000, // 1天前
  },
  {
    id: 2,
    updatedAt: Date.now() - 3600000, // 1小时前
  },
];

export const fetchPoems = async (params: PoemQueryParams): Promise<PoemListResponse> => {
  await delay(500);
  return getPoems(params.page, params.pageSize);
};

export const fetchPoemById = async (id: number): Promise<Poem | undefined> => {
  await delay(500);
  return getPoemById(id);
};

export const searchPoemsApi = async (params: PoemQueryParams): Promise<PoemListResponse> => {
  await delay(500);
  return searchPoems(params);
};

// 模拟 API 响应
const mockResponse = async <T>(data: T): Promise<T> => {
  await delay(500);
  return data;
};

export const favoritesApi = {
  // 获取收藏列表
  getFavorites: async (lastSynced?: number): Promise<FavoriteSyncResponse> => {
    // 如果提供了 lastSynced，只返回更新时间大于 lastSynced 的收藏
    const favorites = lastSynced
      ? mockServerFavorites.filter(fav => fav.updatedAt > lastSynced)
      : mockServerFavorites;

    return mockResponse({
      favorites,
      serverTime: Date.now(),
    });
  },

  // 同步收藏列表
  syncFavorites: async (
    favorites: FavoriteSync[],
    lastSynced?: number
  ): Promise<FavoriteSyncResponse> => {
    // 模拟服务器端的合并逻辑
    const mergedFavorites = [...favorites];
    const serverTime = Date.now();

    // 如果本地收藏不存在或更新时间较旧，则添加服务器的收藏
    mockServerFavorites.forEach(serverFav => {
      const localFav = favorites.find(f => f.id === serverFav.id);
      if (!localFav || localFav.updatedAt < serverFav.updatedAt) {
        const existingIndex = mergedFavorites.findIndex(f => f.id === serverFav.id);
        if (existingIndex !== -1) {
          mergedFavorites[existingIndex] = serverFav;
        } else {
          mergedFavorites.push(serverFav);
        }
      }
    });

    return mockResponse({
      favorites: mergedFavorites,
      serverTime,
    });
  },

  // 获取诗词详情
  fetchPoemById: async (id: number): Promise<Poem | undefined> => {
    return fetchPoemById(id);
  },
}; 