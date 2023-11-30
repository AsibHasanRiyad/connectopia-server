const cors = require("cors");
const express = require("express");
const { LOCAL_CLIENT, CLIENT } = require("../config/default");
const applyMiddleware = (app) =>{
    app.use(cors({
        origin: [
            LOCAL_CLIENT, CLIENT, 'https://connectopia-9e807.web.app'
        ],
        credentials: true
    }));
    app.use(express.json());
    
}

module.exports= applyMiddleware