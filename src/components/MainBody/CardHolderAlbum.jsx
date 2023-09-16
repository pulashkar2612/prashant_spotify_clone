import { Card, CardContent, CardMedia, Typography, IconButton } from "@mui/material"
import { useNavigate } from 'react-router-dom';
import PlayCircleFilledWhiteIcon from "@mui/icons-material/PlayCircleFilledWhite";

function CardHolderAlbum({ pathUrl, propValue }) {
    const navigate = useNavigate();
    console.log("album : ", propValue);

    const handleClick = () => {
        //console.log(propValue.title, propValue.songs, pathUrl);
        const data = propValue.songs;
        navigate(`/genre/${pathUrl}/${propValue._id}`, { state: {data, pathUrl} });
    }

    return (
        <Card sx={{
            padding: '15px',
            borderRadius: '20px',
            backgroundImage: 'linear-gradient(90deg,#af2896,#509bf5)',
            maxHeight: '280px',
            '&:hover': {
                background: 'rgba(0,0,0,.7)',
                cursor: 'pointer',
                color: 'white',
                transition: 'background 0.3s ease, cursor 0.3s ease',
            },
        }}
            onClick={handleClick}
        >
            <div style={{ position: 'relative' }} >
                <CardMedia
                    component="img"
                    width='1.2rem'
                    image={propValue.image}
                    alt={propValue.title}
                    sx={{
                        //  borderRadius: '20px 0 20px 0' 
                        borderRadius: '20px'
                    }}
                />
                <IconButton
                    sx={{
                        position: 'absolute',
                        top: '50%',
                        left: '50%',
                        transform: 'translate(-50%, -50%)',
                        backgroundColor: 'green',
                    }}
                >
                    <PlayCircleFilledWhiteIcon fontSize={'large'} style={{ color: 'white' }} />
                </IconButton>
            </div>
            <CardContent sx={{
                paddingBottom: '24px',
                textAlign: 'center',
                letterSpacing: 'normal',
                margin: 'auto',
                overflow: 'hidden',
                whiteSpace: 'nowrap',
                textOverflow: 'ellipsis',
                textTransform: 'none'
            }}>
                <Typography textAlign="center" variant='h7'>{propValue.title} </Typography>
                {/* <Typography textAlign="center" variant='h7'>{propValue.artists.map(item => `${item.name}, `)}</Typography> */}
            </CardContent>
        </Card>
    );
}

export default CardHolderAlbum;