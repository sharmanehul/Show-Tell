
import React, { useState, useContext } from "react";
import axios from "axios";
import { Context } from "../../context/Context";
import { useParams } from "react-router-dom";

const CategoryPage = () => {
  const { id: categoryId } = useParams();
  const { user } = useContext(Context);

  const [title, setTitle] = useState("");
  const [desc, setDesc] = useState("");
  const [file, setFile] = useState(null);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const newPost = {
      username: user.username,
      title,
      desc,
      categoryId, // Add categoryId to the new post
    };

    if (file) {
      const data = new FormData();
      const filename = Date.now() + file.name;
      data.append("name", filename);
      data.append("file", file);
      newPost.photo = filename;
      try {
        await axios.post("/upload", data);
      } catch (error) {
        console.error("Error uploading photo:", error);
      }
    }

    try {
      // Create a new post
      const response = await axios.post("/posts", newPost);
      window.location.replace("/post/" + response.data._id);
    } catch (error) {
      console.error("Error creating post:", error);
    }
  };

  return (
    <div className="category-page">
      <div className="write">
        {/* Form to create a new post */}
        <form className="writeForm" onSubmit={handleSubmit}>
          <input
            type="text"
            placeholder="Title"
            className="writeInput"
            autoFocus={true}
            value={title}
            onChange={(e) => setTitle(e.target.value)}
          />
          <textarea
            placeholder="Tell your story..."
            type="text"
            className="writeInput writeText"
            value={desc}
            onChange={(e) => setDesc(e.target.value)}
          ></textarea>
          <input
            type="file"
            id="fileInput"
            style={{ display: "none" }}
            onChange={(e) => setFile(e.target.files[0])}
          />
          <label htmlFor="fileInput">
            <i className="writeIcon fas fa-plus"></i>
          </label>
          <button className="writeSubmit" type="submit">
            Publish
          </button>
        </form>
      </div>
    </div>
  );
};

export default CategoryPage;
