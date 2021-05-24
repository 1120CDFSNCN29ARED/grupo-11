import '../assets/css/categoriesContainer.css'
import CategoriesCard from './CategoriesCard';

let guitarraElectrica = {
  name:'Guitarra Electrica',
  total: '13'
}

let guitarraClasica = {
  name:'Guitarra Clasica',
  total: '3'
}

let bajo = {
  name:'Bajo',
  total: '1'
}

let categories = [guitarraElectrica, guitarraClasica, bajo];

function Categories() {
  return (
    <div id="categories-container">
      {
        categories.map((objets, i) => {
          return <CategoriesCard {...objets} key={i}/>
        })
      }
    </div>
  );
}

export default Categories;
