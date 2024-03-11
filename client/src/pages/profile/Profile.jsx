import React, { useRef, useState } from "react";
import "./Profile.scss";
import { useSelector, useDispatch } from "react-redux";
import { 
    deleteUserFailure, 
    deleteUserStart, 
    deleteUserSuccess, 
    updateUserFailure, 
    updateUserStart, 
    updateUserSuccess 
} from "../../redux/user/userSlice";

export default function Profile() {
    const fileRef = useRef(null);
    const dispatch = useDispatch()
    const [image, setImage] = useState(undefined)
    const [formData, setFormData] = useState({});
    const [updateSuccess, setUpdateSuccess] = useState(false);
    const { currentUser, loading, error } = useSelector((state) => state.user);

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.id]: e.target.value });
    }; 

    const handleFileInputChange = (e) => {
        const file = e.target.files[0];
        console.log(file)
        setFormData({ ...formData, profileImage: file });
    };

    const handleSubmit = async (e) => {
        e.preventDefault()
        try {
            dispatch(updateUserStart());
            const response = await fetch(`/api/user/update/${currentUser._id}`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(formData)
            });
            const data = await response.json();
            if(data.success === false){
                dispatch(updateUserFailure(data))
                return
            }
            dispatch(updateUserSuccess(data));
            setUpdateSuccess(true)
        } catch (error) {
            dispatch(updateUserFailure(error))
        }
    }

    const handleDeleteAccount = async () => {
        try {
            dispatch(deleteUserStart())
            const response = await fetch(`/api/user/delete/${currentUser._id}`, {
                method: 'DELETE'
            }) 
            const data = response.json()
            if(data.success === false) {
                dispatch(deleteUserFailure(data))
                return
            }
            dispatch(deleteUserSuccess(data))
            
        } catch (error) {
            dispatch(deleteUserFailure(error))
        }
    }
    
    return (
        <main className="profile_wrapper">
            <section className="profile_section">
                <h2>My Profile</h2>
                <form onSubmit={handleSubmit}>
                    <input
                        type="file"
                        ref={fileRef}
                        hidden
                        accept="image/*"
                        id="image"
                        name="image"
                        onChange={handleFileInputChange}
                    />
                    <img
                        src={formData.profileImage || currentUser.profilePicture}
                        alt="profile image"
                        onClick={() => fileRef.current.click()}
                    />
                    <input
                        type="text"
                        defaultValue={currentUser.username}
                        id="username"
                        placeholder="Username"
                        onChange={handleChange}
                    />
                    <input
                        type="text"
                        defaultValue={currentUser.email}
                        id="email"
                        placeholder="Email"
                        onChange={handleChange}
                    />
                    <input
                        type="text"
                        id="password"
                        placeholder="Password"
                        onChange={handleChange}
                    />
                    <div>
                       <button type="submit">
                            { loading ? "Loading" : "Update Account" }
                        </button>
                        <button type="button" onClick={handleDeleteAccount}>
                            { loading ? "Loading" : "Delete Account" }
                        </button>
                    </div>
                </form>
                <p style={{
                    color: "rgb(31, 200, 31)",
                    fontFamily: "poppins",
                    marginLeft: "1rem"
                }}>
                    {updateSuccess && 'User is updated successfully!'}
                </p>
            </section>
        </main>
    );
}
