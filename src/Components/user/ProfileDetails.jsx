import { useSelector } from "react-redux";
import "./ProfileDetails.css";

const ProfileDetails = () => {
  const { user } = useSelector((state) => state.user);
  console.log(user);
  console.log("User Photo URL:", user.photo);
  console.log("User Data from API:", user);

  return (
    <div className="profile-details">
      <h2 className="profile-title">Profile Information</h2>
      <p className="profile-info">
        <strong>Name:</strong> {user.name}
      </p>
      <p className="profile-info">
        <strong>Email:</strong> {user.email}
      </p>
      {user.photo ? (
        <div className="profile-photo">
          <img className="user-image" src={user.photo} alt="User" />
        </div>
      ) : (
        <div className="profile-photo">
          <img
            className="user-image"
            src="path/to/default-image.jpg"
            alt="Default User"
          />
        </div>
      )}
    </div>
  );
};

export default ProfileDetails;
