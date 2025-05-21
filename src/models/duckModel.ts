import { Schema, model } from "mongoose";
import { Duck } from "../interfaces/rubberDuck";

/**
 * Define the Duck schema for ts
 */
const duckSchema = new Schema<Duck>({
  name: { type: String, required: true, min: 10, max: 100 },
  description: { type: String, required: false, min: 10, max: 255 },
  imageURL: { type: String, required: true },
  price: { type: Number, required: true },
  onSale: { type: Boolean, required: true, default: false },
  discountPct: { type: Number, required: false, default: 0, min: 0, max: 100 },
  isHidden: { type: Boolean, required: true, default: false },
  _createdBy: { type: String, ref: "User", required: true },
});

export const duckModel = model<Duck>("Duck", duckSchema);

/**
 * Handle duck version for db (when updating an already existing duck)
 */
type UpdateQuery<T> = {
  [key: string]: unknown;
} & {
  __v?: number;
  $set?: Partial<T> & { __v?: number };
  $setOnInsert?: Partial<T> & { __v?: number };
  $inc?: { __v?: number };
};

/**
 * Duck version control for when it gets updated
 */
duckSchema.pre("findOneAndUpdate", function <T extends Document>(this: any) {
  const update = this.getUpdate() as UpdateQuery<T>;
  if (update.__v != null) {
    delete update.__v;
  }
  const keys: Array<"$set" | "$setOnInsert"> = ["$set", "$setOnInsert"];
  for (const key of keys) {
    if (update[key] != null && update[key]!.__v != null) {
      delete update[key]!.__v;
      if (Object.keys(update[key]!).length === 0) {
        delete update[key];
      }
    }
  }
  update.$inc = update.$inc || {};
  update.$inc.__v = 1;
});
