import { Request, Response } from "express";

// import database
import { connect } from "../database";
import {
  chargeAsociado,
  chargeCaso,
  chargeDetAsociado,
  chargeDetContacto,
  chargeDetTratamiento,
  chargeDetUbicacion,
  chargeHospitales,
  chargeTratamiento,
  chargeUbicacion,
  chargeVictimas,
  createAsociados,
  createCaso,
  createDetAsociados,
  createDetContacto,
  createDetTratamiento,
  createDetUbicaciones,
  createHospitales,
  createTratamiento,
  createUbicaciones,
  createVictimas,
  fillQuery,
} from "../util/dataCharge";
//import { fillModel } from "../util/dataCharge";
import { deleteModel } from "../util/dataDelete";

import {
  loadData,
  query_1,
  query_2,
  query_3,
  query_4,
  query_5,
  query_6,
  query_7,
  query_8,
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

// Query 6
export async function query6(req: Request, res: Response): Promise<Response> {
  const connection = await connect();
  const info = await connection.query(query_6);

  return res.json(info[0]);
}

// Query 7
export async function query7(req: Request, res: Response): Promise<Response> {
  const connection = await connect();
  const info = await connection.query(query_7);

  return res.json(info[0]);
}

// Query 8
export async function query8(req: Request, res: Response): Promise<Response> {
  const connection = await connect();
  const info = await connection.query(query_8);

  return res.json(info[0]);
}

// Query 9
export async function query9(req: Request, res: Response): Promise<Response> {
  const connection = await connect();
  const info = await connection.query(query_9);

  return res.json(info[0]);
}



// Filling ER model
export async function cargarModelo(req: Request, res: Response) {
  const connection = await connect();

  try {
    // CREATING TABLES
    await connection.query(createHospitales);
    await connection.query(createVictimas);
    await connection.query(createCaso);
    await connection.query(createTratamiento);
    await connection.query(createAsociados);
    await connection.query(createDetAsociados);
    await connection.query(createUbicaciones);
    await connection.query(createDetUbicaciones);
    await connection.query(createDetContacto);
    await connection.query(createDetTratamiento);

    // FILLING TABLES
    await connection.query(chargeHospitales);
    await connection.query(chargeVictimas);
    await connection.query(chargeTratamiento);
    await connection.query(chargeDetTratamiento);
    await connection.query(chargeCaso);
    await connection.query(chargeAsociado);
    await connection.query(chargeDetAsociado);
    await connection.query(chargeUbicacion);
    await connection.query(chargeDetUbicacion);
    await connection.query(chargeDetContacto);
  } catch (error) {
    console.log("Error :v");
  }

  return res.json({
    message: "Model charged",
  });
}

// Delete model tables
export async function eliminarModelo(req: Request, res: Response) {
  const connection = await connect();

  await connection.query("DROP TABLE DETALLE_CONTACTO");
  await connection.query("DROP TABLE DETALLE_UBICACION");
  await connection.query("DROP TABLE UBICACION");
  await connection.query("DROP TABLE DETALLE_ASOCIADO");
  await connection.query("DROP TABLE ASOCIADOS");
  await connection.query("DROP TABLE CASO");
  await connection.query("DROP TABLE DETALLE_TRATAMIENTO");
  await connection.query("DROP TABLE TRATAMIENTO");
  await connection.query("DROP TABLE VICTIMAS");
  await connection.query("DROP TABLE HOSPITALES");

  return res.json({
    message: "Model deleted",
  });
}
