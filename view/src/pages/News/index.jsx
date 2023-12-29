import React, { useEffect, useState } from "react";
import { jwtDecode } from "jwt-decode";
import "./index.scss";
import axios from "axios";
import { getCookie } from "../../../helpers/helper";

function News() {
  const [news, setNews] = useState(null);
  const [isloading, setIsloading] = useState(true);

  const token = getCookie("token");
  const decoded = jwtDecode(token);

  //   fetc all userss
  async function fetchUsers() {
    setIsloading(!isloading);
    try {
      const res = await axios.get("http://localhost:8000/news/");
      setNews(res.data);
    } catch (error) {
      console.error("Error fetching users:", error);
    }
  }
  useEffect(() => {
    fetchUsers();
  }, []);
  return (
    <section>
      <h1>News</h1>
      <div className="NewsWrapper">
        {isloading ? (
          <h1>Loading...</h1>
        ) : (
          news &&
          news.map((singleNews) => (
            <div key={singleNews._id} className="card">
              <div className="img">
                <img src={singleNews.image} alt="" />
              </div>
              <div className="texts">
                <h2>Author: {singleNews.author}</h2>
                <p>Description : {singleNews.description}</p>
                <span>Created At : {singleNews.createdAt}</span>
                <br />
                <span>Last Updated At : {singleNews.updatedAt}</span>
                {decoded.role === "admin" ? (
                  <div>
                    <button>edit</button>
                    <button>delete</button>
                  </div>
                ) : (
                  ""
                )}
              </div>
            </div>
          ))
        )}
      </div>
    </section>
  );
}

export default News;
