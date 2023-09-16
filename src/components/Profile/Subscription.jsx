import React from 'react';
import { Box, Button, Divider, IconButton, InputAdornment, TextField, Typography, Grid, List, ListItem, ListItemText, ListItemIcon } from "@mui/material"
import VisibilityIcon from '@mui/icons-material/Visibility';
import VisibilityOffIcon from '@mui/icons-material/VisibilityOff';
import { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch } from 'react-redux';
import { loginUser } from '../../store/userSlice';
import DoneIcon from '@mui/icons-material/Done';

function GridItemBlock({ free, text, listSubs, externalLink, footerTextA, footerTextP, link }) {
    return (
        <Grid item xs={12} md={6}
            border='2px solid white'
            minWidth="300px"
            borderRadius="20px"
            boxShadow='0px 0px 10px rgba(0, 0, 0, 0.3)'
            paddingRight='16px'
            paddingBottom="16px"
            margin='0px 16px 16px 0px'
            sx={{
                transition: 'transform 0.2s ease-in', // Transition effect for size change
                    '&:hover': {
                        transform: 'scale(0.96)',
                        background: 'linear-gradient(to right, purple, yellow, orange)' // Increase size on hover
                    },
            }}
        >
            <Box>
                {free !== "" &&
                    <Typography marginBottom='10px' >
                        <span style={{
                            border: '2px solid white',
                            backgroundColor: 'rgb(13, 114, 234)',
                            padding: '4px 8px',
                            color: 'white',
                            fontWeight: 'bold',
                            borderRadius: '5px',
                            fontSize: '14px'
                        }}>
                            {free}
                        </span>
                    </Typography>
                }
                <Typography marginBottom='10px' >
                    <span style={{
                        border: '2px solid rgb(13, 114, 234) ',
                        padding: '4px 8px',
                        color: 'rgb(13, 114, 234)',
                        fontWeight: 'bold',
                        borderRadius: '5px',
                        fontSize: '14px'
                    }}>
                        One-time plans available
                    </span>
                </Typography>
                <Typography variant="h5" fontWeight="bold">{text[0]}</Typography>
                <Typography>{text[1]}</Typography>
                <Typography>{text[2]}</Typography>
            </Box>
            <Box>
                <Divider
                    sx={{
                        margin: '30px 0px',
                        borderImage: 'initial',
                        borderTop: '1.5px solid gray',
                    }}
                />
            </Box>
            <Box>
                {listSubs.map((item, key) => {
                    return (
                        <ListItem key={key} style={{ paddingLeft: '0px', paddingRight: '0px', paddingTop: '0px' }} alignItems="flex-start">
                            <ListItemIcon style={{ minWidth: '0px', paddingRight: '10px' }}  >
                                <DoneIcon sx={{ color: "black" }} />
                            </ListItemIcon>
                            <ListItemText
                                primary={item}
                            />
                        </ListItem>
                    );
                })}

            </Box>
            <Box>
                <Button sx={{
                    border: '2px solid black',
                    backgroundColor: 'black',
                    borderRadius: '20px',
                    width: '100%',
                    textTransform: 'none',
                    margin: '20px 0px',
                    color: 'white',
                    fontWeight: 'bold',
                    fontSize: '16px',
                    transition: 'transform 0.2s ease-in-out', // Transition effect for size change
                    '&:hover': {
                        transform: 'scale(1.05)',
                        background: 'black' // Increase size on hover
                    },
                }}
                    onClick={() => window.open(externalLink, '_blank')}
                >
                    View Plans
                </Button>
            </Box>
            <Box fontSize='14px'>
                <p><a style={{ color: 'black' }} href={link}>{footerTextA}</a>{footerTextP}</p>
            </Box>
        </Grid>
    );
}

