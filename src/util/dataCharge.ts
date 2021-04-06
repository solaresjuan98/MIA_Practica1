export const prueb =
  "\nCREATE TABLE IF NOT EXISTS HOSPITALES\n(\n    id_hospital        int NOT NULL AUTO_INCREMENT PRIMARY KEY,\n    nombre_hospital    VARCHAR(100),\n    direccion_hospital VARCHAR(100)\n);\n\n\nCREATE TABLE IF NOT EXISTS VICTIMAS\n(\n    id_victima           int NOT NULL AUTO_INCREMENT PRIMARY KEY,\n    nombre_victima       VARCHAR(20),\n    apellido_victima     VARCHAR(20),\n    direccion_victima    VARCHAR(50),\n    fecha_muerte_victima VARCHAR(50),\n    estado_victima       VARCHAR(50),\n    hospital_victima     VARCHAR(50)\n);\n\n\nCREATE TABLE IF NOT EXISTS CASO\n(\n    id_caso                int AUTO_INCREMENT NOT NULL PRIMARY KEY,\n    id_victima             int                NOT NULL,\n    fecha_primera_sospecha VARCHAR(50),\n    fecha_registro_victima VARCHAR(50),\n    FOREIGN KEY (id_victima) REFERENCES VICTIMAS (id_victima)\n);\n\n\nCREATE TABLE IF NOT EXISTS TRATAMIENTO\n(\n    id_tratamiento     int NOT NULL AUTO_INCREMENT PRIMARY KEY,\n    nombre_tratamiento varchar(50),\n    efectividad        int NOT NULL\n\n);\n\nCREATE TABLE IF NOT EXISTS DETALLE_TRATAMIENTO\n(\n\n    id_tratamiento           int         NOT NULL,\n    id_victima               int         NOT NULL,\n    fecha_inicio_tratamiento VARCHAR(50) NOT NULL,\n    fecha_fin_tratamiento    VARCHAR(50) NOT NULL,\n    efectividadad_en_victima int,\n    FOREIGN KEY (id_tratamiento) REFERENCES TRATAMIENTO (id_tratamiento),\n    FOREIGN KEY (id_victima) REFERENCES VICTIMAS (id_victima)\n\n);\n\n\nCREATE TABLE IF NOT EXISTS ASOCIADOS\n(\n    id_asociado       int NOT NULL AUTO_INCREMENT PRIMARY KEY,\n    nombre_asociado   varchar(20),\n    apellido_asociado varchar(20)\n);\n\nCREATE TABLE IF NOT EXISTS DETALLE_ASOCIADO\n(\n    id_victima    int NOT NULL,\n    id_asociado   int NOT NULL,\n    fecha_conocio varchar(50),\n    FOREIGN KEY (id_victima) REFERENCES VICTIMAS (id_victima),\n    FOREIGN KEY (id_asociado) REFERENCES ASOCIADOS (id_asociado)\n);\n\nCREATE TABLE IF NOT EXISTS UBICACION\n(\n    id_ubicacion     int NOT NULL AUTO_INCREMENT PRIMARY KEY,\n    nombre_ubicacion VARCHAR(100)\n);\n\nCREATE TABLE IF NOT EXISTS DETALLE_UBICACION\n(\n    id_victima    int,\n    id_ubicacion  int,\n    fecha_llegada varchar(50),\n    fecha_salida  varchar(50),\n    FOREIGN KEY (id_victima) REFERENCES VICTIMAS (id_victima),\n    FOREIGN KEY (id_ubicacion) REFERENCES UBICACION (id_ubicacion)\n);\n\n\nCREATE TABLE IF NOT EXISTS DETALLE_CONTACTO\n(\n    id_victima int,\n    id_asociado int,\n    tipo_contacto VARCHAR(30),\n    fecha_inicio_contacto VARCHAR(50),\n    fecha_fin_contacto VARCHAR(50),\n    FOREIGN KEY (id_victima) REFERENCES VICTIMAS (id_victima),\n    FOREIGN KEY (id_asociado) REFERENCES ASOCIADOS (id_asociado)\n);\n";

  export const fillQuery =
  "\n \
  use grand_virus_epicenter;\n \
CREATE TABLE IF NOT EXISTS  HOSPITALES \n \
( \n \
    id_hospital int NOT NULL AUTO_INCREMENT PRIMARY KEY, \n \
    nombre_hospital    VARCHAR(100), \n \
    direccion_hospital VARCHAR(100) \n \
);\n \
\n \
use grand_virus_epicenter;\n \
CREATE TABLE IF NOT EXISTS  VICTIMAS \n \
( \n \
    id_victima int NOT NULL AUTO_INCRE \n \
    MENT PRIMARY KEY, \n \
    nombre_victima       VARCHAR(20), \n \
    apellido_victima     VARCHAR(20), \n \
    direccion_victima    VARCHAR(50), \n \
    fecha_muerte_victima VARCHAR(50), \n \
    estado_victima       VARCHAR(50), \n \
    hospital_victima     VARCHAR(50), \n \
); \n \
use grand_virus_epicenter;\n \
CREATE TABLE IF NOT EXISTS  CASO\n \
(\n \
    id_caso                int AUTO_INCREMENT NOT NULL PRIMARY KEY, \n \
    id_victima             int                NOT NULL, \n \
    fecha_primera_sospecha VARCHAR(50), \n \
    fecha_registro_victima VARCHAR(50), \n \
    FOREIGN KEY (id_victima) REFERENCES VICTIMAS (id_victima) \n \
);\n \
use grand_virus_epicenter;\n \
CREATE TABLE IF NOT EXISTS  TRATAMIENTO \n \
( \n \
    id_tratamiento     int NOT NULL AUTO_INCREMENT PRIMARY KEY, \n \
    nombre_tratamiento varchar(50), \n \
    efectividad        int NOT NULL \n \
    \n \
);   \n \
use grand_virus_epicenter;\n \
CREATE TABLE IF NOT EXISTS  DETALLE_TRATAMIENTO \n \
( \n \
    \n \
    id_tratamiento           int         NOT NULL, \n \
    id_victima               int         NOT NULL, \n \
    fecha_inicio_tratamiento VARCHAR(50) NOT NULL, \n \
    fecha_fin_tratamiento    VARCHAR(50) NOT NULL, \n \
    efectividadad_en_victima int, \n \
    FOREIGN KEY (id_tratamiento) REFERENCES TRATAMIENTO (id_tratamiento), \n \
    FOREIGN KEY (id_victima) REFERENCES VICTIMAS (id_victima) \n \
);\n \
use grand_virus_epicenter;\n \
CREATE TABLE IF NOT EXISTS  ASOCIADOS \n \
    ( \n \
        id_asociado       int NOT NULL AUTO_INCREMENT PRIMARY KEY, \n \
        nombre_asociado   varchar(20), \n \
        apellido_asociado varchar(20) \n \
    ); \n \
\n \
use grand_virus_epicenter;\n \
CREATE TABLE IF NOT EXISTS  DETALLE_ASOCIADO \n \
    (  \n \
        id_victima    int NOT NULL, \n \
        id_asociado   int NOT NULL, \n \
        fecha_conocio varchar(50), \n \
        FOREIGN KEY (id_victima) REFERENCES VICTIMAS (id_victima), \n \
        FOREIGN KEY (id_asociado) REFERENCES ASOCIADOS (id_asociado) \n \
    );\n \
\n \
use grand_virus_epicenter; \n \
CREATE TABLE IF NOT EXISTS  UBICACION \n \
( \n \
    id_ubicacion     int NOT NULL AUTO_INCREMENT PRIMARY KEY, \n \
    nombre_ubicacion VARCHAR(100) \n \
); \n \
\n \
use grand_virus_epicenter; \n \
CREATE TABLE IF NOT EXISTS  DETALLE_UBICACION \n \
( \n \
    id_victima    int, \n \
    id_ubicacion  int, \n \
    fecha_llegada varchar(50), \n \
    fecha_salida  varchar(50), \n \
    FOREIGN KEY (id_victima) REFERENCES VICTIMAS (id_victima), \n \
    FOREIGN KEY (id_ubicacion) REFERENCES UBICACION (id_ubicacion) \n \
) ;\n \
\n \
use grand_virus_epicenter; \n \
CREATE TABLE IF NOT EXISTS  DETALLE_CONTACTO \n \
( \n \
    id_victima int, \n \
    id_asociado int, \n \
    tipo_contacto VARCHAR(30), \n \
    fecha_inicio_contacto VARCHAR(50), \n \
    fecha_fin_contacto VARCHAR(50), \n \
    FOREIGN KEY (id_victima) REFERENCES VICTIMAS (id_victima), \n \
    FOREIGN KEY (id_asociado) REFERENCES ASOCIADOS (id_asociado) \n \
);\n \
";
export const createHospitales =
  "\
CREATE TABLE IF NOT EXISTS  HOSPITALES \
( \
    id_hospital        int NOT NULL AUTO_INCREMENT PRIMARY KEY, \
    nombre_hospital    VARCHAR(100), \
    direccion_hospital VARCHAR(100) \
)";

