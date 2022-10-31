import { Schema } from 'jsonschema';

export interface GetUrlDto {
  url: string,
  depth: number,
}

export const GetUrlSchema: Schema = {
  type: 'object',
  properties: {
    url: {
      type: 'string',
    },
    depth: {
      type: 'string',
    },
  },
  required: ['url'],
};