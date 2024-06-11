const { sampledata } = require("./data.js");
const mongoose = require("mongoose");
const Items = require("../models/Item.js");

const DB_URL = "mongodb://127.0.0.1:27017/shopit";

main()
  .then(console.log("DB CONNECTED"))
  .catch((err) => {
    console.log(err);
  });

async function main() {
  await mongoose.connect(DB_URL);
}

let insertData = async () => {
  let result = await Items.insertMany(sampledata);
  console.log("Data inserted successfully");
};

insertData();
