//import React, {useEffect} from 'react';
import { useLocation } from 'react-router-dom';
import { FaUsers } from "react-icons/fa";
import Banner from './Banner';
import Audio from './Audio';
import './Genre.css';
import { useDispatch } from 'react-redux';
import { add } from '../../store/songSlice'
import { useEffect } from 'react';
import { Button } from "@mui/material"

function Genre() {
    const location = useLocation();
    const {data, pathUrl} = location.state;
    //console.log("state: ", data, pathUrl);
    const dispatch = useDispatch();
    useEffect(() => {
        dispatch(add(data));
        //console.log("dispatched")
    }, [data])
    //console.log(state);
    return (
        <div className='mainContainer' >
            <Banner />
            {/* <div className="menuList">
                <ul>
                    <li>
                        <a>Popular</a>
                    </li>
                    <li>
                        <a href="#">Albums</a>
                    </li>
                    <li>
                        <a href="#">Songs</a>
                    </li>
                    <li>
                        <a href="#">Fans</a>
                    </li>
                    <li>
                        <a href="#">About</a>
                    </li>
                    <li>
                        <Button sx={{
                            padding: '5px 15px',
                            border: '1px solid white',
                            borderRadius: '20px',
                            color: 'white',
                            backgroundColor: 'green'
                        }}
                        onClick={() => dispatch(add(state))}
                        >
                            Play All
                        </Button>
                    </li>
                </ul>

                <p>
                    <i>
                        <FaUsers />
                    </i>
                    12.3M <span>Followers</span>
                </p>
            </div> */}
            <Audio data={data} pathUrl={pathUrl} />
        </div>
    );
}

export default Genre;