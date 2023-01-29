const mongoose = require("mongoose");

const CategoryList = new mongoose.Schema(
  {
    category: {
      type: String,
      required: [true, "Create any category"],
    },

    user: {
      type: mongoose.Schema.ObjectId,
      ref: "User",
      required: true,
    },

    // add createdAt and updatedAt
    createdAt: {
      type: Date,
      default: Date.now,
    },
  },
  { timeseries: true }
);
// },{timeseries:true})

module.exports = mongoose.model("category", CategoryList);
