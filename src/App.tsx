import Footer from './components/Footer/Footer';
import Header from './components/Header/Header';
import { Outlet, useLocation } from 'react-router-dom';
import ScrollToTop from './components/ScrollToTop';
import ScrollBtn from './components/ScrollBtns/ScrollBtns';
import UserContextProvider from './context/UserContext';
import { QueryClient, QueryClientProvider } from 'react-query';
import ChannelService from './api/channelTalk/ChannelService';
import Intro from './pages/Intro/Intro';

const queryClient = new QueryClient();
function App() {
  ChannelService.loadScript();
  ChannelService.boot(
    {
      pluginKey: 'bc73057f-a3e2-42d5-8caf-ec6b6fa4d603',
    },
    () => {}
  );
  const { pathname } = useLocation();
  const isIntro = pathname === '/';
  return (
    <QueryClientProvider client={queryClient}>
      <UserContextProvider>
        {isIntro && <Intro />}
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
