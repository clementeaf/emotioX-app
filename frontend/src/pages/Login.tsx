import { useState } from 'react';
import { useMutation } from '@tanstack/react-query';
import axios from 'axios';
import { Box, Button, Link, Stack, TextField, Typography, Container, Paper, CssBaseline, FormControlLabel, Checkbox, IconButton, InputAdornment, LinearProgress, CircularProgress } from '@mui/material';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import { Visibility, VisibilityOff } from '@mui/icons-material';
import bg from '../assets/bg.jpg';
import { useNavigate } from 'react-router-dom';

// const loginEndpoint = 'https://dg1geuc9wi.execute-api.us-east-1.amazonaws.com/login';

// TODO:
// 1.- Agregar el footer
// 2.- Detalles estéticos contenedor - Listo
// 3.- Input label y placeholder - Listo
// 4.- Emoticon de EmotioX
// 5.- Revisar bien reseteo de password y provocar que la barra que mide la fortaleza del password, se rellene en propocion de la cantidad de caracteres que se ingresaron 

const MAX_PASSWORD_LENGTH = 20;

const theme = createTheme({
    components: {
        MuiCssBaseline: {
            styleOverrides: {
                body: {
                    margin: 0,
                    padding: 0,
                    overflow: 'hidden',
                },
                html: {
                    margin: 0,
                    padding: 0,
                    height: '100%',
                },
            },
        },
    },
});


// Función para calcular la fortaleza de la contraseña
function calculatePasswordStrength(password: string) {
    let strength = 0;

    // Evaluar si tiene letras (mayúsculas y minúsculas mezcladas)
    if (/[A-Z]/.test(password) && /[a-z]/.test(password)) strength += 1;
    // Evaluar si contiene números
    if (/[0-9]/.test(password)) strength += 1;
    // Evaluar si contiene caracteres especiales
    if (/[^A-Za-z0-9]/.test(password)) strength += 1;

    // Bonus por longitud: 3 puntos por longitud de 20 caracteres o más
    const lengthBonus = Math.min((password.length / MAX_PASSWORD_LENGTH) * 3, 3); // Máximo de 3 puntos por longitud
    strength += lengthBonus;

    return strength;
}

// Función para obtener el label y color de la fortaleza
function getStrengthLabel(strength: number) {
    if (strength <= 1) {
        return { label: 'Poor', color: 'red' };
    } else if (strength <= 3) {
        return { label: 'Medium', color: 'orange' };
    } else if (strength > 3 && strength < 5) {
        return { label: 'Strong', color: 'green' };
    } else if (strength >= 5) {
        return { label: 'Very Strong', color: 'darkgreen' }; // Añadimos un nivel "Very Strong"
    } else {
        return { label: '', color: '' };
    }
}

