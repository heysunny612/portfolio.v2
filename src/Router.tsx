import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import App from './App';
import NotFound from './pages/NotFound/NotFound';
import Home from './pages/Home/Home';
import About from './pages/About/About';
import Portfolio from './pages/Portfolio/Portfolio';
import Blog from './pages/Blog/Blog';
import Contact from './pages/Contact/Contact';
import PortfolioDetail from './pages/Portfolio/PortfolioDetail';
import AskMe from './pages/AskMe/AskMe';
import Login from './pages/Auth/Login';
import Auth from './pages/Auth/Auth';
import Mypage from './pages/Auth/Mypage';
import ProtectedRoute from './pages/ProtectedRoute';
import Join from './pages/Auth/Join';
import AddBlog from './pages/Blog/AddBlog';
import BlogDetail from './pages/Blog/BlogDetail';
import AddPortfolio from './pages/Portfolio/AddPortfolio';
import SearchResult from './pages/Portfolio/SearchResult';
import Exit from './pages/Auth/Exit';
import MyHeart from './pages/Auth/MyHeart';
import MyComments from './pages/Auth/MyComments';
import MyQnA from './pages/Auth/MyQnA';

export default function Router() {
  const router = createBrowserRouter([
    {
      path: '/',
      element: <App />,
      errorElement: <NotFound />,
      children: [
        { index: true, element: <Home /> },
        { path: '/main', element: <Home /> },
        { path: '/about', element: <About /> },
        { path: '/about/gallery', element: <About /> },
        {
          path: '/portfolio',
          element: <Portfolio />,
          children: [
            { path: '/portfolio', element: <SearchResult /> },
            { path: '/portfolio/search', element: <SearchResult /> },
          ],
        },
        { path: '/portfolio/:id', element: <PortfolioDetail /> },
        { path: '/portfolio/write', element: <AddPortfolio /> },
        { path: '/portfolio/write/:id', element: <AddPortfolio /> },
        { path: '/blog', element: <Blog /> },
        { path: '/blog/:id', element: <BlogDetail /> },
        { path: '/blog/write', element: <AddBlog /> },
        { path: '/blog/write/:id', element: <AddBlog /> },
        { path: '/contact', element: <Contact /> },
        { path: '/askme', element: <AskMe /> },
        { path: '/askme/:keyword', element: <AskMe /> },
        { path: '/askme/write', element: <AskMe /> },
        {
          path: '/auth',
          element: <Auth />,
          children: [
            {
              path: '/auth/login',
              element: <Login />,
            },
            {
              path: '/auth/join',
              element: <Join />,
            },
            {
              path: '/auth/mypage',
              element: (
                <ProtectedRoute>
                  <Mypage />
                </ProtectedRoute>
              ),
            },
            {
              path: '/auth/myheart',
              element: (
                <ProtectedRoute>
                  <MyHeart />
                </ProtectedRoute>
              ),
            },
            {
              path: '/auth/mycomments',
              element: (
                <ProtectedRoute>
                  <MyComments />
                </ProtectedRoute>
              ),
            },
            {
              path: '/auth/myqna',
              element: (
                <ProtectedRoute>
                  <MyQnA />
                </ProtectedRoute>
              ),
            },
            {
              path: '/auth/exit',
              element: (
                <ProtectedRoute>
                  <Exit />
                </ProtectedRoute>
              ),
            },
          ],
        },
      ],
    },
  ]);
  return <RouterProvider router={router} />;
}
