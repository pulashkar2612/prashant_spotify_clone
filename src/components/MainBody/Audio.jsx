import React, { useState, useEffect } from 'react';
import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, Avatar, Tab, Box } from '@mui/material';
import FavoriteIcon from '@mui/icons-material/Favorite';
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';
import { useDispatch, useSelector } from 'react-redux';
import { add } from '../../store/songSlice'
import { likeSong, unlikeSong } from '../../store/userSlice';
import { useNavigate } from 'react-router-dom';

function Audio({ data, pathUrl }) {
    const navigate = useNavigate();

    
    const dispatch = useDispatch();

    const loggedInUserId = useSelector((state) => state.user.loggedInUserId);
    const likedSongs = loggedInUserId ?useSelector((state) => state.user.users[loggedInUserId].likedSongs): []

    const [songs, setSongs] = useState([]);

    useEffect(() => {
        // Update the "songs" state when "likedSongs" or "pathUrl" changes
        if (pathUrl === 'liked') {
          setSongs(likedSongs);
        } else {
            console.log(data);
          setSongs(data);
        }
      }, [likedSongs, pathUrl, data]);

      console.log(songs);
    
    

    
    const [playSong, setPlaySong] = useState([]);

    const playSongFunction = (row) => {
        console.log(row);
        const state = [row];
        console.log("playsongState", state);
        dispatch(add(state));
        console.log("dispatched");
    }

    const changetoUnlike = async (id) => {
        //const userId = localStorage.getItem("id");
        if (loggedInUserId) {
            dispatch(unlikeSong({ songId: id }));
        }
    }


    const changetoLike = async (song) => {
        //const userId = localStorage.getItem("id");
        if (loggedInUserId) {
            dispatch(likeSong({ song: song }));
        }else{
            navigate('/login')
        }
    }

    return (
        <div>
            {/* {songs.map((item, index) => {
                <div> */}
            <TableContainer sx={{ backgroundImage: 'linear-gradient(90deg,#af2896,#509bf5)' }} >
                <Table>
                    <TableBody>
                        {songs?.map((row, index) => (
                            <TableRow 
                            key={index} 
                            sx={{
                                '&:hover': {
                                    background: 'green',
                                    cursor: 'pointer',
                                    transition: 'background 0.3s ease, cursor 0.3s ease',
                                }
                            }}
                            onClick={() => playSongFunction(row)}
                            >
                                <TableCell width={15}><p >{`#${index + 1}`}</p></TableCell>
                                <TableCell width={60}>
                                    <Avatar alt="Avatar" src={row.thumbnail} sx={{ width: 50, height: 50 }} variant="square" />
                                </TableCell>
                                <TableCell sx={{ fontWeight: "bold" }} width={230} >{row.title}</TableCell>
                                <TableCell width={400}>
                                    {row.artist.map((item, i) => (i + 1) == row.artist.length ? `${item.name}` : `${item.name}, `)}
                                </TableCell>
                                <TableCell>
                                    <Box >
                                        {likedSongs?.some(item => item._id == row._id) ?
                                            <FavoriteIcon color="error" onClick={() => changetoUnlike(row._id)} /> :
                                            <FavoriteBorderIcon onClick={() => changetoLike(row)} />
                                        }
                                    </Box>
                                </TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </TableContainer>
        </div>
    );
}

export default Audio;