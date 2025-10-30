
import React, { useState, useCallback } from 'react';
import { generateImagesFromApi } from './services/geminiService';
import { Spinner } from './components/Spinner';
import { ImageCard } from './components/ImageCard';
import { AlertTriangle, Wand2 } from 'lucide-react';

const App: React.FC = () => {
  const [prompt, setPrompt] = useState<string>('dame imagenes de jabones 100% artesanales');
  const [images, setImages] = useState<string[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  const handleGenerate = useCallback(async () => {
    if (!prompt || isLoading) return;

    setIsLoading(true);
    setError(null);
    setImages([]);

    try {
      const generatedImages = await generateImagesFromApi(prompt);
      setImages(generatedImages);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'An unknown error occurred.');
    } finally {
      setIsLoading(false);
    }
  }, [prompt, isLoading]);

  return (
    <div className="min-h-screen bg-gray-900 text-gray-100 flex flex-col items-center p-4 sm:p-6 lg:p-8 font-sans">
      <div className="w-full max-w-5xl">
        <header className="text-center mb-8">
          <h1 className="text-4xl sm:text-5xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-pink-600 mb-2">
            Artisanal Soap Image Generator
          </h1>
          <p className="text-lg text-gray-400">
            Bring your artisanal soap ideas to life with AI-powered image generation.
          </p>
        </header>

        <main>
          <div className="bg-gray-800/50 backdrop-blur-sm p-6 rounded-2xl shadow-2xl shadow-purple-500/10 border border-gray-700">
            <div className="flex flex-col md:flex-row gap-4">
              <textarea
                value={prompt}
                onChange={(e) => setPrompt(e.target.value)}
                placeholder="Describe the soap you want to see..."
                className="flex-grow bg-gray-900 border border-gray-600 rounded-lg p-4 focus:ring-2 focus:ring-purple-500 focus:outline-none transition duration-300 resize-none"
                rows={3}
                disabled={isLoading}
              />
              <button
                onClick={handleGenerate}
                disabled={isLoading || !prompt}
                className="flex items-center justify-center gap-2 bg-purple-600 hover:bg-purple-700 disabled:bg-purple-900 disabled:text-gray-400 disabled:cursor-not-allowed text-white font-bold py-3 px-6 rounded-lg transition-all duration-300 transform hover:scale-105 shadow-lg shadow-purple-500/20"
              >
                {isLoading ? (
                  <>
                    <Spinner />
                    <span>Generating...</span>
                  </>
                ) : (
                  <>
                    <Wand2 size={20} />
                    <span>Generate</span>
                  </>
                )}
              </button>
            </div>
          </div>

          <div className="mt-10">
            {isLoading && (
              <div className="text-center">
                <div className="flex justify-center items-center mb-4">
                  <Spinner />
                </div>
                <p className="text-gray-400 animate-pulse">Conjuring up some beautiful soap images...</p>
              </div>
            )}

            {error && (
              <div className="bg-red-900/50 border border-red-700 text-red-300 px-4 py-3 rounded-lg relative flex items-center gap-3">
                 <AlertTriangle className="h-5 w-5 text-red-400" />
                <span className="block sm:inline">{error}</span>
              </div>
            )}

            {!isLoading && images.length > 0 && (
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
                {images.map((imgSrc, index) => (
                  <ImageCard key={index} src={imgSrc} />
                ))}
              </div>
            )}
            
            {!isLoading && images.length === 0 && !error && (
              <div className="text-center py-12 text-gray-500">
                <Wand2 size={48} className="mx-auto mb-4" />
                <h3 className="text-xl font-semibold mb-2">Ready to Create?</h3>
                <p>Your generated images will appear here.</p>
              </div>
            )}

          </div>
        </main>
      </div>
    </div>
  );
};

export default App;
