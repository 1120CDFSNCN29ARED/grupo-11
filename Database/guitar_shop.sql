use Guitar_Shop;
CREATE TABLE Roles (
	id INT UNSIGNED PRIMARY KEY AUTO_INCREMENT,
	nombre VARCHAR(200)
);
CREATE TABLE Usuarios (
	id INT UNSIGNED PRIMARY KEY AUTO_INCREMENT,
	nombre VARCHAR(500) NOT NULL,
	apellido VARCHAR(500) NOT NULL,
	email VARCHAR(500) NOT NULL,
	contrasena VARCHAR(500) NOT NULL,
	avatar VARCHAR(500) NOT NULL,
	roll_ID INT UNSIGNED NOT NULL,
	FOREIGN KEY (roll_ID) REFERENCES roles(id),
	creadoEn DATE NOT NULL,
	actualizadoEn DATE NOT NULL,
	borrado Boolean NOT NULL
);
create table CARRITO (
	id INT UNSIGNED PRIMARY KEY AUTO_INCREMENT,
	usuario_ID INT UNSIGNED NOT NULL,
	FOREIGN KEY (usuario_ID) REFERENCES usuarios(id),
	producto_ID INT UNSIGNED NOT NULL,
	cantidad INT UNSIGNED NOT NULL
);
create table VentaTotal (
	id INT UNSIGNED PRIMARY KEY AUTO_INCREMENT,
	usuario_ID INT UNSIGNED NOT NULL,
	FOREIGN KEY (usuario_ID) REFERENCES usuarios(id),
	numero_FC INT UNSIGNED,
	fecha_FC DATE,
	importe INT UNSIGNED
);
create table VentaDetalle (
	id INT UNSIGNED PRIMARY KEY AUTO_INCREMENT,
	producto_ID INT UNSIGNED NOT NULL,
	venta_ID INT UNSIGNED NOT NULL,
	FOREIGN KEY (venta_ID) REFERENCES ventatotal(id),
	cantidad INT unsigned NOT null,
	precio INT unsigned NOT null
);
create table Marcas (
	id INT UNSIGNED PRIMARY KEY AUTO_INCREMENT,
	nombre VARCHAR(500) NOT NULL
);
create table Modelos (
	id INT UNSIGNED PRIMARY KEY AUTO_INCREMENT,
	marca_ID INT UNSIGNED NOT NULL,
	FOREIGN KEY (marca_ID) REFERENCES marcas(id),
	nombre VARCHAR(500) NOT NULL
);
create table categorias (
	id INT UNSIGNED PRIMARY KEY AUTO_INCREMENT,
	nombre VARCHAR(500) NOT NULL
);
CREATE TABLE Productos (
	id INT UNSIGNED PRIMARY KEY AUTO_INCREMENT,
	nombre VARCHAR(500) NOT NULL,
	categoria_ID INT UNSIGNED NOT NULL,
	FOREIGN KEY (categoria_ID) REFERENCES categorias(id),
	marca_ID INT UNSIGNED NOT NULL,
	FOREIGN KEY (marca_ID) REFERENCES marcas(id),
	modelo_ID INT UNSIGNED NOT NULL,
	FOREIGN KEY (modelo_ID) REFERENCES modelos(id),
	precio INT unsigned NOT null,
	stock_disponible INT unsigned NOT null,
	mas_vendido Boolean NOT null,
	novedades Boolean NOT null,
	creadoPor INT UNSIGNED NOT NULL,
	FOREIGN KEY (creadoPor) REFERENCES usuarios(id),
	creadoEn DATE NOT NULL,
	actualizadoPor INT UNSIGNED NOT NULL,
	FOREIGN KEY (actualizadoPor) REFERENCES usuarios(id),
	actualizadoEn DATE NOT NULL,
	borrado Boolean NOT NULL
);
create table imagenes (
	id INT UNSIGNED PRIMARY KEY AUTO_INCREMENT,
	producto_ID INT UNSIGNED NOT NULL,
	FOREIGN KEY (producto_ID) REFERENCES productos(id),
	rutanombre VARCHAR(500) NOT NULL
);
ALTER TABLE carrito 
	add FOREIGN KEY (producto_ID) REFERENCES productos(id);
;
ALTER TABLE ventadetalle
	add FOREIGN KEY (producto_ID) REFERENCES productos(id);
;