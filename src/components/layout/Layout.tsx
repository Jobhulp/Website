import { ReactNode } from 'react';
import Header from '../header/Header';

interface LayoutProps {
  children: ReactNode;
}

const Layout = ({ children }: LayoutProps) => (
  <div>
    <Header />
    <main className='main-content'>{children}</main>
  </div>
);

export default Layout;
