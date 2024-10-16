import axiosInstance from '../axiosConfig';
import { Category } from '../interfaces/Category';

export const getCategories = async (): Promise<Category[]> => {
    try {
        const response = await axiosInstance.get('/Category');
        return response.data;
    } catch (error) {
        console.error('Error fetching categories:', error);
        throw error;
    }
};