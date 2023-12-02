const fs = require("fs");
const express = require("express");

const app = express();

// app.get("/", (req, res) => {
//   res
//     .status(200)
//     .json({ message: "Hello World - from the server side!", app: "Natours!" });
// });

// app.post("/", (req, res) => {
//   res.send("I AM A POST");
// });

// BELOW ----- naming it x (previously tours aswell in the GET further down) so we can see the difference between the tours. Best practice is to use tours also. If names are the same you can write a single tours with no colon

const x = JSON.parse(
  fs.readFileSync(`${__dirname}/dev-data/data/tours-simple.json`)
);

app.get("/api/v1/tours", (req, res) => {
  res.status(200).json({
    status: "success",
    data: {
      tours: x,
    },
  });
});

const port = 3000;
app.listen(port, () => {
  console.log(`App running on port ${port}...`);
});
