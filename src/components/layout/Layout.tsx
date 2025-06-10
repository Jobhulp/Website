import { ReactNode } from 'react';
import Header from '../common/header/Header';

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
