


import { useEffect, useState } from "react";
import Header from "../../components/header/Header";
import Posts from "../../components/posts/Posts";
import Sidebar from "../../components/sidebar/Sidebar";
import "./home.css";
import axios from "axios";
import { useLocation } from "react-router";

export default function Home() {
  const [posts, setPosts] = useState([]);
  const { search } = useLocation();

  useEffect(() => {
    const fetchPosts = async () => {
      try {
        const res = await axios.get("/api/posts" + search);
        console.log("API response data:", res.data); // Log the API response
        if (Array.isArray(res.data)) {
          setPosts(res.data);
        } else {
          console.error("Unexpected response format:", res.data);
          setPosts([]); // Set default value to an empty array in case of unexpected response
        }
      } catch (error) {
        console.error("Error fetching posts:", error);
        setPosts([]); // Set default value to an empty array in case of error
      }
    };
    fetchPosts();
  }, [search]);

  return (
    <>
      <Header />
      <div className="home">
        <Posts posts={posts} />
        <Sidebar />
      </div>
    </>
  );
}
