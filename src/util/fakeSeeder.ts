import bcrypt from "bcrypt";
import dotenvFlow from "dotenv-flow";

// Project import
import { duckModel } from "../models/duckModel";
import { userModel } from "../models/userModel";
import { connect, disconnect } from "../repository/database";

import { faker } from "@faker-js/faker";

dotenvFlow.config();

/**
 * Seed the database with data (using faker-js for the ducks)
 */
export async function fakeSeed() {
  try {
    await connect();

    await deleteAllData();
    await fakeData();
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
 * Seed data into the database (using faker-js for the ducks)
 */
export async function fakeData() {
  // hash the password
  const salt = await bcrypt.genSalt(10);
  const passwordHash = await bcrypt.hash("12345678", salt);

  const user3 = new userModel();
  user3.name = faker.person.fullName();
  user3.email = faker.internet.email();
  user3.password = passwordHash;
  await user3.save();

  // loop for how many ducks gets created
  for (let i = 0; i < 5; i++) {
    await new duckModel({
      name: faker.animal.petName(),
      description: faker.company.buzzPhrase(),
      imageURL:
        "https://i.pinimg.com/736x/de/9a/11/de9a11ca199ebd5bb05f99ca5897dfaa.jpg",
      price: faker.commerce.price({ min: 5, max: 5000 }),
      onSale: faker.datatype.boolean(0.5),
      discountPct: faker.number.int({ min: 0, max: 100 }),
      isHidden: false,
      _createdBy: user3.id,
    }).save();
  }

  console.log("Seeded fake data successfully...");
}

// start the actual seeding
fakeSeed();
