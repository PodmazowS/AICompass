import React, { useEffect, useState } from 'react';
import { getTools } from '../services/toolService';
import { getCategories } from '../services/categoryService';
import { Tool } from '../interfaces/Tool';
import { Category } from '../interfaces/Category';

const AITools: React.FC = () => {
    const [tools, setTools] = useState<Tool[]>([]);
    const [categories, setCategories] = useState<Category[]>([]);
    const [selectedCategory, setSelectedCategory] = useState<number | null>(null);

    useEffect(() => {
        const fetchTools = async () => {
            try {
                const data = await getTools();
                setTools(data);
            } catch (error) {
                console.error('Error fetching tools:', error);
            }
        };

        const fetchCategories = async () => {
            try {
                const data = await getCategories();
                setCategories(data);
            } catch (error) {
                console.error('Error fetching categories:', error);
            }
        };

        fetchTools();
        fetchCategories();
    }, []);

    const handleCategoryChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
        const categoryId = parseInt(e.target.value);
        setSelectedCategory(categoryId);
    };

    const filteredTools = selectedCategory
        ? tools.filter(tool => tool.categoryId === selectedCategory)
        : tools;

    return (
        <div>
            <h1>AI Tools Page</h1>
            <select onChange={handleCategoryChange}>
                <option value="">All Categories</option>
                {categories.map(category => (
                    <option key={category.id} value={category.id}>
                        {category.name}
                    </option>
                ))}
            </select>
            <ul>
                {filteredTools.map(tool => (
                    <li key={tool.id}>
                        <a href={`/tools/${tool.id}`}>{tool.name}</a> - {tool.description}
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default AITools;