export default function Login() {
    const navigate = useNavigate();
    const [formData, setFormData] = useState({
        email: '',
        password: '',
    });
    const [showPassword, setShowPassword] = useState(false);
    const [isLoginSuccessful, setIsLoginSuccessful] = useState(false);
    const [isForgotPassword, setIsForgotPassword] = useState(false);
    const [isEmailSent, setIsEmailSent] = useState(false);
    const [isResetPassword, setIsResetPassword] = useState(false);
    const strength = calculatePasswordStrength(formData.password);
    const { label, color } = getStrengthLabel(strength);
    const progressValue = formData.password.length === 0 ? 10 : Math.min((strength / 5) * 100, 100);

    const handleLogin = async (loginData: { identifier: string; password: string }) => {
        try {
            const response = await axios.post('https://ysgzqbh7ch.execute-api.us-east-1.amazonaws.com/login', loginData, {
                headers: { 'Content-Type': 'application/json' }
            });
            return response;
        } catch (error) {
            console.error('Error during login:', error);
            throw error;
        }
    };

    const mutation = useMutation({
        mutationFn: handleLogin,
        onSuccess: (data) => {
            const status = data.status;
            const token = data.data?.accessToken;
            if (status === 200 && token) {
                localStorage.setItem('accessToken', token);
                setIsLoginSuccessful(true); // Mostrar mensaje de éxito

                setTimeout(() => {
                    navigate('/dashboard');
                }, 1500); // Esperar 1.5 segundos antes de redirigir
            } else {
                console.error('Access token not found');
            }
        },
        onError: (error) => {
            console.error('Login failed:', error);
        },
    });

    const handleSubmit = () => {
        const { email, password } = formData;
        const loginForm = {
            identifier: email,
            password,
        };
        mutation.mutate(loginForm);
    };


    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setFormData((prevData) => ({
            ...prevData,
            [name]: value,
        }));
    };

    // Simular el envío del correo de recuperación de contraseña
    const handleForgotPasswordSubmit = () => {
        setIsEmailSent(true); // Simulamos el envío del correo
    };

    // Simular el envío del formulario de restablecimiento de contraseña
    const handleResetPasswordSubmit = () => {
        setIsResetPassword(false); // Al enviar, volvemos al inicio de sesión
        setIsEmailSent(false);
        setIsForgotPassword(false);
    };

    // Función para manejar el clic en "Sign In" y mostrar el formulario de Reset Password
    // const handleGoToResetPassword = () => {
    //     setIsResetPassword(true); // Mostramos el formulario de Reset Password
    // };

    // Mostrar/Ocultar contraseña
    const togglePasswordVisibility = () => {
        setShowPassword((prev) => !prev);
    };

    return (
        <ThemeProvider theme={theme}>
            <CssBaseline />
            <Box
                sx={{
                    height: '100vh',
                    display: 'flex',
                    justifyContent: 'center',
                    alignItems: 'center',
                    backgroundImage: `url(${bg})`,
                    backgroundSize: 'cover',
                    backgroundPosition: 'center',
                    backgroundRepeat: 'no-repeat',
                    overflow: 'hidden',
                }}
            >
                <Container component="main" maxWidth={false} sx={{ maxWidth: '475px' }}>
                    <Paper
                        elevation={6}
                        sx={{
                            p: 2,
                            px: 5,
                            borderRadius: 2,
                            backdropFilter: 'blur(10px)',
                            backgroundColor: 'rgba(255, 255, 255, 0.85)',
                            boxShadow: '0px 4px 12px rgba(0, 0, 0, 0.1)',
                        }}
                    >
                        {/* Formulario de Reset Password */}
                        {isResetPassword ? (
                            <>
                                <Box display="flex" justifyContent="space-between" alignItems="center" mt={2} mb={1}>
                                    <Stack sx={{
                                        display: 'flex',
                                        flexDirection: 'column',
                                    }}>
                                        <Typography component="h1" variant="h5" fontWeight="bold">
                                            Hello #Username
                                        </Typography>
                                        <Typography component="h1" variant="h5" fontWeight="bold">
                                            Reset Password
                                        </Typography>
                                    </Stack>
                                    <Typography component="h1" variant="h6" fontWeight="bold">
                                        😃 Emotio X
                                    </Typography>
                                </Box>

                                <Typography variant="body2" mb={2} color='gray'>
                                    Please consider the following conditions to create your new password:
                                </Typography>
                                <ul style={{ fontSize: '12px', marginBottom: '16px', color: 'gray' }}>
                                    <li><b>Letters.</b> A to Z counts. You might be required to mix uppercase and lowercase versions.</li>
                                    <li><b>Numbers.</b> 0 to 10 works.</li>
                                    <li><b>Special characters.</b> Unusual symbols from dashes to dollar signs to parentheses are included.</li>
                                </ul>

                                <Stack spacing={2}>
                                    <TextField
                                        variant="outlined"
                                        margin="normal"
                                        required
                                        fullWidth
                                        name="password"
                                        label="Enter your password"
                                        type={showPassword ? 'text' : 'password'}
                                        id="new-password"
                                        placeholder="Min. 8 characters"
                                        value={formData.password}
                                        onChange={handleInputChange}
                                        slotProps={{
                                            inputLabel: {
                                                shrink: true,
                                            },
                                            input: {
                                                endAdornment: (
                                                    <InputAdornment position="end">
                                                        <IconButton
                                                            aria-label="toggle password visibility"
                                                            onClick={togglePasswordVisibility}
                                                            edge="end"
                                                        >
                                                            {showPassword ? <VisibilityOff /> : <Visibility />}
                                                        </IconButton>
                                                    </InputAdornment>
                                                ),
                                            },
                                        }}
                                    />
                                    {/** Barra medición fortaleza de nuevo password */}
                                    <Stack sx={{
                                        display: 'flex',
                                        flexDirection: 'row',
                                        width: '100%',
                                        alignItems: 'center',
                                        gap: 2
                                    }}>
                                        <LinearProgress
                                            variant="determinate"
                                            value={progressValue}
                                            sx={{
                                                width: '100%',
                                                maxWidth: 100,
                                                height: 15,
                                                backgroundColor: '#e0e0df',
                                                '& .MuiLinearProgress-bar': {
                                                    backgroundColor: color,
                                                },
                                            }}
                                        />
                                        <Typography variant="body2" color={color} alignSelf="self-start">
                                            {label}
                                        </Typography>
                                    </Stack>

                                    <TextField
                                        variant="outlined"
                                        margin="normal"
                                        required
                                        fullWidth
                                        name="confirm-password"
                                        label="Confirm Password"
                                        type="password"
                                        id="confirm-password"
                                        placeholder="Enter your confirm password"
                                        slotProps={{
                                            inputLabel: {
                                                shrink: true, // Mantiene el label siempre visible sobre el campo
                                            },
                                            input: {
                                                // Aquí puedes agregar propiedades adicionales para el input
                                            },
                                        }}
                                    />


                                    <Button fullWidth variant="contained" color="primary" onClick={handleResetPasswordSubmit}>
                                        Reset Password
                                    </Button>
                                </Stack>
                            </>
                        ) : isEmailSent ? (
                            <>
                                <Box display="flex" justifyContent="space-between" alignItems="center" mb={2}>
                                    <Typography component="h1" variant="h5" fontWeight="bold">
                                        Hi, Check Your Mail
                                    </Typography>
                                    <Typography component="h1" variant="h6" fontWeight="bold">
                                        😃 Emotio X
                                    </Typography>
                                </Box>
                                <Typography textAlign="center" variant="body1" mb={2}>
                                    We have sent password recovery instructions to your email.
                                </Typography>
                                {/* Simular enlace de correo redirigiendo al formulario de Reset Password */}
                                <Button fullWidth variant="contained" color="primary" sx={{ my: 2 }} onClick={handleSubmit}>
                                    <Typography textTransform='initial'>
                                        Sign in
                                    </Typography>
                                </Button>
                            </>
                        ) : isForgotPassword ? (
                            <>
                                <Box display="flex" justifyContent="space-between" alignItems="center" my={4}>
                                    <Typography component="h1" variant="h5" fontWeight="bold">
                                        Forgot password?
                                    </Typography>
                                    <Typography component="h1" variant="h6" fontWeight="bold">
                                        😃 Emotio X
                                    </Typography>
                                </Box>

                                <Stack spacing={3}>
                                    <TextField
                                        variant="outlined"
                                        margin="normal"
                                        required
                                        fullWidth
                                        id="email"
                                        label="Email Address"
                                        name="email"
                                        autoComplete="email"
                                        autoFocus
                                        placeholder="Enter your email"
                                        slotProps={{
                                            inputLabel: {
                                                shrink: true, // Usamos slotProps para forzar que el label esté siempre visible
                                            },
                                            input: {
                                                // Aquí puedes agregar cualquier otra configuración necesaria para el input
                                            },
                                        }}
                                    />


                                    <Button type="submit" fullWidth variant="contained" color="primary" onClick={handleForgotPasswordSubmit}>
                                        Submit
                                    </Button>

                                    <Box display="flex" justifyContent="center" mt={2}>
                                        <Link href="#" variant="body2" onClick={() => setIsForgotPassword(false)}>
                                            Back to Sign In
                                        </Link>
                                    </Box>
                                </Stack>
                            </>
                        ) : (
                            /* Formulario de "Sign In" */
                            <>
                                <Box display="flex" justifyContent="space-between" alignItems="center" my={4}>
                                    <Typography fontWeight="bold" textAlign="center">
                                        Sign in
                                    </Typography>
                                    <Stack
                                        sx={{
                                            display: 'flex',
                                            flexDirection: 'row',
                                            alignItems: 'center',
                                            justifyContent: 'center',
                                            gap: 0.3,
                                            fontSize: 20,
                                            mt: -1.5,
                                        }}
                                    >
                                        <Typography fontWeight={550}>😃 Emotio</Typography>
                                        <Typography textAlign="center" fontWeight={100} color="gray">
                                            X
                                        </Typography>
                                    </Stack>
                                </Box>

                                {mutation.status === 'pending' ? (
                                    <Box display="flex" justifyContent="center" mb={2}>
                                        <CircularProgress /> {/* Spinner mientras carga */}
                                    </Box>
                                ) : isLoginSuccessful ? (
                                    <Typography variant="body1" color="green" align="center" mb={2}>
                                        Login successful! Redirecting to dashboard...
                                    </Typography>
                                ) : null}

                                <Stack spacing={4}>
                                    <TextField
                                        variant="outlined"
                                        margin="normal"
                                        required
                                        fullWidth
                                        id="email"
                                        label="Email Address"
                                        placeholder="email@usermotion.com"
                                        name="email"
                                        autoComplete="email"
                                        autoFocus
                                        value={formData.email}
                                        onChange={handleInputChange}
                                        slotProps={{
                                            inputLabel: {
                                                shrink: true,
                                            },
                                        }}
                                    />
                                    <TextField
                                        variant="outlined"
                                        margin="normal"
                                        required
                                        fullWidth
                                        name="password"
                                        label="Password"
                                        type={showPassword ? 'text' : 'password'}
                                        id="password"
                                        autoComplete="current-password"
                                        placeholder="Min. 8 characters"
                                        value={formData.password}
                                        onChange={handleInputChange}
                                        slotProps={{
                                            input: {
                                                endAdornment: (
                                                    <InputAdornment position="end">
                                                        <IconButton
                                                            aria-label="toggle password visibility"
                                                            onClick={togglePasswordVisibility}
                                                            edge="end"
                                                        >
                                                            {showPassword ? <VisibilityOff /> : <Visibility />}
                                                        </IconButton>
                                                    </InputAdornment>
                                                ),
                                            },
                                            inputLabel: {
                                                shrink: true,
                                            },
                                        }}
                                    />

                                    <Button type="submit" fullWidth variant="contained" color="primary" sx={{ mt: 2 }} onClick={handleSubmit} disabled={mutation.isPending}>
                                        <Typography textTransform='initial'>Sign in</Typography>
                                    </Button>

                                    <Box display="flex" justifyContent="center" mt={2}>
                                        <Link
                                            href="#"
                                            variant="body2"
                                            onClick={() => setIsForgotPassword(true)}
                                            sx={{
                                                color: 'black',
                                                textDecoration: 'none',
                                            }}
                                        >
                                            Forgot password?
                                        </Link>
                                    </Box>
                                </Stack>
                                <FormControlLabel
                                    control={<Checkbox value="remember" color="primary" />}
                                    label="Keep me logged in"
                                    sx={{
                                        alignItems: 'center',
                                        mb: 0,
                                        mt: 2,
                                    }}
                                />
                            </>
                        )}
                    </Paper>
                </Container>
            </Box>
        </ThemeProvider>
    );
}
