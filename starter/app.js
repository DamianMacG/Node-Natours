const fs = require("fs");
const express = require("express");

const app = express();

//Middleware
app.use(express.json());

// app.get("/", (req, res) => {
//   res
//     .status(200)
//     .json({ message: "Hello World - from the server side!", app: "Natours!" });
// });

// app.post("/", (req, res) => {
//   res.send("I AM A POST");
// });

// BELOW ----- naming it x (previously tours aswell in the GET further down) so we can see the difference between the tours. Best practice is to use tours also. If names are the same you can write a single tours with no colon

const tours = JSON.parse(
  fs.readFileSync(`${__dirname}/dev-data/data/tours-simple.json`)
);

app.get("/api/v1/tours", (req, res) => {
  res.status(200).json({
    status: "success",
    results: tours.length,
    data: {
      tours: tours,
    },
  });
});

app.get("/api/v1/tours/:id", (req, res) => {
  // Below:  you could also multiply req.params.id * 1 - a JS trick
  const id = parseInt(req.params.id);

  // Also below you could use - if (!tour)
  if (id > tours.length) {
    return res.status(404).json({
      status: "fail",
      message: "Invalid ID",
    });
  }

  const tour = tours.find((el) => el.id === id);
  res.status(200).json({
    status: "success",
    data: {
      tour,
    },
  });
});

app.post("/api/v1/tours", (req, res) => {
  const newId = tours[tours.length - 1].id + 1;
  const newTour = Object.assign({ id: newId }, req.body);

  tours.push(newTour);

  fs.writeFile(
    `${__dirname}/dev-data/data/tours-simple.json`,
    JSON.stringify(tours),
    (err) => {
      res.status(201).json({
        status: "success",
        data: {
          tour: newTour,
        },
      });
    }
  );
});

// PUT - Generally for updating entire object
// PATCH - Updates only specific properties

app.patch("/api/v1/tours/:id", (req, res) => {
  const id = parseInt(req.params.id);

  if (id > tours.length) {
    return res.status(404).json({
      status: "fail",
      message: "Invalid ID",
    });
  }

  res.status(200).json({
    status: "success",
    data: {
      tour: "----Updated Tour----",
    },
  });
});

app.delete("/api/v1/tours/:id", (req, res) => {
  const id = parseInt(req.params.id);

  if (id > tours.length) {
    return res.status(404).json({
      status: "fail",
      message: "Invalid ID",
    });
  }

  res.status(204).json({
    status: "success",
    data: null,
  });
});

const port = 3000;
app.listen(port, () => {
  console.log(`App running on port ${port}...`);
});
