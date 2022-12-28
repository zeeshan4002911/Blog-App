import React from "react";
const URL = process.env.REACT_APP_API_KEY || "http://localhost:3001"


export default function SingleBlog({ data }) {
    data.createdAt = new Date(data.createdAt).toLocaleString();
    return (
        <div className="blog">
            <img src={`${URL}/uploads/${data.image}`} alt={data.title} />
            <div>
                <div style={{ color: "#24a0ed", fontWeight: "bold"}}>{data.title}</div>
                <div style={{ color: "#24a0ed" }}>by: {data.email} <span style={{fontSize: "10px", color: "gray"}}>{data.createdAt}</span></div>
                <div>{data.description}</div>
            </div>
        </div>
    )
}