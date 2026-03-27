import React from 'react';
import { MEDIUMS, GENRES, LIGHTING_OPTIONS, COLOR_GRADING, ASPECT_RATIOS, SCENARIOS } from '../constants';
import { GenerationSettings } from '../types';

interface SidebarProps {
  settings: GenerationSettings;
  updateSetting: (key: keyof GenerationSettings, value: string) => void;
  onGenerate: () => void;
  isGenerating: boolean;
  hasImage: boolean;
}

const Sidebar: React.FC<SidebarProps> = ({ 
  settings, 
  updateSetting, 
  onGenerate, 
  isGenerating,
  hasImage
}) => {
  return (
    <div className="flex flex-col gap-6">
      
      {/* Scenario Selection */}
      <div>
        <label className="block text-sm font-medium text-slate-300 mb-2">Generation Scenario</label>
        <select
          value={settings.scenario}
          onChange={(e) => updateSetting('scenario', e.target.value)}
          className="w-full bg-slate-800 border border-slate-700 rounded-lg px-3 py-2 text-sm text-slate-200 focus:outline-none focus:ring-2 focus:ring-indigo-500"
        >
          {SCENARIOS.map(s => <option key={s.id} value={s.id}>{s.label}</option>)}
        </select>
        {settings.scenario !== 'custom' && (
          <p className="text-xs text-indigo-400 mt-2">
            This will generate 4 mockups at once: {SCENARIOS.find(s => s.id === settings.scenario)?.mediums?.map(m => MEDIUMS.find(med => med.id === m)?.label).join(', ')}.
          </p>
        )}
      </div>

      {/* Mockup Medium */}
      <div className={settings.scenario !== 'custom' ? 'opacity-50 pointer-events-none' : ''}>
        <label className="block text-sm font-medium text-slate-300 mb-2">Marketing Medium (Custom)</label>
        <div className="grid grid-cols-2 gap-2">
          {MEDIUMS.map((m) => (
            <button
              key={m.id}
              onClick={() => updateSetting('medium', m.id)}
              className={`text-sm py-2 px-3 rounded-lg border text-left transition-all ${
                settings.medium === m.id
                  ? 'bg-indigo-600 border-indigo-500 text-white ring-2 ring-indigo-500/20'
                  : 'bg-slate-800 border-slate-700 text-slate-400 hover:bg-slate-750 hover:border-slate-600'
              }`}
            >
              {m.label}
            </button>
          ))}
        </div>
      </div>

      {/* Style & Atmosphere */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <div>
          <label className="block text-xs font-semibold text-slate-500 uppercase tracking-wider mb-2">Style</label>
          <select
            value={settings.genre}
            onChange={(e) => updateSetting('genre', e.target.value)}
            className="w-full bg-slate-800 border border-slate-700 rounded-lg px-3 py-2 text-sm text-slate-200 focus:outline-none focus:ring-2 focus:ring-indigo-500"
          >
            {GENRES.map(o => <option key={o.id} value={o.id}>{o.label}</option>)}
          </select>
        </div>

        <div>
          <label className="block text-xs font-semibold text-slate-500 uppercase tracking-wider mb-2">Lighting</label>
          <select
            value={settings.lighting}
            onChange={(e) => updateSetting('lighting', e.target.value)}
            className="w-full bg-slate-800 border border-slate-700 rounded-lg px-3 py-2 text-sm text-slate-200 focus:outline-none focus:ring-2 focus:ring-indigo-500"
          >
            {LIGHTING_OPTIONS.map(o => <option key={o.id} value={o.id}>{o.label}</option>)}
          </select>
        </div>

        <div>
          <label className="block text-xs font-semibold text-slate-500 uppercase tracking-wider mb-2">Color Grade</label>
          <select
            value={settings.colorGrading}
            onChange={(e) => updateSetting('colorGrading', e.target.value)}
            className="w-full bg-slate-800 border border-slate-700 rounded-lg px-3 py-2 text-sm text-slate-200 focus:outline-none focus:ring-2 focus:ring-indigo-500"
          >
            {COLOR_GRADING.map(o => <option key={o.id} value={o.id}>{o.label}</option>)}
          </select>
        </div>

        <div>
          <label className="block text-xs font-semibold text-slate-500 uppercase tracking-wider mb-2">Aspect Ratio</label>
          <select
            value={settings.aspectRatio}
            onChange={(e) => updateSetting('aspectRatio', e.target.value)}
            className="w-full bg-slate-800 border border-slate-700 rounded-lg px-3 py-2 text-sm text-slate-200 focus:outline-none focus:ring-2 focus:ring-indigo-500"
          >
            {ASPECT_RATIOS.map(o => <option key={o.id} value={o.id}>{o.label}</option>)}
          </select>
        </div>
      </div>

      {/* Magic Edit Prompt */}
      <div>
        <label className="block text-sm font-medium text-slate-300 mb-2 flex items-center justify-between">
          <span>Magic Edit Instruction</span>
          <span className="text-xs text-indigo-400 bg-indigo-500/10 px-2 py-0.5 rounded-full">Optional</span>
        </label>
        <textarea
          value={settings.customPrompt}
          onChange={(e) => updateSetting('customPrompt', e.target.value)}
          placeholder="E.g., Make it look like a vintage 80s advertisement, add smoke effects..."
          className="w-full bg-slate-800 border border-slate-700 rounded-lg px-3 py-2 text-sm text-slate-200 placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-indigo-500 h-24 resize-none"
        />
        <p className="text-xs text-slate-500 mt-2">
          Use this to override settings or add specific details like "Remove background" or "Add a neon glow".
        </p>
      </div>

      {/* Generate Button */}
      <button
        onClick={onGenerate}
        disabled={isGenerating || !hasImage}
        className={`w-full py-3.5 px-4 rounded-xl font-semibold text-white shadow-lg transition-all transform active:scale-95 flex items-center justify-center gap-2 ${
          isGenerating || !hasImage
            ? 'bg-slate-700 text-slate-400 cursor-not-allowed'
            : 'bg-gradient-to-r from-indigo-600 to-violet-600 hover:from-indigo-500 hover:to-violet-500 shadow-indigo-500/25'
        }`}
      >
        {isGenerating ? (
          <>
            <svg className="animate-spin -ml-1 mr-2 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
              <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
              <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
            </svg>
            Generating {settings.scenario === 'custom' ? 'Mockup' : '4 Mockups'}...
          </>
        ) : (
          <>
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-5 h-5">
              <path fillRule="evenodd" d="M9.315 7.584C12.195 3.883 16.695 1.5 21.75 1.5a.75.75 0 0 1 .75.75c0 5.056-2.383 9.555-6.084 12.436h.008c.11.042.22.1.328.17a7.5 7.5 0 0 1 1.059 12.019 7.5 7.5 0 0 1-11.899-2.051c.365.18.75.317 1.153.396a6 6 0 1 0 7.971-7.971c-.08.403-.216.788-.396 1.153a7.5 7.5 0 0 1-5.325-10.818zm-2.312 8.653-.023.003c-.22.029-.443.042-.668.042A6 6 0 0 1 1.5 10.5c0-.225.013-.448.042-.668l.002-.023a.75.75 0 0 1 .84-.664c3.085.312 5.748 1.956 7.422 4.394.133.193.072.46-.118.595l-1.928 1.368a.449.449 0 0 1-.532-.078z" clipRule="evenodd" />
            </svg>
            Generate {settings.scenario === 'custom' ? 'Mockup' : '4 Mockups'}
          </>
        )}
      </button>
      
      {!hasImage && (
        <p className="text-xs text-red-400 text-center mt-[-1rem]">
          Please upload an image first
        </p>
      )}
    </div>
  );
};

export default Sidebar;