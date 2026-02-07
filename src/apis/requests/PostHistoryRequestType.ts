import { BeanData } from '../../types/types';

export interface PostHistoryRequestType {
  feedback: string;
  bean_data: BeanData;
  recipe_id: number;
}
