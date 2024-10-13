import React from 'react';
import { useParams } from 'react-router-dom';

const ToolDetails: React.FC = () => {
    const { id } = useParams<{ id: string }>();

    return (
        <div>
            <h1>Tool Details Page</h1>
            <p>Details for tool {id}.</p>
        </div>
    );
};

export default ToolDetails;