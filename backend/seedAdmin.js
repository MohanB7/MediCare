const mongoose = require("mongoose");
const User = require("./Models/user");
require("dotenv").config();

mongoose.connect(process.env.MONGODB_URI)
  .then(async () => {
    console.log("Connected to MongoDB for seeding...");
    
    const adminEmail = "admin@medicareplus.com";
    const existingAdmin = await User.findOne({ email: adminEmail });
    
    if (existingAdmin) {
      console.log("Admin user already exists!");
      console.log(`Email: ${adminEmail}`);
      console.log(`Password: ${existingAdmin.password}`);
    } else {
      const newAdmin = await User.create({
        fullName: "System Admin",
        email: adminEmail,
        tel: 1234567890,
        password: "password123",
        confirmPassword: "password123",
        role: "admin"
      });
      console.log("Admin user successfully created!");
      console.log(`Email: ${newAdmin.email}`);
      console.log(`Password: ${newAdmin.password}`);
    }
    
    mongoose.connection.close();
  })
  .catch(err => {
    console.error(err);
    mongoose.connection.close();
  });
