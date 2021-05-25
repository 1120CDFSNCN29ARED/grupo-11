import "../assets/css/categoryCard.css";

function CategoriesCard(props) {
	return (
		<div className="category-card">
			<div className="catetory-name">{props.categoria}</div>
			<div className="catetory-total">{props.total}</div>
		</div>
	);
}

export default CategoriesCard;