function Subscription(props) {
    return (
        <>
            <Box sx={{
                background: 'linear-gradient(rgba(255, 255, 255, 0.1) 0%, rgb(0, 0, 0) 100%)',
                display: 'flex',
                flexDirection: 'column',
                padding: '20px',
                borderRadius: '20px',
                overflowX: 'hidden',
            }}>
                <Box sx={{
                    background: "black",
                }}
                    width="100%"
                    height="12vh"
                >
                    <img
                        src="https://getheavy.com/wp-content/uploads/2019/12/spotify2019-830x350.jpg"
                        alt=""
                        href="/"
                        style={{
                            maxWidth: '100%',
                            maxHeight: '100%',
                            objectFit: 'contain',
                        }}
                    />
                    <span className="flag-icon flag-icon-in"></span>
                </Box>
                <Box backgroundColor="purple" >
                    <Box sx={{
                        display: 'flex',
                        flexDirection: 'row',
                        justifyContent: 'space-between',
                        color: 'white',
                        margin: '20px 40px',
                        '@media screen and (max-width: 900px)': {
                            flexDirection: 'column', // Set flexDirection to 'row' for screen sizes 'sm' and 'xs'
                        },
                    }}>
                        <Box sx={{ marginRight: '30px' }}>
                            <Box>
                                <Typography variant="h4" fontWeight="bold">Ends soon: ₹0 for 3 months of Premium</Typography>
                            </Box>
                            <Box>
                                <Typography variant="h5" paddingTop="20px">
                                    Don&rsquo;t miss ad-free music listening, offline playback, and more. Cancel anytime.
                                    <br />
                                    <br />
                                    Offer ends in 2d: 23h: 41m
                                </Typography>
                            </Box>
                            <Box margin='35px 0px 0px'>
                                <Button sx={{
                                    justifyContent: 'center',
                                    color: 'white',
                                    textTransform: 'capitalize',
                                    border: '1px solid rgb(25, 20, 20)',
                                    textDecoration: 'none !important',
                                    backgroundColor: 'rgb(25, 20, 20)',
                                    borderRadius: '25px',
                                    padding: '10px 20px',
                                    '&:hover': { background: 'rgb(25, 20, 20)', cursor: 'pointer' },
                                    fontWeight: 'bold',
                                }}
                                >
                                    Get 3 months for free
                                </Button>
                                {/* <Button></Button> */}
                            </Box>
                            <Box fontSize='14px' paddingTop="20px">
                                <p>Individual plan only. ₹119/month after. <a style={{ color: 'white' }} href="https://www.spotify.com/legal/premium-promotional-offer-terms">Terms and conditions apply</a>. Open only to users who haven&rsquo;t already tried Premium. Offer ends 9/12/23.</p>
                            </Box>
                        </Box>
                        <Box sx={{
                            padding: '10px 0px',
                            alignItems: 'center',
                            display: 'flex',
                            justifyContent: 'center',
                        }}>
                            <Box sx={{
                                backgroundImage: 'url(https://i.scdn.co/image/ab671c3d0000f430be04d40ce4c3deead108202a)',
                                backgroundSize: 'contain',
                                backgroundRepeat: 'no-repeat',
                                // width: '100%',
                                height: '100%',
                                minWidth: '300px',
                                minHeight: '300px',
                            }} />
                        </Box>
                    </Box>
                </Box>
                <Box backgroundColor="white">
                    <Box margin="50px">
                        <Typography variant="h4" textAlign="center" fontWeight="bold" marginBottom="10px" >
                            Pick Your Premium
                        </Typography>
                        <Typography variant="h6" textAlign="center" marginBottom="10px">
                            Listen without limits on your phone, speaker, and other devices.
                        </Typography>
                        <Box
                            marginTop="20px"
                            alignItems="center"
                            sx={{
                                display: 'flex',
                                justifyContent: 'center',
                            }}
                        >
                            <Box sx={{
                                backgroundImage: 'url("https://content-tooling.spotifycdn.com/images/b33cabea-d074-4f4f-8714-da6bdb2f067f_upi.svg")',
                                width: '40px',
                                height: '20px',
                                marginRight: '5px',
                                backgroundSize: 'contain',
                                backgroundRepeat: 'no-repeat',
                            }} />
                            <Box sx={{
                                backgroundImage: 'url("https://content-tooling.spotifycdn.com/images/ea750340-f556-4682-b84c-326269cdd4bc_paytm.svg")',
                                backgroundSize: 'contain',
                                backgroundRepeat: 'no-repeat',
                                width: '40px',
                                height: '20px',
                                marginRight: '5px',
                            }} />
                            <Box sx={{
                                backgroundImage: 'url("https://content-tooling.spotifycdn.com/images/e549bf16-2051-43ac-b4d6-c5b8d7bf100d_visa.svg")',
                                backgroundSize: 'contain',
                                backgroundRepeat: 'no-repeat',
                                width: '40px',
                                height: '20px',
                                marginRight: '5px',
                            }} />
                            <Box sx={{
                                backgroundImage: 'url("https://content-tooling.spotifycdn.com/images/468706f2-62af-48e4-80cb-9616b011f6c6_amex.svg")',
                                backgroundSize: 'contain',
                                backgroundRepeat: 'no-repeat',
                                width: '40px',
                                height: '20px',
                                marginRight: '5px',
                            }} />
                            <Box sx={{
                                backgroundImage: 'url("https://content-tooling.spotifycdn.com/images/468706f2-62af-48e4-80cb-9616b011f6c6_amex.svg")',
                                backgroundSize: 'contain',
                                backgroundRepeat: 'no-repeat',
                                width: '40px',
                                height: '20px',
                                marginRight: '5px',
                            }} />
                            <Box sx={{
                                backgroundImage: 'url("https://content-tooling.spotifycdn.com/images/13ab56f9-bcc3-414e-b8ff-6cf692a5ae0c_diners.svg")',
                                backgroundSize: 'contain',
                                backgroundRepeat: 'no-repeat',
                                width: '40px',
                                height: '20px',
                                marginRight: '5px',
                            }} />
                        </Box>
                        <Box marginTop="50px">
                            <Box sx={{ flexGrow: 1, }} >
                                <Grid container spacing={2}
                                    sx={{
                                        gridTemplateRows: 'repeat(4, auto)',
                                        gridAutoFlow: 'column',
                                        gridTemplateColumns: 'repeat(4, 1fr)',
                                        flex: '3 1 0%',
                                        display: "flex",
                                        justifyContent: "center",
                                    }}>
                                    <GridItemBlock
                                        free=""
                                        text={['Mini', 'From ₹7/day', '1 account on mobile only']}
                                        listSubs={["Ad-free music listening on mobile", "Group Session", "Download 30 songs on 1 mobile device"]}
                                        externalLink='https://www.spotify.com/in-en/plan/mini/'
                                        footerTextP=''
                                        footerTextA='Terms and conditions apply.'
                                        link='https://www.spotify.com/legal/end-user-agreement'
                                    />
                                    <GridItemBlock
                                        free="3 months free"
                                        text={['Individual', '₹119/month after offer period', '1 account']}
                                        listSubs={['Ad-free music listening', 'Group Session', 'Download 10k songs/device on 5 devices']}
                                        externalLink='https://www.spotify.com/in-en/plan/individual/'
                                        footerTextP=' Individual plan only. ₹119/month after. Open only to users who havent already tried Premium. Offer ends 9/12/23.'
                                        footerTextA='Terms and conditions apply.'
                                        link='https://www.spotify.com/in-en/legal/premium-promotional-offer-terms/'
                                    />
                                    <GridItemBlock
                                        free="1 month free" 
                                        text={['Duo', '₹149/month after offer period', '2 accounts']}
                                        listSubs={['For couples who live together', 'Ad-free music listening', 'Group Session', 'Download 10k songs/device, on 5 devices per account']}
                                        externalLink='https://www.spotify.com/in-en/plan/duo/'
                                        footerTextP=' 1 month free not available for users who have already tried Premium.'
                                        footerTextA='Terms and conditions apply.'
                                        link ='https://www.spotify.com/in-en/legal/premium-promotional-offer-terms/'
                                    />
                                    <GridItemBlock
                                        free="3 months free"
                                        text={['Family', '₹179/month after offer period', 'Up to 6 accounts']}
                                        listSubs={['For family who live together', 'Block explicit music', 'Ad-free music listening','Group Session', 'Download 10k songs/device on 5 devices']}
                                        externalLink='https://www.spotify.com/in-en/plan/family'
                                        footerTextP=' 1 month free not available for users who have already tried Premium.'
                                        footerTextA='Terms and conditions apply.'
                                        link = 'https://www.spotify.com/in-en/legal/premium-promotional-offer-terms/'
                                    />
                                </Grid>
                            </Box>
                        </Box>
                    </Box>

                </Box>
            </Box>
        </>
    );
}

export default Subscription;