import { hash, compare } from "bcrypt";
import jwt from "jsonwebtoken";
import { Users } from "../models/userModel.js";
const PrivateKey = "wexvlj@!@#$!__++=";

// ----------------------REGISTER-----------------------------
export async function register(req, res) {
  try {
    const findedUser = await Users.findOne({ username: req.body.username });
    if (findedUser) {
      res.send("Username already exist!! Try other Username");
      return;
    } else {
      const { username } = req.body;
      const hashedPassword = await hash(req.body.password, 10);
      const user = new Users({
        username,
        password: hashedPassword,
        role: "user",
      });
      await user.save();
      const token = jwt.sign(
        { _id: user._id, username: user.username, role: user.role },
        PrivateKey
      );
      res.status(200).send(token);
    }
  } catch (error) {
    res.status(500).send("Internal Server Error");
  }
}

// --------------------------LOGIN--------------------------------------------

export async function login(req, res) {
  try {
    const { username, password } = req.body;
    const user = await Users.findOne({ username: username });
    if (user && (await compare(password, user.password))) {
      const token = jwt.sign(
        { _id: user._id, username: user.username, role: user.role },
        PrivateKey
      );
      res.status(200).send(token);
    } else {
      res.status(403).send("Wrong details!!!");
    }
  } catch (error) {
    res.status(500).send("Internal Server Error");
  }
}

// --------------------------DELETE--------------------------------------------

export async function deleteUser(req, res) {
  try {
    const token = req.headers.authorization;
    const decoded = jwt.verify(token, PrivateKey);
    if (decoded) {
      if (decoded.role === "admin") {
        const { id } = req.params;
        const user = await Users.findByIdAndDelete(id);
        if (user) {
          res.status(200).send("User Deleted");
        } else {
          res.status(404).send("User Not Found");
        }
      } else {
        res.status(403).send("You have not acces to delete user");
      }
    } else {
      res.status(403).send("You have not acces to delete user");
    }
  } catch (error) {
    res.status(500).send("Internal Server Error");
  }
}

// --------------------------UPDATE USER--------------------------------------------

export async function updateUser(req, res) {
  try {
    const { id } = req.params;
    const token = req.headers.authorization;
    const decoded = jwt.verify(token, PrivateKey);
    const user = await Users.findOne({ _id: id });
    if (decoded.role === "admin" || decoded._id === id) {
      const hashedPassword = await hash(req.body.password, 10);
      await Users.findByIdAndUpdate(id, {
        username: req.body.username,
        role: user.role,
        password: hashedPassword,
      });
      res.status(200).send("user updated");
    } else {
      res.status(404).send("You have not access to update");
    }
  } catch (error) {
    res.status(500).send(error.message);
  }
}

// --------------------------GET ALL USERS--------------------------------------------

export async function getAllUsers(req, res) {
  try {
    const users = await Users.find({});
    res.send(users);
  } catch (error) {
    res.status(500).send("Internal Server Error");
  }
}

// --------------------------GET  USER ById--------------------------------------------

export async function getUserById(req, res) {
  try {
    const { id } = req.params;
    const user = await Users.findById(id);
    res.send(user);
  } catch (error) {
    res.status(500).send("Internal Server Error");
  }
}
