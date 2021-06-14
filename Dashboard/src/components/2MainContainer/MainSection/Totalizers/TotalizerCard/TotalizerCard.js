import "./TotalizerCard.css";

export default function TotalizerCard(props) {
	if (props.noData) {
		return (
			<div className={`totalizer-card card-top-border-tertiary`}>
				<div className="card-icon">
					<i className={`fas fa-times fa-2x`}></i>
				</div>
				<div className="card-information">
					<div className="title">Infomación no encontrada</div>
				</div>
			</div>
		);
	}

	return (
		<div className={`totalizer-card card-top-border-${props.color}`}>
			<div className="card-icon">
				<i className={`fas ${props.icon} fa-2x`}></i>
			</div>
			<div className="card-information">
				<div className="title">TOTAL DE {props.name}</div>
				<div className="total">{props.total}</div>
			</div>
		</div>
	);
}
