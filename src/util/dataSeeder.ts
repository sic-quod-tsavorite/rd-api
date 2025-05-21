import bcrypt from "bcrypt";
import dotenvFlow from "dotenv-flow";

// Project import
import { duckModel } from "../models/duckModel";
import { userModel } from "../models/userModel";
import { connect, disconnect } from "../repository/database";

dotenvFlow.config();

/**
 * Seed the database with data
 */
export async function seed() {
  try {
    await connect();

    await deleteAllData();
    await seedData();
    console.log("Seeding process completed successfully...");
    process.exit();
  } catch (err) {
    console.log("Error Seeding data." + err);
  } finally {
    await disconnect();
  }
}

/**
 * Delete all data from the database
 */
export async function deleteAllData() {
  await duckModel.deleteMany();
  await userModel.deleteMany();

  console.log("Cleared data successfully...");
}

/**
 * Seed data into the database
 */
export async function seedData() {
  // hash the password
  const salt = await bcrypt.genSalt(10);
  const passwordHash = await bcrypt.hash("12345678", salt);

  const user1 = new userModel();
  user1.name = "Bender Bending Rodríguez";
  user1.email = "shiny@ass.com";
  user1.password = passwordHash;
  await user1.save();

  const user2 = new userModel();
  user2.name = "Flexo";
  user2.email = "not@bender.com";
  user2.password = passwordHash;
  await user2.save();

  const ducks = [
    {
      name: "Duck #1 (made by Bender)",
      description: "Chunky",
      imageURL:
        "https://i.pinimg.com/736x/de/9a/11/de9a11ca199ebd5bb05f99ca5897dfaa.jpg",
      price: 20000,
      onSale: true,
      discountPct: 35,
      isHidden: false,
      _createdBy: user1.id,
    },
    {
      name: "Puck (also made by Bender)",
      description: "This duck is a good boi",
      imageURL:
        "https://external-content.duckduckgo.com/iu/?u=http%3A%2F%2Famsterdamduckstore.com%2Fwp-content%2Fuploads%2F2022%2F08%2FPug-Rubber-Duck-front.jpg&f=1&nofb=1&ipt=eff992eb07eba3aa31172f1a5ead528fbefa73d1f36fd25757cc8285aadf0dd0&ipo=images",
      price: 5,
      onSale: false,
      discountPct: 99,
      isHidden: false,
      _createdBy: user1.id,
    },
    {
      name: "Mignon Rubber Duck (made by Flexo)",
      description: "This duck is pro mechanich",
      imageURL:
        "https://external-content.duckduckgo.com/iu/?u=https%3A%2F%2Famsterdamduckstore.com%2Fwp-content%2Fuploads%2F2016%2F06%2FM-rubber-duck-leaning.jpg&f=1&nofb=1&ipt=b54cda9e4f941688c5314bdac8d069a7663f297f99ec879527110119d2efcd0b&ipo=images",
      price: 2698,
      onSale: false,
      discountPct: 34,
      isHidden: false,
      _createdBy: user2.id,
    },
    {
      name: "Destroyer of worlds (made by Bender)",
      description: "This duck may or may not be evil",
      imageURL:
        "https://media.npr.org/assets/img/2017/06/03/gettyimages-453879976-59801bc8f1f6bda5175c3098bb0d9a28696394be-s1100-c50.jpg",
      price: 3,
      onSale: true,
      discountPct: 13,
      isHidden: false,
      _createdBy: user1.id,
    },
  ];

  await duckModel.insertMany(ducks);

  console.log("Seeded data successfully...");
}

// start the actual seeding
seed();
