import React, { useEffect, useState } from 'react';
import { getTools, createTool, updateTool, deleteTool } from '../services/toolService';
import { Tool } from '../interfaces/Tool';

const ToolList: React.FC = () => {
    const [tools, setTools] = useState<Tool[]>([]);
    const [currentToolId, setCurrentToolId] = useState<number | null>(null);
    const [newTool, setNewTool] = useState<Tool>({ name: '', description: '', imageUrl: '', categoryId: 1 });

    useEffect(() => {
        const fetchTools = async () => {
            try {
                const data = await getTools();
                setTools(data);
            } catch (error) {
                console.error('Error fetching tools:', error);
            }
        };

        fetchTools();
    }, []);

    const handleCreateTool = async () => {
        try {
            const createdTool = await createTool(newTool);
            setTools([...tools, createdTool]);
            setNewTool({ name: '', description: '', imageUrl: '', categoryId: 1 });
            setCurrentToolId(null);
        } catch (error) {
            console.error('Error creating tool:', error);
        }
    };

    const handleUpdateTool = async () => {
        if (currentToolId === null) return;

        try {
            await updateTool(currentToolId, newTool);
            const updatedTools = tools.map((tool) => (tool.id === currentToolId ? newTool : tool));
            setTools(updatedTools);
            setNewTool({ name: '', description: '', imageUrl: '', categoryId: 1 });
            setCurrentToolId(null);
        } catch (error) {
            console.error(`Error updating tool with id ${currentToolId}:`, error);
        }
    };

    const handleEditTool = (tool: Tool) => {
        setCurrentToolId(tool.id!);
        setNewTool({ name: tool.name, description: tool.description, imageUrl: tool.imageUrl, categoryId: tool.categoryId });
    };

    const handleDeleteTool = async (id: number) => {
        try {
            await deleteTool(id);
            setTools(tools.filter(tool => tool.id !== id));
        } catch (error) {
            console.error(`Error deleting tool with id ${id}:`, error);
        }
    };

    return (
        <div>
            <h1>Tool List</h1>
            <ul>
                {tools.map(tool => (
                    <li key={tool.id}>
                        {tool.name} - {tool.description}
                        <button onClick={() => handleEditTool(tool)}>Edit</button>
                        <button onClick={() => handleDeleteTool(tool.id!)}>Delete</button>
                    </li>
                ))}
            </ul>
            <h2>{currentToolId ? 'Update Tool' : 'Create New Tool'}</h2>
            <input
                type="text"
                placeholder="Name"
                value={newTool.name}
                onChange={(e) => setNewTool({ ...newTool, name: e.target.value })}
            />
            <input
                type="text"
                placeholder="Description"
                value={newTool.description}
                onChange={(e) => setNewTool({ ...newTool, description: e.target.value })}
            />
            <input
                type="text"
                placeholder="Image URL"
                value={newTool.imageUrl}
                onChange={(e) => setNewTool({ ...newTool, imageUrl: e.target.value })}
            />
            <input
                type="number"
                placeholder="Category ID"
                value={newTool.categoryId}
                onChange={(e) => setNewTool({ ...newTool, categoryId: parseInt(e.target.value) })}
            />
            <button onClick={currentToolId ? handleUpdateTool : handleCreateTool}>
                {currentToolId ? 'Update Tool' : 'Create Tool'}
            </button>
        </div>
    );
};

export default ToolList;