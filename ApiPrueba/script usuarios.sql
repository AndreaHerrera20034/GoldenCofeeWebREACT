create database Prueba1;
use Prueba1;

CREATE TABLE usuarios (
	id INT AUTO_INCREMENT PRIMARY KEY,
    username VARCHAR(255) NOT NULL,
    email VARCHAR(255) NOT NULL,
    password VARCHAR(255) NOT NULL
);

SELECT * FROM usuarios;

SELECT * FROM usuarios WHERE username='Alondra' AND password='12345';
