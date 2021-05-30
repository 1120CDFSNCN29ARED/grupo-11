import React, { Component } from "react";
import { BASE_URL } from "../../../env";
import "./Totalizer.css";
import TotalizerCard from "./TotalizerCard/TotalizerCard";

export default class Totalizers extends Component {
	constructor() {
		super();
		this.state = { totalizers: [] };
	}

	async componentDidMount() {
		const productsResponse = await fetch(`${BASE_URL}/api/productos`);
		const usersResponse = await fetch(`${BASE_URL}/api/usuarios`);
		const productsJson = await productsResponse.json();
		const usersJson = await usersResponse.json();

		let productos = {
			name: "PRODUCTOS",
			total: productsJson.count,
			icon: "fa-guitar",
			color: "primary",
		};

		let categorias = {
			name: "CATEGORIAS",
			total: productsJson.countByCategory.length,
			icon: "fa-clipboard-list",
			color: "secondary",
		};

		let usuarios = {
			name: "USUARIOS",
			total: usersJson.meta.TotalUsuarios,
			icon: "fa-user",
			color: "tertiary",
		};

		this.setState({ totalizers: [productos, categorias, usuarios] });
	}

	render() {
		return (
			<div id="totalizer">
				{this.state.totalizers.length > 0 ? (
					this.state.totalizers.map((objets, i) => {
						return <TotalizerCard {...objets} key={i} />;
					})
				) : (
					<TotalizerCard noData={true} />
				)}
			</div>
		);
	}
}
