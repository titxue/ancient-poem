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