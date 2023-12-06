const dotenv = require("dotenv");
const mongoose = require("mongoose");
const app = require("./app");

dotenv.config({ path: "./config.env" });

const DB = process.env.DATABASE.replace(
  "<password>",
  process.env.DATABASE_PASSWORD
);

mongoose
  .connect(DB, {
    useNewUrlParser: true,
    useCreateIndex: true,
    useFindAndModify: false,
    useUnifiedTopology: true,
  })
  .then(() => {
    console.log("---------- SUCCESS!!! ----------");
  });

const tourSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, "A tour must have a name"],
    unique: true,
  },
  rating: {
    type: Number,
    default: 4.5,
  },
  price: {
    type: Number,
    required: [true, "A tour must have a price"],
  },
});

// Capital first letter for models
const Tour = mongoose.model("Tour", tourSchema);

// Instance of Tour model above
const testTour = new Tour({
  name: "The Forest Hiker",
  rating: 4.7,
  price: 497,
});

// Saves document to the database
testTour
  .save()
  .then((document) => {
    console.log(document);
  })
  .catch((err) => {
    console.log("ERROR IN CATCH ---> ", err);
  });

const port = process.env.PORT || 3000;
app.listen(port, () => {
  console.log(`App running on port ${port}...`);
});
