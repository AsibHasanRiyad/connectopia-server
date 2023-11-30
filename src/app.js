//TODO: change package.json start: "node src/app.js"

const express = require("express");
const applyMiddleware = require("./middleware/applyMiddleware");
require("dotenv").config();
// var jwt = require("jsonwebtoken");
const connectDB = require("./db/connectDB");
const app = express();
const port = process.env.PORT || 5001;


const authenticationRoutes = require ('./routes/authentication/index')
const postRoutes = require('./routes/post/index')
const tagsRoutes = require('./routes/tags/index')
const usersRoutes = require('./routes/users/index')
const commentsRoutes = require('./routes/comments/index')
const announcementRoutes = require('./routes/announcement/index')
const postCount = require('./routes/postCount/index')
const commentsCount = require('./routes/commentCount/index');
const usersCount = require('./routes/UsersCount/index')
const paymentCollection = require('./routes/payments/index')
const myPostCount = require('./routes/myPostCount/index')


applyMiddleware(app)


app.use(authenticationRoutes)
app.use(postRoutes)
app.use(tagsRoutes)
app.use(usersRoutes)
app.use(commentsRoutes)
app.use(announcementRoutes)
app.use(postCount)
app.use(commentsCount)
app.use(usersCount)
app.use(paymentCollection)
app.use(myPostCount)











app.get("/health", (req, res) => {
    res.send("Connectopia Health Check");
  });


  app.all('*', (req, res, next) =>{
    const error = new Error (`The requested ulr [${req.url}] id invalid `)
    error.status = 404
    next(error)
  })

  app.use((err, req, res, next) =>{
    res.status(err.status || 500).json({
        message:err.message
    })
  })
  
//  const main = async () =>{
//   await connectDB()
//   app.listen(port, () => {
//     console.log(`Connectopia server is running on port:${port}`);
//   });
//  }

//  main()

module.exports = app