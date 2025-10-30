
import React from 'react';

interface ImageCardProps {
  src: string;
}

export const ImageCard: React.FC<ImageCardProps> = ({ src }) => {
  return (
    <div className="group relative overflow-hidden rounded-xl shadow-lg shadow-black/30 transition-all duration-300 ease-in-out transform hover:scale-105 hover:shadow-2xl hover:shadow-purple-500/20">
      <img
        src={src} 
        alt="Generated artisanal soap"
        className="w-full h-full object-cover aspect-square transition-transform duration-300 group-hover:scale-110"
      />
       <div className="absolute inset-0 bg-black/20 group-hover:bg-black/40 transition-all duration-300"></div>
       <div className="absolute bottom-0 left-0 p-4">
         <a 
           href={src} 
           download={`artisanal-soap-${Date.now()}.jpeg`}
           className="text-white bg-black/50 backdrop-blur-sm py-2 px-4 rounded-full text-xs font-semibold opacity-0 group-hover:opacity-100 transition-opacity duration-300"
         >
           Download
         </a>
       </div>
    </div>
  );
};
