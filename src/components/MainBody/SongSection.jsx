//import { Box } from "@mui/material"
import PlayListBox from './PlayListBox';

function SongSection() {
   
    return (
        <>
            <PlayListBox pathUrl="album" name = "Spotify Album"/>
            <PlayListBox pathUrl="song" name="Spotify Playlist" />
        </>
    );
}

export default SongSection;