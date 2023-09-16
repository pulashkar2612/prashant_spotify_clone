import { useState, useEffect, useRef } from 'react'
import { styled, Typography, Slider, Paper, Stack, Box, CardMedia, Avatar, Card } from '@mui/material';

import VolumeDownIcon from '@mui/icons-material/VolumeDown';
import VolumeUpIcon from '@mui/icons-material/VolumeUp';
import VolumeOffIcon from '@mui/icons-material/VolumeOff';
import VolumeMuteIcon from '@mui/icons-material/VolumeMute';

import PauseIcon from '@mui/icons-material/Pause';
import FastRewindIcon from '@mui/icons-material/FastRewind';
import FastForwardIcon from '@mui/icons-material/FastForward';
import PlayArrowIcon from '@mui/icons-material/PlayArrow';
import SkipNextIcon from '@mui/icons-material/SkipNext';
import SkipPreviousIcon from '@mui/icons-material/SkipPrevious';

import { useSelector } from 'react-redux'

const CustomPaper = styled(Paper)(({ theme }) => ({
    backgroundColor: '#4c4c4c',
    backgroundImage: 'linear-gradient(45deg, red, orange, yellow, green)',
    //padding: theme.spacing(2),
    padding: ' 0 24px 8px 24px',
    position: 'fixed',
    width: '96%',
    bottom: '0px',
}))

const PSlider = styled(Slider)(({ theme, ...props }) => ({
    color: '#4c4c4c',
    height: 2,
    padding: 0,
    '&:hover': {
        cursor: 'auto',
    },
    '& .MuiSlider-thumb': {
        width: '13px',
        height: '13px',
        //display: props.thumbless ? 'none' : 'block',
    }
}))


