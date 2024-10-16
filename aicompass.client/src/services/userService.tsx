import axiosInstance from '../axiosConfig';
import { User } from '../interfaces/User';

export const getUsers = async (): Promise<User[]> => {
    try {
        const response = await axiosInstance.get('/User', {
            headers: {
                Authorization: `Bearer ${localStorage.getItem('token')}`
            }
        });
        return response.data;
    } catch (error) {
        console.error('Error fetching users:', error);
        throw error;
    }
};

export const getUserById = async (id: number): Promise<User> => {
    try {
        const response = await axiosInstance.get(`/User/${id}`, {
            headers: {
                Authorization: `Bearer ${localStorage.getItem('token')}`
            }
        });
        return response.data;
    } catch (error) {
        console.error(`Error fetching user with id ${id}:`, error);
        throw error;
    }
};

export const updateUser = async (user: User): Promise<void> => {
    try {
        await axiosInstance.put(`/User/${user.id}`, user, {
            headers: {
                Authorization: `Bearer ${localStorage.getItem('token')}`
            }
        });
    } catch (error) {
        console.error(`Error updating user with id ${user.id}:`, error);
        throw error;
    }
};

export const deleteUser = async (id: number): Promise<void> => {
    try {
        await axiosInstance.delete(`/User/${id}`, {
            headers: {
                Authorization: `Bearer ${localStorage.getItem('token')}`
            }
        });
    } catch (error) {
        console.error(`Error deleting user with id ${id}:`, error);
        throw error;
    }
};