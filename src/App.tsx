import { useState } from 'react';
import { characters } from './data';
import { Character } from './types';
import CastingGrid from './components/CastingGrid';
import Dossier from './components/Dossier';
import { Database, ShieldAlert, Lock, X } from 'lucide-react';
import { AnimatePresence, motion } from 'motion/react';

export default function App() {
  const [isEntered, setIsEntered] = useState(false);
  const [selectedChar, setSelectedChar] = useState<Character | null>(null);
  const [enlargedImage, setEnlargedImage] = useState<string | null>(null);

  if (!isEntered) {
    return (
      <div 
        className="min-h-screen bg-gray-900 flex items-center justify-center p-8 bg-[url('https://www.transparenttextures.com/patterns/cream-paper.png')] bg-blend-multiply relative cursor-pointer" 
        onClick={() => setIsEntered(true)}
      >
        <div className="max-w-2xl w-full bg-[#fcfcfc] border-4 border-gray-900 shadow-2xl p-8 md:p-12 text-center relative rotate-1 hover:rotate-0 transition-transform duration-500 hover:shadow-[0_20px_50px_rgba(220,38,38,0.3)]">
           <div className="absolute top-6 left-6 text-xl md:text-2xl font-black text-red-600 border-4 border-red-600 px-3 py-1 rotate-[-15deg] opacity-90 tracking-widest">
             CONFIDENTIAL
           </div>
           <ShieldAlert className="w-20 h-20 mx-auto text-gray-900 mb-6 drop-shadow-md mt-12 md:mt-0" />
           <h1 className="text-4xl md:text-5xl font-black font-sans uppercase mb-4 tracking-tighter text-gray-900">Official Casting Registry</h1>
           <h2 className="text-lg md:text-xl font-mono text-gray-600 mb-8 border-b-2 border-gray-300 pb-8 tracking-widest">PROJECT CODE: 7A-OMEGA</h2>
           
           <div className="space-y-4 text-xs md:text-sm font-mono text-red-800 font-bold uppercase text-left bg-red-50 p-6 border border-red-200">
             <p className="flex items-start"><span className="text-red-500 mr-2">▶</span> WARNING: This document contains strictly confidential biographical and observational data.</p>
             <p className="flex items-start"><span className="text-red-500 mr-2">▶</span> Unauthorized distribution is strictly prohibited under NDA Sections 4(a) and 8(b).</p>
             <p className="flex items-start"><span className="text-red-500 mr-2">▶</span> Includes unverified tabloids and sensitive profiles.</p>
           </div>
           
           <div className="mt-12 flex justify-center">
             <button className="flex items-center space-x-2 bg-gray-900 text-white font-mono px-8 py-4 text-lg hover:bg-gray-800 transition-colors uppercase animate-pulse">
                <Lock className="w-5 h-5" />
                <span>Break Seal to Open</span>
             </button>
           </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#f3f4f6] font-sans selection:bg-gray-900 selection:text-white pb-20">
      {/* Top Navigation / Header */}
      <header className="bg-gray-900 text-white border-b-4 border-gray-400 py-4 px-6 md:px-12 flex items-center justify-between sticky top-0 z-50">
        <div className="flex items-center space-x-3">
          <Database className="w-6 h-6 text-gray-300" />
          <h1 className="text-xl font-bold font-mono tracking-widest uppercase text-gray-100">Casting DB <span className="text-red-500">v1.9</span></h1>
        </div>
        <div className="text-xs font-mono text-gray-400 border border-gray-600 px-2 py-1">
          SECURE CONNECTION
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-4 md:px-8 mt-8 flex flex-col xl:flex-row gap-8 relative items-start">
        
        {/* Left column: Grid of characters */}
        <div className={`w-full ${selectedChar ? 'xl:w-1/3' : 'xl:w-full'} transition-all duration-300 ease-in-out`}>
          <div className="mb-6 border-b-2 border-gray-900 pb-2 flex items-end justify-between">
            <h2 className="text-2xl font-bold font-sans tracking-tight text-gray-900">Actor Registry</h2>
            <span className="text-sm font-mono text-gray-500 font-bold">{characters.length} RECORDS</span>
          </div>
          <CastingGrid
            characters={characters}
            onSelect={setSelectedChar}
            selectedId={selectedChar?.id || null}
          />
        </div>

        {/* Right column (or modal on mobile): Dossier detail view */}
        <AnimatePresence mode="popLayout">
          {selectedChar && (
            <motion.div
              key="dossier"
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: 20 }}
              className="w-full xl:w-2/3 xl:sticky xl:top-24"
            >
              <Dossier character={selectedChar} onClose={() => setSelectedChar(null)} onImageClick={setEnlargedImage} />
            </motion.div>
          )}
        </AnimatePresence>

      </main>

      {/* Fullscreen Image Overlay */}
      <AnimatePresence>
        {enlargedImage && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[100] bg-black/90 flex flex-col items-center justify-center p-4 cursor-zoom-out backdrop-blur-sm"
            onClick={() => setEnlargedImage(null)}
          >
            <div className="absolute top-6 right-6 flex items-center space-x-2 text-white/50 hover:text-white transition-colors">
              <span className="text-xs font-mono font-bold tracking-widest uppercase">Close</span>
              <X className="w-8 h-8" />
            </div>
            <img 
              src={enlargedImage} 
              alt="Enlarged profile" 
              className="max-w-full max-h-[90vh] object-contain border-4 border-gray-300 shadow-2xl" 
              referrerPolicy="no-referrer"
            />
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
