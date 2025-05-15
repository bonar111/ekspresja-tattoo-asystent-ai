import { Link } from 'react-router-dom';
import { Battery as Tattoo, Instagram, Facebook, Youtube } from 'lucide-react';

const Footer = () => {
  return (
    <footer className="bg-metallic py-12">
      <div className="container">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
          <div>
            <Link to="/" className="flex items-center gap-2 mb-4">
              <Tattoo size={32} className="text-white" />
              <span className="text-2xl font-heading">EKSPRESJA</span>
            </Link>
            <p className="text-gray-300 mb-6">
            W Ekspresji wierzymy, że tatuaż to nie tylko ozdoba, ale wyraz Twojej indywidualności            </p>
            <div className="flex gap-4">
              <a href="https://www.instagram.com/ekspresja.tattoo" target="_blank" rel="noopener noreferrer" className="hover:text-neon transition-colors">
                <Instagram size={24} />
              </a>
              <a href="https://www.facebook.com/ekspresja.tattoo" target="_blank" rel="noopener noreferrer" className="hover:text-neon transition-colors">
                <Facebook size={24} />
              </a>
            </div>
          </div>

          <div>
            <h3 className="text-xl mb-4">Godziny otwarcia</h3>
            <ul className="space-y-2 text-gray-300">
              <li>Poniedziałek – Piątek: 11:00 – 18:00</li>
              <li>Sobota: 11:00 – 15:00</li>
            </ul>
          </div>

          <div>
            <h3 className="text-xl mb-4">Kontakt</h3>
            <address className="not-italic text-gray-300 space-y-2">
              <p>gbnet Grzegorz Bonar</p>
              <p>ul. Lwowska 25/1</p>
              <p>Kraków, Polska</p>
              <p>Telefon: +48 690 198 529</p>
              <p>Email: info@ekspresja.art</p>
            </address>
          </div>
        </div>

        <div className="border-t border-gray-700 mt-10 pt-6 flex flex-col md:flex-row justify-between items-center gap-4">
          <p className="text-gray-400 text-sm">
            &copy; {new Date().getFullYear()} Studio Tatuażu Ekspresja. Wszelkie prawa zastrzeżone.
          </p>
          <div className="flex gap-6 text-sm text-gray-400">
            <Link to="https://docs.google.com/document/d/1C2A3qLNuKA024GiqQF3acdzN6etJn-13/edit?usp=sharing&ouid=113025347977919404614&rtpof=true&sd=true" className="hover:text-white transition-colors">Polityka prywatności</Link>
            <Link to="https://drive.google.com/file/d/1IYpur3spfVEGLc6vBBrUeOctCosAkNTB/view" className="hover:text-white transition-colors">Regulamin</Link>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
