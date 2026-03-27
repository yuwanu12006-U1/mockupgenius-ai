import React, { useState } from 'react';
import { GeneratedImage } from '../types';

interface PreviewAreaProps {
  currentImage: GeneratedImage | null;
  history: GeneratedImage[];
  isGenerating: boolean;
  onSelectHistory: (image: GeneratedImage) => void;
}

const PreviewArea: React.FC<PreviewAreaProps> = ({ 
  currentImage, 
  history, 
  isGenerating,
  onSelectHistory 
}) => {
  const [imgLoaded, setImgLoaded] = useState(false);

  const downloadImage = (url: string, id: string) => {
    const link = document.createElement('a');
    link.href = url;
    link.download = `mockup-genius-${id}.png`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  return (
    <div className="flex flex-col h-full">
      
      {/* Main Preview */}
      <div className="flex-1 bg-slate-800/50 rounded-2xl border border-slate-700 overflow-hidden relative min-h-[400px] flex items-center justify-center">
        {isGenerating ? (
          <div className="text-center p-8 animate-pulse">
            <div className="w-24 h-24 bg-slate-700 rounded-full mx-auto mb-4"></div>
            <div className="h-4 bg-slate-700 rounded max-w-[200px] mx-auto mb-2"></div>
            <div className="h-3 bg-slate-700 rounded max-w-[150px] mx-auto"></div>
            <p className="text-slate-400 mt-6 text-sm">Processing with Gemini Nano Banana...</p>
          </div>
        ) : currentImage ? (
          <div className="relative w-full h-full flex items-center justify-center bg-[url('https://www.transparenttextures.com/patterns/cubes.png')] bg-repeat">
            <img
              src={currentImage.url}
              alt="Generated Mockup"
              className={`max-w-full max-h-full object-contain shadow-2xl transition-opacity duration-500 ${imgLoaded ? 'opacity-100' : 'opacity-0'}`}
              onLoad={() => setImgLoaded(true)}
            />
            
            {/* Actions overlay */}
            <div className="absolute top-4 right-4 flex gap-2">
              <button
                onClick={() => downloadImage(currentImage.url, currentImage.id)}
                className="bg-slate-900/80 hover:bg-black text-white p-2 rounded-lg backdrop-blur-sm transition-colors"
                title="Download"
              >
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-5 h-5">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M3 16.5v2.25A2.25 2.25 0 0 0 5.25 21h13.5A2.25 2.25 0 0 0 21 18.75V16.5M12 12.75l-7.5-7.5 7.5 7.5ZM12 12.75V3" />
                </svg>
              </button>
            </div>
            
            <div className="absolute bottom-4 left-4 right-4 bg-black/60 backdrop-blur-md p-3 rounded-lg border border-white/10 text-xs text-white/80 line-clamp-2">
              <span className="font-semibold text-indigo-400">Prompt: </span>
              {currentImage.prompt}
            </div>
          </div>
        ) : (
          <div className="text-center text-slate-500 p-8">
            <div className="w-20 h-20 bg-slate-800 rounded-2xl mx-auto mb-4 border border-slate-700 flex items-center justify-center transform rotate-3">
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1} stroke="currentColor" className="w-10 h-10 text-slate-600">
                <path strokeLinecap="round" strokeLinejoin="round" d="m2.25 15.75 5.159-5.159a2.25 2.25 0 0 1 3.182 0l5.159 5.159m-1.5-1.5 1.409-1.409a2.25 2.25 0 0 1 3.182 0l2.909 2.909m-18 3.75h16.5a1.5 1.5 0 0 0 1.5-1.5V6a1.5 1.5 0 0 0-1.5-1.5H3.75A1.5 1.5 0 0 0 2.25 6v12a1.5 1.5 0 0 0 1.5 1.5Zm10.5-11.25h.008v.008h-.008V8.25Zm.375 0a.375.375 0 1 1-.75 0 .375.375 0 0 1 .75 0Z" />
              </svg>
            </div>
            <h3 className="text-lg font-medium text-slate-300 mb-1">Ready to Create</h3>
            <p>Upload a design and configure settings to generate your first mockup.</p>
          </div>
        )}
      </div>

      {/* History Strip */}
      {history.length > 0 && (
        <div className="mt-6">
          <h4 className="text-sm font-semibold text-slate-400 mb-3 uppercase tracking-wider">Recent Generations</h4>
          <div className="flex gap-3 overflow-x-auto pb-4 scrollbar-hide">
            {history.map((img) => (
              <button
                key={img.id}
                onClick={() => onSelectHistory(img)}
                className={`flex-shrink-0 w-24 h-24 rounded-lg overflow-hidden border-2 transition-all ${
                  currentImage?.id === img.id
                    ? 'border-indigo-500 ring-2 ring-indigo-500/20'
                    : 'border-slate-700 hover:border-slate-500'
                }`}
              >
                <img src={img.url} alt="History" className="w-full h-full object-cover" />
              </button>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default PreviewArea;