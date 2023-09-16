import React, { useState } from 'react';
import { Box, Grid, IconButton, Slider, Typography, Card, CardMedia } from '@mui/material';
import PlayArrowIcon from '@mui/icons-material/PlayArrow';
import PauseIcon from '@mui/icons-material/Pause';
import SkipPreviousIcon from '@mui/icons-material/SkipPrevious';
import SkipNextIcon from '@mui/icons-material/SkipNext';
// import VolumeDownIcon from '@mui/icons-material/VolumeDown';
import VolumeUpIcon from '@mui/icons-material/VolumeUp';
import { useSelector } from 'react-redux'

const MusicPlayer = () => {
    const songs = useSelector(state => state.song);
    const playlist = songs.map((item) => item.audio_url);

    const [isPlaying, setIsPlaying] = useState(false);
    const [volume, setVolume] = useState(50);
    const [changevolume, setchangeVolume] = useState(false);
    const [progress, setProgress] = useState(0);
    const [currentSongIndex, setCurrentSongIndex] = useState(0);

    const currentSong = playlist[currentSongIndex].audio_url;
    const audioSource = currentSong
    const audioRef = React.createRef();


    const handlePlayPause = () => {
        if (isPlaying) {
            audioRef.current.pause();
        } else {
            audioRef.current.play();
        }
        setIsPlaying(!isPlaying);
    };

    const handleNext = () => {
        const newIndex = (currentSongIndex + 1) % songs.length;
        setCurrentSongIndex(newIndex);
        // Update song playback logic here
    };

    const handlePrevious = () => {
        const newIndex = (currentSongIndex - 1 + songs.length) % songs.length;
        setCurrentSongIndex(newIndex);
        // Update song playback logic here
    };

    const handleVolumeChange = (event, newValue) => {
        setVolume(newValue);
        setchangeVolume(changevolume ? false : true);
        // Implement volume change logic here
    };

    const handleProgressChange = (event, newValue) => {
        setProgress(newValue);
        // Implement song progress change logic here
    };

    const slidershow = (changevolume) ?
        <Slider value={volume} onChange={handleVolumeChange} color="yellowgreen" sx={{ transform: 'rotate(-90deg)' }} />
        : null;

    return (
        <>
            <audio src={currentSong} ref={audioPlayer} muted={mute} />
            <Grid container
                display="flex"
                flexDirection="row"
                alignItems="center"
                justifyContent="space-between"
                position="fixed"
                bottom={0}
                left={0}
                width="100%"
                height="80px"
                sx={{
                    padding: "0 24px",
                    backgroundImage: 'linear-gradient(90deg, lightgreen, lightcoral)',
                }}
            >
                <Grid item xs={4} display="flex" flexDirection="row">
                    <Card>
                        <CardMedia component="img" alt={currentSong.songName} height="50" width="50" image={currentSong.image} />
                    </Card>
                    <Box>
                        <Grid item>
                            <Typography variant="body1" color="textPrimary">{currentSong.songName}</Typography>
                            <Typography variant="body2" color="textSecondary">{currentSong.artist}</Typography>
                        </Grid>
                    </Box>
                </Grid>
                {/* Controls */}
                <Grid item xs={4} container alignItems="center" justifyContent="center">
                    <IconButton onClick={handlePrevious}>
                        <SkipPreviousIcon
                            onClick={toggleSkipBackward} disabled={true}
                        />
                    </IconButton>

                    <FastRewindIcon onClick={toggleBackward} />

                    <IconButton onClick={handlePlayPause}>
                        {isPlaying ? <PauseIcon onClick={togglePlay} /> : <PlayArrowIcon onClick={togglePlay} />}
                    </IconButton>

                    <FastForwardIcon onClick={toggleForward} />

                    <IconButton onClick={handleNext}>
                        <SkipNextIcon onClick={toggleSkipForward} />
                    </IconButton>
                </Grid>

                {/* Volume control */}
                <Grid item xs={4} container alignItems="center" justifyContent="center">
                    <Box width="40px">
                        <IconButton onClick={handleVolumeChange}>
                            <VolumeUpIcon />
                        </IconButton>
                    </Box>
                    {slidershow}
                </Grid>
            </Grid>
            <Box spacing= {1} sx={{ padding: '0 24px', bottom: '80px', position: 'fixed', width: "100%", maxWidth: 'lg', display: 'flex', alignItems: 'center', flexDirection:'row' }}>
                <Typography sx={{ color: 'lime' }}>{formatTime(elapsed)}</Typography>
                <PSlider thumbless value={elapsed} max={duration} />
                {/* <Slider value={progress} sx={{ padding: "0px", color: 'red', width: "100%" }} onChange={handleProgressChange} color="secondary" /> */}
                <Typography sx={{ color: 'lime' }}>{formatTime(duration - elapsed)}</Typography>
            </Box>
        </>
    );
};

export default MusicPlayer;