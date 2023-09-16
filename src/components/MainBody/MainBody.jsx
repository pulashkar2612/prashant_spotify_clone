import { Box } from '@mui/material';
import { Route, Routes } from 'react-router-dom'
import Genre from './Genre';
import SongSection from './SongSection';
import Footer from '../Footer/Footer'
import { Login } from '../Profile/Login'
import Signup from '../Profile/Signup'
import Search from '../Search/Search'
import ResetPassword from '../Profile/ResetPassword';
import FullSection from './FullSection';
import Subscription from '../Profile/Subscription';
import './MainBody.css'


function MainBody() {
    return (
        // <Box sx={{
        //     display: 'flex',
        //     flexDirection: 'column',
        //     // marginLeft: '260px',
        //     marginLeft: "window.innerWidth < 700 ? '0' : '260px'",
        //     right: '0px',
        // }}>
        <div className="content">
            <Box sx={{
                marginTop: '80px',
                marginBottom: '100px'
            }}>
                <Box sx={{
                    flex: 1,
                    padding: '20px',
                    minWidth: '372px',
                    overflow: 'hidden'
                }}>
                    <Routes>
                        <Route path='/' element={<SongSection />} />
                        <Route path='/search' element={<h1>Search</h1>} />
                        <Route path='/genre/:pathUrl/:id' element={<Genre />} />
                        <Route path='/login' element={<Login />} />
                        <Route path='/signup' element={<Signup />} />
                        <Route path='/resetpassword' element={<ResetPassword />} />
                        <Route path='/home/search' element={<Search />} />
                        <Route path='/section/:pathUrl' element={<FullSection />} />
                        <Route path='/subscribe' element={<Subscription />} />
                    </Routes>
                    <Footer />
                </Box>
            </Box>
        </div>
        // </Box>
    );
}

export default MainBody;