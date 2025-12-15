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
    const video = videoRef.current;
    if (!video) return;

    if (video.paused) {
      video.play().then(() => {
        setIsPlaying(true);
      }).catch(() => {
        console.log("Autoplay blocked");
      });
    } else {
      video.pause();
      setIsPlaying(false);
    }
  }, []);

  const toggleMute = useCallback(() => {
    const video = videoRef.current;
    if (!video) return;

    video.muted = !video.muted;
    setIsMuted(video.muted);
  }, []);

  const updateProgress = useCallback(() => {
    const video = videoRef.current;
    if (!video || !video.duration) return;

    setProgress((video.currentTime / video.duration) * 100);
  }, []);

  useEffect(() => {
    // Animations
    gsap.fromTo(
      ".video-title",
      { y: 50, opacity: 0 },
      {
        y: 0,
        opacity: 1,
        duration: 1,
        ease: "power3.out",
        scrollTrigger: {
          trigger: ".video-title",
          start: "top 80%",
        },
      }
    );

    gsap.fromTo(
      ".video-player-container",
      { opacity: 0 },
      {
        opacity: 1,
        duration: 1,
        ease: "power3.out",
        scrollTrigger: {
          trigger: ".video-player-container",
          start: "top 80%",
        },
      }
    );
  }, []);

  return (
    <div className={`video-container relative w-full ${className || ""} group`}>
      {title && (
        <h3 className="video-title text-2xl md:text-3xl font-semibold text-white text-center mb-4 px-2 md:px-0">
          {title}
        </h3>
      )}

      <div className="video-player-container relative w-full h-[26rem] md:h-[32rem] rounded-xl overflow-hidden shadow-2xl border border-gray-700">
        
        {/* VIDEO */}
        <video
          ref={videoRef}
          src={src}
          loop
          playsInline
          muted={isMuted}
          preload="metadata"
          onClick={togglePlay}
          onTimeUpdate={updateProgress}
          onPlay={() => setIsPlaying(true)}
          onPause={() => setIsPlaying(false)}
          className="w-full h-full object-cover rounded-xl cursor-pointer"
        />

        {/* CONTROLS */}
        <div className="absolute bottom-4 left-4 right-4 flex justify-between items-center opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none md:pointer-events-auto">
          <button
            onClick={togglePlay}
            className="bg-black/60 text-white p-3 rounded-full hover:bg-black/80 pointer-events-auto"
          >
            {isPlaying ? <FaPause size={18} /> : <FaPlay size={18} />}
          </button>

          <button
            onClick={toggleMute}
            className="bg-black/60 text-white p-3 rounded-full hover:bg-black/80 pointer-events-auto"
          >
            {isMuted ? <FaVolumeMute size={18} /> : <FaVolumeUp size={18} />}
          </button>
        </div>

        {/* PROGRESS BAR */}
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
