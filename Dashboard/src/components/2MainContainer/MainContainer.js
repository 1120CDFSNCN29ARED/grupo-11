import "./MainContainer.css";
import Categories from "./Categories/Categories";
import Footer from "./Footer/Footer";
import MainSection from "./MainSection/MainSection";
import Products from "./Products/Products";

function MainContainer() {
	return (
		<div id="main-container">
			<MainSection />
			<Categories />
			<Products />
			<Footer />
		</div>
	);
}

export default MainContainer;
