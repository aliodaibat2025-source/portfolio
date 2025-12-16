'use client';

import React, { useEffect, useRef, useState, useCallback } from "react";
import { FaVolumeMute, FaVolumeUp, FaPlay, FaPause, FaExpand, FaCompress } from "react-icons/fa";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/all";

gsap.registerPlugin(ScrollTrigger);

interface VideoPlayerProps {
  src: string;
  title?: string;
  className?: string;
}

export default function VideoPlayer({ src, title, className }: VideoPlayerProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const videoRef = useRef<HTMLVideoElement>(null);
  const [isMuted, setIsMuted] = useState(true);
  const [isPlaying, setIsPlaying] = useState(false);
  const [progress, setProgress] = useState(0);
  const [isFullscreen, setIsFullscreen] = useState(false);

  const togglePlay = useCallback(() => {
    const v = videoRef.current;
    if (!v) return;
    if (v.paused) {
      v.play().then(() => setIsPlaying(true)).catch(() => {});
    } else {
      v.pause();
      setIsPlaying(false);
    }
  }, []);

  const toggleMute = useCallback(() => {
    const v = videoRef.current;
    if (!v) return;
    v.muted = !v.muted;
    setIsMuted(v.muted);
  }, []);

  const updateProgress = useCallback(() => {
    const v = videoRef.current;
    if (!v || !v.duration) return;
    setProgress((v.currentTime / v.duration) * 100);
  }, []);

  // Helpers to apply/remove fullscreen-centered styles on the container element
  const applyFullscreenStyles = (el: HTMLElement | null) => {
    if (!el) return;
    el.style.display = "flex";
    el.style.alignItems = "center";
    el.style.justifyContent = "center";
    el.style.background = "black";
    el.style.padding = "0";
    el.style.margin = "0";
    el.style.width = "100%";
    el.style.height = "100%";
    el.style.boxSizing = "border-box";
  };
  const removeFullscreenStyles = (el: HTMLElement | null) => {
    if (!el) return;
    el.style.display = "";
    el.style.alignItems = "";
    el.style.justifyContent = "";
    el.style.background = "";
    el.style.padding = "";
    el.style.margin = "";
    el.style.width = "";
    el.style.height = "";
    el.style.boxSizing = "";
  };

  const toggleFullscreen = useCallback(async () => {
    const el = containerRef.current;
    if (!el) return;

    // Enter fullscreen
    if (!document.fullscreenElement && !(document as any).webkitFullscreenElement) {
      try {
        if (el.requestFullscreen) {
          await el.requestFullscreen();
        } else if ((el as any).webkitRequestFullscreen) {
          (el as any).webkitRequestFullscreen();
        }
        // apply styles right after request (some browsers apply after event; we also listen to fullscreenchange)
        applyFullscreenStyles(el);
        setIsFullscreen(true);
      } catch {
        // ignore
      }
    } else {
      // Exit fullscreen
      try {
        if (document.exitFullscreen) {
          await document.exitFullscreen();
        } else if ((document as any).webkitExitFullscreen) {
          (document as any).webkitExitFullscreen();
        }
        // styles will be cleared by fullscreenchange listener as well
      } catch {
        // ignore
      }
    }
  }, []);

  // Keep isFullscreen in sync (handles Esc or other ways user exits fullscreen)
  useEffect(() => {
    const handleFsChange = () => {
      const fsEl = document.fullscreenElement || (document as any).webkitFullscreenElement;
      const isFs = !!fsEl;
      setIsFullscreen(isFs);

      // If entering fullscreen and the fullscreen element is our container, ensure styles applied
      const el = containerRef.current;
      if (isFs && fsEl === el) {
        applyFullscreenStyles(el);
      } else {
        // exiting or different fullscreen element: clear styles
        removeFullscreenStyles(el);
      }
    };

    document.addEventListener("fullscreenchange", handleFsChange);
    document.addEventListener("webkitfullscreenchange", handleFsChange);

    return () => {
      document.removeEventListener("fullscreenchange", handleFsChange);
      document.removeEventListener("webkitfullscreenchange", handleFsChange);
    };
  }, []);

  useEffect(() => {
    gsap.fromTo(
      ".video-player-container",
      { opacity: 0 },
      {
        opacity: 1,
        duration: 1,
        ease: "power3.out",
        scrollTrigger: { trigger: ".video-player-container", start: "top 85%" },
      }
    );
  }, []);

  return (
    <div ref={containerRef} className={`video-container w-full ${className || ""}`}>
      {/* center player horizontally like YouTube */}
      <div className="w-full flex justify-center">
        {/* responsive player box (keeps aspect ratio) */}
        <div
          className="video-player-container relative w-full max-w-4xl  overflow-hidden shadow-2xl border border-gray-700 bg-black"
          style={{ aspectRatio: "16 / 9" }}
        >
          {/* video wrapper: centers content and provides responsive sizing */}
          <div className="w-full h-full flex items-center justify-center bg-black min-h-0">
            {/* 
              Normal (non-fullscreen): we use w-full to fill the player width (requirement #2).
              When fullscreen (isFullscreen === true) we switch to width:auto + max-height:100% so the
              video keeps aspect ratio and can be vertically centered inside the viewport.
            */}
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
              className={
                // Tailwind-friendly class string; adapt if your config differs
                isFullscreen
                  ? "w-auto max-w-full max-h-full object-contain bg-black cursor-pointer block"
                  : "w-full h-full object-contain bg-black cursor-pointer block"
              }
              style={isFullscreen ? { maxHeight: "100%" } : undefined}
            />
          </div>

          {/* CONTROLS */}
          <div className="absolute bottom-4 left-4 right-4 flex justify-between items-center pointer-events-auto z-20">
            <div className="flex gap-2">
              <button
                onClick={togglePlay}
                className="bg-black/70 text-white p-3 rounded-full hover:bg-black/90 transition"
                aria-label={isPlaying ? "Pause" : "Play"}
              >
                {isPlaying ? <FaPause size={18} /> : <FaPlay size={18} />}
              </button>

              <button
                onClick={toggleMute}
                className="bg-black/70 text-white p-3 rounded-full hover:bg-black/90 transition"
                aria-label={isMuted ? "Unmute" : "Mute"}
              >
                {isMuted ? <FaVolumeMute size={18} /> : <FaVolumeUp size={18} />}
              </button>
            </div>

            <div className="flex gap-2">
              {/* show fullscreen button on ALL screens except xl and larger */}
              <button
                onClick={toggleFullscreen}
                className="bg-black/70 text-white p-3 rounded-full hover:bg-black/90 transition xl:hidden"
                aria-label={isFullscreen ? "Exit fullscreen" : "Enter fullscreen"}
              >
                {isFullscreen ? <FaCompress size={18} /> : <FaExpand size={18} />}
              </button>
            </div>
          </div>

          {/* PROGRESS BAR */}
          <div className="absolute left-0 right-0 bottom-0 z-10">
            <div className="w-full h-1 bg-white/30">
              <div
                className="h-full bg-yellow-400 transition-all duration-200"
                style={{ width: `${progress}%` }}
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
