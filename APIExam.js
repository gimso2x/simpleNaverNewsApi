var express = require("express");
var cors = require("cors");
var app = express();
var client_id = "XtPt0fxIipb4QdIHlTA7"; //개발자센터에서 발급받은 Client ID
var client_secret = "lEOqGqpd3v"; //개발자센터에서 발급받은 Client Secret
var query = "금융경제";
// CORS 설정
app.use(cors());

app.get("/news", function (req, res) {
  var api_url = "https://openapi.naver.com/v1/search/news.json";
  var request = require("request");
  var options = {
    url: `${api_url}?query=${encodeURI(query)}?start=${req._parsedUrl.query}`,
    headers: {
      "X-Naver-Client-Id": client_id,
      "X-Naver-Client-Secret": client_secret,
    },
  };
  request.get(options, function (error, response, body) {
    if (!error && response.statusCode == 200) {
      res.writeHead(200, { "Content-Type": "text/json;charset=utf-8" });
      res.end(body);
    } else {
      console.log("error");
      if (response != null) {
        res.status(response.statusCode).end();
        console.log("error = " + response.statusCode);
      }
    }
  });
});
app.listen(3000, function () {
  console.log("http://127.0.0.1:3000/translate app listening on port 3000!");
});
