import { Encoder, EncodeResult } from '../../types';

export const encoder: Encoder<string> = (constraints: string): EncodeResult => ({
  dataString: constraints,
  url: `https://lisudoku.xyz/solver?import=${constraints}`,
});
