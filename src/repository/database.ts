import mongoose from "mongoose";

/**
 * Test connection to the database
 */
export async function testConnection() {
  try {
    await connect();
    await disconnect();
    //console.log("Database connection test successful");
  } catch (error) {
    console.log("Error testing connection to database: ", error);
  }
}

// Connect to db function
export async function connect() {
  try {
    if (!process.env.DBHOST) {
      throw new Error("DBHOST not found in env");
    }
    await mongoose.connect(process.env.DBHOST);

    if (mongoose.connection.db) {
      await mongoose.connection.db.admin().command({ ping: 1 });
      //console.log("Database connection successful");
    } else {
      throw new Error("Database connection failed");
    }
  } catch (error) {
    console.log("Error connecting to database: ", error);
  }
}

// Disconnect from db function
export async function disconnect() {
  try {
    await mongoose.disconnect();
    //console.log("Database disconnected");
  } catch (error) {
    console.log("Error disconnecting from database: ", error);
  }
}
