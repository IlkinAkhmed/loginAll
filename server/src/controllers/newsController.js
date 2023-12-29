import { News } from "../models/newsModel.js";
import jwt from "jsonwebtoken"
const PrivateKey = 'wexvlj@!@#$!__++='


// --------------------------ADD NEWS--------------------------------------------

export const postNews = async (req, res) => {
  try {
    const newNews = new News({
      ...req.body,
    });
    await newNews.save();
    res.status(200).send("News Posted");
  } catch (error) {
    res.status(500).send(error.message);
  }
};



// --------------------------DELETE--------------------------------------------

export async function deleteNews(req, res) {
  try {
    const token = req.headers.authorization;
    const decoded = jwt.verify(token, PrivateKey);
    if (decoded && decoded.role === "admin") {
      const { id } = req.params;
      const news = await News.findByIdAndDelete(id);
      if (news) {
        res.status(200).send("news Deleted");
      } else {
        res.status(404).send("news Not Found");
      }
    } else {
      res.status(403).send("You have not acces to delete news");
    }

  } catch (error) {
    res.status(500).send("Internal Server Error");
  }
}



// --------------------------UPDATE NEWS--------------------------------------------


export async function updateNews(req, res) {
  try {
    const { id } = req.params
    const token = req.headers.authorization
    const decoded = jwt.verify(token, PrivateKey)
    if (decoded.role === 'admin') {
      await News.findByIdAndUpdate(id, req.body)
      res.status(200).send('News Updated')
    } else {
      res.status(403).send('You have not acces for updating')
    }

  } catch (error) {
    res.status(500).send(error.message);

  }

}


// --------------------------GET ALL News--------------------------------------------

export async function getAllNews(req, res) {
  try {
    const news = await News.find({});
    res.send(news);
  } catch (error) {
    res.status(500).send("Internal Server Error");
  }
}

// --------------------------GET  USER ById--------------------------------------------

export async function getNewsById(req, res) {
  try {
    const { id } = req.params;
    const news = await News.findById(id);
    res.send(news);
  } catch (error) {
    res.status(500).send("Internal Server Error");
  }
}
