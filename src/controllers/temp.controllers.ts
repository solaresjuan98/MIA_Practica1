import { Request, Response } from "express";

// import database
import { connect } from "../database";
//import moduleName from '../interfaces/'

export function getTemp(req: Request, res: Response): Response {
  return res.json("Temp table");
}

// Charge data from csv file to temp_table
export function massiveCharge(req: Request, res: Response) {
  return res.json({
    message: "Charge done",
  });
}
