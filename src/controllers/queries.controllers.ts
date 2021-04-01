import { Request, Response } from "express";

// import database
import { connect } from "../database";
// import { TempInterface } from "../interfaces/TempInterface";
import {
  loadData,
  query_1,
  query_2,
  query_3,
  query_4,
  query_5,
  query_7,
  query_9,
} from "../util/queries";

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

// Query 2
export async function query2(req: Request, res: Response): Promise<Response> {
  const connection = await connect();
  const info = await connection.query(query_2);

  return res.json(info[0]);
}

// Query 3
export async function query3(req: Request, res: Response): Promise<Response> {
  const connection = await connect();
  const info = await connection.query(query_3);

  return res.json(info[0]);
}

// Query 4
export async function query4(req: Request, res: Response): Promise<Response> {
  const connetion = await connect();
  const info = await connetion.query(query_4);

  return res.json(info[0]);
}

// Query 5
export async function query5(req: Request, res: Response): Promise<Response> {
  const connection = await connect();
  const info = await connection.query(query_5);

  return res.json(info[0]);
}

// Query 7
export async function query7(req: Request, res: Response): Promise<Response> {
  const connection = await connect();
  const info = await connection.query(query_7);

  return res.json(info[0]);
}

// Query 9
export async function query9(req: Request, res: Response): Promise<Response> {
  const connection = await connect();
  const info = await connection.query(query_9);

  return res.json(info[0]);
}
