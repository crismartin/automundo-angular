import {Replacement} from './replacement';

export interface ReplacementUsedItem {
  referenceId?: string;
  quantity?: number;
  own?: boolean;
  price?: number;
  discount?: number;
  replacement?: Replacement;
}
