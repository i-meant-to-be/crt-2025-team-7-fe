import { createBrowserRouter } from 'react-router-dom';
import LoginPage from '../pages/LoginPage/LoginPage';
import SignupPage from '../pages/SignupPage/SignupPage';
import RecipeListPage from '../pages/RecipeListPage/RecipeListPage';
import RecipeDetailPage from '../pages/RecipeDetailPage/RecipeDetailPage';
import HistoryListPage from '../pages/HistoryListPage/HistoryListPage';
import HistoryDetailPage from '../pages/HistoryDetailPage/HistoryDetailPage';

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
  {
    path: '/history',
    element: <HistoryListPage />,
  },
  {
    path: '/history/:pk',
    element: <HistoryDetailPage />,
  },
];

const router = createBrowserRouter(routes);

export default router;
