import { createBrowserRouter } from 'react-router-dom';
import LoginPage from '../pages/LoginPage/LoginPage';
import RegisterPage from '../pages/RegisterPage/RegisterPage';
import RecipeListPage from '../pages/RecipeListPage/RecipeListPage';

const routes = [
  {
    path: '',
    element: <LoginPage />,
  },
  {
    path: '/register',
    element: <RegisterPage />,
  },
  {
    path: '/recipe',
    element: <RecipeListPage />,
  },
];

const router = createBrowserRouter(routes);

export default router;
