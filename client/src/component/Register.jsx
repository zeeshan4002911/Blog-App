import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
const URL = process.env.REACT_APP_API_KEY || "http://localhost:3001"

const Register = () => {
    const navigate = useNavigate();
    const [response, setResponse] = useState("");
    const [error, setError] = useState({
        email_error: "*",
        password_error: "*",
        match_error: "*",
        submit_error: ""
    })
    const handleError = (e, type) => {
        if (type === "password") {          
            (!e.target.value.match(/^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*#?&])[A-Za-z\d@$!%*#?&]{8,}$/)) ? setError({...error, password_error: "Must be 8 or more characters and contain at least 1 letter 1 number and 1 special character"}) : setError({...error, password_error: ""})
        } else if (type === "email") {
            (!e.target.value.match(/^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/)) ? setError({...error, email_error: "Please enter a valid email address"}) : setError({...error, email_error: ""})
        } else {
            const first_password = document.getElementById("password").value;
            (e.target.value !== first_password) ? setError({...error, match_error: "Both Password are different"}) : setError({...error, match_error: ""})
        }
    }
    const handleRegister = () => {
        if (error.email_error !== "" || error.password_error !== "" || error.match_error !== "") {
           return setError({...error, submit_error: "Please Fill All the Fields"})
        } 
        console.log("Front-End Authenticated");
        const email = document.getElementById("email").value;
        const password = document.getElementById("password").value;
        fetch(URL + "/api/v1/user/register", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({
                email: email,
                password: password
            })
        }).then(response => response.json())
        .then((data => {
            console.log(data)
            if (data.status === "Failed") {
                setResponse(data.message)
            } else if (data.status === "Success") {
                setResponse(data.message);
                setTimeout(() => { navigate("/")}, 2000);
            }
        })).catch((err) => setResponse(err.message))
    }

    return (
        <div className="box-container">
            <h1>SIGN UP</h1>
            <label htmlFor="email">Email</label>
            <input type="text" id="email" onChange={(e) => handleError(e, "email")}/>
            <div className="error">{error.email_error}</div>
            <label htmlFor="password">Password</label>
            <input type="password" id="password" onChange={(e) => handleError(e, "password")}/>
            <div className="error">{error.password_error}</div>
            <label htmlFor="confirm-password">Confirm Password</label>
            <input type="password" id="confirm-password" onChange={(e) => handleError(e, "confirm-password")}/>
            <div className="error">{error.match_error}</div>
            <button onClick={handleRegister}>SIGN UP</button>
            <div className="error">{error.submit_error}</div>
            <div>{response}</div>
            <p>Already have account? <Link to="/">LOGIN</Link></p>
        </div>
    )
}

export default Register;