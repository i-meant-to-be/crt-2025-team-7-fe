// Template
/*
export async function apiFunc(
  
): Promise<ReturnType> {
    const requestUrl: string = ApiUrl.
    const response = await request<ReturnType>(
        method,
        requestUrl,
        data,
        params,
    );

    return response.data;
}
*/

import { ApiUrl } from '../endpoints';
import { request } from '../primitives';
import { PostRecipeRequestType } from '../requests/PostRecipeRequestType';
import { GetRecipeListResponseType } from '../responses/GetRecipeListResponseType';
import { GetRecipeResponseType } from '../responses/GetRecipeResponseType';
import { PostRecipeResponseType } from '../responses/PostRecipeResponseType';

export async function getRecipe(id: number): Promise<GetRecipeResponseType> {
  const requestUrl: string = ApiUrl.recipe.detail(id);
  const response = await request<GetRecipeResponseType>(
    'GET',
    requestUrl,
    null,
    null,
  );

  return response.data;
}

export async function deleteRecipe(id: number): Promise<boolean> {
  const requestUrl: string = ApiUrl.recipe.detail(id);
  const response = await request<void>('DELETE', requestUrl, null, null);

  return response.status === 204 ? true : false;
}

export async function getRecipeList(): Promise<GetRecipeListResponseType> {
  const requestUrl: string = ApiUrl.recipe.list;
  const response = await request<GetRecipeListResponseType>(
    'GET',
    requestUrl,
    null,
    null,
  );
  return response.data;
}

export async function postRecipe(
  data: PostRecipeRequestType,
): Promise<PostRecipeResponseType> {
  const requestUrl: string = ApiUrl.recipe.list;
  const response = await request<PostRecipeResponseType>(
    'POST',
    requestUrl,
    data,
    null,
  );
  return response.data;
}
