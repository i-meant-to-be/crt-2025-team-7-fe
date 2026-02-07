import { createBrowserRouter } from 'react-router-dom';
import LoginPage from '../pages/LoginPage/LoginPage';
import SignupPage from '../pages/SignupPage/SignupPage';
import RecipeListPage from '../pages/RecipeListPage/RecipeListPage';
import RecipeDetailPage from '../pages/RecipeDetailPage/RecipeDetailPage';

const routes = [
  {
    path: '',
    element: <LoginPage />,
  },
  {
    path: '/signup',
    element: <SignupPage />,
  },
  {
    path: '/recipe',
    element: <RecipeListPage />,
  },
  {
    path: '/recipe/:pk',
    element: <RecipeDetailPage />,
  },
];

const router = createBrowserRouter(routes);

export default router;