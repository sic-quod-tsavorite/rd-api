process.env.NODE_ENV = "local";

import { test } from "@playwright/test";
import health from "./health.test";
import userTestCollection from "./user.test";
import getItemTest from "./getItems.test";
import createItemTest from "./new-item.test";

import { userModel } from "../src/models/userModel";
import { duckModel } from "../src/models/duckModel";

import dotenvFlow from "dotenv-flow";
import { connect, disconnect } from "../src/repository/database";

dotenvFlow.config();

function setup() {
  // beforeEach clear test database
  test.beforeEach(async () => {
    try {
      await connect();
      await userModel.deleteMany({});
      //await duckModel.deleteMany({});
    } finally {
      await disconnect();
    }
  });
  // afterAll clear the test database
  test.afterAll(async () => {
    try {
      await connect();
      await userModel.deleteMany({});
      await duckModel.deleteMany({});
    } finally {
      await disconnect();
    }
  });
}

setup();

test.describe(health);
test.describe(userTestCollection);

test.describe(getItemTest);

/* Create item test, expect fail when token verification enabled in routes */
test.describe(createItemTest);
