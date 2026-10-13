'use client';
import { useRef, useState, useEffect } from 'react';

export default function SelfieStation({ theme = 'arcade' }: { theme?: string }) {
  const videoRef = useRef<HTMLVideoElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [stream, setStream] = useState<MediaStream | null>(null);
  const [photo, setPhoto] = useState<string | null>(null);

  const startCamera = async () => {
    try {
      const mediaStream = await navigator.mediaDevices.getUserMedia({ video: true });
      setStream(mediaStream);
      if (videoRef.current) videoRef.current.srcObject = mediaStream;
    } catch (err) {
      console.error("Camera access denied:", err);
    }
  };

  const takePhoto = () => {
    if (!videoRef.current || !canvasRef.current) return;
    const video = videoRef.current;
    const canvas = canvasRef.current;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;
    
    canvas.width = video.videoWidth || 640;
    canvas.height = video.videoHeight || 480;
    ctx.drawImage(video, 0, 0, canvas.width, canvas.height);
    
    ctx.fillStyle = theme === 'arcade' ? 'rgba(236, 72, 153, 0.2)' : 'rgba(59, 130, 246, 0.2)';
    ctx.fillRect(0, 0, canvas.width, canvas.height);
    
    ctx.font = 'bold 28px monospace';
    ctx.fillStyle = '#00ffff';
    ctx.textAlign = 'right';
    ctx.fillText(`NEXUS NOSTALGIA // ${theme.toUpperCase()}`, canvas.width - 24, canvas.height - 30);
    setPhoto(canvas.toDataURL('image/jpeg'));
  };

  useEffect(() => {
    return () => {
      if (stream) stream.getTracks().forEach((track) => track.stop());
    };
  }, [stream]);

  return (
    <div className="border border-pink-500/40 bg-zinc-950/80 backdrop-blur rounded-2xl p-6 flex flex-col items-center">
      <h3 className="text-xl font-black text-pink-400 mb-4 tracking-widest uppercase font-mono">
        📸 RETRO SELFIE BOOTH
      </h3>
      {!photo ? (
        <div className="relative w-full max-w-md aspect-video bg-black rounded-xl overflow-hidden border-2 border-pink-500/50 flex items-center justify-center">
          <video ref={videoRef} autoPlay playsInline muted className="w-full h-full object-cover" />
          <canvas ref={canvasRef} className="hidden" />
          {!stream && (
            <button onClick={startCamera} className="absolute bg-gradient-to-r from-pink-600 to-cyan-500 text-white font-bold py-3 px-6 rounded-full text-sm font-mono tracking-wider shadow-lg">
              INITIALIZE CAMERA
            </button>
          )}
        </div>
      ) : (
        <div className="w-full max-w-md flex flex-col items-center">
          <img src={photo} alt="Memory" className="w-full rounded-xl border-2 border-cyan-400 mb-4" />
          <div className="flex w-full space-x-3">
            <a href={photo} download="nexus-memory.jpg" className="flex-1 bg-cyan-500 hover:bg-cyan-400 text-black font-black py-2.5 rounded-lg text-center font-mono text-sm">DOWNLOAD</a>
            <button onClick={() => setPhoto(null)} className="flex-1 border border-zinc-700 hover:bg-zinc-800 text-zinc-300 font-mono text-sm py-2.5 rounded-lg">RETAKE</button>
          </div>
        </div>
      )}
      {stream && !photo && (
        <button onClick={takePhoto} className="mt-4 bg-pink-500 hover:bg-pink-400 text-black font-black py-3 px-8 rounded-full font-mono text-sm tracking-widest">CAPTURE PHOTO</button>
      )}
    </div>
  );
}
