import {Replacement} from './replacement';

export interface ReplacementUsed {
  reference?: string;
  quantity?: number;
  own?: boolean;
  price?: number;
  discount?: number;
  replacement?: Replacement;
  revisionReference?: string;
}
