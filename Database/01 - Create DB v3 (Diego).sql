DROP DATABASE IF EXISTS guitar_shop;
CREATE DATABASE guitar_shop;
USE guitar_shop;

CREATE TABLE roles (
	id INT UNSIGNED AUTO_INCREMENT,
	nombre VARCHAR(200),
	PRIMARY KEY (id)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

CREATE TABLE usuarios (
	id INT UNSIGNED AUTO_INCREMENT,
	nombre VARCHAR(500) NOT NULL,
	apellido VARCHAR(500) NOT NULL,
	email VARCHAR(500) NOT NULL,
	contrasena VARCHAR(500) NOT NULL,
	avatar VARCHAR(500) NOT NULL,
	roll_id INT UNSIGNED NOT NULL,
	creadoEn DATE NOT NULL,
	actualizadoEn DATE NOT NULL,
	borrado Boolean NOT NULL,
	PRIMARY KEY (id)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

CREATE TABLE carrito  (
	id INT UNSIGNED AUTO_INCREMENT,
	usuario_id INT UNSIGNED NOT NULL,
	producto_id INT UNSIGNED NOT NULL,
	cantidad INT UNSIGNED NOT NULL,
	PRIMARY KEY (id)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

CREATE TABLE venta_total (
	id INT UNSIGNED AUTO_INCREMENT,
	usuario_id INT UNSIGNED NOT NULL,
	numero_fc INT UNSIGNED,
	fecha_fc DATE,
	importe INT UNSIGNED,
	PRIMARY KEY (id)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

CREATE TABLE venta_detalle (
	id INT UNSIGNED AUTO_INCREMENT,
	producto_id INT UNSIGNED NOT NULL,
	venta_id INT UNSIGNED NOT NULL,
	cantidad INT unsigned NOT NULL,
	precio INT unsigned NOT NULL,
	PRIMARY KEY (id)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

CREATE TABLE marcas (
	id INT UNSIGNED AUTO_INCREMENT,
	nombre VARCHAR(500) NOT NULL, 
	PRIMARY KEY (id)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

CREATE TABLE modelos (
	id INT UNSIGNED AUTO_INCREMENT,
	marca_id INT UNSIGNED NOT NULL,
	nombre VARCHAR(500) NOT NULL,
	PRIMARY KEY (id)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

CREATE TABLE categorias (
	id INT UNSIGNED AUTO_INCREMENT,
	nombre VARCHAR(500) NOT NULL,
	PRIMARY KEY (id)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

CREATE TABLE productos (
	id INT UNSIGNED AUTO_INCREMENT,
	nombre VARCHAR(500) NOT NULL,
	categoria_id INT UNSIGNED NOT NULL,
	marca_id INT UNSIGNED NOT NULL,
	modelo_id INT UNSIGNED NOT NULL,
	precio INT unsigned NOT null,
	stock_disponible INT unsigned NOT null,
	mas_vendido Boolean NOT NULL,
	novedades Boolean NOT NULL,
	creado_por INT UNSIGNED NOT NULL,
	creadoEn DATE NOT NULL,
	actualizado_por INT UNSIGNED NOT NULL,
	actualizadoEn DATE NOT NULL,
	borrado Boolean NOT NULL,
	PRIMARY KEY (id)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

CREATE TABLE imagenes (
	id INT UNSIGNED  AUTO_INCREMENT,
	producto_id INT UNSIGNED NOT NULL,
	rutanombre VARCHAR(500) NOT NULL,
	PRIMARY KEY (id)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

ALTER TABLE usuarios add FOREIGN KEY (roll_id) REFERENCES roles(id);
ALTER TABLE carrito add FOREIGN KEY (usuario_id) REFERENCES usuarios(id);
ALTER TABLE carrito add FOREIGN KEY (producto_ID) REFERENCES productos(id);
ALTER TABLE venta_total add FOREIGN KEY (usuario_id) REFERENCES usuarios(id);
ALTER TABLE venta_detalle add FOREIGN KEY (producto_id) REFERENCES productos(id);
ALTER TABLE venta_detalle add FOREIGN KEY (venta_id) REFERENCES venta_total(id);
ALTER TABLE modelos add FOREIGN KEY (marca_id) REFERENCES marcas(id);
ALTER TABLE productos add FOREIGN KEY (categoria_id) REFERENCES categorias(id);
ALTER TABLE productos add FOREIGN KEY (marca_id) REFERENCES marcas(id);
ALTER TABLE productos add FOREIGN KEY (modelo_id) REFERENCES modelos(id);
ALTER TABLE productos add FOREIGN KEY (creado_por) REFERENCES usuarios(id);
ALTER TABLE productos add FOREIGN KEY (actualizado_por) REFERENCES usuarios(id);
ALTER TABLE imagenes add FOREIGN KEY (producto_id) REFERENCES productos(id);
