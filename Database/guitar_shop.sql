CREATE DATABASE  IF NOT EXISTS guitar_shop;
USE guitar_shop;

DROP TABLE IF EXISTS roles;
CREATE TABLE roles (
	id INT UNSIGNED AUTO_INCREMENT,
	nombre VARCHAR(200),
	PRIMARY KEY (id)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

DROP TABLE IF EXISTS usuarios; 
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
	PRIMARY KEY (id),
	CONSTRAINT usuarios_roll_id_foreign FOREIGN KEY (roll_id) REFERENCES roles(id)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

DROP TABLE IF EXISTS carrito;
CREATE TABLE carrito  (
	id INT UNSIGNED AUTO_INCREMENT,
	usuario_id INT UNSIGNED NOT NULL,
	producto_id INT UNSIGNED NOT NULL,
	cantidad INT UNSIGNED NOT NULL,
	PRIMARY KEY (id),
	CONSTRAINT carrito_usuario_id_foreign FOREIGN KEY (usuario_id) REFERENCES usuarios(id),
	CONSTRAINT carrito_producto_id_foreign FOREIGN KEY (producto_id) REFERENCES productos(id)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

DROP TABLE IF EXISTS venta_total; 
CREATE TABLE venta_total (
	id INT UNSIGNED AUTO_INCREMENT,
	usuario_id INT UNSIGNED NOT NULL,
	numero_fc INT UNSIGNED,
	fecha_fc DATE,
	importe INT UNSIGNED,
	PRIMARY KEY (id),
	CONSTRAINT venta_total_usuario_id_foreign FOREIGN KEY (usuario_id) REFERENCES usuarios(id)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

DROP TABLE IF EXISTS venta_detalle;
CREATE TABLE venta_detalle (
	id INT UNSIGNED AUTO_INCREMENT,
	producto_id INT UNSIGNED NOT NULL,
	venta_id INT UNSIGNED NOT NULL,
	cantidad INT unsigned NOT NULL,
	precio INT unsigned NOT NULL,
	PRIMARY KEY (id),
	CONSTRAINT venta_detalle_producto_id_foreign FOREIGN KEY (producto_id) REFERENCES productos(id),
	CONSTRAINT venta_detalle_cantidad_id_foreign FOREIGN KEY (venta_id) REFERENCES venta_total(id)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

DROP TABLE IF EXISTS marcas;
CREATE TABLE marcas (
	id INT UNSIGNED AUTO_INCREMENT,
	nombre VARCHAR(500) NOT NULL, 
	PRIMARY KEY (id)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

DROP TABLE IF EXISTS modelos;
CREATE TABLE modelos (
	id INT UNSIGNED AUTO_INCREMENT,
	marca_id INT UNSIGNED NOT NULL,
	nombre VARCHAR(500) NOT NULL,
	PRIMARY KEY (id),
	CONSTRAINT modelos_marca_id_foreign FOREIGN KEY (marca_id) REFERENCES marcas(id)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

DROP TABLE IF EXISTS categorias;
CREATE TABLE categorias (
	id INT UNSIGNED AUTO_INCREMENT,
	nombre VARCHAR(500) NOT NULL,
	PRIMARY KEY (id)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

DROP TABLE IF EXISTS productos;
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
	PRIMARY KEY (id),
	CONSTRAINT productos_categoria_id_foreign FOREIGN KEY (categoria_id) REFERENCES categorias(id),
	CONSTRAINT productos_marca_id_foreign FOREIGN KEY (marca_id) REFERENCES marcas(id),
	CONSTRAINT productos_modelo_id_foreign FOREIGN KEY (modelo_id) REFERENCES modelos(id),
	CONSTRAINT productos_creado_por_foreign FOREIGN KEY (creado_por) REFERENCES usuarios(id),
	CONSTRAINT productos_actualizado_por_foreign FOREIGN KEY (actualizado_por) REFERENCES usuarios(id)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

DROP TABLE IF EXISTS imagenes;
CREATE TABLE imagenes (
	id INT UNSIGNED  AUTO_INCREMENT,
	producto_id INT UNSIGNED NOT NULL,
	rutanombre VARCHAR(500) NOT NULL,
	PRIMARY KEY (id),
	CONSTRAINT imagenes_producto_id_foreign FOREIGN KEY (producto_id) REFERENCES productos(id)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

