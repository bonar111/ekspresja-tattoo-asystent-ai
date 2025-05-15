import { Link } from 'react-router-dom';
import { Battery as Tattoo } from 'lucide-react';
import { cn } from '../../utils/cn';

interface NavbarProps {
  isScrolled: boolean;
}

const Navbar = ({ isScrolled }: NavbarProps) => {
  return (
    <header
      className={cn(
        'fixed top-0 left-0 right-0 z-50 transition-all duration-300',
        isScrolled ? 'bg-graphite shadow-lg py-2' : 'bg-transparent py-4'
      )}
    >
      <div className="container flex items-center justify-center">
        <Link to="/" className="flex items-center gap-2">
          <Tattoo size={32} className="text-white" />
          <span className="text-2xl font-heading">EKSPRESJA</span>
        </Link>
      </div>
    </header>
  );
};

export default Navbar;
