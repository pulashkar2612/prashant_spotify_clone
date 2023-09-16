import { useState } from 'react';
import { Box, CardMedia, IconButton, Slider, Typography } from '@mui/material';
import PlayArrowIcon from '@mui/icons-material/PlayArrow';
import PauseIcon from '@mui/icons-material/Pause';
import VolumeUpIcon from '@mui/icons-material/VolumeUp';
import SkipPreviousIcon from '@mui/icons-material/SkipPrevious';
import SkipNextIcon from '@mui/icons-material/SkipNext';

function PlayButton() {

    const [isPlaying, setIsPlaying] = useState(false);
    const [isValue, setisValue] = useState(20);

    const handleValueChange = (event) => {
        setisValue(event.target.value);
    };

    const handleVolumeChange = () => {
    };

    const handlePrevious = () => {

    }

    const handleNext = () => {

    }

    const handlePlayPause = () => {
        setIsPlaying(!isPlaying);
    };

    const playPauseButton = isPlaying ? (
        <IconButton aria-label="play/pause" onClick={handlePlayPause}>
            <PauseIcon fontSize='large' sx={{ color: 'greenyellow' }} />
        </IconButton>
    ) : (
        <IconButton aria-label="play/pause" onClick={handlePlayPause}>
            <PlayArrowIcon fontSize='large' sx={{ color: 'greenyellow' }} />
        </IconButton>
    );

    const songDetails = isPlaying ? (
        <Box
        sx={{
            display: 'flex',
        }}>
            <CardMedia
                component="img"
                image="url_to_song_image"
                alt="Song Image"
            />
            <div>
                <Typography variant="subtitle1">Song Title</Typography>
                <Typography variant="body2">Artist Name</Typography>
            </div>
        </Box>
    ) : null;

    return (
        <Box
            sx={{
                borderradius: '5px',
                height: "80px",
                position: 'fixed',
                left: 0,
                bottom: 0,
                width: '100%',
                backgroundImage: 'linear-gradient(90deg,#af2896,#509bf5)',
                display: 'flex',
                justifyContent: 'center',
                marginTop: 'spacing(1)',
            }}>
            <Slider value={isValue} sx={{ p: 0, position: 'absolute', color: '#2bc5b4' }} onChange={handleValueChange} />
            {songDetails}
            <Box>
                <IconButton aria-label="skipPrevious" onClick={handlePrevious}>
                    <SkipPreviousIcon fontSize='large' sx={{ color: 'greenyellow' }} />
                </IconButton>
                {playPauseButton}
                <IconButton aria-label="skipNext" onClick={handleNext}>
                    <SkipNextIcon fontSize='large' sx={{ color: 'greenyellow' }} />
                </IconButton>
                <IconButton aria-label="volume" onClick={handleVolumeChange}>
                    <VolumeUpIcon fontSize='large' sx={{ color: 'greenyellow' }} />
                </IconButton>
            </Box>
        </Box>
    );
}

export default PlayButton;