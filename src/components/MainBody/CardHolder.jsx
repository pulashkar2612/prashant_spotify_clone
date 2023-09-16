import { Card, CardContent, CardMedia, Typography, IconButton } from "@mui/material"
import { useNavigate } from 'react-router-dom';
import PlayCircleFilledWhiteIcon from "@mui/icons-material/PlayCircleFilledWhite";
import { useState } from "react";

function CardHolder({ propKey, pathUrl, propValue }) {
    const length = propValue.length;
    console.log(length, propValue);

    const navigate = useNavigate();

    const handleClick = () => {
        console.log(pathUrl);
        const data = propValue;
        navigate(`/genre/${pathUrl}/${propValue[length - 1].mood}`, { state: {data, pathUrl} });
    }

    const [isHovered, setIsHovered] = useState(false);

    const handleMouseEnter = () => {
        setIsHovered(true);
    };

    const handleMouseLeave = () => {
        setIsHovered(false);
    };

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
            onMouseEnter={handleMouseEnter}
            onMouseLeave={handleMouseLeave}
        >
            <div style={{ position: 'relative' }} >
                <CardMedia
                    component="img"
                    width='1.2rem'
                    image={propValue[length - 1].thumbnail}
                    alt={propValue[length - 1].mood}
                    sx={{ 
                        borderRadius: '20px',
                    }}
                />
                {/* {isHovered && */}
                    <IconButton 
                        sx={{
                            position: 'absolute',
                            top: '50%',
                            left: '50%',
                            transform: 'translate(-50%, -50%)',
                            backgroundColor: 'green',
                        }}
                    >
                        <PlayCircleFilledWhiteIcon  fontSize={'large'} style={{ color: 'white' }} />
                    </IconButton>
                {/* } */}
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
                <Typography variant='h7'>{propValue[length - 1].mood}</Typography>
            </CardContent>
        </Card>
    );
}

export default CardHolder;