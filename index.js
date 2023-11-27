const express = require("express");
const app = express();
const cors = require("cors");
var jwt = require("jsonwebtoken");
require("dotenv").config();
const { MongoClient, ServerApiVersion, ObjectId } = require("mongodb");
const stripe = require("stripe")(process.env.STRIPE_SECRET_KEY);

// console.log('stripe key',process.env.STRIPE_SECRET_KEY);
const port = process.env.PORT || 5001;

//middleware

app.use(cors());
app.use(express.json());

const uri = `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASS}@cluster0.2x6r8lz.mongodb.net/?retryWrites=true&w=majority`;
// Create a MongoClient with a MongoClientOptions object to set the Stable API version
const client = new MongoClient(uri, {
  serverApi: {
    version: ServerApiVersion.v1,
    strict: true,
    deprecationErrors: true,
  },
});

async function run() {
  try {
    // Connect the client to the server	(optional starting in v4.7)
    await client.connect();

    const userCollection = client.db("connectopia").collection("users");
    const postCollection = client.db("connectopia").collection("post");
    const paymentCollection = client.db("connectopia").collection("payment");
    const announcementCollection = client
      .db("connectopia")
      .collection("announcement");

    //created middleware
    //verify token
    const verifyToken = (req, res, next) => {
      console.log("inside verify token", req.headers.authorization);
      if (!req.headers.authorization) {
        return res.status(401).send({ message: "unauthorized access" });
      }
      const token = req.headers.authorization.split(" ")[1];
      jwt.verify(token, process.env.ACCESS_TOKEN_SECRET, (err, decoded) => {
        if (err) {
          return res.status(401).send({ message: "unauthorized access" });
        }
        req.decoded = decoded;
        next();
      });
    };

    //jwt related api
    app.post("/jwt", async (req, res) => {
      const user = req.body;
      const token = jwt.sign(user, process.env.ACCESS_TOKEN_SECRET, {
        expiresIn: "1h",
      });
      res.send({ token });
    });

    //users related api
    app.get("/users", verifyToken, async (req, res) => {
      const email = req.query.email;
      const query = email ? { email: email } : {};
      const result = await userCollection.find(query).toArray();
      res.send(result);
    });
    app.get("/users/:email", async (req, res) => {
      const email = req.params.email;
      const query = { email: email };
      const result = await userCollection.findOne(query);
      res.send(result);
    });

    app.post("/users", async (req, res) => {
      const user = req.body;
      const query = { email: user?.email };
      const existingUser = await userCollection.findOne(query);
      if (existingUser) {
        return res.send({ message: "users already exist", insertedId: null });
      }
      const result = userCollection.insertOne(user);
      res.send(result);
    });

    //check admin or not
    app.get("/users/admin/:email", verifyToken, async (req, res) => {
      const email = req.params.email;
      if (email !== req.decoded.email) {
        return res.status(403).send({ message: "forbidden access" });
      }
      const query = { email: email };
      const user = await userCollection.findOne(query);
      let admin = false;
      if (user) {
        admin = user?.role === "admin";
      }
      res.send({ admin });
    });

    //make a user admin
    app.patch("/users/:id", async (req, res) => {
      const id = req.params.id;
      const filter = { _id: new ObjectId(id) };
      const updateDoc = {
        $set: {
          role: "admin",
        },
      };
      const result = await userCollection.updateOne(filter, updateDoc);
      res.send(result);
    });

    // post related api
    app.get("/post", async (req, res) => {
      const email = req.query.email;
      console.log("pagination", req.query);
      const query = email ? { email: email } : {};
      const page = parseInt(req.query.page);
      const size = parseInt(req.query.size);
      console.log(page, size);
      const result = await postCollection
        .find()
        .skip(page * size)
        .limit(size)
        .toArray();
      res.send(result);
    });

    // total number of post
    app.get("/postCount", async (req, res) => {
      const count = await postCollection.estimatedDocumentCount();
      res.send({ count });
    });

    app.post("/post", async (req, res) => {
      const data = req.body;
      const result = await postCollection.insertOne(data);
      res.send(result);
    });

    //individual post routes
    app.get("/post/:id", async (req, res) => {
      const id = req.params.id;
      const filter = { _id: new ObjectId(id) };
      const result = await postCollection.findOne(filter);
      res.send(result);
    });
    app.delete("/post/:id", async (req, res) => {
      const id = req.params.id;
      const filter = { _id: new ObjectId(id) };
      const result = await postCollection.deleteOne(filter);
      res.send(result);
    });

    //make announcement api
    app.get("/announcement", async (req, res) => {
      const result = await announcementCollection.find().toArray();
      res.send(result);
    });
    app.post("/announcement", async (req, res) => {
      const data = req.body;
      const result = await announcementCollection.insertOne(data);
      res.send(result);
    });

    //payment intent
    app.post("/create-payment-intent", async (req, res) => {
      const { price } = req.body;
      const amount = parseInt(price * 100);
      const paymentIntent = await stripe.paymentIntents.create({
        amount: amount,
        currency: "usd",
        payment_method_types: ["card"],
      });
      res.send({ clientSecret: paymentIntent.client_secret });
    });

    app.post("/payments", async (req, res) => {
      const payment = req.body;
      const result = await paymentCollection.insertOne(payment);
      //update user data
      const query = { email: payment.email };
      const updateDoc = {
        $set: {
          status: "Gold",
        },
      };
      const updateUserStatus = await userCollection.updateOne(query, updateDoc);
      res.send({ result, updateUserStatus });
    });

    // Send a ping to confirm a successful connection
    // await client.db("admin").command({ ping: 1 });
    // console.log(
    //   "Pinged your deployment. You successfully connected to MongoDB!"
    // );
  } finally {
    // Ensures that the client will close when you finish/error
    // await client.close();
  }
}
run().catch(console.dir);

app.get("/", (req, res) => {
  res.send("Connectopia server is running");
});

app.listen(port, () => {
  console.log(`Connectopia server is running on port:${port}`);
});
