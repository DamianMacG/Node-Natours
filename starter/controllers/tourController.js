const Tour = require("./../models/tourModel");

exports.checkBody = (req, res, next) => {
  console.log(req.body.name);
  console.log(req.body.price);

  if (!req.body.name || !req.body.price) {
    return res.status(400).json({
      status: "fail",
      message: "Missing name or price",
    });
  }
  next();
};

exports.getAllTours = (req, res) => {
  res.status(200).json({
    status: "success",
    // results: tours.length,
    // data: {
    //   tours: tours,
    // },
  });
};

exports.getTour = (req, res) => {
  const id = parseInt(req.params.id);
  // const tour = tours.find((el) => el.id === id);
  // res.status(200).json({
  //   status: "success",
  //   data: {
  //     tour,
  //   },
  // });
};

exports.createTour = (req, res) => {
  res.status(201).json({
    status: "success",
    // data: {
    //   tour: newTour,
    // },
  });
};

exports.updateTour = (req, res) => {
  res.status(200).json({
    status: "success",
    data: {
      tour: "----Updated Tour----",
    },
  });
};

exports.deleteTour = (req, res) => {
  const id = parseInt(req.params.id);

  res.status(204).json({
    status: "success",
    data: null,
  });
};
