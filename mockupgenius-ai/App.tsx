import React, { useState } from 'react';
import ImageDropzone from './components/ImageDropzone';
import Sidebar from './components/Sidebar';
import PreviewArea from './components/PreviewArea';
import { GenerationSettings, GeneratedImage, AspectRatio, AppState } from './types';
import { generateMockup } from './services/gemini';
import { MEDIUMS, GENRES, LIGHTING_OPTIONS, COLOR_GRADING, SCENARIOS } from './constants';

const App: React.FC = () => {
  const [sourceImage, setSourceImage] = useState<string | null>(null);
  const [appState, setAppState] = useState<AppState>(AppState.IDLE);
  
  const [settings, setSettings] = useState<GenerationSettings>({
    scenario: 'custom',
    medium: 'coffee-mug',
    genre: 'photorealistic',
    lighting: 'natural',
    colorGrading: 'standard',
    aspectRatio: '1:1',
    customPrompt: '',
  });

  const [generatedImages, setGeneratedImages] = useState<GeneratedImage[]>([]);
  const [currentViewImage, setCurrentViewImage] = useState<GeneratedImage | null>(null);

  const updateSetting = (key: keyof GenerationSettings, value: string) => {
    setSettings(prev => ({ ...prev, [key]: value }));
  };

  const constructPrompt = (mediumId: string): string => {
    const mediumLabel = MEDIUMS.find(m => m.id === mediumId)?.label || mediumId;
    const genreLabel = GENRES.find(g => g.id === settings.genre)?.label || settings.genre;
    const lightingLabel = LIGHTING_OPTIONS.find(l => l.id === settings.lighting)?.label || settings.lighting;
    const colorLabel = COLOR_GRADING.find(c => c.id === settings.colorGrading)?.label || settings.colorGrading;

    // The user's custom instructions are powerful overrides
    if (settings.customPrompt.trim().length > 0) {
      return `Transform the input image: ${settings.customPrompt}. 
              Context: Place the design on a ${mediumLabel}. 
              Style: ${genreLabel}. Lighting: ${lightingLabel}. Colors: ${colorLabel}.
              Ensure high quality photorealistic mockup.`;
    }

    // Default structured prompt
    return `Create a professional high-resolution product mockup. 
            Apply the provided design/logo onto a ${mediumLabel}.
            The product should be the main focus.
            Art Style: ${genreLabel}.
            Lighting Condition: ${lightingLabel}.
            Color Grading: ${colorLabel}.
            Ensure the design from the input image is clearly visible and naturally warped/applied to the surface of the ${mediumLabel}.`;
  };

  const handleGenerate = async () => {
    if (!sourceImage) return;

    setAppState(AppState.LOADING);
    
    try {
      const scenario = SCENARIOS.find(s => s.id === settings.scenario);
      let mediumsToGenerate = [settings.medium];
      
      if (scenario && scenario.id !== 'custom' && scenario.mediums) {
        mediumsToGenerate = scenario.mediums;
      }

      const promises = mediumsToGenerate.map(async (mediumId) => {
        const prompt = constructPrompt(mediumId);
        const imageUrl = await generateMockup(
          sourceImage, 
          prompt, 
          settings.aspectRatio as AspectRatio
        );

        return {
          id: Date.now().toString() + Math.random().toString(36).substring(7),
          url: imageUrl,
          prompt: prompt,
          timestamp: Date.now(),
        } as GeneratedImage;
      });

      const newImages = await Promise.all(promises);

      setGeneratedImages(prev => [...newImages, ...prev]);
      setCurrentViewImage(newImages[0]);
      setAppState(AppState.SUCCESS);

    } catch (error) {
      console.error("Generation failed", error);
      alert("Failed to generate mockup. Please check your API key and try again.");
      setAppState(AppState.ERROR);
    }
  };

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 flex flex-col md:flex-row">
      
      {/* Sidebar Control Panel */}
      <aside className="w-full md:w-[400px] bg-slate-900 border-r border-slate-800 p-6 flex flex-col h-auto md:h-screen overflow-y-auto">
        <div className="mb-8">
          <div className="flex items-center gap-3 mb-1">
            <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-indigo-500 to-violet-600 flex items-center justify-center shadow-lg shadow-indigo-500/30">
              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-5 h-5 text-white">
                <path d="M2.273 5.625A4.483 4.483 0 0 1 5.25 4.5h13.5c1.141 0 2.183.425 2.977 1.125A3 3 0 0 0 18.75 3H5.25a3 3 0 0 0-2.977 2.625ZM2.273 8.625A4.483 4.483 0 0 1 5.25 7.5h13.5c1.141 0 2.183.425 2.977 1.125A3 3 0 0 0 18.75 6H5.25a3 3 0 0 0-2.977 2.625ZM5.25 9a3 3 0 0 0-3 3v6a3 3 0 0 0 3 3h13.5a3 3 0 0 0 3-3v-6a3 3 0 0 0-3-3H5.25Z" />
              </svg>
            </div>
            <h1 className="text-xl font-bold tracking-tight text-white">Mockup<span className="text-indigo-400">Genius</span></h1>
          </div>
          <p className="text-xs text-slate-500 pl-11">Powered by Gemini Nano Banana</p>
          <p className="text-xs text-slate-500 pl-11 mt-1">Made by : Lazy Broken ❤️</p>
        </div>

        <ImageDropzone 
          onImageSelect={setSourceImage} 
          selectedImage={sourceImage}
        />

        <Sidebar 
          settings={settings}
          updateSetting={updateSetting}
          onGenerate={handleGenerate}
          isGenerating={appState === AppState.LOADING}
          hasImage={!!sourceImage}
        />
        
        <div className="mt-auto pt-8 text-center">
             <p className="text-xs text-slate-600">
               Gemini 2.5 Flash Image Model (Nano Banana)
             </p>
        </div>
      </aside>

      {/* Main Content Area */}
      <main className="flex-1 p-6 md:p-8 h-screen overflow-y-auto bg-slate-950">
        <header className="mb-6 flex justify-between items-center">
          <div>
            <h2 className="text-2xl font-semibold text-white">Preview Gallery</h2>
            <p className="text-slate-400 text-sm">Visualize your brand in infinite contexts.</p>
          </div>
          <div className="flex gap-2">
            <span className="px-3 py-1 bg-indigo-500/10 text-indigo-400 rounded-full text-xs font-medium border border-indigo-500/20">
               {generatedImages.length} Generated
            </span>
          </div>
        </header>

        <div className="h-[calc(100vh-140px)]">
           <PreviewArea 
              currentImage={currentViewImage}
              history={generatedImages}
              isGenerating={appState === AppState.LOADING}
              onSelectHistory={setCurrentViewImage}
           />
        </div>
      </main>

    </div>
  );
};

export default App;