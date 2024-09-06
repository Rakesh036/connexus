const mongoose = require("mongoose");
const initData = require("./datagroup.js");

// const Listing = require("../models/listing.js");
const Job=require("../models/group.js");
const MONGO_URL = "mongodb://127.0.0.1:27017/wanderlust";
main()
  .then(() => {
    console.log("connected to DB");
  })
  .catch((err) => {
    console.log(err);
  });
async function main() {
  await mongoose.connect(MONGO_URL);
}

// const initDB = async () => {
//   await Listing.deleteMany({});
//   initData.data = initData.data.map((obj) => ({
//     ...obj,
//     owner: "66d3d8a4da50f1a8bb131b03",
//   }));
//   await Listing.insertMany(initData.data);
//   console.log("DB initialized");
// };

const initDB = async () => {
  await Job.deleteMany({});
  initData.data = initData.data.map((obj) => ({
    ...obj,
    owner: "66d3d8a4da50f1a8bb131b03",
  }));
  await Job.insertMany(initData.data);
  console.log("DB initialized");
};

// call this fn to initialised listing
initDB();


