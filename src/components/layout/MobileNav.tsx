import { MessageCircle, Calendar } from 'lucide-react';
import { openChat, MESSENGER_URL } from '../../lib/openChat';

const MobileNav = () => {
  return (
    <div className="fixed bottom-0 left-0 right-0 bg-graphite border-t border-metallic p-2 md:hidden z-40">
      <div className="flex justify-between items-center">
        {/* Link zostaje dla SEO / no-JS, ale na JS przejmujemy nawigację po wysłaniu eventu */}
        <a
  href={MESSENGER_URL}
  target="_blank"
  rel="noopener noreferrer"
  className="flex flex-col items-center px-4 py-2"
  onClick={(e) => openChat({ source: 'mobile_nav_banner' }, e)}
>
  <Calendar size={20} className="mb-1" />
  <span className="text-[11px] font-semibold leading-tight">
    Odbierz 2 inspiracje + terminy
  </span>
  <span className="text-[10px] opacity-90 -mt-0.5">
    w 2–5 min • bez zobowiązań
  </span>
</a>


        <button
          className="flex flex-col items-center px-4 py-2"
          onClick={(e) => openChat({ source: 'mobile_nav_button' }, e)}
        >
          <MessageCircle size={20} className="mb-1 animate-pulse-subtle" />
          <span className="text-xs font-medium">Wyślij wiadomość</span>
        </button>
      </div>
    </div>
  );
};

export default MobileNav;
