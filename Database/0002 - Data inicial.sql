USE guitar_shop;

INSERT INTO roles (id, nombre)
VALUES 
(1, 'Admin'),
(2, 'Usuario');

INSERT INTO usuarios (id, nombre, apellido, email, contrasena, avatar, rol_id, creado_en)
VALUES 
(1, 'José', 'Pérez', 'joseperez@gmail.com', '$2a$10$FRfhNH2pqp9KW/9rYeeSxOiRzL75L1cGM7rBSUVQG6..rAxTffIH6', '1615981820188.bmp', 1, '2021-04-21'),
(2, 'Diego', 'Iribarren', 'diegoiribarren2015@gmail.com', '$2a$10$qkI1Ck0LfRz1b5KWqv2ud.jat8C04Gj37UUTvCDs1a1wQsLpsao5a', '1615981956801.jpg', 1, '2021-04-21'),
(3, 'Mariano', 'Acevedo', 'marianoezequielacevedo@hotmail.com', '$2a$10$eEb70NO2DQZHpUQWUldN/OhwRRi6vxKtJ9WCY..wG3LIEnGx8lixW', '1616464599844.jpg', 1, '2021-04-21');

INSERT INTO marcas (id, nombre)
VALUES 
(1, 'Fender'),
(2, 'Taylor'),
(3, 'Gibson'),
(4, 'Jackson');

INSERT INTO modelos (id, marca_id, nombre)
VALUES 
(1, 1, 'Stratocaster'),
(2, 1, 'Telecaster'),
(3, 1, 'Precision'),
(4, 2, 'GS Mini'),
(5, 2, '210ce Plus'),
(6, 3, 'SG'),
(7, 3, 'Les Paul'),
(8, 4, 'King V');

INSERT INTO categorias (id, nombre)
VALUES
(1, 'Guitarras Clásicas'),
(2, 'Guitarras Eléctricas'),
(3, 'Bajos');

INSERT INTO productos (id, nombre, categoria_id, marca_id, modelo_id, precio, mas_vendido, novedades, creado_por, creado_en, stock_disponible)
VALUES 
(1, 'Fender Stratocaster', 2, 1, 1, 100000, 1, 0, 1, '2021-04-21', 100),
(2, 'Taylor GS Mini', 1, 2, 4, 75000, 1, 0, 1, '2021-04-21', 100),
(3, 'Fender Telecaster', 2, 1, 2, 110000, 1, 0, 1, '2021-04-21', 100),
(4, 'Jackson King V', 2, 4, 8, 80000, 1, 0, 1, '2021-04-21', 100),
(5, 'Gibson Les Paul', 2, 3, 7, 100000, 0, 1, 1, '2021-04-21', 100),
(6, 'Fender Precision', 3, 1, 3, 80000, 0, 1, 1, '2021-04-21', 100),
(7, 'Gibson SG', 2, 3, 6, 100000, 0, 1, 1, '2021-04-21', 100),
(8, 'Taylor 210ce Plus', 1, 2, 5, 90000, 0, 1, 1, '2021-04-21', 100);

INSERT INTO imagenes (id, producto_id, ruta)
VALUES 
(1, 1, 'fender-stratocaster.jpg'),
(2, 2, 'taylor-gs-mini.jpg'),
(3, 3, 'fender-telecaster.jpg'),
(4, 4, 'jackson-king-v.jpg'),
(5, 5, 'gibson-les-paul.jpg'),
(6, 6, 'fender-precision.jpg'),
(7, 7, 'gibson-sg.jpg'),
(8, 8, 'taylor-210ce-plus.jpg'),
(9, 1, 'Fender-American-Professional-Stratocaster.png');
