import styles from './Navbar.module.css';
import { Link } from 'react-router-dom';
export default function Navbar() {
  return (
    <nav>
      <Link to='about'>About</Link>
      <Link to='portfolio'>Portfolio</Link>
      <Link to='blog'>Blog</Link>
      <Link to='contact'>Contact</Link>
    </nav>
  );
}
