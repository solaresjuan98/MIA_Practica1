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
        SELECT distinct hospital_victima as hospital, direccion_hospital , COUNT(*) as numero_fallecidos\
        FROM VICTIMAS, HOSPITALES\
        where estado_victima = "Muerte" \
        and hospital_victima != "" \
        and VICTIMAS.hospital_victima =HOSPITALES.nombre_hospital\
        GROUP BY hospital_victima, direccion_hospital\
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
