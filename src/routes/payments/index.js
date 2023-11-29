


var express = require("express");
const Payments = require("../../model/Payments");
const Users = require("../../model/users");
var router = express.Router();
const stripe = require("stripe")(process.env.STRIPE_SECRET_KEY);

router.post("/create-payment-intent", async (req, res) => {
    const { price } = req.body;
    const amount = parseInt(price * 100);
    const paymentIntent = await stripe.paymentIntents.create({
      amount: amount,
      currency: "usd",
      payment_method_types: ["card"],
    });
    res.send({ clientSecret: paymentIntent.client_secret });
  });

  router.post("/payments", async (req, res) => {
    const payment = req.body;
    const result = await Payments.create(payment);
    //update user data
    const query = { email: payment.email };
    const updateDoc = {
      $set: {
        status: "Gold",
      },
    };
    const updateUserStatus = await Users.updateOne(query, updateDoc);
    res.send({ result, updateUserStatus });
  });


  module.exports = router