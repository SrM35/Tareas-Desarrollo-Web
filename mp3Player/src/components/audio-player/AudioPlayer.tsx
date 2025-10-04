import { useRef, useState, useEffect } from "react";
import "./AudioPlayer.css";

interface Song {
    name: string;
    src: string;
}

const songs: Song[] = [
    { name: "24 Candles", src: "../24 Candles.mp3" },
    { name: "EVERYBODY", src: "../EVERYBODY.mp3" },
    { name: "Big Poe", src: "../Big Poe.mp3" },
    { name: "si preguntas por mi", src: "../si preguntas por mi.mp3" },
];

const AudioPlayer = () => {
    const audioRef = useRef<HTMLAudioElement | null>(null);
    const [fileName, setFileName] = useState<string>("");
    const [isPlaying, setIsPlaying] = useState<boolean>(false);
    const [progress, setProgress] = useState<number>(0);
    const [currentSong, setCurrentSong] = useState<Song>(songs[0]);

    useEffect(() => {
        if (audioRef.current) {
            const src = audioRef.current.src;
            let name = src.split("/").pop() || "";
            name = decodeURIComponent(name);
            name = name.replace(/\.[^/.]+$/, "");
            setFileName(name);

            const updateProgress = () => {
                if (!audioRef.current) return;
                const current = audioRef.current.currentTime;
                const duration = audioRef.current.duration || 1;
                setProgress((current / duration) * 100);
            };

            audioRef.current.addEventListener("timeupdate", updateProgress);

            return () => {
                audioRef.current?.removeEventListener("timeupdate", updateProgress);
            };
        }
    }, [currentSong]);

    const handlePlayPause = () => {
        if (!audioRef.current) return;

        if (audioRef.current.paused) {
            audioRef.current.play();
            setIsPlaying(true);
        } else {
            audioRef.current.pause();
            setIsPlaying(false);
        }
    };

    const handleProgressChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        if (!audioRef.current) return;
        const value = Number(event.target.value);
        const duration = audioRef.current.duration || 1;
        audioRef.current.currentTime = (value / 100) * duration;
        setProgress(value);
    };

    function changeSong(song: Song): void {
        setCurrentSong(song);
        if (audioRef.current) {
            audioRef.current.src = song.src;
            audioRef.current.currentTime = 0;
            audioRef.current.play();
            setIsPlaying(true);
        }
    }

    return (
        <div className="audio-player">
            <div className="Songs">
                <ul>
                    {songs.map((song) => (
                        <li key={song.name}>
                            <button onClick={() => changeSong(song)}>
                                {song.name}
                            </button>
                        </li>
                    ))}
                </ul>
            </div>
            <p>{fileName}</p>
            <audio ref={audioRef} src={currentSong.src}></audio>
            <button onClick={handlePlayPause} className="play-pause">
                {isPlaying ? "⏸" : "▶"}
            </button>
            <input
                type="range"
                min="0"
                max="100"
                value={progress}
                onChange={handleProgressChange}
                id="progress"
                style={{
                    background: `linear-gradient(to right, #ff9500 ${progress}%, #d3d3d3 ${progress}%)`
                }}
            />
        </div>
    );
};

export default AudioPlayer;
