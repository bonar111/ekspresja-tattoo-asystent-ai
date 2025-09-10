import { MessageCircle, Calendar } from 'lucide-react';
import { openChat, MESSENGER_URL } from '../../lib/openChat';

const MobileNav = () => {
  return (
    <div className="fixed bottom-0 left-0 right-0 bg-graphite border-t border-metallic p-2 md:hidden z-40">
      <div className="flex justify-between items-center">
        {/* Zamiast linku do /booking kierujemy do Messengera (deeplink) */}
        <a
          href={MESSENGER_URL}
          target="_blank"
          rel="noopener noreferrer"
          className="flex flex-col items-center px-4 py-2"
          onClick={() => openChat({ source: 'mobile_nav_banner' })}
        >
          <Calendar size={20} className="mb-1" />
          <span className="text-xs font-medium">
            <span className="text-neon">3</span> wolne terminy w tym tygodniu 🔥
          </span>
        </a>

        <button
          className="flex flex-col items-center px-4 py-2"
          onClick={() => openChat({ source: 'mobile_nav_button' })}
        >
          <MessageCircle size={20} className="mb-1 animate-pulse-subtle" />
          <span className="text-xs font-medium flex items-center">
            Porozmawiaj <span className="ml-1 text-[10px] bg-neon text-white px-1 rounded">ZA DARMO</span>
          </span>
        </button>
      </div>
    </div>
  );
};

export default MobileNav;
