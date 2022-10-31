import { Schema } from 'mongoose';

export interface HistoryUrlListDto {
  id: string
  searchedUrl: string,
  depth: number,
  parentUrl?: string,
  url: string[] | undefined,
}

export const HistoryUrlListSchema = new Schema<HistoryUrlListDto>({
  id: {
    type: String,
  },
  searchedUrl: {
    type: String,
  },
  depth: {
    type: Number,
  },
  parentUrl: {
    type: String,
  },
  url: {
    type: Array,
    items: {
      type: String,
    }
  },
});

HistoryUrlListSchema.set('timestamps', true);
HistoryUrlListSchema.set('collection', 'historyUrlList');
HistoryUrlListSchema.set('versionKey', false);
