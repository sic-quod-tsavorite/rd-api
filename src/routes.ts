import { Router, Request, Response } from "express";
import {
  createDuck,
  getAllDucks,
  getDucksById,
  updateDuckById,
  deleteDuckById,
  getDucksByQuery,
} from "./controllers/duckController";
import {
  loginUser,
  registerUser,
  verifyToken,
} from "./controllers/authController";
import { startCron } from "./controllers/devToolsController";

const router: Router = Router();

/**
 * @swagger
 * /:
 *  get:
 *    tags:
 *      - App Routes
 *    summary: Health check
 *    description: Basic route to check if the api is running
 *    responses:
 *      200:
 *        description: Server up and running.
 */
router.get("/", (req: Request, res: Response) => {
  res.status(200).send({ message: "Welcome to the RD-API" });
});

// Dev tool
router.get("/start-cron", startCron);

// Auth routes
/**
 * @swagger
 * /user/register:
 *   post:
 *     tags:
 *       - User Routes
 *     summary: Register a new user
 *     description: Takes a user in the body and tries to register it in the database
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: "#/components/schemas/User"
 *     responses:
 *       201:
 *         description: User created succesfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 error:
 *                   type: string
 *                 _id:
 *                   type: string
 */
router.post("/user/register", registerUser);

/**
 * @swagger
 * /user/login:
 *   post:
 *     tags:
 *       - User Routes
 *     summary: Login a user
 *     description: Takes a user in the body and tries to login
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: "#/components/schemas/User"
 *     responses:
 *       200:
 *         description: User logged in successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 token:
 *                   type: string
 */
router.post("/user/login", loginUser);

// Rubber duck routes
//- create
/**
 * @swagger
 * /rubber-ducks:
 *   post:
 *     tags:
 *       - Duck Routes
 *     summary: Create a new Duck
 *     description: Creates a new Duck
 *     security:
 *       - ApiKeyAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: "#/components/schemas/Duck"
 *     responses:
 *       201:
 *         description: Duck created successfully
 *         content:
 *           application/json:
 *             schema:
 *               $ref: "#/components/schemas/Duck"
 */
router.post("/rubber-ducks", verifyToken, createDuck);

//- gets all rubber ducks
/**
 * @swagger
 * /rubber-ducks:
 *   get:
 *     tags:
 *       - Duck Routes
 *     summary: Get all Ducks
 *     description: Retrieves all Ducks
 *     responses:
 *       200:
 *         description: A list of Ducks
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: "#/components/schemas/Duck"
 */
router.get("/rubber-ducks", getAllDucks);

//- get a rubber duck by its id
/**
 * @swagger
 * /rubber-ducks/{id}:
 *   get:
 *     tags:
 *       - Duck Routes
 *     summary: Get a Duck by ID
 *     description: Retrieves a Duck by its ID
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: ID of the Duck
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: A Duck object
 *         content:
 *           application/json:
 *             schema:
 *               $ref: "#/components/schemas/Duck"
 */
router.get("/rubber-ducks/:id", getDucksById);

//- get rubber ducks by a query
/**
 * @swagger
 * /rubber-ducks/query/{key}/{val}:
 *   get:
 *     tags:
 *       - Duck Routes
 *     summary: Get Ducks by query
 *     description: Retrieves Ducks by a query
 *     parameters:
 *       - in: path
 *         name: key
 *         required: true
 *         description: Query key
 *         schema:
 *           type: string
 *       - in: path
 *         name: val
 *         required: true
 *         description: Query value
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: A list of Ducks
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: "#/components/schemas/Duck"
 */
router.get("/rubber-ducks/query/:key/:val", getDucksByQuery);

//- update
/**
 * @swagger
 * /rubber-ducks/{id}:
 *   put:
 *     tags:
 *       - Duck Routes
 *     summary: Updates a specific Duck
 *     description: Updates a specific Duck based on its id
 *     security:
 *       - ApiKeyAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: ID from repository
 *         schema:
 *           type: string
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: "#/components/schemas/Duck"
 *
 *     responses:
 *       200:
 *         description: Duck updated succesfully
 *         content:
 *           application/json:
 *             schema:
 *               $ref: "#/components/schemas/Duck"
 */
router.put("/rubber-ducks/:id", verifyToken, updateDuckById);

//- delete
/**
 * @swagger
 * /rubber-ducks/{id}:
 *   delete:
 *     tags:
 *       - Duck Routes
 *     summary: Deletes a specific Duck
 *     description: Deletes a specific Duck based on its id
 *     security:
 *       - ApiKeyAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: ID from repository
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Duck deleted successfully
 */
router.delete("/rubber-ducks/:id", verifyToken, deleteDuckById);

export default router;
