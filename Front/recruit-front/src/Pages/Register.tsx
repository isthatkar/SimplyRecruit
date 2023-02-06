import React, { SyntheticEvent, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import TextField from '@mui/material/TextField';
import Link from '@mui/material/Link';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import Alert from '@mui/material/Alert/Alert';

const Register = () => {
    const [userName, setUsername] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [redir, setRedir] = useState(false);
    const [failed, setFailed] = useState(false);
    const navigate = useNavigate();

    const submit = async (e: SyntheticEvent) => {
        e.preventDefault();
        setFailed(false);
        const response = await fetch('https://localhost:7054/api/register', {
            method: 'POST',
            headers: { 'Content-type': 'application/json' },
            body: JSON.stringify({
                userName,
                email,
                password
            })
        });

        console.log(response);
        console.log(response.status);

        if (response.status == 201) {
            setRedir(true);
            return navigate('/login');
        } else {
            setFailed(true);
        }
    };

    return (
        <Container component="main" maxWidth="xs">
            <CssBaseline />
            <Box
                sx={{
                    marginTop: 8,
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'center'
                }}
            >
                <Avatar sx={{ m: 1, bgcolor: 'secondary.main' }}>
                    <LockOutlinedIcon />
                </Avatar>
                <Typography component="h1" variant="h5">
                    Sign up
                </Typography>
                <Box component="form" noValidate onSubmit={submit} sx={{ mt: 3 }}>
                    <Grid container spacing={2}>
                        <Grid item xs={12}>
                            <TextField autoComplete="given-name" name="userName" required fullWidth id="userName" label="Username" autoFocus onChange={(e) => setUsername(e.target.value)} />
                        </Grid>
                        <Grid item xs={12}>
                            <TextField required label="Email" fullWidth id="email" name="email" type="email" autoComplete="email" onChange={(e) => setEmail(e.target.value)} />
                        </Grid>
                        <Grid item xs={12}>
                            <TextField required fullWidth name="password" label="Password" type="password" id="password" autoComplete="new-password" onChange={(e) => setPassword(e.target.value)} />
                        </Grid>
                    </Grid>
                    <Button type="submit" fullWidth variant="outlined" sx={{ mt: 3, mb: 2 }}>
                        Sign Up
                    </Button>
                    <Grid container justifyContent="flex-end">
                        <Grid item>
                            <Link href="/login" variant="body2">
                                Already have an account? Sign in
                            </Link>
                        </Grid>
                    </Grid>
                    {failed ? <Alert severity="error">Failed to register. Please try again.</Alert> : ''}
                </Box>
            </Box>
        </Container>
    );
};

export default Register;