import { Link } from 'react-router-dom';
import { Battery as Tattoo } from 'lucide-react';
import { cn } from '../../utils/cn';
import { useEffect, useRef } from 'react';

interface NavbarProps {
  isScrolled: boolean;
}

const Navbar = ({ isScrolled }: NavbarProps) => {
  const headerRef = useRef<HTMLDivElement>(null);

  // Zmierz wysokość nagłówka i ustaw CSS var(--header-h)
  useEffect(() => {
    const el = headerRef.current;
    if (!el) return;

    const setVar = () => {
      document.documentElement.style.setProperty('--header-h', `${el.offsetHeight}px`);
    };

    setVar();
    const ro = new ResizeObserver(setVar);
    ro.observe(el);
    window.addEventListener('resize', setVar);

    return () => {
      ro.disconnect();
      window.removeEventListener('resize', setVar);
    };
  }, []);

  return (
    <header
      ref={headerRef}
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
