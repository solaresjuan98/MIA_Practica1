/*
    1. Mostrar el nombre del hospital, su dirección y el número de fallecidos por
       cada hospital registrado.

*/
SELECT DISTINCT hospital_victima, HOSPITALES.direccion_hospital, COUNT(id_victima)
FROM VICTIMAS
    INNER JOIN HOSPITALES ON VICTIMAS.hospital_victima = HOSPITALES.nombre_hospital
WHERE estado_victima = "Muerte"
    or fecha_muerte_victima != "" and hospital_victima != ""
group by hospital_victima, direccion_hospital;

/*
    2. Mostrar el nombre, apellido de todas las víctimas en cuarentena que
       presentaron una efectividad mayor a 5 en el tratamiento “Transfusiones de
       sangre”.
*/

SELECT DISTINCT VICTIMAS.id_victima, VICTIMAS.nombre_victima, VICTIMAS.apellido_victima
FROM VICTIMAS
    INNER JOIN DETALLE_TRATAMIENTO ON VICTIMAS.id_victima = DETALLE_TRATAMIENTO.id_victima
        AND VICTIMAS.estado_victima = "En cuarentena"
        AND DETALLE_TRATAMIENTO.id_tratamiento = (SELECT id_tratamiento
        FROM TRATAMIENTO
        WHERE nombre_tratamiento = "Transfusiones de sangre")
        AND DETALLE_TRATAMIENTO.efectividadad_en_victima > 5;

/*
    3. Mostrar el nombre, apellido y dirección de las víctimas fallecidas con más de
       tres personas asociadas.
*/

SELECT VICTIMAS.id_victima,
    VICTIMAS.nombre_victima,
    VICTIMAS.apellido_victima,
    COUNT(DA.id_asociado) AS num_asociados
FROM VICTIMAS
    INNER JOIN DETALLE_ASOCIADO DA on VICTIMAS.id_victima = DA.id_victima
WHERE VICTIMAS.estado_victima = "Muerte" OR fecha_muerte_victima != ""
GROUP BY DA.id_victima
having num_asociados > 3;


/*
    4. Mostrar el nombre y apellido de todas las víctimas en estado “Suspendida”
       que tuvieron contacto físico de tipo “Beso” con más de 2 de sus asociados.

*/
SELECT distinct V.id_victima,
    V.nombre_victima,
    V.apellido_victima,
    (SELECT COUNT(id_asociado) as num
    FROM (SELECT DISTINCT DETALLE_CONTACTO.id_victima, id_asociado
        FROM DETALLE_CONTACTO
            INNER JOIN VICTIMAS ON DETALLE_CONTACTO.id_victima = V.id_victima
                AND tipo_contacto = "Beso") AS num
    GROUP BY id_victima) as num_asociados
FROM DETALLE_CONTACTO
    INNER JOIN VICTIMAS V on DETALLE_CONTACTO.id_victima = V.id_victima
WHERE V.estado_victima = "Sospecha"
    AND DETALLE_CONTACTO.tipo_contacto = "Beso"
GROUP BY DETALLE_CONTACTO.id_victima
HAVING num_asociados > 2
limit 5;

/*
    5. Top 5 de víctimas que más tratamientos se han aplicado del tratamiento
       “Oxígeno”.
*/


SELECT V.nombre_victima,
    V.apellido_victima,
    COUNT(DETALLE_TRATAMIENTO.id_victima) AS veces_aplicado_oxigeno
FROM DETALLE_TRATAMIENTO
    INNER JOIN VICTIMAS V on DETALLE_TRATAMIENTO.id_victima = V.id_victima
WHERE DETALLE_TRATAMIENTO.id_tratamiento = 
  (SELECT id_tratamiento
FROM TRATAMIENTO
WHERE nombre_tratamiento = "Oxigeno")
GROUP BY DETALLE_TRATAMIENTO.id_victima
ORDER BY veces_aplicado_oxigeno DESC 
LIMIT 5;

/*
    6. Mostrar el nombre, el apellido y la fecha de fallecimiento de todas las
       víctimas que se movieron por la dirección “1987 Delphine Well” a los cuales
       se les aplicó "Manejo de la presión arterial" como tratamiento.
*/


