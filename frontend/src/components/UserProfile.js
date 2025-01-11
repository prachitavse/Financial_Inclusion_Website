// META DATA - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -
//
// Developer Details:
//     Name: Harshita Jangde
//     Role: Frontend Developer
//
// Description:
//     This React component renders the user's profile page for the SakhiSangam platform.
//     It displays user-specific details such as username, email, rank, points, completed quizzes, badges, and course progress.
//     It allows the user to edit their username dynamically and view progress using a circular progress bar.
//
// Dependencies:
//     - React useState Hook: For managing dynamic user data and edit states
//     - React Circular Progress Bar: For visualizing course progress
//     - Stylesheet: UserProfile.css for component-specific styling
//
// Notes:
//     When adding new user details or features, ensure consistency in the data structure.
//     Future enhancements include integrating backend APIs to fetch and update user data in real-time.
// - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -

import React, { useState } from 'react';
import { useTranslation } from 'react-i18next'; // Import the translation hook
import { CircularProgressbar, buildStyles } from "react-circular-progressbar";
import "react-circular-progressbar/dist/styles.css";
import "./UserProfile.css"; 
import Userimg from "../assets/userprofile.png";

function UserProfile({ username }) {
  const { t } = useTranslation(); // Hook to access translations

  const [userData, setUserData] = useState({
    username:  username || "username123",
    email: "username@gmail.com",
    rank: 1245,
    points: 5000,
    quizzesCompleted: 5,
    badgesEarned: 2,
    coursesCompleted: [
      { title: "Beginners", progress: 100 },
      { title: "Loan Management", progress: 100 },
    ],
    ongoingCourse: { title: "Financial Plannings for Families", progress: 50 },
  });
  const [isEditing, setIsEditing] = useState(false);
  const [newUsername, setNewUsername] = useState(userData.username);

  const handleEdit = () => {
    setIsEditing(true);
  };

  const handleUsernameChange = (e) => {
    setNewUsername(e.target.value);
  };

  const handleSave = () => {
    setUserData((prevData) => ({
      ...prevData,
      username: newUsername, // Save the new username
    }));
    setIsEditing(false); // Stop editing
  };

  return (
    <div className="profile-container">
      <header className="profile-header">
        <h2>{t('UserProfile.profilePageTitle')}</h2>
      </header>

      <div className="profile-content">
        {/* Left Section */}
        <div className="profile-info">
          <div className="user-info">
            <img
              src={Userimg}
              alt="User Avatar"
              className="user-avatar"
            />
            <div className="username-container">
              {isEditing ? (
                <input
                  type="text"
                  value={newUsername}
                  onChange={handleUsernameChange}
                  className="edit-input"
                />
              ) : (
                <h3>{userData.username}</h3>
              )}
              <button
                onClick={isEditing ? handleSave : handleEdit}
                className="edit-btn"
              >
                {isEditing ? t('UserProfile.saveButton') : t('UserProfile.editButton')}
              </button>
            </div>
            <p>{userData.email}</p>
          </div>
          <div className="stats">
            <p>{t('UserProfile.rank')}: {userData.rank}</p>
            <p>{t('UserProfile.points')}: {userData.points}</p>
            <p>{t('UserProfile.quizzesCompleted')}: {userData.quizzesCompleted}</p>
            <p>{t('UserProfile.badgesEarned')}: {userData.badgesEarned}</p>
          </div>
        </div>

        {/* Right Section */}
        <div className="profile-progress">
          <h3>{t('UserProfile.courseProgressTitle')}</h3>
          <div className="progress-courses">
            {/* Completed Courses */}
            <h4>{t('UserProfile.coursesCompleted')}</h4>
            <div className="CompletedCourse">
              {userData.coursesCompleted.map((course, index) => (
                <div className="course-progress" key={index}>
                  <CircularProgressbar
                    value={course.progress}
                    text={`${course.progress}%`}
                    styles={buildStyles({
                      textColor: "#ff0077",
                      pathColor: "#ff0077",
                      trailColor: "#ffeaf3",
                    })}
                    style={{ width: "30px" }}
                  />
                  <p>{course.title}</p>
                </div>
              ))}
            </div>

            {/* Ongoing Course */}
            <h4>{t('UserProfile.ongoingCourse')}</h4>
            <div className="course-progress">
              <CircularProgressbar
                value={userData.ongoingCourse.progress}
                text={`${userData.ongoingCourse.progress}%`}
                styles={buildStyles({
                  textColor: "#007bff",
                  pathColor: "#007bff",
                  trailColor: "#e3f2fd",
                })}
              />
              <p>{userData.ongoingCourse.title}</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default UserProfile;