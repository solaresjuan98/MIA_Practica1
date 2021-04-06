/*
    SQL QUERIES
*/

// Massive charge from csv query
export const loadData =
  "\
    LOAD DATA INFILE '/var/lib/mysql-files/GRAND_VIRUS_EPICENTER.csv'\
    INTO TABLE temp_table\
    character set latin1\
    fields terminated by ';'\
    lines terminated by '\n'\
    ignore 1 lines\
    (\
        nombre_victima ,\
        apellido_victima ,\
        direccion_victima ,\
        fecha_primera_sospecha ,\
        fecha_confirmacion ,\
        fecha_muerte ,\
        estado_victima ,\
        nombre_asociado ,\
        apellido_asociado ,\
        fecha_conocio ,\
        contacto_fisico ,\
        fecha_inicio_contacto ,\
        fecha_fin_contacto ,\
        nombre_hospital ,\
        direccion_hospital ,\
        ubicacion_victima ,\
        fecha_llegada ,\
        fecha_retiro ,\
        tratamiento ,\
        efectividad ,\
        fecha_inicio_tratamiento ,\
        fecha_fin_tratamiento ,\
        efectividad_en_victima\
    );\
";

// Query 1
export const query_1 =
  '\
  SELECT DISTINCT hospital_victima, HOSPITALES.direccion_hospital, COUNT(id_victima) AS num_fallecidos\n \
  FROM VICTIMAS \n \
           INNER JOIN HOSPITALES ON VICTIMAS.hospital_victima = HOSPITALES.nombre_hospital \n \
  WHERE estado_victima = "Muerte" \n \
     OR fecha_muerte_victima != "" and hospital_victima != "" \n \
  GROUP BY hospital_victima, direccion_hospital \n \
';

// Query 2
export const query_2 =
  '\
        SELECT DISTINCT VICTIMAS.id_victima, VICTIMAS.nombre_victima, VICTIMAS.apellido_victima\
        FROM VICTIMAS\
                INNER JOIN DETALLE_TRATAMIENTO ON VICTIMAS.id_victima = DETALLE_TRATAMIENTO.id_victima\
            AND VICTIMAS.estado_victima = "En cuarentena" \
            AND DETALLE_TRATAMIENTO.id_tratamiento = (SELECT id_tratamiento \
                                                    FROM TRATAMIENTO \
                                                    WHERE nombre_tratamiento = "Transfusiones de sangre") \
            AND DETALLE_TRATAMIENTO.efectividadad_en_victima > 5 \
';

// Query 3
export const query_3 =
  ' \
  SELECT VICTIMAS.id_victima,\
  VICTIMAS.nombre_victima, \
  VICTIMAS.apellido_victima, \
  COUNT(DA.id_asociado) AS num_asociados \
FROM VICTIMAS \
    INNER JOIN DETALLE_ASOCIADO DA on VICTIMAS.id_victima = DA.id_victima \
WHERE VICTIMAS.estado_victima = "Muerte" OR fecha_muerte_victima != "" \
GROUP BY DA.id_victima \
having num_asociados > 3 ';

// Query 4
export const query_4 =
  '\
      SELECT VICTIMAS.id_victima ,VICTIMAS.nombre_victima, VICTIMAS.apellido_victima, COUNT(DETALLE_CONTACTO.id_asociado) AS num_asociados \
      FROM DETALLE_CONTACTO, \
          VICTIMAS \
      WHERE VICTIMAS.id_victima = DETALLE_CONTACTO.id_victima \
        AND VICTIMAS.estado_victima = "Sospecha" \
        AND DETALLE_CONTACTO.tipo_contacto = "Beso" \
      GROUP BY DETALLE_CONTACTO.id_victima \
      HAVING num_asociados > 2  ';

