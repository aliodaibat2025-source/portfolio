'use client';

import React, { useEffect, useRef, useState, useCallback } from "react";
import { FaVolumeMute, FaVolumeUp, FaPlay, FaPause } from "react-icons/fa";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/all";

gsap.registerPlugin(ScrollTrigger);

interface VideoPlayerProps {
  src: string;
  title?: string;
  className?: string;
}

export default function VideoPlayer({ src, title, className }: VideoPlayerProps) {
  const videoRef = useRef<HTMLVideoElement>(null);
  const [isMuted, setIsMuted] = useState(true);
  const [isPlaying, setIsPlaying] = useState(false);
  const [progress, setProgress] = useState(0);


  const togglePlay = useCallback(() => {
    if (videoRef.current) {
      const video = videoRef.current;
      if (video.paused) {
        video.play().catch(() => console.log("Autoplay blocked"));
        setIsPlaying(true); 
      } else {
        video.pause();
        setIsPlaying(false); 
      }
    }
  }, []);


  const toggleMute = useCallback(() => {
    if (videoRef.current) {
      videoRef.current.muted = !videoRef.current.muted;
      setIsMuted(videoRef.current.muted);
    }
  }, []);


  const updateProgress = useCallback(() => {
    if (videoRef.current) {
      const video = videoRef.current;
      setProgress((video.currentTime / video.duration) * 100);
    }
  }, []);

 
  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;

    
    const trigger = ScrollTrigger.create({
      trigger: video.parentElement,
      start: "top 80%",
      end: "bottom top",
      onEnter: () => {
        video.play().catch(() => console.log("Autoplay blocked"));
        setIsPlaying(true); 
      },
      onLeave: () => {
        video.pause();
        setIsPlaying(false);
      },
      onEnterBack: () => {
        video.play().catch(() => console.log("Autoplay blocked"));
        setIsPlaying(true);
      },
      onLeaveBack: () => {
        video.pause();
        setIsPlaying(false); 
      },
    });


    const interval = setInterval(updateProgress, 200);
    return () => {
      clearInterval(interval);
      trigger.kill();
    };
  }, [updateProgress]);

  return (
    <div className={`video-container relative w-full ${className || ""} group`}>
      {title && (
        <h3 className="text-2xl md:text-3xl font-semibold text-white text-center mb-4 px-2 md:px-0">
          {title}
        </h3>
      )}

      <div className="relative w-full h-[26rem] md:h-[32rem] rounded-xl overflow-hidden shadow-2xl border border-gray-700">
        <video
          ref={videoRef}
          src={src}
          loop
          playsInline
          muted={isMuted}
          onTimeUpdate={updateProgress}
          className="w-full h-full object-cover rounded-xl"
        />


        <div className="absolute bottom-4 left-4 right-4 flex justify-between items-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
          <button onClick={togglePlay} className="bg-black/60 text-white p-3 rounded-full hover:bg-black/80">
            {isPlaying ? <FaPause size={18} /> : <FaPlay size={18} />} {/* Change icon based on isPlaying */}
          </button>
          <button onClick={toggleMute} className="bg-black/60 text-white p-3 rounded-full hover:bg-black/80">
            {isMuted ? <FaVolumeMute size={18} /> : <FaVolumeUp size={18} />}
          </button>
        </div>

      
        <div className="absolute bottom-0 left-0 w-full h-1 bg-white/30 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
          <div
            className="h-full bg-yellow-400 transition-all duration-200"
            style={{ width: `${progress}%` }}
          />
        </div>
      </div>
    </div>
  );
}
