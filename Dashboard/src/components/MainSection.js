import React, { Component } from 'react';
import { BASE_URL } from '../env';
import "../assets/css/mainSection.css";
import Totalizers from "./Totalizers";
import LastProduct from "./LastProduct";

class MainSection extends Component {
    constructor() {
        super();
        this.state = { ultimoProducto: null };
    }

    async componentDidMount() {
        const apiResponse = await fetch(`${ BASE_URL }/api/productos`);
        const response = await apiResponse.json();
        const products = response.products;

        const lastProduct = products.reduce((accumulator, currentValue) => 
            accumulator.id > currentValue.id ? accumulator : currentValue
        );
        
        this.setState({
            ultimoProducto: lastProduct
        });
    }

    render() {
        return (
            <div id="main-section">
                <Totalizers />
                {
                    this.state.ultimoProducto ?
                        <LastProduct {...this.state.ultimoProducto} /> : <LastProduct noData = { true } />
                }
            </div>
        );
    }
}

export default MainSection;