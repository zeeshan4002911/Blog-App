import React from "react";
import { useNavigate } from "react-router-dom";
const URL = process.env.REACT_APP_API_KEY || "http://localhost:3001";

export default function Create() {
    const navigate = useNavigate();
    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const title = document.getElementById("title").value;
            const description = document.getElementById("description").value;
            const formData = new FormData();
            formData.append("title", title);
            formData.append("description", description);
            const file = e.target.elements.image.files[0];
            formData.append("image", file);

            const token = window.localStorage.getItem("token_blog_app");
            await fetch(URL + '/api/v1/blog/', {
                method: "POST",
                headers: {
                    Authorization: token
                },
                body: formData,
            }).then(response => {
                if (response.status === 403) return navigate("/");
                return response.json()
            }).then((data => {
                console.log(data)
                if (data.status === "Success") {
                    alert(data.message);
                }
            })).catch((err) => { alert("Failed! unable to post the blog"); console.log(err) })
                .finally(() => {
                    e.target.reset();
                    navigate("/home")
                })
        } catch (err) {
            console.log("ERROR:", err);
            alert("All form data are mandatory")
            navigate("/create")
        }
    }
    return (
        <div className="box-container" style={{ width: "80vw", margin: "0 auto" }}>
            <form encType='multipart/form-data' method="post" onSubmit={handleSubmit}>
                <input type="file" name="image" id="image" required />
                <input type="text" id="title" placeholder="Title" required />
                <textarea id="description" placeholder="Description" required />
                <button type="submit">Save Post</button>
            </form>
        </div>
    )
}