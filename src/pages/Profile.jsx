import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import ProfileForm from '../components/profile/ProfileForm';
import './Profile.css';

const Profile = () => {
  const { currentUser, userProfile } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    if (!currentUser) {
      navigate('/login');
    }
  }, [currentUser, navigate]);

  if (!currentUser) {
    return null;
  }

  return (
    <div className="profile-page">
      <div className="profile-header">
        <h1>Student Profile</h1>
        <p>Complete your profile to get personalized career recommendations</p>
      </div>
      <ProfileForm userProfile={userProfile} />
    </div>
  );
};

export default Profile;
