import { Link } from 'react-router-dom';
import { MessageCircle, Calendar } from 'lucide-react';

const MobileNav = () => {
  return (
    <div className="fixed bottom-0 left-0 right-0 bg-graphite border-t border-metallic p-2 md:hidden z-40">
      <div className="flex justify-between items-center">
        <Link 
          to="/booking" 
          className="flex flex-col items-center px-4 py-2"
        >
          <Calendar size={20} className="mb-1" />
          <span className="text-xs font-medium">
            <span className="text-neon">3</span> wolne terminy w tym tygodniu 🔥
          </span>
        </Link>
        
        <button 
          className="flex flex-col items-center px-4 py-2"
          onClick={() => {
            if (window.voiceflow && window.voiceflow.chat) {
              window.voiceflow.chat.open();
            }
          }}
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
