export const ApiUrl = {
  auth: {
    // base URL 에 "/api" 가 이미 포함되어 있으므로 여기서는 "/auth/..." 만 사용
    signup: '/auth/signup/',
    login: '/auth/token/',
    tokenRefresh: '/auth/token/refresh/',
    logout: '/auth/logout/',
  },
  recipe: {
    // base URL: http://13.124.76.242:8000/api
    // 최종 URL: http://13.124.76.242:8000/api/recipe/
    list: '/recipe/', // GET 전체 조회, POST 생성
    detail: (pk: string | number) => `/recipe/${pk}/`, // GET, PUT, PATCH, DELETE
  },
  history: {
    list: '/brewing/brewing-history/', // GET 전체 조회, POST 생성
    detail: (pk: string | number) => `/brewing/brewing-history/${pk}/`, // GET, PUT, PATCH, DELETE
  },
};
