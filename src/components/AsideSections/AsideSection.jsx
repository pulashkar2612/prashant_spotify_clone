import "./AsideSection.css";
import SidebarOption from "./SidebarOption";
import HomeIcon from "@mui/icons-material/Home";
import SearchIcon from "@mui/icons-material/Search";
import LibraryMusicIcon from "@mui/icons-material/LibraryMusic";
import { Link } from "react-router-dom";
import ThumbUpOffAltIcon from '@mui/icons-material/ThumbUpOffAlt';
import LikedSong from "./LikedSong";
import { useSelector, useDispatch } from 'react-redux';
import { add } from '../../store/songSlice'
import { useNavigate } from 'react-router-dom';

//import { loggedInUserId,  } from '../../store/userSlice';


function AsideSection() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const loggedInUserId = useSelector((state) => state.user.loggedInUserId);
  // const likedSongs = loggedInUserId ? useSelector((state) => state.user.users[loggedInUserId]?.likedSongs): []
  const likedSongs = useSelector((state) => state.user.users[loggedInUserId]?.likedSongs);
  //console.log(likedSongs);

  const handleClick = async () => {
    //console.log(pathUrl);
    dispatch(add(likedSongs));
    const pathUrl = "liked"
    const data= likedSongs;
    navigate(`/genre/playlist/likedSongs`, { state: {data, pathUrl }});
  }


  return (
    <div className="sidebar">
      <SidebarOption Icon={HomeIcon} href={"/"} title={"Home"} />
      <SidebarOption Icon={SearchIcon} href={"/home/search"} title={"Search"} />
      {/* <SidebarOption Icon={LibraryMusicIcon} title={"Your Library"} /> */}
      <br />
      <strong className="sidebar__title">PLAYLISTS</strong>
      <hr />
      <div onClick={handleClick}>
        <SidebarOption Icon={ThumbUpOffAltIcon} title={"Liked Songs"} />
      </div>
      <div className="liked-songs-container">
        {likedSongs && likedSongs.length > 0 &&
          likedSongs.map((playlist, index) => (
            <LikedSong key={index} props={playlist} />
            // <SidebarOption key = {playlist.id}option={playlist.name} />
          ))
        }
      </div>
    </div >
  );
}

export default AsideSection;
