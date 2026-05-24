import { Character } from '../types';
import { User, ShieldAlert, Star } from 'lucide-react';

interface CastingGridProps {
  characters: Character[];
  onSelect: (character: Character) => void;
  selectedId: string | null;
}

export default function CastingGrid({ characters, onSelect, selectedId }: CastingGridProps) {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
      {characters.map((char) => {
        const isSelected = char.id === selectedId;
        return (
          <button
            key={char.id}
            onClick={() => onSelect(char)}
            className={`flex flex-col text-left p-4 bg-white border-2 transition-all duration-200 shadow-sm hover:shadow-md ${
              isSelected ? 'border-gray-900 ring-2 ring-gray-900 ring-offset-2 bg-gray-50' : 'border-gray-200 hover:border-gray-400'
            }`}
          >
            <div className="flex items-start justify-between w-full mb-3">
              <div className="flex items-center space-x-3">
                <div className="w-12 h-12 bg-gray-200 border-2 border-dashed border-gray-400 flex items-center justify-center overflow-hidden">
                  {char.imageUrl ? (
                    <img src={char.imageUrl} alt={char.name} className="w-full h-full object-cover" referrerPolicy="no-referrer" />
                  ) : (
                    <User className="text-gray-500 w-6 h-6" />
                  )}
                </div>
                <div>
                  <h3 className="font-bold text-lg text-gray-900 leading-tight">{char.name}</h3>
                  <p className="text-xs font-mono text-gray-500 uppercase tracking-widest">{char.role}</p>
                </div>
              </div>
              <div className="flex flex-col items-end">
                <span className="text-xs font-mono font-bold bg-gray-100 text-gray-600 px-2 py-1 uppercase">{char.gender} / {char.age}</span>
              </div>
            </div>

            <div className="space-y-2 w-full">
              <div className="flex flex-wrap gap-1">
                {char.keywords.map((kw, idx) => (
                  <span key={idx} className="text-[10px] font-mono uppercase bg-gray-900 text-white px-1.5 py-0.5">
                    {kw}
                  </span>
                ))}
              </div>
              <div className="flex items-center text-xs font-mono text-gray-600 mt-2">
                <Star className="w-3 h-3 mr-1" />
                <span className="truncate">{char.alignment}</span>
              </div>
            </div>
            
            <div className="mt-3 pt-3 border-t border-gray-100 w-full flex items-center text-[10px] text-red-600 font-mono font-bold">
              <ShieldAlert className="w-3 h-3 mr-1" />
              <span>CLASSIFIED DATA ATTACHED</span>
            </div>
          </button>
        );
      })}
    </div>
  );
}
