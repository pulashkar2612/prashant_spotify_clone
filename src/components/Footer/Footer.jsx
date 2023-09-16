import React from 'react';
import { Box, Typography } from '@mui/material';

function Footer() {
    return (
        <Box sx={{
            display: "flex",
            padding: '16px',
            borderRadius: "20px",
            background: 'linear-gradient(rgba(255, 255, 255, 0.1) 0%, rgb(0, 0, 0) 100%)' 
        }}>
            <Box 
                sx={{
                    display: "flex",
                    flexDirection: 'row',
                    width: '100%',
                    // borderRadius: "20px",
                    // background: 'linear-gradient(rgba(255, 255, 255, 0.1) 0%, rgb(0, 0, 0) 100%)'
                }}>
                {[
                    { Company: ['About', 'Jobs', 'For the Record'] },
                    { Communities: ['For Artists', 'Developers', 'Advertising', 'Investors', 'Vendors'] },
                    { Useful_links: ['Support', 'Free Mobile App'] }
                ].map((items, index) => {
                    const key = Object.keys(items);
                    //console.log(key);
                    return (
                        < Box key={index} columnGap={2}
                            sx={{
                                flex: '1 1 0%',
                                display: "flex",
                                flexDirection: 'column',
                                padding: '32px',
                            }}
                        >
                            <Typography paddingY={2}  color="white">{key}</Typography>
                            {items[key].map((item, index) => {
                                return (
                                    <Typography key={index} paddingY={1} fontSize='0.9rem' color="lightgray">{item}</Typography>
                                );
                            })}

                        </Box>
                    );
                }
                )}
            </Box>

        </Box >
    );
}

export default Footer;