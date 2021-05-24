import '../assets/css/totalizer.css';
import TotalizerCard from './TotalizerCard';

let productos = {
  name:'PRODUCTOS',
  total: '13',
  icon:'fa-guitar',
  color: 'primary'
}

let categorias = {
  name:'CATEGORIAS',
  total: '3',
  icon:'fa-clipboard-list',
  color: 'secondary'
}

let usuarios = {
  name:'USUARIOS',
  total: '7',
  icon:'fa-user',
  color: 'tertiary'
}

let cartProps = [productos, categorias, usuarios];

function Totalizers() {
  return (
    <div id="totalizer">
      {
        cartProps.map((objets, i) => {
          return <TotalizerCard {...objets} key={i}/>
        })
      }
    </div>
  );
}

export default Totalizers;