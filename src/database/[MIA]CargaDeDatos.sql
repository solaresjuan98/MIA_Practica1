

-- MASSIVE CHARGE INTO TEMPORAL TABLE
LOAD DATA INFILE '/var/lib/mysql-files/GRAND_VIRUS_EPICENTER.csv'
    INTO TABLE temp_table
    character set latin1
    fields terminated by ';'
    lines terminated by '\n'
    ignore 1 lines
    (
     nombre_victima,
     apellido_victima,
     direccion_victima,
     fecha_primera_sospecha,
     fecha_confirmacion,
     fecha_muerte,
     estado_victima,
     nombre_asociado,
     apellido_asociado,
     fecha_conocio,
     contacto_fisico,
     fecha_inicio_contacto,
     fecha_fin_contacto,
     nombre_hospital,
     direccion_hospital,
     ubicacion_victima,
     fecha_llegada,
     fecha_retiro,
     tratamiento,
     efectividad,
     fecha_inicio_tratamiento,
     fecha_fin_tratamiento,
     efectividad_en_victima
        )
;


-- CHARGING DATA INTO TABLES

-- Inserting data into "HOSPITALES"
INSERT INTO HOSPITALES
    (nombre_hospital, direccion_hospital)
SELECT DISTINCT nombre_hospital, direccion_hospital
FROM temp_table
WHERE nombre_hospital != ""
    AND direccion_hospital != "";


-- Inserting data into "VICTIMAS" 
INSERT INTO VICTIMAS
    (nombre_victima,
    apellido_victima,
    direccion_victima,
    fecha_muerte_victima,
    estado_victima,
    hospital_victima)
SELECT DISTINCT temp_table.nombre_victima,
    temp_table.apellido_victima,
    temp_table.direccion_victima,
    temp_table.fecha_muerte,
    temp_table.estado_victima,
    temp_table.nombre_hospital
FROM temp_table
where temp_table.nombre_victima != "";


-- INSERTING DATA IN "TRATAMIENTO"
INSERT INTO TRATAMIENTO
    (nombre_tratamiento, efectividad)
SELECT DISTINCT temp_table.tratamiento, temp_table.efectividad
FROM temp_table
WHERE tratamiento != "";


-- INSERTING DATA IN DETALLE_TRATAMIENTO
INSERT INTO DETALLE_TRATAMIENTO
    (id_tratamiento, id_victima, fecha_inicio_tratamiento, fecha_fin_tratamiento, efectividadad_en_victima)
SELECT DISTINCT TRATAMIENTO.id_tratamiento,
    VICTIMAS.id_victima,
    temp_table.fecha_inicio_tratamiento,
    temp_table.fecha_fin_tratamiento,
    temp_table.efectividad_en_victima
FROM VICTIMAS,
    TRATAMIENTO,
    temp_table
WHERE temp_table.nombre_victima = VICTIMAS.nombre_victima
    AND temp_table.tratamiento = TRATAMIENTO.nombre_tratamiento;

-- INSERTING DATA IN "CASO"
INSERT INTO CASO
    (ID_VICTIMA, FECHA_PRIMERA_SOSPECHA, FECHA_REGISTRO_VICTIMA)
SELECT DISTINCT V.id_victima,
    temp_table.fecha_primera_sospecha,
    temp_table.fecha_confirmacion
FROM temp_table
    INNER JOIN VICTIMAS V ON temp_table.nombre_victima = V.nombre_victima
WHERE temp_table.nombre_victima != "";


-- INSERTING DATA IN ASOCIADOS
INSERT INTO ASOCIADOS
    (nombre_asociado, apellido_asociado)
SELECT DISTINCT nombre_asociado, apellido_asociado
FROM temp_table
WHERE nombre_asociado != "";


-- INSERTING DATA IN "DETALLE_ASOCIADO"
INSERT INTO DETALLE_ASOCIADO
    (id_victima, id_asociado, fecha_conocio)
SELECT DISTINCT VICTIMAS.id_victima, ASOCIADOS.id_asociado, temp_table.fecha_conocio
FROM VICTIMAS,
    ASOCIADOS,
    temp_table
WHERE temp_table.nombre_victima = VICTIMAS.nombre_victima
    AND temp_table.nombre_asociado = ASOCIADOS.nombre_asociado;

-- INSERTING DATA IN "UBICACION"
INSERT INTO UBICACION
    (nombre_ubicacion)
SELECT DISTINCT ubicacion_victima
FROM temp_table
WHERE ubicacion_victima != "";

-- INSERTING DATA IN "DETALLE_UBICACION"
INSERT INTO DETALLE_UBICACION
    (id_victima, id_ubicacion, fecha_llegada, fecha_salida)
SELECT DISTINCT VICTIMAS.id_victima, UBICACION.id_ubicacion, temp_table.fecha_llegada, temp_table.fecha_retiro
FROM VICTIMAS,
    UBICACION,
    temp_table
WHERE temp_table.nombre_victima = VICTIMAS.nombre_victima
    AND temp_table.ubicacion_victima = UBICACION.nombre_ubicacion;


-- INSERTING DATA IN "DETALLE_CONTACTO"
INSERT INTO DETALLE_CONTACTO
    (id_victima, id_asociado, tipo_contacto, fecha_inicio_contacto, fecha_fin_contacto)
SELECT DISTINCT VICTIMAS.id_victima, ASOCIADOS.id_asociado, contacto_fisico, fecha_inicio_contacto, fecha_fin_contacto
FROM VICTIMAS,
    ASOCIADOS,
    temp_table
WHERE temp_table.nombre_victima = VICTIMAS.nombre_victima
    AND temp_table.nombre_asociado = ASOCIADOS.nombre_asociado
    AND contacto_fisico != "";

