import { BASE_URL } from "../../../env";
import "./LastProduct.css";
import missingImage from "./missing-image.jpg";

export default function LastProduct(props) {
	if (props.noData) {
		return (
			<div id="last-created-product">
				<div className="section-title">ULTIMO PRODUCTO CREADO</div>
				<div className="product-section">Producto no encontrado</div>
			</div>
		);
	}

	const precioWithFormat = parseInt(props.precio).toLocaleString("es-AR", {
		style: "currency",
		currency: "ARS",
	});
	const imageURL = props.imagenes[0] ? `${BASE_URL}${props.imagenes[0]}` : missingImage;

	return (
		<div id="last-created-product">
			<div className="section-title">ULTIMO PRODUCTO CREADO</div>
			<div className="product-section">
				<div id="product-image">
					<img src={imageURL} alt="imagen producto"></img>
				</div>
				<div id="product-information">
					<div id="product-header">
						<div id="product-title">{props.nombre}</div>
						<div id="product-brand-model">
							{props.marca} - {props.modelo}
						</div>
					</div>
					<div id="product-description">{props.descripcion}</div>
					<div id="product-price">{precioWithFormat}</div>
				</div>
			</div>
		</div>
	);
}
