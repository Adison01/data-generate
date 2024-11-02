import express from "express";
import mongoose from "mongoose";
import {Product} from "./model.js";
import {faker} from "@faker-js/faker";
// import cors from "cors";
// import pkg from 'mongoose-seeder';
// const seeder = require('mongoose-seeder');
// import {seeder} from 'mongoose-seeder'
// const {seeder} = pkg;

const app = express();
const PORT = 5000;

app.use(express.json());

app.get('/', (req, res)=>{
    res.send("hello world !!")
})

mongoose.connect("mongodb+srv://adisonsalauddin:MfySiJF76cj1JD6l@cluster0.4pzle.mongodb.net/myProject?retryWrites=true&w=majority&appName=Cluster0")
.then(()=>{
    console.log("connected to database")
}).catch((e)=>{console.log("Not connected : " +e.message)})

const seed_count = 0;

let timeSeriesData = [];
// create 5000 fake data
for (let i = 0; i < seed_count; i++) {
    const name = faker.name.firstName();
    const price = faker.commerce.price()
    timeSeriesData.push({ name, price });
}

async function seedDatabase() {
    try {
      // Clear existing data
      await Product.deleteMany({}); 
      // Insert seed data
      await Product.insertMany(timeSeriesData);
      console.log('Database seeded successfully!');
    } catch (error) {
      console.error('Error seeding database:', error);
    }
  }
  
  seedDatabase();

app.post("/api/products", async (req, res) => {
    try {
      const product = await Product.create(req.body);
      res.status(200).json(product);
    } catch (e) {
      res.status(500).json({ message: e.message });
    }
  });


app.listen(PORT, (req, res) => {
  console.log("listening from 5000");
});

