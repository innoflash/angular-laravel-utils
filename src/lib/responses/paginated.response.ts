import {CollectionResponse} from './collection.response';
import {Links} from '../models/pagination/links';
import {Meta} from '../models/pagination/meta';

export interface PaginatedResponse<T> extends CollectionResponse<T> {
  links: Links
  meta: Meta
}
