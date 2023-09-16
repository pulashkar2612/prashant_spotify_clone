import React from 'react';
import "./SidebarOption.css";
import { Avatar } from '@mui/material';
import { useDispatch } from 'react-redux';
import { add } from '../../store/songSlice'
import { useNavigate } from 'react-router-dom';

function LikedSong({props}) {
    console.log(props);
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const playSongFunction = (props) => {
        const state = [props];
        console.log("playsongState", state);
        dispatch(add(state));
        navigate('')
        console.log("dispatched");
    }

    return (
        // onClick={() => { sideBarRef.current.click(); }}
        <div className="sidebarOption" onClick={() => playSongFunction(props)} >
            <Avatar alt="Avatar" src={props.thumbnail} sx={{ padding: '0px 20px', width: 35, height: 35 }} variant="square" />
            {props.title}
        </div>
    );
}

export default LikedSong;