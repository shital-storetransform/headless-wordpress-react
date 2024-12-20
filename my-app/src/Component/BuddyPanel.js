import React, { useState, useEffect } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUser, faBell, faUsers, faComment, faBars, faChevronLeft } from '@fortawesome/free-solid-svg-icons'; // Import icons

const BuddyPanel = () => {
  const [userProfile, setUserProfile] = useState(null);
  const [activityFeed, setActivityFeed] = useState([]);
  const [notifications, setNotifications] = useState([]);
  const [friends, setFriends] = useState([]);
  const [groups, setGroups] = useState([]);
  const [profileCompletion, setProfileCompletion] = useState(0);
  const [isOpen, setIsOpen] = useState(true); // State for panel visibility

  useEffect(() => {
    fetch('http://wordpress-project.local/wp-json/buddypress/v1/members/me')
      .then((response) => response.json())
      .then((data) => {
        setUserProfile(data);
        if (data.xprofile) {
          const profileFields = data.xprofile.groups.reduce((total, group) => {
            total += group.fields.filter((field) => field.value?.raw).length;
            return total;
          }, 0);
          const totalFields = data.xprofile.groups.reduce((total, group) => total + group.fields.length, 0);
          const completionPercentage = Math.round((profileFields / totalFields) * 100);
          setProfileCompletion(completionPercentage);
        }
      })
      .catch((error) => console.error('Error fetching user profile:', error));

    fetch('http://wordpress-project.local/wp-json/buddypress/v1/activity')
      .then((response) => response.json())
      .then((data) => setActivityFeed(data))
      .catch((error) => console.error('Error fetching activity feed:', error));

    fetch('http://wordpress-project.local/wp-json/buddypress/v1/notifications')
      .then((response) => response.json())
      .then((data) => setNotifications(data))
      .catch((error) => console.error('Error fetching notifications:', error));

    fetch('http://wordpress-project.local/wp-json/buddypress/v1/friends')
      .then((response) => response.json())
      .then((data) => setFriends(data))
      .catch((error) => console.error('Error fetching friends:', error));

    fetch('http://wordpress-project.local/wp-json/buddypress/v1/groups')
      .then((response) => response.json())
      .then((data) => setGroups(data))
      .catch((error) => console.error('Error fetching groups:', error));
  }, []);

  if (!userProfile) {
    return <div>Loading...</div>;
  }

  const avatarUrl = userProfile.avatar_urls?.['96'] || 'path/to/default/avatar.jpg';

  const togglePanel = () => {
    setIsOpen(!isOpen);
  };

  return (
    <div className={`buddy-panel ${isOpen ? 'open' : 'closed'}`}>
      {/* Toggle Button inside the panel */}
      <button className="toggle-button" onClick={togglePanel}>
        <FontAwesomeIcon icon={isOpen ? faChevronLeft : faBars} size="lg" />
      </button>

      {/* User Profile Section */}
      {/* {isOpen && (
        <div className="user-profile">
          <img src={avatarUrl} alt="User Avatar" />
          <h2>{userProfile.name}</h2>
          <p>{userProfile.user_login}</p>
          <div className="profile-completion">
            <p>Profile Completion:</p>
            <div className="completion-bar">
              <div
                className="completion-progress"
                style={{ width: `${profileCompletion}%` }}
              ></div>
            </div>
            <p>{profileCompletion}%</p>
          </div>
        </div>
      )} */}

      {/* Menu Section */}
      <div className="menu">
        <div className="menu-item">
          <FontAwesomeIcon icon={faUser} size="lg" />
          {isOpen && <span>Profile</span>}
        </div>
        <div className="menu-item">
          <FontAwesomeIcon icon={faBell} size="lg" />
          {isOpen && <span>Notifications ({notifications.length})</span>}
        </div>
        <div className="menu-item">
          <FontAwesomeIcon icon={faUsers} size="lg" />
          {isOpen && <span>Friends ({friends.length})</span>}
        </div>
        <div className="menu-item">
          <FontAwesomeIcon icon={faComment} size="lg" />
          {isOpen && <span>Activity Feed ({activityFeed.length})</span>}
        </div>
        <div className="menu-item">
          <FontAwesomeIcon icon={faUsers} size="lg" />
          {isOpen && <span>Groups ({groups.length})</span>}
        </div>
      </div>
    </div>
  );
};

export default BuddyPanel;