export const createVictimas =
  " \
CREATE TABLE IF NOT EXISTS  VICTIMAS \
(  id_victima           int NOT NULL AUTO_INCREMENT PRIMARY KEY, \
    nombre_victima       VARCHAR(20), \
    apellido_victima     VARCHAR(20), \
    direccion_victima    VARCHAR(50), \
    fecha_muerte_victima VARCHAR(50), \
    estado_victima       VARCHAR(50), \
    hospital_victima     VARCHAR(50) \
) ; \
";

export const createCaso =
  "\
    \
    CREATE TABLE IF NOT EXISTS  CASO\
    (\
        id_caso                int AUTO_INCREMENT NOT NULL PRIMARY KEY, \
        id_victima             int                NOT NULL, \
        fecha_primera_sospecha VARCHAR(50), \
        fecha_registro_victima VARCHAR(50), \
        FOREIGN KEY (id_victima) REFERENCES VICTIMAS (id_victima) \
    )";

export const createTratamiento =
  " \
    CREATE TABLE IF NOT EXISTS  TRATAMIENTO \
    ( \
        id_tratamiento     int NOT NULL AUTO_INCREMENT PRIMARY KEY, \
        nombre_tratamiento varchar(50), \
        efectividad        int NOT NULL \
        \
    )   \
";

