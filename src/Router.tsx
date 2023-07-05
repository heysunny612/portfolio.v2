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

export default function Router() {
  const router = createBrowserRouter([
    {
      path: '/',
      element: <App />,
      errorElement: <NotFound />,
      children: [
        { index: true, element: <Home /> },
        { path: '/about', element: <About /> },
        { path: '/portfolio', element: <Portfolio /> },
        { path: '/portfolio/:id', element: <PortfolioDetail /> },
        { path: '/blog', element: <Blog /> },
        { path: '/contact', element: <Contact /> },
        { path: '/askme', element: <AskMe /> },
        { path: '/askme/write', element: <AskMe /> },
      ],
    },
  ]);
  return <RouterProvider router={router} />;
}
