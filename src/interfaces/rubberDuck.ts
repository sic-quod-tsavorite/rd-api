import { User } from "./user";

export interface Duck extends Document {
  name: string;
  description: string;
  imageURL: string;
  price: number;
  onSale: boolean;
  discountPct: number;
  isHidden: boolean;
  _createdBy: User["id"];
}
