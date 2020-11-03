const express = require("express");
const app = express();

app.use(express.static("./dist/spotify-music-search"));
app.get("/*", function (req, res) {
  res.sendFile("index.html", { root: "./dist/spotify-music-search/" });
});
app.listen(process.env.PORT || 8080);
