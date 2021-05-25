import React, { Component } from 'react';
import "../assets/css/categoriesContainer.css";
import CategoriesCard from "./CategoriesCard";

let guitarraElectrica = {
    name: "Guitarra Electrica",
    total: "13",
};

let guitarraClasica = {
    name: "Guitarra Clasica",
    total: "3",
};

let bajo = {
    name: "Bajo",
    total: "1",
};

let categories = [guitarraElectrica, guitarraClasica, bajo];

class Categories extends Component {
    constructor() {
        super();
        this.state = null;
    }

    async componentDidMount() {
        // const response = await fetch('');
        // const categories = response.json();

        // this.setState();
    }

    render() {
        return (
            <div id="categories-container">
                {categories.map((objets, i) => {
                    return <CategoriesCard {...objets} key={i} />;
                })}
            </div>
        );
    };
}

export default Categories;