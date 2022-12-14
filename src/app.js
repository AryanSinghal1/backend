const express = require("express");
const fs = require("fs");
const axios = require("axios").default;
require("./conn/conn");
const newsSchema = require("./model/model");
const app = express();
const port = process.env.PORT || 8000;
var cron = require('node-cron');
// import fetch from 'node-fetch'
app.all("/*", function (req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "X-Requested-With");
  next();
});
var a = "0"
const getPosts = async () => {
  const Topics = [
    "top",
    "business",
    "science",
    "entertainment",
    "health",
    "politics",
    "sports",
    "technology",
    "world",
  ];
  Topics.map((e) => {
    axios
      .get(
        `https://newsdata.io/api/1/news?apikey=pub_930227b420d2d7e030700ff57726ca453f8a&country=in&language=en&category=${e}`
      )
      .then(async (res) => {
        const newsArray = res.data.results;
        for (i = 0; i < newsArray.length; i++) {
          const newsData = new newsSchema({
            heading: newsArray[i].title,
            news: newsArray[i].content,
            newsUrl: newsArray[i].link,
            newsDate: newsArray[i].pubDate,
            imageUrl: newsArray[i].image_url,
            source: newsArray[i].source_id,
            category: newsArray[i].category[0],
          });
          try{
          await newsData.save();
          }catch{(e)=>{
            console.log(e)
            // a = a+"1"
            // console.log(a)
          }
        }
        }
      })
      .catch((e) => {
        console.log(e);
      });
    });
};
var count = "0"
const getCount=()=>{
  count=count+"1"
} 
app.get("/", (req, resp) => {
  // resp.send("Hello World");
  resp.send(count+"This is data"+a);
});
setInterval(() => {
    getPosts();
    getCount();
  }, 270000);
//   cron.schedule('*/1 * * * *', () => {
//     console.log('running a task every two minutes');
//     getPosts();
//     getCount();
// });
app.get("/sumarize", (req, res) => {
  data = {};
  fs.readFile("data.json", (err, fd) => {
    if (err) {
      console.log(err);
      res.send(err);
    } else {
      res.send(fd);
    }
  });
});

app.listen(port, () => {
  console.log("Server is running on port 8000");
});

// 155c1629e9894008b694cc584a348551
