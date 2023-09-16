import React, { useEffect, useState } from 'react';
//import { useSelector } from "react-redux";
import './Search.css';
import { useDispatch, useSelector } from 'react-redux';
import { setSearchQuery, clearSearchQuery } from '../../store/searchSlice';
import { add } from '../../store/songSlice';
import CardHolder from '../MainBody/CardHolder';
import PlayListBox from '../MainBody/PlayListBox';
import { Box, Grid, Typography, Container } from "@mui/material"
import CardHolderSearch from '../MainBody/CardHolderSearch';


function Search(props) {
    //const { playlists, search } = useSelector(state => state.reducer);
    const [playlists, setplaylists] = useState([]);
    let [search, setSearch] = useState(null);
    const [searchResult, setSearchResult] = useState([]);
    const searchQuery = useSelector((state) => state.search.searchQuery);
    console.log("search :", searchQuery);
    const dispatch = useDispatch();
    useEffect(() => {
        setSearchResult(playlists.filter((i) => (
            (i.name.toLowerCase().startsWith(search))
            ||
            (i.author_name.toLowerCase().startsWith(search))
            ||
            (i.musicName.toLowerCase().startsWith(search))
            ||
            (i.lang && i.lang.toLowerCase().startsWith(search))
        )));
    }, [search, playlists]);

    const url = 'https://academics.newtonSchool.co/api/v1/music/song'
    const fetchSearch = async () => {
        if (searchQuery != "") {
            try {
                const response = await fetch(`${url}?filter={"title" : "${searchQuery}"}`, {
                    method: "GET",
                    headers: {
                        'projectId': '3iexcoebatly'
                    }
                })
                const res = await response.json();
                if (res.status === 'success') {
                    console.log("searchresult:", res);
                    setSearchResult(res.data)
                    dispatch(clearSearchQuery());
                } else {
                    throw new Error(res.message || 'An error occurred');
                }
            } catch (err) {
                console.log("error:", err);
                setSearchResult([]);
                dispatch(add([]));
            }

        }
    }
    console.log(searchResult);
    useEffect(() => {
        fetchSearch();
    }, [searchQuery]);

    return (
        <>
             {/* {searchQuery === "" || searchQuery === null ? */}
            {searchResult == []  || searchQuery === null ?
                <div className={"Search"}>
                    Search here
                </div>
                : searchResult.length === 0 ?
                    <div className={"Search"}>
                        No result found.
                    </div> :
                    <Box sx={{margin: '20px'}}>
                        <Box sx={{
                            display: 'flex',
                            flexDirection: 'row',
                            width: '100%',
                            padding: '20px',
                            borderRadius: '20px',
                            backgroundColor: 'rgba(255, 255, 255, 0.1)',
                        }}>
                            <Grid container spacing={2} flexDirection="row">
                                {searchResult?.map((item) => (
                                    <Grid item key={item._id} xs={6} sm={6} md={4} lg={3}>
                                        <CardHolderSearch pathUrl="search" propValue={item} />
                                    </Grid>
                                ))}
                            </Grid>
                        </Box>
                    </Box>
            }
        </>
    );
}

export default Search;