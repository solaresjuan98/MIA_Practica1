import { Request, Response } from "express";

// import database
import { connect } from "../database";
import { TempInterface } from "../interfaces/TempInterface";
import { loadData, query_1 } from "../util/queries";

export async function getTemp(req: Request, res: Response): Promise<Response> {
  const connection = await connect();
  const info = await connection.query("SELECT*FROM temp_table");

  return res.json(info[0]);
}

// Charge data from csv file to temp_table
export async function massiveCharge(req: Request, res: Response) {
  const connection = await connect();

  // Executing  massive charge query
  connection.query(loadData);

  return res.json({
    message: "Charge done",
  });
}

// Deleting data from temp table
export async function deleteTemp(req: Request, res: Response) {
  const connection = await connect();

  await connection.query("DELETE FROM temp_table");

  return res.json({
    message: "Temporal table deleted",
  });
}

// Query 1
export async function query1(req: Request, res: Response): Promise<Response> {
  const connection = await connect();
  const info = await connection.query(query_1);

  return res.json(info[0]);
}
