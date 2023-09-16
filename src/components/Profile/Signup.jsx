import { Box, Button, IconButton, InputAdornment, TextField, Typography } from "@mui/material"
import VisibilityIcon from '@mui/icons-material/Visibility';
import VisibilityOffIcon from '@mui/icons-material/VisibilityOff';
import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import DoneAllIcon from '@mui/icons-material/DoneAll';
import CloseIcon from '@mui/icons-material/Close';

const Signup = () => {
    const [visibility, setVisibility] = useState(false);
    const [username, setUsername] = useState("");
    const [email, setUseremail] = useState("");
    const [password, setPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);
    const [showPopup, setShowPopup] = useState(false);
    const navigate = useNavigate();

    const url = "https://academics.newtonschool.co/api/v1/user/signup";

    const [passwordMatch, setPasswordMatch] = useState(false);

    const handleSubmit = async () => {
        setError(null);
        setLoading(true);
        try {
            const response = await fetch(url, {
                method: "POST",
                headers: {
                    'Content-Type': 'application/json',
                    'projectId': '3iexcoebatly'
                },
                body: JSON.stringify({
                    name: username,
                    email: email,
                    password: password,
                    appType: "music",
                })
            })

            if (!response.ok) {
                const errorResponse = await response.json();
                throw new Error(errorResponse.message || 'An error occurred');
            }

            const res = await response.json();
            if (res.status === 'success') {
                navigate('/login')
                setShowPopup(true);
            }
        } catch (err) {
            setError(err.message);
        } finally {
            setLoading(false);
        }
    }

    useEffect(() => {
        setError(null);
    }, [password, username, email])

    
    const EndAdorment = ({ visibility, setVisibility }) => {
        return (
            <InputAdornment position="end">
                <IconButton onClick={() => setVisibility(!visibility)}>
                    {!visibility ? <VisibilityOffIcon sx={{ color: "white" }} /> : <VisibilityIcon sx={{ color: "white" }} />}
                </IconButton>
            </InputAdornment>
        );
    }

    const handleconfirmPassword = (e) => {
        if(e.target.value !== "" && e.target.value === password){
            setPasswordMatch(true);
        }else if(e.target.value !== password){
            setPasswordMatch(false);
        }
        setConfirmPassword(e.target.value);
    }
    console.log("confirmPassword:" , confirmPassword);
    const EndAdorment2 = ({ visibility, setVisibility, passwordMatch }) => {
        console.log
        return (
            <InputAdornment position="end">
                {confirmPassword !== '' && (passwordMatch ? <DoneAllIcon  style={{ color: 'green' }} /> : <CloseIcon style={{ color: 'red' }} />) }
                <IconButton onClick={() => setVisibility(!visibility)}>
                    {!visibility ? <VisibilityOffIcon sx={{ color: "white" }} /> : <VisibilityIcon sx={{ color: "white" }} />}
                </IconButton>
            </InputAdornment>
        );
    }

    return (
        <>
            <Box sx={{
                // width: "100%",
                background: 'linear-gradient(rgba(255, 255, 255, 0.1) 0%, rgb(0, 0, 0) 100%)',
                display: 'flex',
                flexDirection: 'column',
                padding: '20px',
                borderRadius: '20px',
            }}
            >
                <Box sx={{
                    background: "black",
                    //background: 'linear-gradient(rgba(255, 255, 255, 0.1) 0%, rgb(0, 0, 0) 100%)',
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

                <Box
                    sx={{
                        flex: '3 1 0%',
                        display: "flex",
                        minWidth: '250px',
                        justifyContent: "center",
                        padding: '32px',
                        background: 'linear-gradient(rgba(255, 255, 255, 0.1) 0%, rgb(0, 0, 0) 100%)'
                    }}>
                    <Box
                        sx={{
                            maxWidth: '700px',
                            minWidth: '380px',
                            width: '100%',
                            margin: '20px',
                            borderRadius: '20px',
                            background: 'black',
                        }}>
                        <Typography sx={{
                            textAlign: 'center',
                            fontWeight: 'bold',
                            fontSize: '40px',
                            color: 'white',
                            margin: '48px 0px',
                        }}>
                            SignUp on Spotify
                        </Typography>
                        <Box
                            sx={{
                                padding: '0px',
                                display: 'flex',
                                flexDirection: 'column',
                                width: '324px',
                                margin: '0px auto',
                                rowGap: '10px',
                            }}>
                            <Box sx={{
                                paddingBottom: '16px',
                            }}>
                                <Typography color="white"
                                    sx={{
                                        fontSize: '0.875rem',
                                        fontWeight: '700',
                                        marginBottom: '10px',
                                    }}
                                >
                                    Username
                                </Typography>
                                <TextField
                                    fullWidth
                                    InputLabelProps={{}} // removes the label prop
                                    variant="standard"
                                    placeholder="Username"
                                    type="text"
                                    sx={{
                                        marginBottom: '10px',
                                        border: '1px solid var(--essential-subdued,#878787)',
                                        '&:hover': { border: '1.5px solid var(--essential-subdued,white) ' },
                                        borderRadius: '5px',
                                        color: "white",
                                        '& input:focus': {
                                            outline: 'none',
                                            color: 'white',
                                            border: 'none',
                                            borderBottom: 'none',    // Remove bottom border
                                            borderRadius: 0,         // Remove border radius
                                            boxShadow: 'none',
                                        },
                                    }}
                                    InputProps={{
                                        style: {
                                            color: 'white',
                                            textAlign: 'center',
                                            resize: 'none',
                                            padding: '10px',
                                            border: 'none',          // Remove border
                                            borderBottom: 'none',    // Remove bottom border
                                            borderRadius: 0,         // Remove border radius
                                            boxShadow: 'none', // Adjust the padding to increase the height
                                        },
                                    }}
                                    onChange={(e) => setUsername(e.target.value)}
                                />
                                <Typography color="white"
                                    sx={{
                                        fontSize: '0.875rem',
                                        fontWeight: '700',
                                        marginBottom: '10px',
                                    }}
                                >
                                    Email
                                </Typography>
                                <TextField
                                    fullWidth
                                    InputLabelProps={{}} // removes the label prop
                                    variant="standard"
                                    placeholder="Email"
                                    type="email"
                                    sx={{
                                        marginBottom: '10px',
                                        border: '1px solid var(--essential-subdued,#878787)',
                                        '&:hover': { border: '1.5px solid var(--essential-subdued,white) ' },
                                        borderRadius: '5px',
                                        color: "white",
                                        '& input:focus': {
                                            outline: 'none',
                                            color: 'white',
                                            border: 'none',
                                            borderBottom: 'none',    // Remove bottom border
                                            borderRadius: 0,         // Remove border radius
                                            boxShadow: 'none',
                                        },
                                    }}
                                    InputProps={{
                                        style: {
                                            color: 'white',
                                            textAlign: 'center',
                                            resize: 'none',
                                            padding: '10px',
                                            border: 'none',          // Remove border
                                            borderBottom: 'none',    // Remove bottom border
                                            borderRadius: 0,         // Remove border radius
                                            boxShadow: 'none', // Adjust the padding to increase the height
                                        },
                                    }}
                                    onChange={(e) => setUseremail(e.target.value)}
                                />

                                <Typography color="white"
                                    sx={{
                                        fontSize: '0.875rem',
                                        fontWeight: '700',
                                        marginBottom: '10px',
                                    }}
                                >
                                    Password
                                </Typography>
                                <TextField
                                    fullWidth
                                    InputLabelProps={{}} // removes the label prop
                                    variant="standard"
                                    placeholder="Password"
                                    type={visibility ? "text" : "password"}
                                    sx={{
                                        marginBottom: '10px',
                                        border: '1px solid var(--essential-subdued,#878787)',
                                        '&:hover': { border: '1.5px solid var(--essential-subdued,white) ' },
                                        borderRadius: '5px',
                                        color: "white",
                                        '& input:focus': {
                                            outline: 'none',
                                            color: 'white',
                                            border: 'none',
                                            borderBottom: 'none',    // Remove bottom border
                                            borderRadius: 0,         // Remove border radius
                                            boxShadow: 'none',
                                        },
                                    }}
                                    InputProps={{
                                        endAdornment: <EndAdorment visibility={visibility} setVisibility={setVisibility}  />,
                                        style: {
                                            color: 'white',
                                            textAlign: 'center',
                                            resize: 'none',
                                            padding: '10px',
                                            border: 'none',          // Remove border
                                            borderBottom: 'none',    // Remove bottom border
                                            borderRadius: 0,         // Remove border radius
                                            boxShadow: 'none', // Adjust the padding to increase the height
                                        },
                                    }}
                                    onChange={(e) => setPassword(e.target.value)}
                                />

                                <Typography color="white"
                                    sx={{
                                        fontSize: '0.875rem',
                                        fontWeight: '700',
                                        marginBottom: '10px',
                                    }}
                                >
                                    Confirm Password
                                </Typography>
                                <TextField
                                    fullWidth
                                    InputLabelProps={{}} // removes the label prop
                                    variant="standard"
                                    placeholder="Confirm Password"
                                    type={visibility ? "text" : "password"}
                                    sx={{
                                        marginBottom: '10px',
                                        border: '1px solid var(--essential-subdued,#878787)',
                                        '&:hover': { border: '1.5px solid var(--essential-subdued,white) ' },
                                        borderRadius: '5px',
                                        color: "white",
                                        '& input:focus': {
                                            outline: 'none',
                                            color: 'white',
                                            border: 'none',
                                            borderBottom: 'none',    // Remove bottom border
                                            borderRadius: 0,         // Remove border radius
                                            boxShadow: 'none',
                                        },
                                    }}
                                    InputProps={{
                                        endAdornment: <EndAdorment2 visibility={visibility} setVisibility={setVisibility} passwordMatch={passwordMatch} />,
                                        style: {
                                            color: 'white',
                                            textAlign: 'center',
                                            resize: 'none',
                                            padding: '10px',
                                            border: 'none',          // Remove border
                                            borderBottom: 'none',    // Remove bottom border
                                            borderRadius: 0,         // Remove border radius
                                            boxShadow: 'none', // Adjust the padding to increase the height
                                        },
                                    }}
                                    onChange={handleconfirmPassword}
                                />
                            </Box>
                            {error ?
                                <Box sx={{
                                    paddingY: '16px',
                                    background: "red",
                                    textAlign: 'center',
                                    backGround: 'red',
                                    borderRadius: '30px',
                                    overflow: 'hidden',
                                    whiteSpace: "nowrap"
                                }}>
                                    <Typography sx={{
                                        color: 'white',
                                    }}>{error}</Typography>
                                </Box>
                                : ''
                            }
                            <Button
                                variant="contained"
                                sx={{
                                    color: 'white',
                                    background: '#1ed760',
                                    borderRadius: '500px',
                                    textAlign: 'center',
                                    border: '1px solid var(--essential-subdued,#878787)',
                                    '&:hover': { border: '1.5px solid var(--essential-subdued,white) ', background: '#1ed760', },
                                    paddingY: '12px',
                                    '&.Mui-disabled': { // Override disabled styles
                                        color: 'white',
                                        boxShadow: 'none',
                                        background: '#1ed760', // Set your desired background color
                                        cursor: 'not-allowed'
                                    },
                                    opacity: passwordMatch ? 1 : 0.5,
                                }}
                                disabled = {!passwordMatch} 
                                onClick={handleSubmit}>
                                Submit
                            </Button>
                            <Box sx={{ paddingY: '16px', margin: 'auto', display: 'flex', flexDirection: 'row' }}>
                                <Typography
                                    sx={{
                                        color: 'gray',
                                    }}
                                >
                                    Already have an account !
                                </Typography>
                                <Typography sx={{
                                    color: 'white',
                                    '&:hover': { color: '#1ed760' },
                                    cursor: 'pointer'
                                }}
                                    onClick={() => navigate('/login')} >
                                    &nbsp;<u>Click here to login</u>
                                </Typography>
                            </Box>
                        </Box>
                    </Box>
                </Box>
            </Box>
        </>
    );
}

export default Signup;