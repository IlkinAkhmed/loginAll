import React, { useEffect, useState } from "react";
import { jwtDecode } from "jwt-decode";
import "./index.scss";
import axios from "axios";
import { getCookie } from "../../../helpers/helper";

function News() {
  const [news, setNews] = useState(null);
  const [isloading, setIsloading] = useState(true);
  const [editNewsId, setEditNewsId] = useState(null);
  const [editHeader, setEditHeader] = useState("");
  const [editDescription, setEditDescription] = useState("");

  const token = getCookie("token");
  const decoded = jwtDecode(token);

  //   fetc all userss
  async function fetchNews() {
    setIsloading(!isloading);
    try {
      const res = await axios.get("http://localhost:8000/news/");
      setNews(res.data);
    } catch (error) {
      console.error("Error fetching users:", error);
    }
  }
  useEffect(() => {
    fetchNews();
  }, []);




  // delete News
  async function handleDelete(id) {
    const token = getCookie('token')
    await axios.delete(`http://localhost:8000/news/${id}`,
      {
        headers: {
          Authorization: token
        }
      }
    )
    fetchNews()
    setIsloading(false);
  }


  // update News

  async function handleUpdate(e, id) {
    e.preventDefault();
    if (!editHeader || !editDescription) {
      alert("header or description cannot be empty");
      return;
    }
    try {
      const token = getCookie("token");
      await axios.put(
        `http://localhost:8000/news/${id}`,
        {
          header: editHeader,
          description: editDescription,
        },
        {
          headers: {
            Authorization: token,
          },
        }
      );
      fetchNews();
      setEditDescription("");
      setEditHeader("");
      setEditNewsId(id === editNewsId ? null : id);
      setIsloading(false)
    } catch (error) {
      console.error(error.message);
    }
  }

  function handleInputChange(e, setState) {
    e.preventDefault();
    setState(e.target.value);
  }


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
                <h2 style={{ backgroundColor: "red", color: 'white' }}>Header: {singleNews.header}</h2>
                <p>Description : {singleNews.description}</p>
                <span>Created At : {singleNews.createdAt}</span>
                <br />
                <span>Last Updated At : {singleNews.updatedAt}</span>
                {decoded.role === "admin" ? (
                  <div>
                    <button onClick={() => {
                      setEditNewsId(singleNews._id === editNewsId ? null : singleNews._id);
                    }}
                    >
                      Edit
                    </button>
                    <button onClick={() => handleDelete(singleNews._id)}>delete</button>
                  </div>
                ) : (
                  ""
                )}
                <i>Author: {singleNews.author}</i>
              </div>
              {/*--------- EDIT FORM ---------*/}
              <form action=""
                onSubmit={(e) => handleUpdate(e, singleNews._id)}
                className={
                  editNewsId === singleNews._id ? "editForm active" : "editForm"
                }
              >
                <i
                  onClick={() => {
                    setEditNewsId(singleNews._id === editNewsId ? null : singleNews._id);
                  }}
                  className="fa-solid fa-xmark"
                ></i>
                <label htmlFor="">Header</label> <br />
                <input value={editHeader} onChange={(e) => handleInputChange(e, setEditHeader)} type="text" /> <br />
                <label value={editDescription} htmlFor="">Description</label> <br />
                <input onChange={(e) => handleInputChange(e, setEditDescription)} type="text" /> <br />
                <input type="submit" />
              </form>
            </div>
          ))
        )}
      </div>
    </section>
  );
}

export default News;
