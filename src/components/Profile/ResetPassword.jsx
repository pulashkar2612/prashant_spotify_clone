import { Box, Button, IconButton, InputAdornment, TextField, Typography } from "@mui/material"
import VisibilityIcon from '@mui/icons-material/Visibility';
import VisibilityOffIcon from '@mui/icons-material/VisibilityOff';
import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";

const ResetPassword = () => {
    const [visibility, setVisibility] = useState(false);
    const [username, setUsername] = useState("");
    const [email, setUseremail] = useState("");
    const [password, setPassword] = useState("");
    const [currentPassword, setCurrentPasswoprd] = useState("");
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);
    const [showPopup, setShowPopup] = useState(false);
    const navigate = useNavigate();

    const url = "https://academics.newtonschool.co/api/v1/user/updateMyPassword";

    const handleSubmit = async () => {
        setError(null);
        setLoading(true);
        try {
            const response = await fetch(url, {
                method: "PATCH",
                headers: {
                    'Content-Type': 'application/json',
                    'projectId': '3iexcoebatly'
                },
                body: JSON.stringify({
                    name: username,
                    email: email,
                    passwordCurrent: currentPassword,
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

    return (
        <>
            <Box sx={{
                // width: "100%",
                // height: "100vh",
                background: 'linear-gradient(rgba(255, 255, 255, 0.1) 0%, rgb(0, 0, 0) 100%)',
                display: 'flex',
                flexDirection: 'column',
                padding: '20px',
                borderRadius: '20px',
                // overflowX: 'hidden',
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
                        Reset Your Password
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
                            {/* <Typography color="white"
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
                            /> */}

                            <Typography color="white"
                                sx={{
                                    fontSize: '0.875rem',
                                    fontWeight: '700',
                                    marginBottom: '10px',
                                }}
                            >
                                Enter Current Password
                            </Typography>
                            <TextField
                                fullWidth
                                InputLabelProps={{}} // removes the label prop
                                variant="standard"
                                placeholder="Enter Current Password"
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
                                    endAdornment: <EndAdorment visibility={visibility} setVisibility={setVisibility} />,
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
                                onChange={(e) => setCurrentPassword(e.target.value)}
                            />

                            <Typography color="white"
                                sx={{
                                    fontSize: '0.875rem',
                                    fontWeight: '700',
                                    marginBottom: '10px',
                                }}
                            >
                                Enter new Password
                            </Typography>
                            <TextField
                                fullWidth
                                InputLabelProps={{}} // removes the label prop
                                variant="standard"
                                placeholder="Enter new Password"
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
                                    endAdornment: <EndAdorment visibility={visibility} setVisibility={setVisibility} />,
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
                        </Box>
                        {error ?
                            <Box sx={{
                                paddingY: '16px',
                                background: "red",
                                textAlign: 'center',
                                backGround: 'red',
                                borderRadius: '30px'
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
                            }}
                            onClick={handleSubmit}>
                            Submit
                        </Button>
                    </Box>
                </Box>
            </Box>
        </>
    );
}

export default ResetPassword;
