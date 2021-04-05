-- Creating entity relationship model
use grand_virus_epicenter;
show tables;

-- "HOSPITALES" TABLE
CREATE TABLE IF NOT EXISTS HOSPITALES
(
    id_hospital        int NOT NULL AUTO_INCREMENT PRIMARY KEY,
    nombre_hospital    VARCHAR(100),
    direccion_hospital VARCHAR(100)
);


-- "VICTIMS" TABLE
CREATE TABLE IF NOT EXISTS VICTIMAS
(
    id_victima           int NOT NULL AUTO_INCREMENT PRIMARY KEY,
    nombre_victima       VARCHAR(20),
    apellido_victima     VARCHAR(20),
    direccion_victima    VARCHAR(50),
    fecha_muerte_victima VARCHAR(50),
    estado_victima       VARCHAR(50),
    hospital_victima     VARCHAR(50)
);

-- "CASO" Table
CREATE TABLE IF NOT EXISTS CASO
(
    id_caso                int AUTO_INCREMENT NOT NULL PRIMARY KEY,
    id_victima             int                NOT NULL,
    fecha_primera_sospecha VARCHAR(50),
    fecha_registro_victima VARCHAR(50),
    FOREIGN KEY (id_victima) REFERENCES VICTIMAS (id_victima)
);


-- "TRATAMIENTO" Table
CREATE TABLE IF NOT EXISTS TRATAMIENTO
(
    id_tratamiento     int NOT NULL AUTO_INCREMENT PRIMARY KEY,
    nombre_tratamiento varchar(50),
    efectividad        int NOT NULL

);


-- "DETALLE TRATAMIENTO" Table
CREATE TABLE IF NOT EXISTS DETALLE_TRATAMIENTO
(

    id_tratamiento           int         NOT NULL,
    id_victima               int         NOT NULL,
    fecha_inicio_tratamiento VARCHAR(50) NOT NULL,
    fecha_fin_tratamiento    VARCHAR(50) NOT NULL,
    efectividadad_en_victima int,
    FOREIGN KEY (id_tratamiento) REFERENCES TRATAMIENTO (id_tratamiento),
    FOREIGN KEY (id_victima) REFERENCES VICTIMAS (id_victima)

);


-- "ASOCIADO" TABLE
CREATE TABLE IF NOT EXISTS ASOCIADOS
(
    id_asociado       int NOT NULL AUTO_INCREMENT PRIMARY KEY,
    nombre_asociado   varchar(20),
    apellido_asociado varchar(20)
);

-- "DETALLE ASOCIADO" TABLE
CREATE TABLE IF NOT EXISTS DETALLE_ASOCIADO
(
    id_victima    int NOT NULL,
    id_asociado   int NOT NULL,
    fecha_conocio varchar(50),
    FOREIGN KEY (id_victima) REFERENCES VICTIMAS (id_victima),
    FOREIGN KEY (id_asociado) REFERENCES ASOCIADOS (id_asociado)
);


-- "UBICACION" TABLE
CREATE TABLE IF NOT EXISTS UBICACION
(
    id_ubicacion     int NOT NULL AUTO_INCREMENT PRIMARY KEY,
    nombre_ubicacion VARCHAR(100)
);

-- "DETALLE_UBICACION" TABLE
CREATE TABLE IF NOT EXISTS DETALLE_UBICACION
(
    id_victima    int,
    id_ubicacion  int,
    fecha_llegada varchar(50),
    fecha_salida  varchar(50),
    FOREIGN KEY (id_victima) REFERENCES VICTIMAS (id_victima),
    FOREIGN KEY (id_ubicacion) REFERENCES UBICACION (id_ubicacion)
);


-- "DETALLE_CONTACTO" TABLE
CREATE TABLE IF NOT EXISTS DETALLE_CONTACTO
(
    id_victima int,
    id_asociado int,
    tipo_contacto VARCHAR(30),
    fecha_inicio_contacto VARCHAR(50),
    fecha_fin_contacto VARCHAR(50),
    FOREIGN KEY (id_victima) REFERENCES VICTIMAS (id_victima),
    FOREIGN KEY (id_asociado) REFERENCES ASOCIADOS (id_asociado)
);
