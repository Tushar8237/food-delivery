import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from 'react-redux'
import {singInStart, singInSuccess, singInFailure } from '../../../redux/user/userSlice'

export default function Signin() {
    const [formData, setFormData] = useState({});
    const { loading, error } = useSelector((state) => state.user);
    const navigate = useNavigate()
    const dispatch = useDispatch()

    const handleChange = (e) => {
        setFormData({...formData, [e.target.id] : e.target.value})
    }


    const handleSubmit = async (e) => {
        e.preventDefault()
        try {
            dispatch(singInStart());

            const res = await fetch("/api/auth/signin", {
                method: "POST",
                headers: {
                    "Content-type": "application/json"
                },
                body: JSON.stringify(formData)
            })

            const data = await res.json()
            if(data.success === false) {
                dispatch(singInFailure(data))
                return
            }
            dispatch(singInSuccess(data))
            navigate("/")
        } catch (error) {
            dispatch(singInFailure(error))
        }
    }

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
                    />
                    <input
                        type="password"
                        placeholder="Password"
                        id="password"
                        onChange={handleChange}
                    />
                    <button
                        disabled={loading}
                    >
                        {loading ? "Loading..." : "Sign In"}
                    </button>
                    <button
                        disabled={loading}
                    >
                        Continue with google
                    </button>
                </form>

                <div>
                    <p>Don&#39;t Have an account?</p>
                    <Link to="/sign-up" className="signin_signUp">
                        <span>Sign up</span>
                    </Link>
                </div>

                <p style={{
          color: "red",
          marginTop: "0.4rem",
          textAlign: "center",
          fontFamily: "poppins"
        }}>
          {/* {error && "Something went wrong!"} */}
          { error ? error.message || "Something went wrong" : ""}
          </p>
            </section>
        </main>
    );
}
