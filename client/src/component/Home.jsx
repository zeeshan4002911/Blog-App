import React from "react";
import { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
const URL = process.env.REACT_APP_API_KEY || "http://localhost:3001"

const Home = () => {
    const navigate = useNavigate();
    const [fetchedBlog, setFetchedBlog] = useState([]);
    useEffect(() => {
        const token = window.localStorage.getItem("token_blog_app");
        fetch(URL + "/api/v1/blog/", {
            method: "GET",
            headers: { 
                "Content-Type": "application/json",
                Authorization: token
            },
        }).then(response => response.json())
            .then((data => {
                console.log(data)
                if (data.status === "Success") {
                    setFetchedBlog(data.data);
                }
            })).catch((err) => {
                console.log(err.message)
                return setFetchedBlog([])
            })
    }, [])
    return (
        <div className="box-container" style={{ width: "80vw", margin: "0 auto" }}>
            <nav>
                <ul>
                    <li><Link to="/">HOME</Link></li>
                    <li><Link to="/">CREATE</Link></li>
                    <li><Link to="/">LOGOUT</Link></li>
                </ul>
                <h1 onClick={() => navigate("/")} style={{ cursor: "pointer" }}>BlogApp</h1>
            </nav>
            


        </div>
    )
}

export default Home;