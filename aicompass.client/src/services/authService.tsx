import axiosInstance from '../axiosConfig';

export const register = async (username: string, email: string, password: string): Promise<void> => {
    try {
        await axiosInstance.post('/User/register', { username, email, password });
    } catch (error) {
        console.error('Error registering user:', error);
        throw error;
    }
};

export const login = async (username: string, password: string): Promise<{ token: string, role: string }> => {
    try {
        const response = await axiosInstance.post('/User/login', { username, password });
        const token = response.data.token;
        const decodedToken = JSON.parse(atob(token.split('.')[1]));
        const role = decodedToken['http://schemas.microsoft.com/ws/2008/06/identity/claims/role'];
        return { token, role };
    } catch (error) {
        console.error('Error logging in:', error);
        throw error;
    }
};

export const getProfile = async (): Promise<{ id: number, username: string, email: string }> => {
    try {
        const response = await axiosInstance.get('/User/profile', {
            headers: {
                Authorization: `Bearer ${localStorage.getItem('token')}`
            }
        });
        return response.data;
    } catch (error) {
        console.error('Error fetching profile:', error);
        throw error;
    }
};

export const updateProfile = async (id: number, username: string, email: string): Promise<void> => {
    try {
        await axiosInstance.put('/User/profile', { id, username, email }, {
            headers: {
                Authorization: `Bearer ${localStorage.getItem('token')}`
            }
        });
    } catch (error) {
        console.error('Error updating profile:', error);
        throw error;
    }
};