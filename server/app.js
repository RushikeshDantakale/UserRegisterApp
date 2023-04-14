const express = require("express");
const app = express();
const cors = require("cors");
const dotenv = require("dotenv");
app.use(cors());
dotenv.config({ path: "./.env" });
require("./db/conn.js");
const User = require("./model/userSchema.js");
app.use(express.json());

app.get("/", (req, res) => {
  res.send({
    message: "welcome to the server for user regitrsation and login!!!",
  });
});

// This is the Login EndPoint ..
// The validation using Mongoose and express.

app.post("/login", async (req, res) => {
  const { email, password } = req.body;

  if (!email || !password) {
    res.status(400).json({ error: "plz fill the data correctly!" });
  }

  const userLogin = await User.findOne({ email });

  if (userLogin) {
    const isMatch = await User.findOne({ $and: [{ email }, { password }] });

    if (!isMatch) {
      console.log(35, "app.js");
      res.status(400).json({ error: "Invalid Credientials!" });
    } else {
      res.json({ message: "user Signin successfully", user: userLogin });
    }
  } else {
    console.log(41, "app.js");
    res.status(400).json({ error: "Invalid Credientials!" });
  }
});

//  Register Endpoint -------------------------------
app.post("/register", async (req, res) => {
  const { name, email, password } = req.body;

  if (!name || !email || !password) {
    return res.status(422).json({ error: "Please fill the fields properly!" });
  }

  const userExist = await User.findOne({ email });

  if (userExist) {
    return res.status(422).json({ error: "user already exists!" });
  } else {
    const user = new User({ name, email, password });

    await user.save();

    res.status(201).json({ message: "user registered successfully!", user });
  }
});

//----------------update route-------------------

app.post("/update", async (req, res) => {
  console.log(req.body);
  const { name, password, email } = req.body;

  const user = await User.find({ email });

  if (name === "") {
    if (user[0].password === password) {
      res.status(400).send({ error: "use new password to update!" });
    } else {
      const userfound = await User.findOneAndUpdate(
        { email },
        { password },
        {
          new: true,
        }
      );

      res
        .status(200)
        .send({ message: "password updated successfully!", user: userfound });
    }
  } else if (password === "") {
    if (user[0].name === name) {
      res.status(400).send({ error: "cannot update with the same name!" });
    } else {
      const userfound = await User.findOneAndUpdate(
        { email },
        { name },
        {
          new: true,
        }
      );

      res
        .status(200)
        .send({ message: "name updated successfully!", user: userfound });
      console.log(user);
    }
  } else {
    if (user[0].name === name || user[0].password === password) {
      res
        .status(400)
        .send({ error: "cannot update with the same name or password!" });
    } else {
      const userfound = await User.findOneAndUpdate(
        { email },
        { name, password },
        {
          new: true,
        }
      );

      res
        .status(200)
        .send({
          message: "name & password updated successfully!",
          user: userfound,
        });
    }
  }
});

app.listen(process.env.PORT, () => {
  console.log(`app is listening on port ${process.env.PORT}`);
});
