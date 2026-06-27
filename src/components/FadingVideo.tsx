import React, { useEffect, useRef } from "react";

interface FadingVideoProps {
  src: string;
  className?: string;
  style?: React.CSSProperties;
}

export function FadingVideo({ src, className, style }: FadingVideoProps) {
  const videoRef = useRef<HTMLVideoElement>(null);
  const rafIdRef = useRef<number | null>(null);
  const fadingOutRef = useRef<boolean>(false);

  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;

    // Start with opacity 0
    video.style.opacity = "0";

    const FADE_MS = 500;
    const FADE_OUT_LEAD = 0.55;

    const fadeTo = (targetOpacity: number, duration: number = FADE_MS) => {
      // Cancel previous frame animation before starting a new one
      if (rafIdRef.current !== null) {
        cancelAnimationFrame(rafIdRef.current);
        rafIdRef.current = null;
      }

      // Read current opacity from inline style (fallback to 0)
      const currentOpacityStr = video.style.opacity;
      const initialOpacity = currentOpacityStr ? parseFloat(currentOpacityStr) : 0;
      const opacityDiff = targetOpacity - initialOpacity;

      if (opacityDiff === 0) return;

      const startTime = performance.now();

      const animate = (currentTime: number) => {
        const elapsed = currentTime - startTime;
        const progress = Math.min(elapsed / duration, 1);
        const currentOpacity = initialOpacity + opacityDiff * progress;
        video.style.opacity = currentOpacity.toFixed(4);

        if (progress < 1) {
          rafIdRef.current = requestAnimationFrame(animate);
        } else {
          rafIdRef.current = null;
        }
      };

      rafIdRef.current = requestAnimationFrame(animate);
    };

    const handleLoadedData = () => {
      video.style.opacity = "0";
      video.play().catch((err) => {
        console.warn("Autoplay was prevented or video could not play:", err);
      });
      fadingOutRef.current = false;
      fadeTo(1);
    };

    const handleTimeUpdate = () => {
      const duration = video.duration;
      const currentTime = video.currentTime;
      if (duration && !fadingOutRef.current) {
        const timeRemaining = duration - currentTime;
        if (timeRemaining <= FADE_OUT_LEAD && timeRemaining > 0) {
          fadingOutRef.current = true;
          fadeTo(0);
        }
      }
    };

    const handleEnded = () => {
      video.style.opacity = "0";
      setTimeout(() => {
        if (!video) return;
        video.currentTime = 0;
        video.play().catch((err) => {
          console.warn("Failed to replay video:", err);
        });
        fadingOutRef.current = false;
        fadeTo(1);
      }, 100);
    };

    video.addEventListener("loadeddata", handleLoadedData);
    video.addEventListener("timeupdate", handleTimeUpdate);
    video.addEventListener("ended", handleEnded);

    // If video is already loaded or in a state to play, trigger load setup
    if (video.readyState >= 3) {
      handleLoadedData();
    }

    return () => {
      if (rafIdRef.current !== null) {
        cancelAnimationFrame(rafIdRef.current);
      }
      video.removeEventListener("loadeddata", handleLoadedData);
      video.removeEventListener("timeupdate", handleTimeUpdate);
      video.removeEventListener("ended", handleEnded);
    };
  }, [src]);

  return (
    <video
      id={`video-${src.split('/').pop()?.split('.')[0]}`}
      ref={videoRef}
      src={src}
      className={className}
      style={{ ...style, opacity: 0 }}
      autoPlay
      muted
      playsInline
      preload="auto"
    />
  );
}
