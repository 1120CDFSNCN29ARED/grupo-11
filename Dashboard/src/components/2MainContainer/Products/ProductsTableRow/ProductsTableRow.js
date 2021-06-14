import "./productsTableRow.css";

export default function ProductsTableRow(props) {
	const precioWithFormat = parseInt(props.precio).toLocaleString("es-AR", {
		style: "currency",
		currency: "ARS",
	});
	return (
		<tr>
			<td>{props.nombre}</td>
			<td>{props.descripcion}</td>
			<td>{props.categoria}</td>
			<td>{props.marca}</td>
			<td>{props.modelo}</td>
			<td>{precioWithFormat}</td>
			<td>{props.stock}</td>
		</tr>
	);
}
