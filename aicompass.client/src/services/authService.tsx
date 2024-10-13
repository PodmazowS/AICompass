import axiosInstance from '../axiosConfig';

export const login = async (username: string, password: string): Promise<{ token: string, role: string }> => {
    try {
        const response = await axiosInstance.post('/Auth/login', { username, password });
        const token = response.data.token;
        const decodedToken = JSON.parse(atob(token.split('.')[1]));
        const role = decodedToken['http://schemas.microsoft.com/ws/2008/06/identity/claims/role'];
        return { token, role };
    } catch (error) {
        console.error('Error logging in:', error);
        throw error;
    }
};