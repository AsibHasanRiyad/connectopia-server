var express = require("express");
const Users = require("../../model/users");
// const { createToken } = require("../../api/authentication/controllers");
const verifyToken = require("../../middleware/verifyToken");
var router = express.Router();

//TODO: Verify TOken
router.get("/users", verifyToken, async (req, res) => {
    const email = req.query.email;
    const query = email ? { email: email } : {};
    const result = await Users.find(query)
    res.send(result);
  });
  router.get("/users/:email", async (req, res) => {
    const email = req.params.email;
    const query = { email: email };
    const result = await Users.findOne(query);
    res.send(result);
  });

  router.post("/users", async (req, res) => {
    const user = req.body;
    const query = { email: user?.email };
    const existingUser = await Users.findOne(query);
    if (existingUser) {
      return res.send({ message: "users already exist", insertedId: null });
    }
    // const result = Users.insertOne(user);
    const newUser = new Users(user);
    const result = await newUser.save();
    res.send(result);
  });

  //todo: verify token add..without verify token decoded won't work
  router.get("/users/admin/:email",verifyToken, async (req, res) => {
    const email = req.params.email;
    if (email !== req.decoded.email) {
      return res.status(403).send({ message: "forbidden access" });
    }
    const query = { email: email };
    const user = await Users.findOne(query);
    let admin = false;
    if (user) {
      admin = user?.role === "admin";
    }
    res.send({ admin });
  });

  //make a user admin
  router.patch("/users/:id", async (req, res) => {
    const id = req.params.id;
    const filter = { _id: new ObjectId(id) };
    const updateDoc = {
      $set: {
        role: "admin",
      },
    };
    const result = await Users.findByIdAndUpdate(filter, updateDoc);
    res.send(result);
  });

  module.exports = router