"use client";

import { useEffect, useState } from "react";

type Song = {
  id: number;
  name: string;
  duration: number;
};

const initialQueue: Song[] = [
  { id: 1, name: "Song 1", duration: 45 },
  { id: 2, name: "Song 2", duration: 70 },
  { id: 3, name: "Song 3", duration: 124 },
  { id: 4, name: "Song 4", duration: 124 },
  { id: 5, name: "Song 5", duration: 124 },
];

export function PlaybackBar() {
  const [queue] = useState<Song[]>(initialQueue);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [progress, setProgress] = useState(0);
  const [isPlaying, setIsPlaying] = useState(false);

  const currentSong = queue[currentIndex] ?? null;
  const currentDuration = currentSong?.duration ?? null;

  function nextSong() {
    setCurrentIndex((idx) => (idx + 1) % queue.length);
    setProgress(0);
  }

  function prevSong() {
    setCurrentIndex((idx) => (idx - 1 + queue.length) % queue.length);
    setProgress(0);
  }

  useEffect(() => {
    if (!isPlaying || currentDuration === null) return;

    const intervalId = setInterval(() => {
      setProgress((p) => p + 1);
    }, 1000);

    return () => clearInterval(intervalId);
  }, [isPlaying, currentDuration]);



  useEffect(() => {
    if (!isPlaying || currentDuration === null) return;
    if (progress < currentDuration) return;

    setCurrentIndex((idx) => (idx + 1) % queue.length);
    setProgress(0);
  }, [isPlaying, progress, currentDuration, queue.length]);



  return (
    <div className="h-full w-full max-w-3xl px-4 flex flex-col justify-center items-center gap-2">
      <div className="flex items-center gap-3">
        <button className="btn btn-xs" onClick={prevSong}>
          Prev
        </button>
        <button
          className="btn btn-s btn-primary"
          onClick={() => setIsPlaying((p) => !p)}
        >
          {isPlaying ? "Pause" : "Play"}
        </button>

        <button className="btn btn-xs" onClick={nextSong}>
          Next
        </button>
      </div>


      <div className="flex flex-row gap-5">
        <span className="text-sm">{progress}s</span>

        <input
          type="range"
          min={0}
          max={currentSong ? currentSong.duration : 100}
          value={progress}
          className="range range-xs w-125"
          onChange={(e) => setProgress(Number(e.target.value))}
        />

        <span className="text-sm">{currentSong ? currentSong.duration : 100}s</span>
      </div>





      <div>
        <div className="text-m font-semibold truncate">
          {currentSong ? currentSong.name : "Queue is empty"}
        </div>
      </div>


    </div>
  );
}