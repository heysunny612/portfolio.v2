import Footer from './components/Footer/Footer';
import Header from './components/Header/Header';
import { Outlet } from 'react-router-dom';
import ScrollToTop from './components/ScrollToTop';
import ScrollBtn from './components/ScrollBtns/ScrollBtns';

function App() {
  return (
    <>
      <Header />
      <Outlet />
      <Footer />
      <ScrollToTop />
      <ScrollBtn />
    </>
  );
}

export default App;
