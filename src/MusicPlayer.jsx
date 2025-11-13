import { useState, useRef, useEffect } from "react";
import { Play, Pause, SkipBack, SkipForward } from "lucide-react";

export default function MusicPlayer() {
  const tracks = [
    { title: "1. Besidju", src: "/music/Besidju.mp3" },
    { title: "2. Great Fairy Fountain", src: "/music/GFF.mp3" },
    { title: "3. Ocarina of Time YT mix", src: "/music/OfTcozy.mp3" },
  ];

  const [current, setCurrent] = useState(0);
  const [isPlaying, setIsPlaying] = useState(false);
  const [progress, setProgress] = useState(0);

  const audioRef = useRef(null);

  // Update progress as the song plays
  useEffect(() => {
    const audio = audioRef.current;
    const update = () => setProgress((audio.currentTime / audio.duration) * 100 || 0);
    if (audio) audio.addEventListener("timeupdate", update);
    return () => audio && audio.removeEventListener("timeupdate", update);
  }, []);

  // Auto play when track changes
  useEffect(() => {
    const audio = audioRef.current;
    if (isPlaying && audio) {
      audio.play();
    }
  }, [current]);

  const togglePlay = () => {
    const audio = audioRef.current;
    if (!audio) return;
    if (isPlaying) {
      audio.pause();
    } else {
      audio.play();
    }
    setIsPlaying(!isPlaying);
  };

  const nextTrack = () => setCurrent((current + 1) % tracks.length);
  const prevTrack = () => setCurrent((current - 1 + tracks.length) % tracks.length);

  const handleSeek = (e) => {
    const audio = audioRef.current;
    const newTime = (e.target.value / 100) * audio.duration;
    audio.currentTime = newTime;
    setProgress(e.target.value);
  };

  const selectTrack = (index) => {
    setCurrent(index);
    setProgress(0);
    if (isPlaying) {
      const audio = audioRef.current;
      audio.play();
    }
  };

  return (
      <div className="w-full flex flex-col items-center">
      <h2 className="text-xl text-latte-mauve dark:text-mocha-mauve font-semibold mb-2">
        🎵Fav Study Music🎵
      </h2>

      <audio ref={audioRef} src={tracks[current].src} onEnded={nextTrack} />

      {/* Controls */}
      <div className="flex items-center gap-4 mb-2">
        <button onClick={prevTrack} className="hover:text-latte-mauve dark:hover:text-mocha-mauve">
          <SkipBack className="w-4 h-4" />
        </button>
        <button onClick={togglePlay} className="hover:text-latte-mauve dark:hover:text-mocha-mauve">
          {isPlaying ? <Pause className="w-5 h-5" /> : <Play className="w-5 h-5" />}
        </button>
        <button onClick={nextTrack} className="hover:text-latte-mauve dark:hover:text-mocha-mauve">
          <SkipForward className="w-4 h-4" />
        </button>
      </div>

      {/* Progress bar */}
      <input
        type="range"
        min="0"
        max="100"
        value={progress}
        onChange={handleSeek}
        className="w-full accent-latte-mauve dark:accent-mocha-mauve"
      />

      {/* Track list */}
      <ul className="mt-2 text-xs w-full text-left space-y-1">
        {tracks.map((track, index) => (
          <li key={index}>
            <button
              onClick={() => selectTrack(index)}
              className={`w-full text-left px-2 py-1 rounded ${
                index === current
                  ? "bg-latte-surface1 dark:bg-mocha-surface1 text-latte-mauve dark:text-mocha-mauve"
                  : "hover:bg-latte-surface1 dark:hover:bg-mocha-surface1"
              }`}
            >
              {track.title}
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
}
