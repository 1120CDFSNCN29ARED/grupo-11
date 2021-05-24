import '../assets/css/lastCreatedProduct.css';

function LastProduct(props) {
  return (
    <div id="last-created-product">
      <div className="section-title">
        ULTIMO PRODUCTO CREADO
      </div>
      <div className="product-section">
        <div id="product-image">
          <img /*src={`http://localhost:3001/public(/images/${ props.image }` }*/ alt="imagen producto"></img>
        </div>
        <div id="product-information">
          <div id="product-title">{ props.name }</div>
          <div id="product-description">{ props.description }</div>
          <div id="product-price">{ props.price }</div>
        </div>
      </div>
    </div>
  );
}

export default LastProduct;