import axios from 'axios';

// Configuración base para Axios
const api = axios.create({
    baseURL: 'https://ysgzqbh7ch.execute-api.us-east-1.amazonaws.com',
    headers: {
        'Content-Type': 'application/json',
    },
});

// Función para logout
export const logout = async (token: string): Promise<void> => {
    if (!token) {
        throw new Error('No access token found');
    }

    await api.post('/logout', {}, {
        headers: {
            Authorization: token,
            'Content-Type': 'application/json',
        },
    });
};

// Función para login
export const login = async (loginData: { identifier: string; password: string }): Promise<{ accessToken: string }> => {
    const response = await api.post('/login', loginData);
    if (response.status !== 200) {
        throw new Error('Login failed');
    }
    return response.data;
};


export default api;
