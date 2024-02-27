import React, { useState } from 'react'
import './SignUp.scss'
import { Link, useNavigate } from 'react-router-dom';

export default function SignUp() {
  const [formData, setFormData] = useState({})
  const [error, setError] = useState(false);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData({...formData, [e.target.id] : e.target.value});
  }

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      setLoading(true);
      setError(false);

      const res = await fetch("/api/auth/signup", {
        method: "POST",
        headers: {
          "Content-type": "application/json",
        },
        body: JSON.stringify(formData),
      });
      const data = await res.json();
      setLoading(false);
      if (data.success === false) {
        // setError(true);
        setError(data)
        return;
      }
      navigate("/sign-in");
    } catch (error) {
      setLoading(false);
      setError(true);
    }
  };

  console.log(error)
  
  return (
    <main className="signin_wrapper">
      <section className="signin_section">
        <h2>Sign Up</h2>
        <form onSubmit={handleSubmit}>
          <input
            type="text"
            placeholder="Username"
            id="username"
            onChange={handleChange}
          />
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
            {loading ? "Loading..." : "Sign Up"}
          </button>
          <button
            disabled={loading}
          >
            Continue with google
          </button>
        </form>

        <div>
          <p>Have an account?</p>
          <Link to="/sign-in" className="signin_signUp">
            <span>Sign in</span>
          </Link>
        </div>
        <p style={{
          color: "red",
          marginTop: "0.4rem",
          textAlign: "center",
          fontFamily: "poppins"
        }}>
          {/* {error && "Something went wrong!"} */}
          {error.message}
          </p>
      </section>
    </main>
  );
}

