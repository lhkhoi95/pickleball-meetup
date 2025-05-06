import { ItemCategory, ItemCondition, PostStatus } from '../enums/trading-item';

export class TradingPost {
  id: string;
  user_id: string;
  title: string;
  description: string;
  price: number;
  condition: ItemCondition;
  category: ItemCategory;
  location: string;
  images: string[];
  status: PostStatus;
  media_files: MediaFile[];
  created_at: string;
  updated_at: string;
}

export class MediaFile {
  url: string;
  path: string;
  size: number;
  type: string;
  created_at: string;
}
