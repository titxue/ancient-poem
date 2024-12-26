import type { Poem, PoemListResponse, PoemQueryParams } from '../types/poem';
import { getPoems, getPoemById, searchPoems } from '../mock/poems';

// 模拟网络延迟
const delay = (ms: number) => new Promise(resolve => setTimeout(resolve, ms));

// 模拟服务器端的收藏数据
const mockServerFavorites: Poem[] = [
  {
    id: 1,
    title: '静夜思',
    author: '李白',
    dynasty: '唐',
    content: ['床前明月光，', '疑是地上霜。', '举头望明月，', '低头思故乡。'],
    tags: ['抒情', '思乡'],
  },
  {
    id: 2,
    title: '登鹳雀楼',
    author: '王之涣',
    dynasty: '唐',
    content: ['白日依山尽，', '黄河入海流。', '欲穷千里目，', '更上一层楼。'],
    tags: ['登高', '壮志'],
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
  getFavorites: async (): Promise<Poem[]> => {
    return mockResponse(mockServerFavorites);
  },

  // 同步收藏列表
  syncFavorites: async (favorites: Poem[]): Promise<Poem[]> => {
    // 模拟服务器端的合并逻辑
    const mergedFavorites = [...favorites];
    mockServerFavorites.forEach(serverPoem => {
      if (!favorites.some(localPoem => localPoem.id === serverPoem.id)) {
        mergedFavorites.push(serverPoem);
      }
    });
    return mockResponse(mergedFavorites);
  },
}; 