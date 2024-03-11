import React, { useState } from "react";
import "./SignUp.scss";
import { Link, useNavigate } from "react-router-dom";
import OAuth from "../../../components/o-auth/OAuth";

export default function SignUp() {
    const [formData, setFormData] = useState({});
    const [error, setError] = useState({});
    const [loading, setLoading] = useState(false);
    const navigate = useNavigate();

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.id]: e.target.value });
        // Clear the error message when user starts typing again
        setError({});
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            setLoading(true);
            setError({});

            // Validation
            const errors = {};
            if (!formData.email) {
                errors.email = "Email is required";
            } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
                errors.email = "Email is invalid";
            }
            if (!formData.password) {
                errors.password = "Password is required";
            } else if (formData.password.length < 8) {
                errors.password = 'Password must be at least 8 characters';
            }
            if (Object.keys(errors).length > 0) {
                setError(errors);
                setLoading(false);
                return;
            }

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
                setError(data);
                return;
            }
            navigate("/sign-in");
        } catch (error) {
            setLoading(false);
            setError({ message: "An error occurred. Please try again later." });
        }
    };

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
                        required
                    />
                    <input
                        type="email"
                        placeholder="Email"
                        id="email"
                        onChange={handleChange}
                        required
                    />
                    {error.email && <p className="error">{error.email}</p>}
                    <input
                        type="password"
                        placeholder="Password"
                        id="password"
                        onChange={handleChange}
                        required
                    />
                    {error.password && <p className="error">{error.password}</p>}
                    <button disabled={loading}>
                        {loading ? "Loading..." : "Sign Up"}
                    </button>
                    <OAuth />
                </form>

                <div>
                    <p>Have an account?</p>
                    <Link to="/sign-in" className="signin_signUp">
                        <span>Sign in</span>
                    </Link>
                </div>
                {error.message && (
                    <p className="error" style={{ fontFamily: "poppins" }}>
                        {error.message}
                    </p>
                )}
            </section>
        </main>
    );
}



// import React, { useState } from "react";
// import "./SignUp.scss";
// import { Link, useNavigate } from "react-router-dom";
// import OAuth from "../../../components/o-auth/OAuth";

// export default function SignUp() {
//   const [formData, setFormData] = useState({});
//   const [error, setError] = useState(false);
//   const [loading, setLoading] = useState(false);
//   const navigate = useNavigate();

//   const handleChange = (e) => {
//     setFormData({ ...formData, [e.target.id]: e.target.value });
//   };

//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     try {
//       setLoading(true);
//       setError(false);
//       const res = await fetch("/api/auth/signup", {
//         method: "POST",
//         headers: {
//           "Content-type": "application/json",
//         },
//         body: JSON.stringify(formData),
//       });
//       const data = await res.json();
//       setLoading(false);
//       if (data.success === false) {
//         setError(data);
//         return;
//       }
//       navigate("/sign-in");
//     } catch (error) {
//       setLoading(false);
//       setError(true);
//     }
//   };

//   return (
//     <main className="signin_wrapper">
//       <section className="signin_section">
//         <h2>Sign Up</h2>
//         <form onSubmit={handleSubmit}>
//           <input
//             type="text"
//             placeholder="Username"
//             id="username"
//             onChange={handleChange}
//             required
//           />
//           <input
//             type="email"
//             placeholder="Email"
//             id="email"
//             onChange={handleChange}
//             required
//           />
//           <input
//             type="password"
//             placeholder="Password"
//             id="password"
//             onChange={handleChange}
//             required
//           />
//           <button disabled={loading}>
//             {loading ? "Loading..." : "Sign Up"}
//           </button>
//           <OAuth />
//         </form>

//         <div>
//           <p>Have an account?</p>
//           <Link to="/sign-in" className="signin_signUp">
//             <span>Sign in</span>
//           </Link>
//         </div>
//         <p
//           style={{
//             color: "red",
//             marginTop: "0.4rem",
//             textAlign: "center",
//             fontFamily: "poppins",
//           }}
//         >
//           {error.message}
//         </p>
//       </section>
//     </main>
//   );
// }
