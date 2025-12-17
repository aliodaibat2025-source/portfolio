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
  const containerRef = useRef<HTMLDivElement | null>(null);
  const videoRef = useRef<HTMLVideoElement | null>(null);
  const controlsRef = useRef<HTMLDivElement | null>(null);
  const [isMuted, setIsMuted] = useState(true);
  const [isPlaying, setIsPlaying] = useState(false);
  const [progress, setProgress] = useState(0);
  const [isFullscreen, setIsFullscreen] = useState(false);
  const simulatedFsRef = useRef(false);
  const roRef = useRef<ResizeObserver | null>(null);

  const isIos = () => {
    try {
      const ua = navigator.userAgent || navigator.vendor || (window as any).opera;
      const isiPhoneOrIpod = /iPhone|iPod/.test(ua);
      const isiPad = /iPad/.test(ua) || (navigator.platform === 'MacIntel' && (navigator as any).maxTouchPoints > 1);
      return isiPhoneOrIpod || isiPad;
    } catch {
      return false;
    }
  };

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

  // Apply base simulated fullscreen styles to container
  const applyFullscreenStyles = (el: HTMLElement | null) => {
    if (!el) return;
    el.style.position = "fixed";
    el.style.inset = "0";
    el.style.width = "100vw";
    // Prefer dynamic viewport units (svh) where supported; fallback later
    el.style.height = "100svh";
    el.style.display = "flex";
    el.style.alignItems = "center";
    el.style.justifyContent = "center";
    el.style.background = "black";
    el.style.margin = "0";
    el.style.zIndex = "2147483647";
    el.style.boxSizing = "border-box";
  };

  // Remove fullscreen overrides
  const removeFullscreenStyles = (el: HTMLElement | null) => {
    if (!el) return;
    el.style.position = "";
    el.style.inset = "";
    el.style.width = "";
    el.style.height = "";
    el.style.display = "";
    el.style.alignItems = "";
    el.style.justifyContent = "";
    el.style.background = "";
    el.style.margin = "";
    el.style.zIndex = "";
    el.style.boxSizing = "";
    el.style.paddingBottom = "";
    const v = videoRef.current;
    if (v) {
      v.style.width = "";
      v.style.height = "";
      v.style.objectFit = "";
      v.style.maxHeight = "";
      v.style.maxWidth = "";
    }
    const controls = controlsRef.current;
    if (controls) controls.style.bottom = "";
  };

  // Compute and reserve controls space + safe area
  const applyLayoutAdjustments = useCallback(() => {
    const el = containerRef.current;
    const v = videoRef.current;
    const controls = controlsRef.current;
    if (!el || !v || !controls) return;

    const controlsH = controls.offsetHeight || 64;
    const buffer = 12;
    const totalBottom = `calc(env(safe-area-inset-bottom, 0px) + ${controlsH + buffer}px)`;

    // When in fullscreen (either simulated or native) we want the video to *cover* the viewport.
    // Set video to full viewport and object-fit: cover. For browsers supporting svh/dvh prefer svh.
    if (isFullscreen) {
      // set controls bottom to reserve safe area + buffer
      controls.style.bottom = totalBottom;

      // Try using 100svh (better on some mobile browsers). Fallback to 100vh.
      const heightUnit = CSS.supports("height", "100svh") ? "100svh" : "100vh";

      // apply cover sizing for the video so it fills the viewport after rotation
      v.style.width = "100vw";
      v.style.height = heightUnit;
      v.style.objectFit = "cover";
      v.style.maxWidth = "100%";
      v.style.maxHeight = heightUnit;
    } else {
      // restore normal player constraints
      controls.style.bottom = `calc(env(safe-area-inset-bottom, 0px) + 12px)`;
      v.style.width = "";
      v.style.height = "";
      v.style.objectFit = "";
      v.style.maxWidth = "";
      v.style.maxHeight = "";
      el.style.paddingBottom = "";
    }
  }, [isFullscreen]);

  const toggleFullscreen = useCallback(async () => {
    const el = containerRef.current;
    if (!el) return;

    const supportsFullscreenAPI = !!(el.requestFullscreen || (el as any).webkitRequestFullscreen || (el as any).msRequestFullscreen);

    if (!isFullscreen) {
      // ENTER fullscreen
      if (supportsFullscreenAPI && !isIos()) {
        try {
          if (el.requestFullscreen) await el.requestFullscreen();
          else if ((el as any).webkitRequestFullscreen) (el as any).webkitRequestFullscreen();
          else if ((el as any).msRequestFullscreen) (el as any).msRequestFullscreen();

          applyFullscreenStyles(el);
          simulatedFsRef.current = false;
          setIsFullscreen(true);
        } catch {
          // fallback to simulated fullscreen
          applyFullscreenStyles(el);
          simulatedFsRef.current = true;
          document.body.style.overflow = "hidden";
          setIsFullscreen(true);
        }
      } else {
        // simulated fullscreen (iOS or no Fullscreen API)
        applyFullscreenStyles(el);
        simulatedFsRef.current = true;
        document.body.style.overflow = "hidden";
        setIsFullscreen(true);
      }

      // allow layout to settle then measure & apply cover sizing
      setTimeout(() => {
        applyLayoutAdjustments();
      }, 60);
    } else {
      // EXIT fullscreen
      if (!simulatedFsRef.current) {
        try {
          if (document.exitFullscreen) await document.exitFullscreen();
          else if ((document as any).webkitExitFullscreen) (document as any).webkitExitFullscreen();
          else if ((document as any).msExitFullscreen) (document as any).msExitFullscreen();
        } catch {
          // ignore
        } finally {
          removeFullscreenStyles(el);
          document.body.style.overflow = "";
          setIsFullscreen(false);
          simulatedFsRef.current = false;
        }
      } else {
        removeFullscreenStyles(el);
        document.body.style.overflow = "";
        setIsFullscreen(false);
        simulatedFsRef.current = false;
      }
    }
  }, [isFullscreen, applyLayoutAdjustments]);

  // Sync with native fullscreenchange + reapply layout adjustments (useful for rotation)
  useEffect(() => {
    const handleFsChange = () => {
      const fsEl = document.fullscreenElement || (document as any).webkitFullscreenElement;
      const isFs = !!fsEl;
      setIsFullscreen(isFs || simulatedFsRef.current);

      const el = containerRef.current;
      if (isFs && el && fsEl === el) {
        applyFullscreenStyles(el);
        simulatedFsRef.current = false;
      } else if (!isFs && !simulatedFsRef.current) {
        removeFullscreenStyles(el);
        document.body.style.overflow = "";
      }
      // small delay helps mobile settle after rotation/browser chrome changes
      setTimeout(() => applyLayoutAdjustments(), 50);
    };

    document.addEventListener("fullscreenchange", handleFsChange);
    document.addEventListener("webkitfullscreenchange", handleFsChange);
    return () => {
      document.removeEventListener("fullscreenchange", handleFsChange);
      document.removeEventListener("webkitfullscreenchange", handleFsChange);
    };
  }, [applyLayoutAdjustments]);

  // ensure iOS inline playback attributes
  useEffect(() => {
    const v = videoRef.current;
    if (!v) return;
    try {
      v.setAttribute("webkit-playsinline", "");
      v.setAttribute("playsinline", "");
    } catch {}
  }, []);

  // Recalculate on resize/orientation and via ResizeObserver so rotation is handled quickly
  useEffect(() => {
    const onResize = () => {
      setTimeout(() => applyLayoutAdjustments(), 80);
    };
    window.addEventListener("resize", onResize);
    window.addEventListener("orientationchange", onResize);

    try {
      roRef.current = new ResizeObserver(() => {
        applyLayoutAdjustments();
      });
      if (controlsRef.current) roRef.current.observe(controlsRef.current);
      if (containerRef.current) roRef.current.observe(containerRef.current);
    } catch {
      // ResizeObserver not available
    }

    return () => {
      window.removeEventListener("resize", onResize);
      window.removeEventListener("orientationchange", onResize);
      if (roRef.current) {
        roRef.current.disconnect();
        roRef.current = null;
      }
    };
  }, [applyLayoutAdjustments]);

  // cleanup on unmount
  useEffect(() => {
    return () => {
      document.body.style.overflow = "";
      if (roRef.current) {
        roRef.current.disconnect();
        roRef.current = null;
      }
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
      <div className="w-full flex justify-center">
        <div
          className="video-player-container relative w-full max-w-4xl overflow-hidden shadow-2xl border border-gray-700 bg-black"
          style={{ aspectRatio: "16 / 9" }}
        >
          <div className="w-full h-full flex items-center justify-center bg-black min-h-0">
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
                isFullscreen
                  ? "bg-black cursor-pointer block"
                  : "w-full h-full object-contain bg-black cursor-pointer block"
              }
              // we manage sizing in JS for fullscreen to support svh fallback and cover behavior
            />
          </div>

          {/* CONTROLS */}
          <div
            ref={controlsRef}
            className="absolute left-4 right-4 flex justify-between items-center pointer-events-auto z-50"
            style={{ bottom: `calc(env(safe-area-inset-bottom, 0px) + 12px)` }}
          >
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
              {/* show fullscreen button on all screens EXCEPT xl and up */}
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
          <div className="absolute left-0 right-0 bottom-0 z-40">
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
