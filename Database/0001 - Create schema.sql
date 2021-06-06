DROP DATABASE IF EXISTS guitar_shop;
CREATE DATABASE guitar_shop;
USE guitar_shop;

CREATE TABLE `roles` (
	`id` INT UNSIGNED NOT NULL AUTO_INCREMENT,
	`nombre` VARCHAR(100) NOT NULL,
	PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

CREATE TABLE `usuarios` (
	`id` INT UNSIGNED NOT NULL AUTO_INCREMENT,
	`nombre` VARCHAR(500) NOT NULL,
	`apellido` VARCHAR(500) NOT NULL,
	`email` VARCHAR(500) NOT NULL UNIQUE,
	`contrasena` VARCHAR(500) NOT NULL,
	`avatar` VARCHAR(500) NOT NULL,
	`rol_id` INT UNSIGNED NOT NULL,
	`creado_en` DATE NOT NULL,
	`actualizado_en` DATE NULL,
	`borrado` BOOLEAN NOT NULL DEFAULT 0,
	PRIMARY KEY (`id`),
	FOREIGN KEY (`rol_id`) REFERENCES `roles`(`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

CREATE TABLE `marcas` (
	`id` INT UNSIGNED NOT NULL AUTO_INCREMENT,
	`nombre` VARCHAR(500) NOT NULL, 
	PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

CREATE TABLE `modelos` (
	`id` INT UNSIGNED NOT NULL AUTO_INCREMENT,
	`marca_id` INT UNSIGNED NOT NULL,
	`nombre` VARCHAR(500) NOT NULL,
	PRIMARY KEY (`id`),
	FOREIGN KEY (`marca_id`) REFERENCES `marcas`(`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

CREATE TABLE `categorias` (
	`id` INT UNSIGNED NOT NULL AUTO_INCREMENT,
	`nombre` VARCHAR(500) NOT NULL,
	PRIMARY KEY (id)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

CREATE TABLE `productos` (
	`id` INT UNSIGNED NOT NULL AUTO_INCREMENT,
	`nombre` VARCHAR(500) NOT NULL,
	`descripcion` VARCHAR(500) NULL,
	`categoria_id` INT UNSIGNED NOT NULL,
	`marca_id` INT UNSIGNED NOT NULL,
	`modelo_id` INT UNSIGNED NOT NULL,
	`precio` INT UNSIGNED NOT NULL,
	`stock_disponible` INT UNSIGNED NOT NULL DEFAULT 0,
	`mas_vendido` BOOLEAN NOT NULL DEFAULT 0 ,
	`novedades` BOOLEAN NOT NULL DEFAULT 1,
	`creado_por` INT UNSIGNED NOT NULL,
	`creado_en` DATE NOT NULL,
	`actualizado_por` INT UNSIGNED NULL,
	`actualizado_en` DATE NULL,
	`borrado` BOOLEAN NOT NULL DEFAULT 0,
	PRIMARY KEY (`id`),
	FOREIGN KEY (`categoria_id`) REFERENCES `categorias`(`id`),
	FOREIGN KEY (`marca_id`) REFERENCES `marcas`(`id`),
	FOREIGN KEY (`modelo_id`) REFERENCES `modelos`(`id`),
	FOREIGN KEY (`creado_por`) REFERENCES `usuarios`(`id`),
	FOREIGN KEY (`actualizado_por`) REFERENCES `usuarios`(`id`)	
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

CREATE TABLE `ventas_encabezado` (
	`id` INT UNSIGNED NOT NULL AUTO_INCREMENT,
	`usuario_id` INT UNSIGNED NOT NULL,
	`numero_factura` INT UNSIGNED NOT NULL,
	`fecha_emision` DATE NOT NULL,
	`importe` INT UNSIGNED NOT NULL,
	PRIMARY KEY (`id`),
	FOREIGN KEY (`usuario_id`) REFERENCES `usuarios`(`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

CREATE TABLE `ventas_detalle` (
	`id` INT UNSIGNED NOT NULL AUTO_INCREMENT,
	`producto_id` INT UNSIGNED NOT NULL,
	`venta_encabezado_id` INT UNSIGNED NOT NULL,
	`cantidad` INT UNSIGNED NOT NULL,
	`precio` INT UNSIGNED NOT NULL,
	PRIMARY KEY (`id`),
	FOREIGN KEY (`producto_id`) REFERENCES `productos`(`id`),
	FOREIGN KEY (`venta_encabezado_id`) REFERENCES `ventas_encabezado`(`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

CREATE TABLE `imagenes` (
	`id` INT UNSIGNED NOT NULL AUTO_INCREMENT,
	`producto_id` INT UNSIGNED NOT NULL,
	`ruta` VARCHAR(500) NOT NULL,
	PRIMARY KEY (`id`),
	FOREIGN KEY (`producto_id`) REFERENCES `productos`(`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

CREATE TABLE `carrito` (
	`id` INT UNSIGNED NOT NULL AUTO_INCREMENT,
	`usuario_id` INT UNSIGNED NOT NULL,
	`producto_id` INT UNSIGNED NOT NULL,
	`cantidad` INT UNSIGNED NOT NULL ,
	PRIMARY KEY (`id`),
	FOREIGN KEY (`usuario_id`) REFERENCES `usuarios`(`id`),
	FOREIGN KEY (`producto_id`) REFERENCES `productos`(`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;