const PlayerSection = () => {

    // Render the player component only when songsList has items


    const data = useSelector(state => state.song);

    if (!data || data.length === 0) {
        return null;
    }
    
    const playlist = data.map((item) => item);
    
    const audioPlayer = useRef()
    
    const [index, setIndex] = useState(0);

    const [currentSong, setCurrentSong] = useState(null);
    

    const [isPlaying, setIsPlaying] = useState(false);
    const [volume, setVolume] = useState(50);
    const [mute, setMute] = useState(false);

    const [elapsed, setElapsed] = useState(0);
    const [duration, setDuration] = useState(0);

    useEffect(() => {
        if (audioPlayer) {
            audioPlayer.current.volume = volume / 100;
        }
        if (isPlaying) {
            setInterval(() => {
                const _duration = Math.floor(audioPlayer?.current?.duration);
                const _elapsed = Math.floor(audioPlayer?.current?.currentTime);

                setDuration(_duration);
                setElapsed(_elapsed);
            }, 100);
        }
    }, [volume, isPlaying]);

    useEffect(() => {
        audioPlayer.current.onended = () => {
            if(data.length >1){
                toggleSkipForward();
            }else{
                audioPlayer.current.pause();
                audioPlayer.current.src=playlist[0].audio_url;
                setElapsed(0);
                setIsPlaying(false);
            }
            //console.log("skip next on end", isPlaying);
        };
    })

    useEffect(() => {
        setIsPlaying(false);
        setElapsed(0);
        setDuration(0);
        audioPlayer.current.src = playlist[0].audio_url;
        audioPlayer.current.pause();
        setCurrentSong(playlist[0]);
        if (data.length === 1) {
            audioPlayer.current.play();
            setIsPlaying(true);
        }
    }, [data])

    function formatTime(time) {
        if (time && !isNaN(time)) {
            const minutes = Math.floor(time / 60) < 10 ? `0${Math.floor(time / 60)}` : Math.floor(time / 60);
            const seconds = Math.floor(time % 60) < 10 ? `0${Math.floor(time % 60)}` : Math.floor(time % 60);

            return `${minutes}:${seconds}`;
        }
        return '00:00';
    }

    const togglePlay = () => {
        if (!isPlaying) {
            audioPlayer.current.play()
        } else {
            audioPlayer.current.pause()
        }
        setIsPlaying(prev => !prev)
    }

    const toggleForward = () => {
        audioPlayer.current.currentTime += 10;

    }

    const toggleBackward = () => {
        audioPlayer.current.currentTime -= 10;
    }

    const toggleSkipForward = () => {
        if (playlist) {
            if (index >= playlist.length - 1) {
                setIndex(0);
                audioPlayer.current.src = playlist[0].audio_url;
                audioPlayer.current.play();
                setCurrentSong(playlist[0])
            } else {
                setIndex(prev => prev + 1);
                audioPlayer.current.src = playlist[index + 1].audio_url;
                //console.log("hi")
                audioPlayer.current.play();
                setCurrentSong(playlist[index + 1])
            }
        }
    }

    const toggleSkipBackward = () => {
        if (index > 0 && playlist) {
            setIndex(prev => prev - 1);
            audioPlayer.current.src = playlist[index - 1].audio_url;
            audioPlayer.current.play();
            setCurrentSong(index - 1);
        }
    }

    function VolumeBtns() {
        return mute
            ? <VolumeOffIcon sx={{ color: '#4c4c4c', '&:hover': { color: 'white' } }} onClick={() => setMute(!mute)} />
            : volume <= 20 ? <VolumeMuteIcon sx={{ color: '#4c4c4c', '&:hover': { color: 'white' } }} onClick={() => setMute(!mute)} />
                : volume <= 75 ? <VolumeDownIcon sx={{ color: '#4c4c4c', '&:hover': { color: 'white' } }} onClick={() => setMute(!mute)} />
                    : <VolumeUpIcon sx={{ color: '#4c4c4c', '&:hover': { color: 'white' } }} onClick={() => setMute(!mute)} />
    }

    const setValue = (event) => {
        audioPlayer.current.currentTime = event.target.value;
    }


    return (
        <>
            <audio ref={audioPlayer} muted={mute}>
                <source src={currentSong?.audio_url} type="audio/mp3" />
            </audio>
            <CustomPaper sx= {{zIndex : '1000'}} >
                <Stack spacing={1} direction='row' sx={{
                    display: 'flex',
                    alignItems: 'center',
                    maxWidth: '95%',
                }} >
                    <Typography sx={{ color: '#4c4c4c' }}>{formatTime(elapsed)}</Typography>
                    <PSlider value={elapsed} max={duration} onChange={setValue} />
                    <Typography sx={{ color: '#4c4c4c' }}>{formatTime(duration)}</Typography>
                </Stack>
                <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
                    <Stack direction="row" spacing={2}
                        sx={{
                            display: 'flex',
                            justifyContent: 'flex-start',
                            width: '20%'
                        }}>
                        <Card width="60px" sx={{ overflow: 'visible' }}>
                            {/* <CardMedia component="img" alt={currentSong?.title} height="40" width="40" src={currentSong?.thumnail} /> */}
                            <Avatar alt="Avatar" src={currentSong?.thumbnail} sx={{ width: 50, height: 50 }} variant="square" />
                        </Card>
                        <Box direction="column" padding={0} maxWidth="200px">
                            <Typography variant="body1"
                                sx={{
                                    color: '#4c4c4c',
                                    fontWeight: 'bold',
                                    whiteSpace: 'nowrap',
                                    overflow: 'hidden',
                                    textOverflow: 'ellipsis',
                                }}>
                                {currentSong?.title}
                            </Typography>
                            <Typography variant="body1"
                                sx={{
                                    color: 'white',
                                    whiteSpace: 'nowrap',
                                    overflow: 'hidden',
                                    textOverflow: 'ellipsis',
                                }}>
                                {currentSong?.artist[0]?.name}
                            </Typography>
                        </Box>
                    </Stack>
                    <Stack direction='row' spacing={1}
                        sx={{
                            display: 'flex',
                            width: '45%',
                            alignItems: 'center',
                            justifyContent: 'center',
                        }}>
                        <SkipPreviousIcon
                            sx={{
                                color: '#4c4c4c',
                                '&:hover': { color: 'white' }
                            }}
                            onClick={toggleSkipBackward} disabled={true} />
                        <FastRewindIcon sx={{ color: '#4c4c4c', '&:hover': { color: 'white' } }} onClick={toggleBackward} />

                        {!isPlaying
                            ? <PlayArrowIcon fontSize={'large'} sx={{ color: '#4c4c4c', '&:hover': { color: 'white' } }} onClick={togglePlay} />
                            : <PauseIcon fontSize={'large'} sx={{ color: '#4c4c4c', '&:hover': { color: 'white' } }} onClick={togglePlay} />
                        }


                        <FastForwardIcon sx={{ color: '#4c4c4c', '&:hover': { color: 'white' } }} onClick={toggleForward} />
                        <SkipNextIcon sx={{ color: '#4c4c4c', '&:hover': { color: 'white' } }} onClick={toggleSkipForward} />
                    </Stack>

                    <Stack direction='row' spacing={1}
                        sx={{
                            display: 'flex',
                            justifyContent: 'flex-end',
                            width: '20%',
                            alignItems: 'center',
                            '@media screen and (max-width: 700px)': {
                                display: 'none', // Hide the entire Stack for xs, sm, md screens
                            },
                        }}
                    >
                        <Typography sx={{ color: 'white' }}>{formatTime(elapsed)}</Typography>
                        <Typography sx={{ color: 'white' }}>/</Typography>
                        <Typography sx={{ color: 'white' }}>{formatTime(duration)}</Typography>
                        <VolumeBtns />

                        <PSlider min={0} max={100} value={volume}
                            onChange={(e, v) => setVolume(v)}
                        />
                    </Stack>
                </Box >
            </CustomPaper >
        </>
    )
}

export default PlayerSection;