// Massive charge from csv query

export const loadData = "\
    LOAD DATA LOCAL INFILE '/home/juan/Desktop/GRAND_VIRUS_EPICENTER.csv'\
    INTO TABLE temp_table\
    character set latin\
    fields terminated by ';'\
    lines terminated by '\r\n'\
    ignore 1 lines\
";

