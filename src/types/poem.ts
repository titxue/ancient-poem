export interface Poem {
  id: number;
  title: string;
  author: string;
  dynasty: string;
  content: string[];
  tags: string[];
  translation?: string[];
  appreciation?: string;
  notes?: string[];
  background?: string;
}

export interface PoemListResponse {
  poems: Poem[];
  total: number;
  page: number;
  pageSize: number;
}

export interface PoemQueryParams {
  page: number;
  pageSize: number;
  keyword?: string;
  dynasty?: string;
  author?: string;
  tag?: string;
} 