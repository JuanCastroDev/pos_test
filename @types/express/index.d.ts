import { IEmployee } from "../../src/types/database";

declare global {
  namespace Express {
    interface Request {
      user?: IEmployee;
    }
  }
}