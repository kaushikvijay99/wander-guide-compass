
import { ReactNode } from 'react';
import Header from './Header';
import Footer from './Footer';
import { Toaster } from '@/components/ui/sonner';

interface MainLayoutProps {
  children: ReactNode;
  hideFooter?: boolean;
}

const MainLayout = ({ children, hideFooter = false }: MainLayoutProps) => {
  return (
    <div className="flex flex-col min-h-screen">
      <Header />
      <main className="flex-grow">
        {children}
      </main>
      {!hideFooter && <Footer />}
      <Toaster />
    </div>
  );
};

export default MainLayout;
