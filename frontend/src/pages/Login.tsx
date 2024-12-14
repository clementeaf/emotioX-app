import { useState } from 'react';
import { useMutation } from '@tanstack/react-query';
import {
    Box,
    Button,
    Link,
    Stack,
    TextField,
    Typography,
    Container,
    Paper,
    CssBaseline,
    IconButton,
    InputAdornment,
} from '@mui/material';
import { ThemeProvider } from '@mui/material/styles';
import { Visibility, VisibilityOff } from '@mui/icons-material';
import bg from '../assets/bg.jpg';
import { useNavigate } from 'react-router-dom';
import { login, register } from '../services/api'; // Register API
import { theme } from '../utils';
import { toast } from 'react-toastify';

type CustomError = {
    response?: {
        data?: {
            message?: string;
        };
    };
};

export default function Login() {
    const navigate = useNavigate();
    const [error, setError] = useState('');
    const [formData, setFormData] = useState({
        name: '',
        lastname: '',
        email: '',
        username: '',
        password: '',
    });
    const [isSignUp, setIsSignUp] = useState(false); // Nuevo estado para controlar la vista
    const [showPassword, setShowPassword] = useState(false);

    const mutation = useMutation({
        mutationFn: async (loginForm: { identifier: string; password: string }) => {
            return await login(loginForm);
        },
        onSuccess: (data) => {
            // Notificación de éxito con Toastify
            toast.success('Login successful!');
            localStorage.setItem('accessToken', data.accessToken);
            navigate('/dashboard');
        },
        onError: (error: CustomError) => {
            const errorMessage = error.response?.data?.message || 'Login failed. Please try again.';
            toast.error(errorMessage); // Notificación de error
            console.error('Login failed:', errorMessage);
        },
    });

    const registerMutation = useMutation({
        mutationFn: async (registerForm: {
            name: string;
            lastname: string;
            email: string;
            username: string;
            password: string;
        }) => {
            return await register(registerForm);
        },
        onSuccess: () => {
            // Notificación de éxito con Toastify
            toast.success('Registration successful! You can now log in.');
            setIsSignUp(false);
        },
        onError: (error: CustomError) => {
            const errorMessage = error.response?.data?.message || 'Registration failed. Please try again.';
            setError(errorMessage); // Muestra el mensaje en el formulario
            toast.error(errorMessage); // Notificación de error
            console.error('Registration failed:', errorMessage);
        },
    });

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setFormData((prevData) => ({
            ...prevData,
            [name]: value,
        }));
    };

    const togglePasswordVisibility = () => {
        setShowPassword((prev) => !prev);
    };

    const handleSubmit = () => {
        const { email, password } = formData;
        const loginForm = {
            identifier: email,
            password,
        };
        mutation.mutate(loginForm);
    };

    const handleSignUpSubmit = () => {
        registerMutation.mutate(formData);
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
                        {isSignUp ? (
                            // Formulario de Registro
                            <>
                                <Box display="flex" justifyContent="space-between" alignItems="center" my={4}>
                                    <Typography component="h1" variant="h5" fontWeight="bold">
                                        Create an account
                                    </Typography>
                                    <Typography component="h1" variant="h6" fontWeight="bold">
                                        😃 Emotio X
                                    </Typography>
                                </Box>
                                <Typography mb={3} color="red">
                                    {error && error}
                                </Typography>
                                <Stack spacing={3}>
                                    <TextField
                                        variant="outlined"
                                        margin="normal"
                                        required
                                        fullWidth
                                        id="name"
                                        label="First Name"
                                        name="name"
                                        placeholder="Enter your first name"
                                        value={formData.name}
                                        onChange={handleInputChange}
                                    />
                                    <TextField
                                        variant="outlined"
                                        margin="normal"
                                        required
                                        fullWidth
                                        id="lastname"
                                        label="Last Name"
                                        name="lastname"
                                        placeholder="Enter your last name"
                                        value={formData.lastname}
                                        onChange={handleInputChange}
                                    />
                                    <TextField
                                        variant="outlined"
                                        margin="normal"
                                        required
                                        fullWidth
                                        id="email"
                                        label="Email Address"
                                        name="email"
                                        autoComplete="email"
                                        placeholder="Enter your email"
                                        value={formData.email}
                                        onChange={handleInputChange}
                                    />
                                    <TextField
                                        variant="outlined"
                                        margin="normal"
                                        required
                                        fullWidth
                                        id="username"
                                        label="Username"
                                        name="username"
                                        placeholder="Choose a username"
                                        value={formData.username}
                                        onChange={handleInputChange}
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
                                        placeholder="Min. 6 characters"
                                        value={formData.password}
                                        onChange={handleInputChange}
                                        InputProps={{
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
                                        }}
                                    />
                                    <Button
                                        type="submit"
                                        fullWidth
                                        variant="contained"
                                        color="primary"
                                        onClick={handleSignUpSubmit}
                                    >
                                        Sign Up
                                    </Button>
                                    <Box display="flex" justifyContent="center" mt={2}>
                                        <Link href="#" variant="body2" onClick={() => setIsSignUp(false)}>
                                            Back to Sign In
                                        </Link>
                                    </Box>
                                </Stack>
                            </>
                        ) : (
                            // Formulario de Inicio de Sesión
                            <>
                                <Box display="flex" justifyContent="space-between" alignItems="center" my={4}>
                                    <Typography component="h1" variant="h5" fontWeight="bold">
                                        Sign in
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
                                        placeholder="Enter your email"
                                        value={formData.email}
                                        onChange={handleInputChange}
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
                                        placeholder="Min. 6 characters"
                                        value={formData.password}
                                        onChange={handleInputChange}
                                        InputProps={{
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
                                        }}
                                    />
                                    <Button
                                        type="submit"
                                        fullWidth
                                        variant="contained"
                                        color="primary"
                                        onClick={handleSubmit}
                                    >
                                        Sign In
                                    </Button>
                                    <Box display="flex" justifyContent="center" mt={2}>
                                        <Link href="#" variant="body2" onClick={() => setIsSignUp(true)}>
                                            Don’t have an account? Sign Up
                                        </Link>
                                    </Box>
                                </Stack>
                            </>
                        )}
                    </Paper>
                </Container>
            </Box>
        </ThemeProvider>
    );
}
