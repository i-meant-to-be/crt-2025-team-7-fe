export const ApiUrl = {
  auth: {
    signup: '/api/auth/signup/',
    token: '/api/auth/token/',
    tokenRefresh: '/api/auth/token/refresh/',
    logout: '/api/auth/logout/',
  },
  recipe: {
    list: '/api/recipe/', // GET 전체 조회, POST 생성
    detail: (pk: string | number) => `/api/recipe/${pk}/`, // GET, PUT, PATCH, DELETE
  },
  history: {
    list: '/brewing/brewing-history/', // GET 전체 조회, POST 생성
    detail: (pk: string | number) => `/brewing/brewing-history/${pk}/`, // GET, PUT, PATCH, DELETE
  },
};
