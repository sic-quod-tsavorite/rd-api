import { User } from "./user";

export interface Duck extends Document {
  name: string;
  aboutDuck: string;
  imageURL: string;
  netWorth: number;
  isDank: boolean;
  cutenessPct: number;
  isHidden: boolean;
  _createdBy: User["id"];
}
