const mongoose = require("mongoose");
const initData = require("./datagroup.js");
// require("dotenv").config();
// const Listing = require("../models/listing.js");
const Group = require("../models/group.js");
// const MONGO_URL = process.env.MONGODB_URL;
// const MONGO_URL =
  // "mongodb+srv://connexus:8OkBfZhbtEqkwe5Z@cluster0.0rxh1.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0";


  
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
  await Group.deleteMany({});
  initData.data = initData.data.map((obj) => ({
    ...obj,
    owner: "66e585d17d7bc95fe6c0e13c",
  }));
  await Group.insertMany(initData.data);
  console.log("DB initialized");
};

// call this fn to initialised listing
initDB();
