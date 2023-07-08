import Footer from './components/Footer/Footer';
import Header from './components/Header/Header';
import { Outlet } from 'react-router-dom';
import ScrollToTop from './components/ScrollToTop';
import ScrollBtn from './components/ScrollBtns/ScrollBtns';
import UserContextProvider from './context/UserContext';
import { QueryClient, QueryClientProvider } from 'react-query';

const queryClient = new QueryClient();
function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <UserContextProvider>
        <Header />
        <Outlet />
        <Footer />
        <ScrollToTop />
        <ScrollBtn />
      </UserContextProvider>
    </QueryClientProvider>
  );
}

export default App;
