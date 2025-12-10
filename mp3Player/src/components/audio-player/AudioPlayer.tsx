import { useRef, useState, useEffect } from "react";
import { MdPlayArrow, MdPause, MdSkipNext, MdSkipPrevious, MdVolumeUp } from "react-icons/md";
import "./AudioPlayer.css";

interface Song {
    name: string;
    src: string;
}

const songs: Song[] = [
    { name: "24 Candles - Kanye West", src: "../24 Candles.mp3" },
    { name: "EVERYBODY - Kanye West, Ty Dolla $ign", src: "../EVERYBODY.mp3" },
    { name: "Big Poe - Tyler, The Creator", src: "../Big Poe.mp3" },
    { name: "si preguntas por mi - Tainy", src: "../si preguntas por mi.mp3" },
    { name: "Radio Tune - GdoS", src: "../Radio Tune.mp3" },
    { name: "BULLETPROOF - Ye", src: "../BULLETPROOF.mp3" },
    { name: "Tiramisu - Don Toliver", src: "../Tiramisu.mp3" },
];

const formatTime = (time: number) => {
    const minutes = Math.floor(time / 60);
    const seconds = Math.floor(time % 60);
    return `${minutes}:${seconds < 10 ? "0" : ""}${seconds}`;
};

const AudioPlayer = () => {
    const audioRef = useRef<HTMLAudioElement | null>(null);
    const [fileName, setFileName] = useState<string>("");
    const [isPlaying, setIsPlaying] = useState<boolean>(false);
    const [progress, setProgress] = useState<number>(0);
    const [currentIndex, setCurrentIndex] = useState<number | null>(null);
    const currentSong = currentIndex !== null ? songs[currentIndex] : null;
    const [currentTime, setCurrentTime] = useState<number>(0);
    const [duration, setDuration] = useState<number>(0);
    const [volume, setVolume] = useState<number>(1);

    const handleVolumeChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const value = Number(event.target.value) / 100;
        setVolume(value);
        if (audioRef.current) {
            audioRef.current.volume = value;
        }
    };


    useEffect(() => {
        if (!audioRef.current) return;
        const audio = audioRef.current;
        const setAudioDuration = () => setDuration(audio.duration || 0);

        audio.addEventListener("loadedmetadata", setAudioDuration);

        const updateProgress = () => {
            setCurrentTime(audio.currentTime);
            const durationValue = audio.duration || 1;
            setProgress((audio.currentTime / durationValue) * 100);
        };

        audio.addEventListener("timeupdate", updateProgress);

        return () => {
            audio.removeEventListener("loadedmetadata", setAudioDuration);
            audio.removeEventListener("timeupdate", updateProgress);
        };
    }, [currentSong]);


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

    function changeSong(index: number): void {
        if (index < 0) index = songs.length - 1;
        if (index >= songs.length) index = 0;

        setCurrentIndex(index);
    }


    useEffect(() => {
        if (!audioRef.current || !currentSong) return;

        audioRef.current.src = currentSong.src;
        audioRef.current.currentTime = 0;

        audioRef.current.play();
        setIsPlaying(true);

    }, [currentSong]);


    useEffect(() => {
        if (!audioRef.current) return;
        const audio = audioRef.current;

        const handleEnded = () => {
            playNext();
        };

        audio.addEventListener("ended", handleEnded);

        return () => {
            audio.removeEventListener("ended", handleEnded);
        };
    }, [currentSong]);

    const playNext = () => {
        if (currentIndex === null) {
            setCurrentIndex(0);
            return;
        }
        changeSong(currentIndex + 1);
    };

    const playPrev = () => {
        if (currentIndex === null) {
            setCurrentIndex(songs.length - 1);
            return;
        }
        changeSong(currentIndex - 1);
    };

    const aa = () => {
        // console.log("hola");
    };

    return (
        <div className="audio-player">
            <h1>DASC UABCS - MP3 Player</h1>
            <div className="Songs">
                <ul>
                    {songs.map((song, index) => (
                        <li key={song.name}>
                            <button
                                onClick={() => changeSong(index)}
                                className={index === currentIndex ? "active" : ""}
                            >
                                {song.name}
                            </button>
                        </li>
                    ))}
                </ul>
            </div>


            <audio ref={audioRef} src={currentSong ? currentSong.src : ""}></audio>

            <div className="controls-area">
                <p className="file-name">{fileName}</p>
                <div className="volume-control">
                    <span><MdVolumeUp size={24} /></span>

                    <input
                        type="range"
                        min="0"
                        max="100"
                        value={volume * 100}
                        onChange={handleVolumeChange}
                        id="volume"
                        style={{
                            background: `linear-gradient(to right, #ff9500 ${volume * 100}%, #d3d3d3 ${volume * 100}%)`
                        }}
                    />
                </div>

            </div>

            <div className="progress-area">

            <div className="controls">
                <button onClick={playPrev}>
                    <MdSkipPrevious size={30} />
                </button>
                <button onClick={handlePlayPause} className="play-pause">
                    {isPlaying ? <MdPause size={30} /> : <MdPlayArrow size={30} />}
                </button>
                <button onClick={playNext}>
                    <MdSkipNext size={30} />
                </button>
            </div>

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
                <span>{formatTime(currentTime)} / {formatTime(duration)}</span>
            </div>



        </div>
    );
};

export default AudioPlayer;
