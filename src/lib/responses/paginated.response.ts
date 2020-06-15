import {CollectionResponse} from './collection.response';
import {Links} from './pagination/links';
import {Meta} from './pagination/meta';

export interface PaginatedResponse<T> extends CollectionResponse<T> {
  links: Links
  meta: Meta
}