export const createDetTratamiento =
  "\
    CREATE TABLE IF NOT EXISTS  DETALLE_TRATAMIENTO \
    ( \
        \
        id_tratamiento           int         NOT NULL, \
        id_victima               int         NOT NULL, \
        fecha_inicio_tratamiento VARCHAR(50) NOT NULL, \
        fecha_fin_tratamiento    VARCHAR(50) NOT NULL, \
        efectividadad_en_victima int, \
        FOREIGN KEY (id_tratamiento) REFERENCES TRATAMIENTO (id_tratamiento), \
        FOREIGN KEY (id_victima) REFERENCES VICTIMAS (id_victima) \
        \
    )";

export const createAsociados =
  "\
    CREATE TABLE IF NOT EXISTS  ASOCIADOS \
    ( \
        id_asociado       int NOT NULL AUTO_INCREMENT PRIMARY KEY, \
        nombre_asociado   varchar(20), \
        apellido_asociado varchar(20) \
    )";

export const createDetAsociados =
  " \
    CREATE TABLE IF NOT EXISTS  DETALLE_ASOCIADO \
    (  \
        id_victima    int NOT NULL, \
        id_asociado   int NOT NULL, \
        fecha_conocio varchar(50), \
        FOREIGN KEY (id_victima) REFERENCES VICTIMAS (id_victima), \
        FOREIGN KEY (id_asociado) REFERENCES ASOCIADOS (id_asociado) \
)";

export const createUbicaciones =
  " \
    CREATE TABLE IF NOT EXISTS  UBICACION \
    ( \
        id_ubicacion     int NOT NULL AUTO_INCREMENT PRIMARY KEY, \
        nombre_ubicacion VARCHAR(100) \
    )\
";

export const createDetUbicaciones =
  " \
    CREATE TABLE IF NOT EXISTS  DETALLE_UBICACION \n \
    ( \n \
        id_victima    int, \n \
        id_ubicacion  int, \n \
        fecha_llegada varchar(50), \n \
        fecha_salida  varchar(50), \n \
        FOREIGN KEY (id_victima) REFERENCES VICTIMAS (id_victima), \n \
        FOREIGN KEY (id_ubicacion) REFERENCES UBICACION (id_ubicacion) \n \
    ); \n \
    \n \
    /*INSERT INTO DETALLE_UBICACION \n \
        (id_victima, id_ubicacion, fecha_llegada, fecha_salida) \n \
    SELECT DISTINCT VICTIMAS.id_victima, UBICACION.id_ubicacion, temp_table.fecha_llegada, temp_table.fecha_retiro \n \
    FROM VICTIMAS, \n \
        UBICACION, \n \
        temp_table \n \
    WHERE temp_table.nombre_victima = VICTIMAS.nombre_victima \n \
    AND temp_table.ubicacion_victima = UBICACION.nombre_ubicacion ; */ \n \
    ";

export const createDetContacto =
  "\
    CREATE TABLE IF NOT EXISTS  DETALLE_CONTACTO \
    ( \
        id_victima int, \
        id_asociado int, \
        tipo_contacto VARCHAR(30), \
        fecha_inicio_contacto VARCHAR(50), \
        fecha_fin_contacto VARCHAR(50), \
        FOREIGN KEY (id_victima) REFERENCES VICTIMAS (id_victima), \
        FOREIGN KEY (id_asociado) REFERENCES ASOCIADOS (id_asociado) \
    )";

