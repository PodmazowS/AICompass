import React from 'react';

const Signup: React.FC = () => {
    return (
        <div>
            <h1>Signup Page</h1>
            <p>Create a new account.</p>
            <input type="text" placeholder="Username" />
            <input type="password" placeholder="Password" />
            <button>Signup</button>
        </div>
    );
};

export default Signup;