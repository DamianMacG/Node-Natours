const mongoose = require("mongoose");
const slugify = require("slugify");
const validator = require("validator");

const tourSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, "A tour must have a name"],
      unique: true,
      trim: true,
      maxlength: [40, "Must have less or equal to 40 characters"],
      minlength: [10, "Must have minimum 10 characters"],
      // validate: [validator.isAlpha, "Tour name must only contain characters"],
    },
    slug: {
      type: String,
    },
    duration: {
      type: Number,
      required: [true, "A tour must have a duration"],
    },
    maxGroupSize: {
      type: Number,
      required: [true, "A tour must have a group size"],
    },
    difficulty: {
      type: String,
      required: [true, "A tour must have a difficulty"],
      // enum is only for strings
      enum: {
        values: ["easy", "medium", "difficult"],
        message: "Difficulty is: easy, medium or difficult",
      },
    },
    ratingsAverage: {
      type: Number,
      default: 4.5,
      min: [1, "Rating must be above or equal to 1"],
      max: [5, "Must be below or equal to 5"],
    },
    ratingsQuantity: {
      type: Number,
      default: 0,
    },
    price: {
      type: Number,
      required: [true, "A tour must have a price"],
    },
    priceDiscount: {
      type: Number,
      validate: {
        validator: function (val) {
          // this only points to current doc on NEW document created
          return val < this.price;
        },
        message: "Discount should be less than full price",
      },
    },
    summary: {
      type: String,
      trim: true,
      // required: [true, "A tour must have a price discount"]
    },
    description: {
      type: String,
      trim: true,
      // required: [true, "A tour must have a description"],
    },
    imageCover: {
      type: String,
      required: [true, "A tour must have a cover image"],
    },
    images: [String],
    createdAt: {
      type: Date,
      default: Date.now(),
      select: false,
    },
    startDates: [Date],
    secretTour: {
      type: Boolean,
      default: false,
    },
  },
  {
    toJSON: { virtuals: true },
    toObject: { virtuals: true },
  }
);

tourSchema.virtual("durationWeeks").get(function () {
  return this.duration / 7;
});

// DOCUMENT MIDDLEWARE: runs before .save() and .create()
tourSchema.pre("save", function (next) {
  this.slug = slugify(this.name, { lower: true });
  next();
});

// tourSchema.pre("save", function (next) {
//   console.log("Will save document...");
//   next();
// });

// //Has access to the document just posted i.e. doc
// tourSchema.post("save", function (doc, next) {
//   console.log(doc);
//   next();
// });

// QUERY MIDDLEWARE
tourSchema.pre(/^find/, function (next) {
  // tourSchema.pre("find", function (next) {
  this.find({ secretTour: { $ne: true } });
  this.start = Date.now();
  next();
});
tourSchema.post(/^find/, function (docs, next) {
  // tourSchema.pre("find", function (next) {
  // console.log(`Query took ${Date.now() - this.start} milliseconds`);
  next();
});

// AGGREGATION MIDDLEWARE
tourSchema.pre("aggregate", function (next) {
  this.pipeline().unshift({
    $match: { secretTour: { $ne: true } },
  });
  console.log(this.pipeline());
  next();
});

// Capital first letter for models
const Tour = mongoose.model("Tour", tourSchema);

module.exports = Tour;
