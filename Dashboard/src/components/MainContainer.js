import '../assets/css/mainContainer.css';
import MainSection from './MainSection';
import Categories from './Categories';
import Products from './Products';

function MainContainer() {
  return (
    <div id="main-container">
      <MainSection />
      <Categories />
      <Products />
    </div>
  );
}

export default MainContainer;
