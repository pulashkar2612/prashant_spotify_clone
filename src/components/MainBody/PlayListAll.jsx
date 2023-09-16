import { useState, useEffect } from 'react';
import CardHolder from './CardHolder';
import CardHolderAlbum from './CardHolderAlbum'
import { Box, Grid, Typography, Container, Button } from "@mui/material"
import { useNavigate } from 'react-router-dom';
//import {useTheme} from '@mui/material';

function PlayListAll({ pathUrl, name }) {
    //const theme = useTheme();
    const navigate = useNavigate();
    const [songs, setSongs] = useState([]);
    const [album, setAlbum] = useState([]);
    const visibleSongs = Object.keys(songs).slice();
    const visibleAlbum = album.slice();

    const url = 'https://academics.newtonSchool.co/api/v1/music/'
    let [page, setPage] = useState(1);
    let [limit, setLimit] = useState(20);
    let [hasMoreData, sethasMoreData] = useState(true);

    const fetchSong = async () => {
        try {
            const response = await fetch(`${url}${pathUrl}?page=${page}&limit=${limit}`, {
                headers: {
                    'projectId': '3iexcoebatly'
                }
            })
            const json = await response.json();
            if (json.length < limit) {
                sethasMoreData(false);
            }
            if (json && pathUrl == 'song') {
                const moodvalues = await json.data.reduce((acc, obj) => {
                    const mood = obj.mood;
                    if (!acc[mood]) {
                        acc[mood] = [];
                    }
                    acc[mood].push(obj);
                    return acc;
                }, {})
                setSongs(moodvalues);
            } else if (json && pathUrl == 'album') {
                console.log(album);
                //const updatedAlbum = [...album, json.data];
                setAlbum(json.data);
                //console.log(updatedAlbum);
            }
        } catch (err) {
            console.log(err);
        }
    }

    useEffect(() => {
        fetchSong();
    }, [page])

    const handleNext = async () => {
        if (hasMoreData) {
            setPage(prev => prev + 1)
        }
    }

    const handlePrevious = async () => {
        if (page !== 1) {
            setPage(prev => prev - 1)
        }
    }

    return (
        <Box sx={{
            //padding: '16px',
            padding: {
                xs: '16px 4px', // For screens less than 500px
                lg: '16px', // For screens 500px and greater
              },
            borderRadius: '20px',
            marginBottom: '16px',
            display: 'felx',
            flexDirection: 'columns',
            background: 'rgba(255, 255, 255, 0.1)',
            minWidth: '372px',
        }}>
            <Box sx={{
                display: "flex",
                flexDirection: "row",
                alignItems: 'flex-end',
                justifyContent: "space-between",
                paddingBottom: '20px',
                verticalAlign: 'baseline',
            }} >
                <Typography
                    variant="h5"
                    fontWeight="bold"
                    sx={{
                        cursor: "pointer",
                        background: 'linear-gradient(90deg, #af2896, #509bf5)',
                        webkitbackgroundclip: 'text',
                        backgroundClip: 'text',
                        color: 'transparent',
                        '&:hover': { color: '#1ed760', textDecoration: 'underline' },
                    }}
                // onClick={handleToggleShowAll}
                >
                    {name}
                </Typography>
                <Typography
                    variant="h7"
                    fontWeight="bold"
                    sx={{
                        cursor: "pointer",
                        background: 'linear-gradient(90deg, #af2896, #509bf5)',
                        webkitbackgroundclip: 'text',
                        backgroundClip: 'text',
                        color: 'transparent',
                        '&:hover': { color: '#1ed760', textDecoration: 'underline' },
                    }}
                >
                    <Button sx={{
                        padding: '2px 8px',
                        border: '1px solid white',
                        borderRadius: '20px',
                        color: 'white',
                        backgroundColor: 'gray',
                        marginRight: '20px',
                        '&:hover': {
                            background: 'green',
                            cursor: 'pointer',
                            color: 'white',
                            transition: 'background 0.3s ease, cursor 0.3s ease',
                        },
                    }}
                    onClick={handlePrevious}
                    disabled={page === 1}
                    >
                        Previous
                    </Button>
                    <Button sx={{
                        padding: '2px 8px',
                        border: '1px solid white',
                        borderRadius: '20px',
                        color: 'white',
                        backgroundColor: 'gray',
                        marginRight: '20px',
                        '&:hover': {
                            background: 'green',
                            cursor: 'pointer',
                            color: 'white',
                            transition: 'background 0.3s ease, cursor 0.3s ease',
                        },
                    }}
                    onClick={handleNext}
                    disabled = {!hasMoreData}
                    >
                        Next
                    </Button>
                </Typography>
            </Box>
            <Box sx={{
                display: 'grid',
                gridTemplateColumns: 'repeat(var(--column-count),minmax(0,1fr))',
                gridAutoRows: '0',
                overflowY: 'hidden',
                verticalAlign: 'baseline',
                gridTemplateRows: '1fr',
                columnWidth: '235px',
                columnCount: 2,
                gridGap: '12px',
                minWidth: '372px',
            }}>
                <Grid spacing={2} container >
                    {pathUrl === 'song' ?
                        visibleSongs.map((key) => (
                            <Grid item key={key} xs={6} sm={6} md={4} lg={3}>
                                <CardHolder key={key} pathUrl="songs" propKey={key} propValue={songs[key]} />
                            </Grid>
                        )) :
                        visibleAlbum.map((item) => (
                            <Grid item key={item._id} xs={6} sm={6} md={4} lg={3}>
                                <CardHolderAlbum key={item._id} pathUrl="album" propValue={item} />
                            </Grid>
                        ))
                    }
                </Grid>
            </Box>
        </Box>
    );
}

export default PlayListAll;