import { Request, Response } from "express";
import { duckModel } from "../models/duckModel";
import { connect, disconnect } from "../repository/database";

// CRUD - create, read/get, update, delete
/**
 * Creates a new rubber duck in the data source based on the request body
 * @param req
 * @param res
 */
export async function createDuck(req: Request, res: Response): Promise<void> {
  const date = req.body;

  try {
    await connect();

    const duck = new duckModel(date);
    const result = await duck.save();

    res.status(201).send(result);
  } catch (err) {
    res.status(500).send("Error creating duck. Error: " + err);
  } finally {
    await disconnect();
  }
}

/**
 * Retrieves all rubber ducks from the data source
 * @param req
 * @param res
 */
export async function getAllDucks(req: Request, res: Response) {
  try {
    await connect();

    const result = await duckModel.find({});

    res.status(200).send(result);
  } catch (err) {
    res.status(500).send("Error retrieving rubber ducks. Error: " + err);
  } finally {
    await disconnect();
  }
}

/**
 * Retrieves a rubber duck by its id from the data source
 * @param req
 * @param res
 */
export async function getDucksById(req: Request, res: Response) {
  try {
    await connect();

    const id = req.params.id; // get the id from the request
    const result = await duckModel.findById(id);

    res.status(200).send(result);
  } catch (err) {
    res.status(500).send("Error retrieving rubber duck by id. Error: " + err);
  } finally {
    await disconnect();
  }
}

/**
 * Update a rubber duck by its id from the data source
 * @param req
 * @param res
 */
export async function updateDuckById(req: Request, res: Response) {
  const id = req.params.id;
  try {
    await connect();

    const result = await duckModel.findByIdAndUpdate(id, req.body);
    if (!result) {
      res.status(404).send("Cannot find rubber duck with id: " + id);
    } else {
      res.status(200).send("Rubber duck updated successfully.");
    }
  } catch (err) {
    res.status(500).send("Error updating rubber duck by id. Error: " + err);
  } finally {
    await disconnect();
  }
}

/**
 * Delete a rubber duck by its id from the data source
 * @param req
 * @param res
 */
export async function deleteDuckById(req: Request, res: Response) {
  const id = req.params.id;
  try {
    await connect();

    const result = await duckModel.findByIdAndDelete(id);
    if (!result) {
      res.status(404).send("Cannot delete rubber duck with id: " + id);
    } else {
      res.status(200).send("Rubber duck successfully deleted.");
    }
  } catch (err) {
    res.status(500).send("Error deleting rubber duck by id. Error: " + err);
  } finally {
    await disconnect();
  }
}

/**
 * Retrieves a rubber duck with a query from the data source
 * @param req
 * @param res
 */
export async function getDucksByQuery(req: Request, res: Response) {
  const key = req.params.key;
  const val = req.params.val;

  try {
    await connect();

    const result = await duckModel.find({
      [key]: { $regex: val, $options: "i" },
    });

    res.status(200).send(result);
  } catch (err) {
    res
      .status(500)
      .send("Error retrieving rubber duck with the query. Error: " + err);
  } finally {
    await disconnect();
  }
}
