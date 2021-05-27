import React, { Component } from "react";
import { BASE_URL } from "../env";
import "../assets/css/categoriesContainer.css";
import CategoriesCard from "./CategoriesCard";

class Categories extends Component {
	constructor() {
		super();
		this.state = { categories: [] };
	}

	async componentDidMount() {
		const response = await fetch(`${BASE_URL}/api/productos`);
		const responseJson = await response.json();

		this.setState({
			categories: responseJson.countByCategory,
		});
	}

	render() {
		return (
			<div id="categories-container">
				{this.state.categories.length > 0
					? this.state.categories.map((objets, i) => {
							return <CategoriesCard {...objets} key={i} />;
					  })
					: "Categorias no enocntradas"}
			</div>
		);
	}
}

export default Categories;
