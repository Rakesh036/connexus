const mongoose = require("mongoose");
const initData = require("./data.js");

// const Listing = require("../models/listing.js");
const Listing = require("../models/listing.js");
// const MONGO_URL = process.env.MONGODB_URL;
const MONGO_URL =
  "mongodb+srv://connexus:8OkBfZhbtEqkwe5Z@cluster0.0rxh1.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0";

main()
  .then(() => {
    console.log("connected to DB");
  })
  .catch((err) => {
    console.log(err);
  });
async function main() {
  console.log("try to connect mongodb");
  
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
  console.log("start");
  
  await Listing.deleteMany({});
  initData.data = initData.data.map((obj) => ({
    ...obj,
    owner: "66d9a26220baccb632154580",
  }));
  await Listing.insertMany(initData.data);
  console.log("DB initialized");
};

// call this fn to initialised listing
initDB();
