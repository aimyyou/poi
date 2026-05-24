import { Character } from '../types';
import { User, ShieldAlert, Fingerprint, Activity, Info, X } from 'lucide-react';
import { motion } from 'motion/react';

interface DossierProps {
  character: Character;
  onClose: () => void;
  onImageClick?: (url: string) => void;
}

export default function Dossier({ character, onClose, onImageClick }: DossierProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: 20 }}
      className="bg-[#fcfcfc] border-2 border-gray-900 shadow-2xl relative overflow-hidden"
    >
      {/* Decorative top bar */}
      <div className="h-2 w-full bg-gray-900" />

      {/* Header section */}
      <div className="p-6 border-b-2 border-gray-900 flex justify-between items-start bg-[url('https://www.transparenttextures.com/patterns/cream-paper.png')]">
        <div className="flex gap-6 items-start">
          <div 
            className="w-24 h-32 bg-gray-200 border-2 border-gray-900 flex flex-col items-center justify-center relative overflow-hidden group cursor-pointer"
            onClick={() => {
              if (character.imageUrl && onImageClick) onImageClick(character.imageUrl);
            }}
          >
            {character.imageUrl ? (
              <>
                <img src={character.imageUrl} alt={character.name} className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-110" referrerPolicy="no-referrer" />
                <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 flex items-center justify-center transition-opacity duration-300">
                  <span className="text-white text-[10px] font-mono font-bold tracking-widest bg-black/60 px-1 py-0.5">ENLARGE</span>
                </div>
              </>
            ) : (
              <>
                <User className="text-gray-400 w-12 h-12 mb-2" />
                <span className="text-[8px] font-mono font-bold tracking-widest text-gray-500 absolute bottom-2">PHOTO MISSING</span>
              </>
            )}
          </div>
          <div>
            <div className="flex items-center gap-2 mb-1">
              <span className="bg-gray-900 text-white text-xs font-mono px-2 py-0.5">FILE No. {character.id.padStart(4, '0')}</span>
              <span className="border border-gray-900 text-gray-900 text-xs font-mono px-2 py-0.5 uppercase">{character.role}</span>
            </div>
            <h2 className="text-4xl font-bold font-sans tracking-tight text-gray-900 mt-2">{character.name}</h2>
            <div className="mt-2 text-sm font-mono text-gray-600 flex items-center gap-4 border-t border-gray-300 pt-2">
              <span>SEX: <strong className="text-gray-900">{character.gender}</strong></span>
              <span>AGE: <strong className="text-gray-900">{character.age}</strong></span>
              <span>ALIGNMENT: <strong className="text-gray-900">{character.alignment}</strong></span>
            </div>
            <div className="flex flex-wrap gap-2 mt-3">
               {character.keywords.map((kw, i) => (
                  <span key={i} className="text-xs font-mono border border-gray-400 px-2 bg-gray-100 text-gray-700 uppercase">
                    {kw}
                  </span>
               ))}
            </div>
          </div>
        </div>
        
        <button onClick={onClose} className="p-2 hover:bg-gray-200 transition-colors text-gray-500 hover:text-gray-900 rounded-sm">
          <X className="w-6 h-6" />
        </button>
      </div>

      <div className="p-6 space-y-8 bg-white/50">
        
        {/* Official Stats Section */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="space-y-4">
            <div>
              <h3 className="text-xs font-mono font-bold text-gray-500 uppercase flex items-center border-b border-gray-200 pb-1 mb-2">
                <Activity className="w-3 h-3 mr-1" />
                Physical Specifications
              </h3>
              <p className="text-sm text-gray-800 font-sans leading-relaxed">{character.appearance}</p>
            </div>
            <div>
              <h3 className="text-xs font-mono font-bold text-gray-500 uppercase flex items-center border-b border-gray-200 pb-1 mb-2">
                <Activity className="w-3 h-3 mr-1" />
                Standard Wardrobe
              </h3>
              <p className="text-sm text-gray-800 font-sans leading-relaxed">{character.outfit}</p>
            </div>
          </div>
          
          <div className="space-y-4">
            <div>
              <h3 className="text-xs font-mono font-bold text-gray-500 uppercase flex items-center border-b border-gray-200 pb-1 mb-2">
                <Info className="w-3 h-3 mr-1" />
                Key Features
              </h3>
              <p className="text-sm text-gray-800 font-sans leading-relaxed">{character.features}</p>
            </div>
            <div>
              <h3 className="text-xs font-mono font-bold text-gray-500 uppercase flex items-center border-b border-gray-200 pb-1 mb-2">
                <Info className="w-3 h-3 mr-1" />
                Background
              </h3>
              <p className="text-sm text-gray-800 font-sans leading-relaxed">{character.background}</p>
            </div>
          </div>
        </div>

        {/* Confidential Tabloid Section */}
        <div className="mt-8 border-2 border-red-800 bg-red-50 relative p-6">
          <div className="absolute -top-3 left-6 bg-red-800 text-white text-xs font-mono font-bold px-3 py-1 flex items-center uppercase translate-y-[-10%] select-none z-10">
            <ShieldAlert className="w-4 h-4 mr-2" />
            Top Secret / Confidential
          </div>
          
          <div className="space-y-4">
            <div>
              <h4 className="text-xs font-mono font-bold text-red-800 mb-2 flex items-center uppercase">
                <Activity className="w-3 h-3 mr-1" />
                Tabloid & Rumors (찌라시)
              </h4>
              <p className="text-sm text-red-950 font-sans italic bg-white p-3 border border-red-200">
                "{character.rumorText}"
              </p>
            </div>
          </div>

          {/* Decorative CONFIDENTIAL STAMP */}
          <div className="absolute top-1/2 right-4 -translate-y-1/2 rotate-12 opacity-10 pointer-events-none mix-blend-multiply">
            <div className="text-7xl font-sans font-black text-red-600 border-8 border-red-600 px-4 py-2 uppercase">
              CONFIDENTIAL
            </div>
          </div>
        </div>

      </div>

    </motion.div>
  );
}
