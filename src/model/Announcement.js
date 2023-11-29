
const { Schema, model } = require("mongoose");

const AnnouncementsSchema = new Schema({
  
authorImage:String,
name:String,
email:String,
title:String,
description:String,
postedTime:Date
})

const Announcements = model('Announcements', AnnouncementsSchema);

module.exports = Announcements
