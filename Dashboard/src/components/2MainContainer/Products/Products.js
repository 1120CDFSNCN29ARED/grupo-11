import React, { Component } from "react";
import { BASE_URL } from "../../env";
import "./Products.css";
import ProductsTableRow from "./ProductsTableRow/ProductsTableRow";

export default class Products extends Component {
	constructor() {
		super();
		this.state = { products: [] };
	}

	async componentDidMount() {
		const response = await fetch(`${BASE_URL}/api/productos`);
		const responseJson = await response.json();

		this.setState({
			products: responseJson.products,
		});
	}

	render() {
		return (
			<div id="products-table-container">
				<table id="products-table">
					<thead>
						<tr>
							<th>Nombre</th>
							<th>Descripcion</th>
							<th>Categoria</th>
							<th>Marca</th>
							<th>Modelo</th>
							<th>Precio</th>
							<th>Stock</th>
						</tr>
					</thead>
					<tbody>
						{this.state.products.length > 0 ? (
							this.state.products.map((objets, i) => {
								return <ProductsTableRow {...objets} key={i} />;
							})
						) : (
							<tr></tr>
						)}
					</tbody>
				</table>
			</div>
		);
	}
}
