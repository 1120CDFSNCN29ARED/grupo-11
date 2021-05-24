import '../assets/css/products.css';
import ProductsTableRow from './ProductsTableRow';

let productsData = [
  {
    Name: 'Fender Stratocaster',
    Description: '123',
    Category: 'Guitarra Electrica',
    Brand: 'Fender',
    Model: 'Stratocaster',
    Price: 100000,
    Stock: 10
  },
  {
    Name: 'Gibson Les Paul',
    Description: '123',
    Category: 'Guitarra Electrica',
    Brand: 'Gibson',
    Model: 'Les Paul',
    Price: 110000,
    Stock: 5
  }
];

function Products() {
  return (
    <div id="products-table-container">
      <table>
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
          {
            productsData.map((row , i) => {
              return <ProductsTableRow { ...row} key={i}/>
            })
          }
        </tbody>
      </table>
    </div>
  );
}

export default Products;