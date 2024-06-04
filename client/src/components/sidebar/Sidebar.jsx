

import axios from "axios";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import "./sidebar.css";

export default function Sidebar() {
  const [cats, setCats] = useState([]);
  const [newCategory, setNewCategory] = useState("");

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const response = await axios.get("/categories");
        console.log("API response data:", response.data); // Log the API response
        setCats(Array.isArray(response.data) ? response.data : []);
      } catch (error) {
        console.error("Error fetching categories:", error);
        setCats([]); // Set default value to an empty array in case of error
      }
    };

    fetchCategories();
  }, []);

  const handleAddCategory = async () => {
    if (newCategory.trim() !== "") {
      try {
        const response = await axios.post("/categories", { name: newCategory });
        setCats([...cats, response.data]);
        setNewCategory("");
      } catch (error) {
        console.error("Error adding category:", error);
      }
    }
  };

  const handleKeyPress = (event) => {
    if (event.key === "Enter") {
      handleAddCategory();
    }
  };

  return (
    <div className="sidebar">
      <div className="sidebarItem">
        <span className="sidebarTitle">ABOUT ME</span>
        <img
          src="https://i.pinimg.com/236x/1e/3f/58/1e3f587572a7a7b20bbf1828595a1786--holiday-party-themes-holiday-gift-guide.jpg"
          alt=""
        />
        <p>
          They say a girl can dream, so I dream in creative writings! This blog
          is my creative outlet, where I explore and share my thoughts and
          experiences with you, let's create something amazing together!
        </p>
      </div>
      <div className="sidebarItem">
        <span className="sidebarTitle">CATEGORIES</span>
        <div className="categoryInputWrapper">
          <input
            type="text"
            placeholder="Add new category"
            value={newCategory}
            onChange={(e) => setNewCategory(e.target.value)}
            onKeyPress={handleKeyPress}
          />
          <button onClick={handleAddCategory}>Add</button>
        </div>
        <ul className="sidebarList">
          {Array.isArray(cats) && cats.map((cat) => (
            cat._id && (
              <Link
                to={`/category/${cat._id}`}
                className="link"
                key={cat._id}
              >
                <li className="sidebarListItem">{cat.name}</li>
              </Link>
            )
          ))}
        </ul>
      </div>
      
    </div>
  );
}
