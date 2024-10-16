import React, { useEffect, useState } from 'react';
import { getProfile, updateProfile } from '../services/authService';

const Profile: React.FC = () => {
    const [profile, setProfile] = useState<{ id: number, username: string, email: string } | null>(null);
    const [username, setUsername] = useState('');
    const [email, setEmail] = useState('');
    const [error, setError] = useState('');

    useEffect(() => {
        const fetchProfile = async () => {
            try {
                const profileData = await getProfile();
                setProfile(profileData);
                setUsername(profileData.username);
                setEmail(profileData.email);
            } catch (error) {
                setError('Error fetching profile');
            }
        };

        fetchProfile();
    }, []);

    const handleUpdateProfile = async () => {
        if (!profile) return;
        try {
            await updateProfile(profile.id, username, email);
            setError('');
            alert('Profile updated successfully');
        } catch (error) {
            setError('Error updating profile');
        }
    };

    return (
        <div>
            <h2>Profile</h2>
            {profile ? (
                <>
                    <input
                        type="text"
                        placeholder="Username"
                        value={username}
                        onChange={(e) => setUsername(e.target.value)}
                    />
                    <input
                        type="email"
                        placeholder="Email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                    />
                    <button onClick={handleUpdateProfile}>Update Profile</button>
                </>
            ) : (
                <p>Loading...</p>
            )}
            {error && <p>{error}</p>}
        </div>
    );
};

export default Profile;