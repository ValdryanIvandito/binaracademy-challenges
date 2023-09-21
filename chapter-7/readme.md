1. SIAPKAN FILE .env
touch .env

2. COPY PARAMETER - PARAMETER INI KE FILE .env
DB_HOST = localhost
DB_PORT = 5432
DB_NAME = fswc7
DB_USER = postgres
DB_PASS = admin
SECRET_LOGIN = secretserver
JWT_SECRET = secretjwt

3. BUAT DATABASE BERNAMA fswc7 DI POSTGRESQL

4. BUAT TABLE user_game dan admin_game DI DATABASE fswc7, EKSEKUSI QUERY BERIKUT:

CREATE SEQUENCE user_id_seq;

CREATE TABLE IF NOT EXISTS user_game
(
    id integer NOT NULL DEFAULT nextval('user_id_seq'::regclass),
    username character varying COLLATE pg_catalog."default",
    password character varying COLLATE pg_catalog."default",
	sex character varying COLLATE pg_catalog."default",
	hobby character varying COLLATE pg_catalog."default",
	scores integer NOT NULL,
    created_at timestamp with time zone DEFAULT now(),
    CONSTRAINT user_pk PRIMARY KEY (id)
)

TABLESPACE pg_default;

ALTER TABLE IF EXISTS user_game
    OWNER to postgres;


CREATE SEQUENCE admin_id_seq;

CREATE TABLE IF NOT EXISTS admin_game
(
    id integer NOT NULL DEFAULT nextval('admin_id_seq'::regclass),
    username character varying COLLATE pg_catalog."default",
    password character varying COLLATE pg_catalog."default",
    created_at timestamp with time zone DEFAULT now(),
    CONSTRAINT admin_pk PRIMARY KEY (id)
)

TABLESPACE pg_default;

ALTER TABLE IF EXISTS admin_game
    OWNER to postgres;

5. ISI TABLE admin_game UNTUK LOGIN SUPER USER ATAU OTORITAS SEBAGAI ADMIN, EKSEKUSI QUERY BERIKUT:

INSERT INTO admin_game(username, password)
VALUES ('admin', 'eded7ab5cb1b7da75aaa76a8c778404cdce1fcc56f29cf05902694827ac842e4');

INSERT INTO admin_game(username, password)
VALUES ('ADMIN', 'eded7ab5cb1b7da75aaa76a8c778404cdce1fcc56f29cf05902694827ac842e4');

INSERT INTO admin_game(username, password)
VALUES ('admin', 'eded7ab5cb1b7da75aaa76a8c778404cdce1fcc56f29cf05902694827ac842e4');

CATATAN: admin atau ADMIN atau Admin adalah super user untuk masuk ke halaman admin-dashboard
USERNAME: admin atau ADMIN atau Admin
PASSWORD: gorosei