// Query 5
export const query_5 =
  '\
    SELECT V.nombre_victima, \
    V.apellido_victima, \
    COUNT(DETALLE_TRATAMIENTO.id_victima) AS veces_aplicado_oxigeno \
  FROM DETALLE_TRATAMIENTO \
      INNER JOIN VICTIMAS V on DETALLE_TRATAMIENTO.id_victima = V.id_victima \
  WHERE DETALLE_TRATAMIENTO.id_tratamiento = \
  (SELECT id_tratamiento FROM TRATAMIENTO WHERE nombre_tratamiento = "Oxigeno") \
  GROUP BY DETALLE_TRATAMIENTO.id_victima \
  ORDER BY veces_aplicado_oxigeno DESC \
  LIMIT 5 \
  ';


// Query 6
export const query_6 = 
' \
  SELECT DISTINCT \
                  VICTIMAS.nombre_victima, \
                  VICTIMAS.apellido_victima, \
                  VICTIMAS.fecha_muerte_victima \
  FROM VICTIMAS \
          INNER JOIN DETALLE_TRATAMIENTO DT on VICTIMAS.id_victima = DT.id_victima \
      AND DT.id_tratamiento = \
          (SELECT TRATAMIENTO.id_tratamiento FROM TRATAMIENTO WHERE nombre_tratamiento = "Manejo de la presion arterial") \
          INNER JOIN DETALLE_UBICACION DU on VICTIMAS.id_victima = DU.id_victima \
      AND DU.id_ubicacion = (SELECT UBICACION.id_ubicacion FROM UBICACION WHERE nombre_ubicacion = "1987 Delphine Well") \
  where VICTIMAS.fecha_muerte_victima != "" \
';

// Query 7
export const query_7 =
  '\
      SELECT DISTINCT VICTIMAS.nombre_victima, VICTIMAS.apellido_victima, VICTIMAS.direccion_victima \
      FROM VICTIMAS \
              INNER JOIN DETALLE_TRATAMIENTO on VICTIMAS.id_victima = DETALLE_TRATAMIENTO.id_victima \
          AND ( SELECT COUNT(DETALLE_TRATAMIENTO.id_victima) \
              FROM DETALLE_TRATAMIENTO \
              WHERE DETALLE_TRATAMIENTO.id_victima = VICTIMAS.id_victima) = 2 \
              INNER JOIN DETALLE_ASOCIADO ON VICTIMAS.id_victima = DETALLE_ASOCIADO.id_victima \
          AND (SELECT COUNT(DETALLE_ASOCIADO.id_victima) \
              FROM DETALLE_ASOCIADO \
              WHERE DETALLE_ASOCIADO.id_victima = VICTIMAS.id_victima) <= 2 \
          AND VICTIMAS.hospital_victima != "" ';

export const query_8 =
  "\
  (SELECT DISTINCT V.id_victima, \
                  V.nombre_victima, \
                  V.apellido_victima, \
                  count(DETALLE_TRATAMIENTO.id_victima) as veces_tratado \
  FROM DETALLE_TRATAMIENTO \
            INNER JOIN VICTIMAS V on DETALLE_TRATAMIENTO.id_victima = V.id_victima \
  GROUP BY DETALLE_TRATAMIENTO.id_victima \
  ORDER BY veces_tratado desc \
  LIMIT 5) \
  UNION \
  (SELECT DISTINCT V.id_victima, \
                  V.nombre_victima, \
                  V.apellido_victima, \
                  count(DETALLE_TRATAMIENTO.id_victima) as veces_tratado \
  FROM DETALLE_TRATAMIENTO \
            INNER JOIN VICTIMAS V on DETALLE_TRATAMIENTO.id_victima = V.id_victima \
  GROUP BY DETALLE_TRATAMIENTO.id_victima \
  ORDER BY veces_tratado ASC \
  LIMIT 5) \
";

// Query 9
export const query_9 =
  "\
    SELECT VICTIMAS.hospital_victima,\
        COUNT(VICTIMAS.hospital_victima) AS cantidad,\
        (SELECT COUNT(VICTIMAS.hospital_victima) * 100 / COUNT(*)\
    FROM VICTIMAS AS victimas)\
            AS porcentaje\
    FROM VICTIMAS\
    GROUP BY VICTIMAS.hospital_victima\
";
