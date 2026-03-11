export interface Review {
  id: number;
  nickname: string;
  rating: number;
  cleanliness: number;
  hasPaper: boolean;
  comment: string | null;
  createdAt: string;
}

export interface ReviewRequest {
  nickname: string;
  rating: number;
  cleanliness: number;
  hasPaper: boolean;
  comment?: string;
}
