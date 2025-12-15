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
      video.play().then(() => setIsPlaying(true)).catch(() => {});
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
    gsap.fromTo(
      ".video-player-container",
      { opacity: 0 },
      {
        opacity: 1,
        duration: 1,
        ease: "power3.out",
        scrollTrigger: {
          trigger: ".video-player-container",
          start: "top 85%",
        },
      }
    );
  }, []);

  return (
    <div className={`video-container w-full ${className || ""}`}>
      <div className="video-player-container w-full rounded-xl overflow-hidden shadow-2xl border border-gray-700 bg-black">
        
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
          className="
            w-full
            h-[220px] sm:h-[260px] md:h-[32rem]
            object-contain
            bg-black
            cursor-pointer
          "
        />

        {/* CONTROLS - MOBILE */}
        <div className="flex md:hidden items-center justify-between px-4 py-3 bg-black">
          <button
            onClick={togglePlay}
            className="bg-white/10 text-white p-3 rounded-full"
          >
            {isPlaying ? <FaPause size={18} /> : <FaPlay size={18} />}
          </button>

          <button
            onClick={toggleMute}
            className="bg-white/10 text-white p-3 rounded-full"
          >
            {isMuted ? <FaVolumeMute size={18} /> : <FaVolumeUp size={18} />}
          </button>
        </div>

        {/* CONTROLS - DESKTOP */}
        <div className="hidden md:flex absolute bottom-4 left-4 right-4 justify-between items-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
          <button
            onClick={togglePlay}
            className="bg-black/60 text-white p-3 rounded-full hover:bg-black/80"
          >
            {isPlaying ? <FaPause size={18} /> : <FaPlay size={18} />}
          </button>

          <button
            onClick={toggleMute}
            className="bg-black/60 text-white p-3 rounded-full hover:bg-black/80"
          >
            {isMuted ? <FaVolumeMute size={18} /> : <FaVolumeUp size={18} />}
          </button>
        </div>

        {/* PROGRESS BAR */}
        <div className="w-full h-1 bg-white/30">
          <div
            className="h-full bg-yellow-400 transition-all duration-200"
            style={{ width: `${progress}%` }}
          />
        </div>
      </div>
    </div>
  );
}