// =================== Charging to model ===================
export const chargeVictimas =
  ' \
    INSERT INTO VICTIMAS \
    (nombre_victima, \
    apellido_victima, \
    direccion_victima,  \
    fecha_muerte_victima, \
    estado_victima, \
    hospital_victima) \
    SELECT DISTINCT temp_table.nombre_victima, \
                    temp_table.apellido_victima, \
                    temp_table.direccion_victima, \
                    temp_table.fecha_muerte, \
                    temp_table.estado_victima, \
                    temp_table.nombre_hospital \
    FROM temp_table \
    where temp_table.nombre_victima != "" \
';

export const chargeHospitales =
  '\
    INSERT INTO HOSPITALES (nombre_hospital, direccion_hospital)\
    SELECT DISTINCT nombre_hospital, direccion_hospital \
    FROM temp_table \
    WHERE nombre_hospital != ""  \
    AND direccion_hospital != "" \
    ';

export const chargeTratamiento =
  ' \
    INSERT INTO TRATAMIENTO \
        (nombre_tratamiento, efectividad) \
    SELECT DISTINCT temp_table.tratamiento, temp_table.efectividad \
    FROM temp_table \
    WHERE tratamiento != "" \
    ';

export const chargeDetTratamiento =
  " \
    INSERT INTO DETALLE_TRATAMIENTO \
    (id_tratamiento, id_victima, fecha_inicio_tratamiento, fecha_fin_tratamiento, efectividadad_en_victima) \
    SELECT DISTINCT TRATAMIENTO.id_tratamiento, \
                    VICTIMAS.id_victima, \
                    temp_table.fecha_inicio_tratamiento, \
                    temp_table.fecha_fin_tratamiento, \
                    temp_table.efectividad_en_victima \
    FROM VICTIMAS, \
        TRATAMIENTO, \
        temp_table \
    WHERE temp_table.nombre_victima = VICTIMAS.nombre_victima \
    AND temp_table.tratamiento = TRATAMIENTO.nombre_tratamiento  ";

export const chargeCaso =
  ' \
    INSERT INTO CASO \
    (ID_VICTIMA, FECHA_PRIMERA_SOSPECHA, FECHA_REGISTRO_VICTIMA) \
    SELECT DISTINCT V.id_victima, \
                temp_table.fecha_primera_sospecha, \
                temp_table.fecha_confirmacion \
    FROM temp_table \
        INNER JOIN VICTIMAS V ON temp_table.nombre_victima = V.nombre_victima \
    WHERE temp_table.nombre_victima != "" \
';

export const chargeAsociado =
  ' \
    INSERT INTO ASOCIADOS \
        (nombre_asociado, apellido_asociado) \
    SELECT DISTINCT nombre_asociado, apellido_asociado \
    FROM temp_table \
    WHERE nombre_asociado != "" \
     ';

export const chargeDetAsociado =
  " \
    INSERT INTO DETALLE_ASOCIADO \
        (id_victima, id_asociado, fecha_conocio) \
    SELECT DISTINCT VICTIMAS.id_victima, ASOCIADOS.id_asociado, temp_table.fecha_conocio \
    FROM VICTIMAS, \
        ASOCIADOS, \
        temp_table \
    WHERE temp_table.nombre_victima = VICTIMAS.nombre_victima \
    AND temp_table.nombre_asociado = ASOCIADOS.nombre_asociado \
";

export const chargeUbicacion =
  ' \
    INSERT INTO UBICACION \
        (nombre_ubicacion) \
    SELECT DISTINCT ubicacion_victima \
    FROM temp_table \
    WHERE ubicacion_victima != "" \
';

export const chargeDetUbicacion =
  " \
    INSERT INTO DETALLE_UBICACION \
        (id_victima, id_ubicacion, fecha_llegada, fecha_salida) \
    SELECT DISTINCT VICTIMAS.id_victima, UBICACION.id_ubicacion, temp_table.fecha_llegada, temp_table.fecha_retiro \
    FROM VICTIMAS, \
        UBICACION, \
        temp_table \
    WHERE temp_table.nombre_victima = VICTIMAS.nombre_victima \
    AND temp_table.ubicacion_victima = UBICACION.nombre_ubicacion ";

export const chargeDetContacto =
  ' \
    INSERT INTO DETALLE_CONTACTO \
    (id_victima, id_asociado, tipo_contacto, fecha_inicio_contacto, fecha_fin_contacto) \
    SELECT DISTINCT VICTIMAS.id_victima, ASOCIADOS.id_asociado, contacto_fisico, fecha_inicio_contacto, fecha_fin_contacto \
    FROM VICTIMAS, \
        ASOCIADOS, \
        temp_table \
    WHERE temp_table.nombre_victima = VICTIMAS.nombre_victima \
    AND temp_table.nombre_asociado = ASOCIADOS.nombre_asociado \
    AND contacto_fisico != "" \
';
