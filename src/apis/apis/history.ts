import { BrewingHistory } from '../../types/types';
import { ApiUrl } from '../endpoints';
import { request } from '../primitives';
import { PostHistoryRequestType } from '../requests/PostHistoryRequestType';
import { GetHistoryListResponseType } from '../responses/GetHistoryListResponseType';

export async function getHistory(id: number): Promise<BrewingHistory> {
  const requestUrl: string = ApiUrl.history.detail(id);
  const response = await request<BrewingHistory>('GET', requestUrl, null, null);

  return response.data;
}

export async function deleteHistory(id: number): Promise<boolean> {
  const requestUrl: string = ApiUrl.history.detail(id);
  const response = await request<void>('DELETE', requestUrl, null, null);

  return response.status === 204 ? true : false;
}

export async function getHistoryList(): Promise<GetHistoryListResponseType> {
  const requestUrl: string = ApiUrl.history.list;
  const response = await request<GetHistoryListResponseType>(
    'GET',
    requestUrl,
    null,
    null,
  );

  return response.data;
}

export async function postHistory(
  data: PostHistoryRequestType,
): Promise<BrewingHistory> {
  const requestUrl: string = ApiUrl.history.list;
  const response = await request<BrewingHistory>(
    'POST',
    requestUrl,
    data,
    null,
  );

  return response.data;
}
