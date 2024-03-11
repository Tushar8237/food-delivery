import React from "react";
import {
    signInWithPopup,
    getAuth,
    GoogleAuthProvider,
} from "firebase/auth";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { app } from "../../firebase";
import "./OAuth.scss";
import { getUserSuccess, singInSuccess } from "../../redux/user/userSlice";


export default function OAuth() {
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const handleGoogleClick = async () => {
        try {
            const provider = new GoogleAuthProvider();
            const auth = getAuth(app);
            const result = await signInWithPopup(auth, provider);
            const res = await fetch('/api/auth/google', {
                method: 'POST',
                headers: {
                  'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                  name: result.user.displayName,
                  email: result.user.email,
                  photo: result.user.photoURL,
                }),
              });
              const data = await res.json();
            //   console.log(data);
              dispatch(getUserSuccess(data))
              dispatch(singInSuccess(data));
              navigate('/');

        } catch (error) {
            console.log("could not login with google", error);
        }
    };
    return <button type="button" onClick={handleGoogleClick} className="google_auth_btn">Continue with google</button>;
}
