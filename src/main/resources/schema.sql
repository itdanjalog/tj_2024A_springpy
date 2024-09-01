-- drop database if exists springpy;
-- create database springpy;
-- use springpy;

drop table if exists user;
create table user(
    id int(10) unsigned NOT NULL auto_increment,
    name varchar(255) NOT NULL,
    age int(10) NOT NULL,
    primary key (id)
);
