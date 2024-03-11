import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import {
    singInStart,
    singInSuccess,
    singInFailure,
    getUserSuccess,
} from "../../../redux/user/userSlice";
import OAuth from "../../../components/o-auth/OAuth";

export default function Signin() {
    const [formData, setFormData] = useState({});
    const [errors, setErrors] = useState({});
    const { loading, error } = useSelector((state) => state.user);
    const navigate = useNavigate();
    const dispatch = useDispatch();

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.id]: e.target.value });
        // Clear the error message when user starts typing again
        setErrors({});
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
             // Validation
             const errors = {};
             if (!formData.email) {
                 errors.email = "Email is required";
             } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
                 errors.email = "Email is invalid";
             }
             if (!formData.password) {
                 errors.password = "Password is required";
             } 
             else if (formData.password.length < 8) {
                 errors.password = 'Password must be at least 8 characters';
             }
             if (Object.keys(errors).length > 0) {
                 setErrors(errors);
                 return;
             }
            dispatch(singInStart());

            const res = await fetch("/api/auth/signin", {
                method: "POST",
                headers: {
                    "Content-type": "application/json",
                },
                body: JSON.stringify(formData),
            });

            const data = await res.json();
            if (data.success === false) {
                dispatch(singInFailure(data));
                return;
            }
            dispatch(getUserSuccess(data))
            dispatch(singInSuccess(data));
           
            navigate("/");
        } catch (error) {
            dispatch(singInFailure(error));
        }
    };

    console.log(error)
    
    return (
        <main className="signin_wrapper">
            <section className="signin_section">
                <h2>Sign In</h2>
                <form onSubmit={handleSubmit}>
                    <input
                        type="email"
                        placeholder="Email"
                        id="email"
                        onChange={handleChange} 
                        required
                    />
                    {errors.email && <p className="error">{errors.email}</p>}
                    <input
                        type="password"
                        placeholder="Password"
                        id="password"
                        onChange={handleChange}
                        required
                    />
                    {errors.password && <p className="error">{errors.password}</p>}
                    <button disabled={loading}>
                        {loading ? "Loading..." : "Sign In"}
                    </button>
                    {/* <button
                        disabled={loading}
                    >
                        Continue with google
                    </button> */}
                    <OAuth />
                </form>

                <div>
                    <p>Don&#39;t Have an account?</p>
                    <Link to="/sign-up" className="signin_signUp">
                        <span>Sign up</span>
                    </Link>
                </div>

                <p
                    style={{
                        color: "red",
                        marginTop: "0.4rem",
                        textAlign: "center",
                        fontFamily: "poppins",
                    }}
                >
                    {/* {error && "Something went wrong!"} */}
                    {error ? error.message || "Something went wrong" : ""}
                </p>
            </section>
        </main>
    );
}
