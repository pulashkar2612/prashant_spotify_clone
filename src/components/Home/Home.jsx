import AsideSection from '../AsideSections/AsideSection';
import MainBody from '../MainBody/MainBody';
import Navbar from '../MainBody/Navbar';
import PlayerSection from '../PlaySection/PlayerSection';
import { useSelector } from 'react-redux';
//import { useHistory } from 'react-router-dom';
import { useLocation } from 'react-router-dom';


function Home() {
    const data = useSelector(state => state.song);
    //const history = useHistory();
    const location = useLocation();
    //navigate('/your-page')
    const excludedRoutes = ['/login', '/signup', '/resetpassword', '/subscribe', '/home/search'];
    const currentRoute = location.pathname;

    // Check if the current route is excluded
    const isExcludedRoute = excludedRoutes.includes(currentRoute);
    return (
        <>
            <Navbar />
            <AsideSection />
            <MainBody />
            {data && data.length > 0 && !isExcludedRoute && <PlayerSection />}
            {/* <PlayerSection /> */}
        </>
    );
}

export default Home;