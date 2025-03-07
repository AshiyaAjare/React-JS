import React, { useState } from "react";
import { Link } from "react-router-dom";
import { useGetUserQuery, useUpdateUserMutation } from "../api/userApi";

const Profile: React.FC = () => {
  const [isEditing, setIsEditing] = useState(false);
  const { data: user, isLoading, error } = useGetUserQuery();
  const [updateUser] = useUpdateUserMutation();

  const [formData, setFormData] = useState({
    first_name: user?.first_name || "",
    last_name: user?.last_name || "",
    email: user?.email || "",
  });

  const [profileImage, setProfileImage] = useState<File | null>(null);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const file = e.target.files[0];
      setProfileImage(file);
  
      // Optional: Show preview immediately
      const reader = new FileReader();
      reader.onload = () => {
        setFormData({ ...formData, profile_image: reader.result as string });
      };
      reader.readAsDataURL(file);
    }
  };
  

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
  
    const updatedData = new FormData();
    
    
    if (formData.first_name, formData.last_name, formData.email){
      updatedData.append("user[first_name]", formData.first_name);
      updatedData.append("user[last_name]", formData.last_name);
      updatedData.append("user[email]", formData.email);
    }
    
    if (profileImage) {
      updatedData.append("user[profile_image]", profileImage);
    }

    
    if (formData.password && formData.password.length >= 6) {
      updatedData.append("user[password]", formData.password);
      updatedData.append("user[password_confirmation]", formData.password);
    }
    
    try {
      await updateUser(updatedData).unwrap();
      alert("Profile updated successfully!");
      setIsEditing(false);
    } catch (error) {
      console.error("Error updating profile:", error);
      alert("Failed to update profile.");
    }
  };
  
  


  if (isLoading)
    return (
      <div className="bg-gradient-to-r from-indigo-50 via-purple-50 to-pink-50 h-screen flex justify-center items-center">
        <div className="text-indigo-500 text-xl font-semibold animate-pulse">
          Loading profile...
        </div>
      </div>
    );

  if (error)
    return (
      <div className="bg-gradient-to-r from-indigo-50 via-purple-50 to-pink-50 h-screen flex justify-center items-center">
        <div className="bg-white bg-opacity-70 p-6 rounded-lg shadow-md text-red-500">
          Error loading profile.
        </div>
      </div>
    );

  
  return (
    <section className="bg-gradient-to-r from-indigo-50 via-purple-50 to-pink-50 text-gray-700 py-12 min-h-screen relative overflow-hidden">
      {/* Decorative circles */}
      <div className="absolute top-0 left-0 w-64 h-64 bg-purple-300 rounded-full opacity-20 -ml-32 -mt-32"></div>
      <div className="absolute bottom-0 right-0 w-80 h-80 bg-pink-100 rounded-full opacity-20 -mr-40 -mb-40"></div>

      {/* Header */}
      <div className="max-w-7xl mx-auto px-6 lg:px-8 relative z-10 mb-8">
        <h1 className="text-3xl font-bold sm:text-4xl bg-clip-text text-transparent bg-gradient-to-r from-indigo-500 to-purple-400">
          Profile
        </h1>
        <div className="mt-1 text-indigo-400">
          <Link to="/" className="hover:text-indigo-600 transition duration-300">
            Home
          </Link>{" "}
          / <span>Profile</span>
        </div>
      </div>

      {/* Content container */}
      <div className="max-w-7xl mx-auto px-6 lg:px-8 relative z-10">
        {/* Profile Overview */}
        <div className="bg-white bg-opacity-70 backdrop-blur-sm rounded-2xl shadow-lg p-8 mb-8 transform hover:scale-101 transition duration-300">
          <div className="flex flex-col md:flex-row items-center gap-8">
            <div className="relative">
              <div className="absolute inset-0 bg-purple-200 bg-opacity-30 rounded-full blur-xl transform scale-110"></div>
              <div className="relative z-10 bg-gradient-to-r from-indigo-400 to-purple-500 h-32 w-32 rounded-full flex items-center justify-center text-white text-4xl font-bold shadow-md">
              <img
                src={user?.profile_image_url || "https://via.placeholder.com/150"}
                alt="User Profile"
                className="h-32 w-32 rounded-full object-cover"
              />

              </div>
              
            </div>

            <div className="md:flex-1 text-center md:text-left">
              <h2 className="text-2xl font-bold text-gray-800">{user?.first_name}</h2>
              <p className="text-indigo-500">{user?.email}</p>
              <div className="mt-4">
                {isEditing ? (
                  // Edit Form
                  <div className="space-y-4">
                    <label className="block">
                      <span className="text-gray-600">First Name</span>
                      <input
                        type="text"
                        name="first_name"
                        value={formData.first_name || ""}
                        onChange={handleChange}
                        className="mt-1 block w-full border-gray-300 rounded-md shadow-sm p-2"
                      />
                    </label>

                    <label className="block">
                      <span className="text-gray-600">Last Name</span>
                      <input
                        type="text"
                        name="last_name"
                        value={formData.last_name || ""}
                        onChange={handleChange}
                        className="mt-1 block w-full border-gray-300 rounded-md shadow-sm p-2"
                      />
                    </label>

                    <label className="block">
                      <span className="text-gray-600">Email</span>
                      <input
                        type="email"
                        name="email"
                        value={formData.email || ""}
                        onChange={handleChange}
                        className="mt-1 block w-full border-gray-300 rounded-md shadow-sm p-2"
                      />
                    </label>

                    <label className="block">
                      <span className="text-gray-600">Profile Photo</span>
                      <input
                        type="file"
                        accept="image/*"
                        name="profile_photo"
                        onChange={handleImageChange} // Ensure it updates state correctly
                        className="mt-1 block w-full border-gray-300 rounded-md shadow-sm p-2"
                      />
                    </label>

                    <img
                      src={
                        profileImage
                          ? URL.createObjectURL(profileImage) // Show preview if a new image is selected
                          : user?.profile_image // Show existing image if no new image is selected
                      }
                      alt="Profile"
                      className="h-32 w-32 rounded-full object-cover"
                    />


                    <div className="flex space-x-2">
                      <button
                        onClick={() => setIsEditing(false)}
                        className="px-4 py-2 bg-gray-300 rounded-lg"
                      >
                        Cancel
                      </button>
                      <button
                        onClick={handleSubmit} // Add API call later
                        className="px-4 py-2 bg-indigo-500 text-white rounded-lg"
                      >
                        Save Changes
                      </button>
                    </div>
                  </div>
                ) : (
                  <button
                    onClick={() => setIsEditing(true)}
                    className="px-4 py-2 bg-indigo-500 text-white rounded-lg"
                  >
                    Edit Profile
                  </button>
                )}
              </div>
            </div>
          </div>
        </div>

        {/* Profile Details */}
        <div className="grid md:grid-cols-2 gap-8 mb-16">
          {/* Personal Information */}
          <ProfileSection title="Personal Information">
            <ProfileInfo label="Email" value={user?.email || ""} />
            <ProfileInfo
              label="First Name"
              value={user?.first_name || "Not available"}
            />
            <ProfileInfo
              label="Last Name"
              value={user?.last_name || "Standard"}
            />
          </ProfileSection>

          {/* Account Details */}
          <ProfileSection title="Account Details">
            <ProfileInfo label="Role" value={user?.role || "Not available"} />
            <ProfileInfo label="Status" value={user?.status || "Active"} />
          </ProfileSection>
        </div>
      </div>
    </section>
  );
};

const ProfileSection: React.FC<{ title: string; children: React.ReactNode }> = ({
  title,
  children,
}) => (
  <div className="bg-white bg-opacity-70 backdrop-blur-sm rounded-2xl shadow-lg p-6 transform hover:scale-101 transition duration-300">
    <h3 className="text-xl font-semibold bg-clip-text text-transparent bg-gradient-to-r from-indigo-500 to-purple-500 mb-4">
      {title}
    </h3>
    <div className="space-y-4">{children}</div>
  </div>
);

const ProfileInfo: React.FC<{ label: string; value: string }> = ({
  label,
  value,
}) => (
  <div className="border-b border-indigo-100 pb-3">
    <div className="text-sm text-gray-500">{label}</div>
    <div className="font-medium text-gray-800">{value}</div>
  </div>
);

export default Profile;
