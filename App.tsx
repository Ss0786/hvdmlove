
import React, { useState, useRef, useEffect } from 'react';
import RosePetals from './components/RosePetals';
import Slide from './components/Slide';
import Typewriter from './components/Typewriter';
import { SlideId } from './types';
import { SHAYARI, GIFS, MUSIC_URL } from './constants';

const App: React.FC = () => {
  const [currentSlide, setCurrentSlide] = useState<SlideId>(SlideId.WELCOME);
  const [noButtonPos, setNoButtonPos] = useState({ top: 'auto', left: 'auto' });
  const [isMusicPlaying, setIsMusicPlaying] = useState(false);
  const [showHeartBurst, setShowHeartBurst] = useState(false);
  const audioRef = useRef<HTMLAudioElement>(null);

  const startJourney = () => {
    if (audioRef.current) {
      // Jump to a more vibrant middle part of the track (approx 85 seconds in)
      // to avoid a long slow intro and get straight to the romantic mood.
      try {
        audioRef.current.currentTime = 85;
      } catch (err) {
        console.warn("Audio metadata not loaded, starting from beginning or previous position.");
      }
      
      audioRef.current.play().catch(e => console.log("Audio play failed:", e));
      setIsMusicPlaying(true);
    }
    setCurrentSlide(SlideId.PROPOSAL);
  };

  const handleNoButton = () => {
    const randomTop = Math.floor(Math.random() * 70 + 15) + '%';
    const randomLeft = Math.floor(Math.random() * 70 + 15) + '%';
    setNoButtonPos({ top: randomTop, left: randomLeft });
  };

  const handleYes = () => {
    setShowHeartBurst(true);
    setTimeout(() => {
      setCurrentSlide(SlideId.FINALE);
      setShowHeartBurst(false);
    }, 2000);
  };

  const toggleMusic = () => {
    if (audioRef.current) {
      if (isMusicPlaying) {
        audioRef.current.pause();
      } else {
        audioRef.current.play();
      }
      setIsMusicPlaying(!isMusicPlaying);
    }
  };

  return (
    <div className="relative min-h-screen w-full bg-black text-white overflow-hidden selection:bg-pink-500/30">
      {/* Background Petals */}
      <RosePetals />

      {/* Music Controller Overlay */}
      <button 
        onClick={toggleMusic}
        className="fixed top-4 right-4 z-50 p-2 bg-crimson-800/30 backdrop-blur-md rounded-full border border-pink-500/50 hover:scale-110 transition-transform"
      >
        {isMusicPlaying ? (
          <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-pink-400"><path d="M9 18V5l12-2v13"></path><circle cx="6" cy="18" r="3"></circle><circle cx="18" cy="16" r="3"></circle></svg>
        ) : (
          <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-gray-400"><line x1="1" y1="1" x2="23" y2="23"></line><path d="M9 18V5l12-2v13"></path><circle cx="6" cy="18" r="3"></circle><circle cx="18" cy="16" r="3"></circle></svg>
        )}
      </button>

      <audio ref={audioRef} loop src={MUSIC_URL} preload="auto" />

      {/* Slide 1: Welcome */}
      <Slide isActive={currentSlide === SlideId.WELCOME}>
        <div className="text-center animate-pulse mb-8">
            <img 
              src={GIFS.WELCOME} 
              alt="Welcome" 
              className="w-48 h-48 md:w-64 md:h-64 object-contain mx-auto rounded-3xl shadow-2xl shadow-pink-500/20"
            />
        </div>
        <h1 className="text-5xl md:text-7xl font-romantic text-red-500 mb-4 drop-shadow-lg text-center">
          Happy Valentine's Day My Love, Arjuman
        </h1>
        <p className="text-pink-200 text-lg md:text-2xl font-handwritten mb-12 text-center opacity-80">
          I've made something special just for you...
        </p>
        <button
          onClick={startJourney}
          className="px-12 py-4 bg-gradient-to-r from-red-600 to-pink-600 rounded-full text-xl font-bold uppercase tracking-widest hover:shadow-[0_0_20px_rgba(220,20,60,0.6)] hover:scale-105 active:scale-95 transition-all"
        >
          Start
        </button>
      </Slide>

      {/* Slide 2: Interactive Proposal */}
      <Slide isActive={currentSlide === SlideId.PROPOSAL}>
        <div className="text-center mb-8">
           <img 
              src={GIFS.PROPOSAL} 
              alt="Question" 
              className="w-64 h-64 md:w-80 md:h-80 object-contain mx-auto rounded-full border-4 border-pink-900/50"
            />
        </div>
        <h2 className="text-4xl md:text-6xl font-romantic text-pink-300 mb-16 text-center">
          Will you be my Valentine?
        </h2>
        
        <div className="flex gap-8 items-center justify-center min-h-[100px] w-full relative">
          <button
            onClick={handleYes}
            className="z-20 px-10 py-4 bg-green-600 hover:bg-green-500 rounded-xl text-2xl font-bold transition-all hover:scale-110 active:scale-95 shadow-lg shadow-green-900/50"
          >
            YES!
          </button>
          
          <button
            onMouseEnter={handleNoButton}
            onClick={handleNoButton}
            style={{
              position: noButtonPos.top === 'auto' ? 'relative' : 'fixed',
              top: noButtonPos.top,
              left: noButtonPos.left,
              transition: 'all 0.15s ease-out',
            }}
            className="px-10 py-4 bg-red-800 hover:bg-red-700 rounded-xl text-2xl font-bold opacity-80"
          >
            NO
          </button>
        </div>

        {showHeartBurst && (
          <div className="fixed inset-0 z-50 flex items-center justify-center pointer-events-none">
            <img src={GIFS.HEARTS_BURST} alt="Heart Burst" className="w-full h-full object-cover opacity-80" />
            <h2 className="absolute text-7xl font-romantic text-white drop-shadow-2xl animate-bounce">Yay! ❤️</h2>
          </div>
        )}
      </Slide>

      {/* Slide 3: Grand Finale */}
      <Slide isActive={currentSlide === SlideId.FINALE}>
        <div className="w-full max-h-[80vh] overflow-y-auto custom-scrollbar flex flex-col items-center">
          <div className="mb-8">
            <img 
              src={GIFS.DANCING_COUPLE} 
              alt="Romantic Dance" 
              className="w-64 h-64 md:w-96 md:h-96 object-contain rounded-2xl shadow-xl shadow-red-900/50"
            />
          </div>
          
          <div className="p-8 bg-red-950/20 backdrop-blur-sm rounded-3xl border border-red-500/20 shadow-inner w-full">
            <Typewriter lines={SHAYARI} speed={60} />
          </div>

          <div className="mt-12 text-center text-pink-500 font-handwritten text-xl animate-pulse">
            With all my love, forever yours.
          </div>
        </div>
      </Slide>

      {/* Background Star Decoration */}
      <div className="fixed inset-0 pointer-events-none z-0">
        {[...Array(50)].map((_, i) => (
          <div 
            key={i}
            className="absolute rounded-full bg-white opacity-20 animate-twinkle"
            style={{
              width: Math.random() * 3 + 'px',
              height: Math.random() * 3 + 'px',
              top: Math.random() * 100 + '%',
              left: Math.random() * 100 + '%',
              animation: `pulse ${2 + Math.random() * 3}s infinite`,
              animationDelay: Math.random() * 5 + 's'
            }}
          />
        ))}
      </div>
    </div>
  );
};

export default App;