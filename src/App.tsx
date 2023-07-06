import Footer from './components/Footer/Footer';
import Header from './components/Header/Header';
import { Outlet } from 'react-router-dom';
import ScrollToTop from './components/ScrollToTop';
import ScrollBtn from './components/ScrollBtns/ScrollBtns';
import UserContextProvider from './context/UserContext';

function App() {
  return (
    <UserContextProvider>
      <Header />
      <Outlet />
      <Footer />
      <ScrollToTop />
      <ScrollBtn />
    </UserContextProvider>
  );
}

export default App;
