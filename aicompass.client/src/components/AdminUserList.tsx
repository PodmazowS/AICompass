import React, { useEffect, useState } from 'react';
import { getUsers, getUserById, updateUser, deleteUser } from '../services/userService';
import { User } from '../interfaces/User';

const AdminUserList: React.FC = () => {
    const [users, setUsers] = useState<User[]>([]);
    const [currentUserId, setCurrentUserId] = useState<number | null>(null);
    const [currentUser, setCurrentUser] = useState<User | null>(null);

    useEffect(() => {
        const fetchUsers = async () => {
            try {
                const data = await getUsers();
                setUsers(data);
            } catch (error) {
                console.error('Error fetching users:', error);
            }
        };

        fetchUsers();
    }, []);

    const handleEditUser = async (id: number) => {
        try {
            const user = await getUserById(id);
            setCurrentUserId(id);
            setCurrentUser(user);
        } catch (error) {
            console.error(`Error fetching user with id ${id}:`, error);
        }
    };

    const handleUpdateUser = async () => {
        if (!currentUser) return;

        try {
            await updateUser(currentUser);
            setUsers(users.map(user => (user.id === currentUser.id ? currentUser : user)));
            setCurrentUserId(null);
            setCurrentUser(null);
        } catch (error) {
            console.error(`Error updating user with id ${currentUser.id}:`, error);
        }
    };

    const handleDeleteUser = async (id: number) => {
        try {
            await deleteUser(id);
            setUsers(users.filter(user => user.id !== id));
        } catch (error) {
            console.error(`Error deleting user with id ${id}:`, error);
        }
    };

    return (
        <div>
            <h1>Admin User Management</h1>
            <ul>
                {users.map(user => (
                    <li key={user.id}>
                        {user.username} - {user.email} - {user.role}
                        <button onClick={() => handleEditUser(user.id)}>Edit</button>
                        <button onClick={() => handleDeleteUser(user.id)}>Delete</button>
                    </li>
                ))}
            </ul>
            {currentUserId && currentUser && (
                <div>
                    <h2>Edit User</h2>
                    <input
                        type="text"
                        placeholder="Username"
                        value={currentUser.username}
                        onChange={(e) => setCurrentUser({ ...currentUser, username: e.target.value })}
                    />
                    <input
                        type="email"
                        placeholder="Email"
                        value={currentUser.email}
                        onChange={(e) => setCurrentUser({ ...currentUser, email: e.target.value })}
                    />
                    <select
                        value={currentUser.role}
                        onChange={(e) => setCurrentUser({ ...currentUser, role: e.target.value })}
                    >
                        <option value="User">User</option>
                        <option value="Admin">Admin</option>
                    </select>
                    <button onClick={handleUpdateUser}>Update User</button>
                </div>
            )}
        </div>
    );
};

export default AdminUserList;