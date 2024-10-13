import axiosInstance from '../axiosConfig';
import { Tool } from '../interfaces/Tool';

export const getTools = async (): Promise<Tool[]> => {
    try {
        const response = await axiosInstance.get('/Tool');
        return response.data;
    } catch (error) {
        console.error('Error fetching tools:', error);
        throw error;
    }
};

export const createTool = async (tool: Tool): Promise<Tool> => {
    try {
        const response = await axiosInstance.post('/Tool', tool);
        return response.data;
    } catch (error) {
        console.error('Error creating tool:', error);
        throw error;
    }
};

export const updateTool = async (id: number, tool: Tool): Promise<void> => {
    try {
        await axiosInstance.put(`/Tool/${id}`, tool);
    } catch (error) {
        console.error(`Error updating tool with id ${id}:`, error);
        throw error;
    }
};

export const deleteTool = async (id: number): Promise<void> => {
    try {
        await axiosInstance.delete(`/Tool/${id}`);
    } catch (error) {
        console.error(`Error deleting tool with id ${id}:`, error);
        throw error;
    }
};