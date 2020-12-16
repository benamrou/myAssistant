-- Use sys as SYSDBA user
-- Need to set variable to allow script
alter session set "_ORACLE_SCRIPT"=true; 
-- Create he DB_DESIGN user
CREATE USER db_design IDENTIFIED BY "db_design";

-- Grant
grant create session to db_design;
grant create table to db_design;
alter user db_design quota unlimited on users;
grant create view, create procedure, create sequence to db_design;
GRANT ALL PRIVILEGES TO db_design;