SELECT DISTINCT
    VICTIMAS
.nombre_victima,
    VICTIMAS.apellido_victima,
    VICTIMAS.fecha_muerte_victima
FROM VICTIMAS
    INNER JOIN DETALLE_TRATAMIENTO DT on VICTIMAS.id_victima = DT.id_victima
        AND DT.id_tratamiento =
(SELECT TRATAMIENTO.id_tratamiento
FROM TRATAMIENTO
WHERE nombre_tratamiento = "Manejo de la presion arterial")
INNER JOIN DETALLE_UBICACION DU on VICTIMAS.id_victima = DU.id_victima
        AND DU.id_ubicacion =
(SELECT UBICACION.id_ubicacion
FROM UBICACION
WHERE nombre_ubicacion = "1987 Delphine Well")
where VICTIMAS.fecha_muerte_victima != "";



/*
    7. Mostrar nombre, apellido y dirección de las víctimas que tienen menos de 2
       allegados los cuales hayan estado en un hospital y que se le hayan aplicado
       únicamente dos tratamientos.
*/

SELECT DISTINCT VICTIMAS.id_victima, VICTIMAS.nombre_victima, VICTIMAS.apellido_victima, VICTIMAS.direccion_victima
FROM VICTIMAS
    INNER JOIN DETALLE_TRATAMIENTO on VICTIMAS.id_victima = DETALLE_TRATAMIENTO.id_victima
        AND (SELECT COUNT(DETALLE_TRATAMIENTO.id_victima)
        FROM DETALLE_TRATAMIENTO
        WHERE DETALLE_TRATAMIENTO.id_victima = VICTIMAS.id_victima) = 2
    INNER JOIN DETALLE_ASOCIADO ON VICTIMAS.id_victima = DETALLE_ASOCIADO.id_victima
        AND (SELECT COUNT(DETALLE_ASOCIADO.id_victima)
        FROM DETALLE_ASOCIADO
        WHERE DETALLE_ASOCIADO.id_victima = VICTIMAS.id_victima) <= 2
        AND VICTIMAS.hospital_victima != "";



/*
    8. Mostrar el número de mes ,de la fecha de la primera sospecha, nombre y
       apellido de las víctimas que más tratamientos se han aplicado y las que
       menos. (Todo en una sola consulta).
*/

(SELECT DISTINCT V.id_victima,
                 V.nombre_victima,
                 V.apellido_victima,
                 -- C.fecha_registro_victima,
                 count(DETALLE_TRATAMIENTO.id_victima) as veces_tratado
 FROM DETALLE_TRATAMIENTO
          INNER JOIN VICTIMAS V on DETALLE_TRATAMIENTO.id_victima = V.id_victima
      -- INNER JOIN CASO C on V.id_victima = C.id_victima
 GROUP BY DETALLE_TRATAMIENTO.id_victima
 ORDER BY veces_tratado desc
 LIMIT 5)
UNION
-- ASC
(SELECT DISTINCT V.id_victima,
                 V.nombre_victima,
                 V.apellido_victima,
                 -- C.fecha_registro_victima,
                 count(DETALLE_TRATAMIENTO.id_victima) as veces_tratado
 FROM DETALLE_TRATAMIENTO
          INNER JOIN VICTIMAS V on DETALLE_TRATAMIENTO.id_victima = V.id_victima
      -- INNER JOIN CASO C on V.id_victima = C.id_victima
 GROUP BY DETALLE_TRATAMIENTO.id_victima
 ORDER BY veces_tratado ASC
 LIMIT 5);

/*
    9. Mostrar el porcentaje de víctimas que le corresponden a cada hospital.
*/

SELECT VICTIMAS.hospital_victima,
    COUNT(VICTIMAS.hospital_victima) AS cantidad,
    (SELECT COUNT(VICTIMAS.hospital_victima) * 100 / COUNT(*)
    FROM VICTIMAS AS victimas)
                                        AS porcentaje
FROM VICTIMAS
GROUP BY VICTIMAS.hospital_victima;


/*
    10. Mostrar el porcentaje del contacto físico más común de cada hospital de la
        siguiente manera: nombre de hospital, nombre del contacto físico, porcentaje
        de víctimas.
*/