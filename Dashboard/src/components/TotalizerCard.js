import '../assets/css/totalizerCard.css'

function TotalizerCard(props) {
  return (
    <div className={`totalizer-card card-top-border-${ props.color }`}>
      <div className="card-icon">
        <i className={`fas ${ props.icon } fa-2x`}></i>
      </div>
      <div className="card-information">
        <div className="title">TOTAL DE { props.name }</div>
        <div className="total">{ props.total }</div>
      </div>
    </div>
  );
}

export default TotalizerCard;
