"use client";                 // <--- MUHIM

import React, { useEffect, useState } from 'react';
import { ArrowRight, Terminal } from 'lucide-react';

function App() {
  const [matrixChars, setMatrixChars] = useState<string[]>([]);
  const [binaryNumbers, setBinaryNumbers] = useState<Array<{id: number, x: number, y: number, value: string}>>([]);

  useEffect(() => {
    // Generate matrix characters
    const chars = [];
    const matrixCharSet = 'アァカサタナハマヤャラワガザダバパイィキシチニヒミリヰギジヂビピウゥクスツヌフムユュルグズブヅプエェケセテネヘメレヱゲゼデベペオォコソトノホモヨョロヲゴゾドボポヴッン0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZ';
    
    for (let i = 0; i < 100; i++) {
      chars.push(matrixCharSet[Math.floor(Math.random() * matrixCharSet.length)]);
    }
    setMatrixChars(chars);

    // Generate floating binary numbers
    const binaries = [];
    for (let i = 0; i < 15; i++) {
      binaries.push({
        id: i,
        x: Math.random() * 100,
        y: Math.random() * 100,
        value: Math.random().toString(2).substring(2, 10)
      });
    }
    setBinaryNumbers(binaries);
  }, []);

  const handleBackToSafety = () => {
    window.history.back();
  };

  return (
    <div className="min-h-screen bg-black overflow-hidden relative flex items-center justify-center">
      {/* Matrix Rain Background */}
      <div className="absolute inset-0 opacity-20">
        {[...Array(20)].map((_, i) => (
          <div
            key={i}
            className="absolute top-0 text-green-400 text-sm font-mono leading-none"
            style={{
              left: `${i * 5}%`,
              animation: `matrixRain ${3 + Math.random() * 4}s linear infinite`,
              animationDelay: `${Math.random() * 2}s`
            }}
          >
            {matrixChars.slice(i * 5, (i + 1) * 5).map((char, j) => (
              <div key={j} className="block" style={{ animationDelay: `${j * 0.1}s` }}>
                {char}
              </div>
            ))}
          </div>
        ))}
      </div>

      {/* Floating Binary Numbers */}
      {binaryNumbers.map((binary) => (
        <div
          key={binary.id}
          className="absolute text-cyan-400 opacity-30 font-mono text-xs select-none pointer-events-none"
          style={{
            left: `${binary.x}%`,
            top: `${binary.y}%`,
            animation: `float ${4 + Math.random() * 3}s ease-in-out infinite`,
            animationDelay: `${Math.random() * 2}s`
          }}
        >
          {binary.value}
        </div>
      ))}

      {/* Main Content */}
      <div className="relative z-10 text-center max-w-4xl mx-auto px-4">
        {/* Glitching 404 */}
        <div className="mb-8">
          <h1 className="text-8xl md:text-9xl font-bold text-white mb-4 relative glitch-text">
            <span className="absolute inset-0 text-red-500 animate-pulse" style={{ clipPath: 'polygon(0 0, 100% 0, 100% 45%, 0 45%)' }}>
              404
            </span>
            <span className="absolute inset-0 text-cyan-400" style={{ 
              clipPath: 'polygon(0 55%, 100% 55%, 100% 100%, 0 100%)',
              animation: 'glitchShift 0.3s infinite alternate-reverse'
            }}>
              404
            </span>
            <span className="relative">404</span>
          </h1>
        </div>

        {/* Terminal Window */}
        <div className="bg-gray-900 border-2 border-green-400 rounded-lg p-6 mb-8 mx-auto max-w-md shadow-lg shadow-green-400/20">
          <div className="flex items-center mb-4">
            <div className="flex space-x-2">
              <div className="w-3 h-3 bg-red-500 rounded-full"></div>
              <div className="w-3 h-3 bg-yellow-500 rounded-full"></div>
              <div className="w-3 h-3 bg-green-500 rounded-full"></div>
            </div>
            <div className="ml-4 text-gray-400 text-sm font-mono">terminal</div>
          </div>
          <div className="font-mono text-green-400 text-sm">
            <div className="mb-2">$ cd /route-not-found</div>
            <div className="mb-2 text-red-400">bash: route not found</div>
            <div className="flex items-center">
              <span>$ </span>
              <span className="ml-1 animate-pulse bg-green-400 w-2 h-4 inline-block"></span>
            </div>
          </div>
        </div>

        {/* Pixel Cat with VR Goggles and Keyboard */}
        <div className="mb-8 relative">
          <div className="inline-block relative">
            {/* Glowing Keyboard */}
            <div className="bg-gray-800 border-2 border-cyan-400 rounded-lg p-4 shadow-lg shadow-cyan-400/30">
              <div className="grid grid-cols-10 gap-1 mb-2">
                {[...Array(30)].map((_, i) => (
                  <div key={i} className={`w-4 h-4 rounded border ${Math.random() > 0.7 ? 'bg-cyan-400 border-cyan-300 shadow-sm shadow-cyan-400' : 'bg-gray-700 border-gray-600'}`}></div>
                ))}
              </div>
              <div className="w-20 h-4 bg-gray-700 border border-gray-600 rounded mx-auto"></div>
            </div>
            
            {/* Pixel Cat */}
            <div className="absolute -top-8 left-1/2 transform -translate-x-1/2">
              <div className="relative">
                {/* Cat Body */}
                <div className="pixel-cat">
                  {/* VR Goggles */}
                  <div className="absolute -top-1 left-1/2 transform -translate-x-1/2">
                    <div className="w-6 h-3 bg-purple-600 border border-purple-400 rounded-sm shadow-sm shadow-purple-400/50"></div>
                    <div className="absolute top-0 left-0 w-2 h-3 bg-cyan-300 rounded-sm animate-pulse"></div>
                    <div className="absolute top-0 right-0 w-2 h-3 bg-cyan-300 rounded-sm animate-pulse"></div>
                  </div>
                  
                  {/* Cat Head */}
                  <div className="w-8 h-6 bg-orange-400 border-2 border-orange-300 relative">
                    {/* Ears */}
                    <div className="absolute -top-2 left-0 w-2 h-2 bg-orange-400 border border-orange-300 transform rotate-45"></div>
                    <div className="absolute -top-2 right-0 w-2 h-2 bg-orange-400 border border-orange-300 transform rotate-45"></div>
                    
                    {/* Eyes under goggles */}
                    <div className="absolute top-1 left-1 w-1 h-1 bg-green-400 animate-pulse"></div>
                    <div className="absolute top-1 right-1 w-1 h-1 bg-green-400 animate-pulse"></div>
                  </div>
                  
                  {/* Cat Body */}
                  <div className="w-6 h-4 bg-orange-400 border border-orange-300 mx-auto"></div>
                  
                  {/* Cat Tail */}
                  <div className="absolute top-2 -right-2 w-3 h-1 bg-orange-400 border border-orange-300 transform rotate-45"></div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Back Button */}
        <button
          onClick={handleBackToSafety}
          className="group bg-transparent border-2 border-green-400 text-green-400 px-8 py-3 rounded-lg font-mono text-lg hover:bg-green-400 hover:text-black transition-all duration-300 shadow-lg shadow-green-400/20 hover:shadow-green-400/40"
        >
          <span className="flex items-center justify-center space-x-2">
            <span>Back to safety</span>
            <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform duration-300" />
          </span>
        </button>

        {/* Subtitle */}
        <p className="mt-6 text-gray-400 font-mono text-sm">
          ERROR: The page you're looking for has been lost in the matrix...
        </p>
      </div>

      <style jsx>{`
        @keyframes matrixRain {
          0% { transform: translateY(-100vh); opacity: 1; }
          100% { transform: translateY(100vh); opacity: 0; }
        }

        @keyframes float {
          0%, 100% { transform: translateY(0px) rotate(0deg); }
          50% { transform: translateY(-20px) rotate(5deg); }
        }

        @keyframes glitchShift {
          0% { transform: translate(0); }
          20% { transform: translate(-2px, 2px); }
          40% { transform: translate(-2px, -2px); }
          60% { transform: translate(2px, 2px); }
          80% { transform: translate(2px, -2px); }
          100% { transform: translate(0); }
        }

        .glitch-text {
          animation: glitch 1s infinite;
        }

        @keyframes glitch {
          0%, 90%, 100% { transform: translate(0); }
          10% { transform: translate(-1px, -1px); }
          20% { transform: translate(1px, 1px); }
          30% { transform: translate(-1px, 1px); }
          40% { transform: translate(1px, -1px); }
          50% { transform: translate(-1px, -1px); }
          60% { transform: translate(1px, 1px); }
          70% { transform: translate(-1px, 1px); }
          80% { transform: translate(1px, -1px); }
        }

        .pixel-cat {
          image-rendering: pixelated;
          image-rendering: -moz-crisp-edges;
          filter: drop-shadow(0 0 5px rgba(255, 165, 0, 0.5));
        }
      `}</style>
    </div>
  );
}

export default App;