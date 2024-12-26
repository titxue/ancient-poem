export interface FavoriteSync {
  id: number;
  updatedAt: number;
}

export interface FavoriteSyncResponse {
  favorites: FavoriteSync[];
  serverTime: number;
} 