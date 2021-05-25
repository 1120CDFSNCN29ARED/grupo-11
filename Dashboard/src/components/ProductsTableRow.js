import "../assets/css/productsTableRow.css";

function ProductsTableRow(props) {
    return (
        <tr>
            <td>{props.Name}</td>
            <td>{props.Description}</td>
            <td>{props.Category}</td>
            <td>{props.Brand}</td>
            <td>{props.Model}</td>
            <td>{props.Price}</td>
            <td>{props.Stock}</td>
        </tr>
    );
}

export default ProductsTableRow;
