import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
const URL = process.env.API_KEY || "http://localhost:3001"

const Login = () => {
    const navigate = useNavigate();
    const [response, setResponse] = useState("");
    const handleLogin = () => {
        const email = document.getElementById("email").value;
        const password = document.getElementById("password").value;
        fetch(URL + "/api/v1/user/login", {
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
                window.localStorage.setItem("token", data.token);
                setTimeout(() => { navigate("/")}, 1000);
            }
        })).catch((err) => setResponse(err.message))
    }
    return (
        <div className="box-container">
            <h1>LOGIN</h1>
            <label htmlFor="email">Email</label>
            <input type="text" id="email"/>
            <div className="error">*</div>
            <label htmlFor="password">Password</label>
            <input type="password" id="password"/>
            <div className="error">*</div>
            <button onClick={handleLogin}>LOGIN</button>
            <div>{response}</div>
            <p>Need an account? <Link to="/register">SIGN UP</Link></p>
        </div>
    )
}

export default Login;