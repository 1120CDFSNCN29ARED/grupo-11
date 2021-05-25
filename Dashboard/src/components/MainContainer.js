import "../assets/css/mainContainer.css";
import MainSection from "./MainSection";
import Categories from "./Categories";
import Products from "./Products";
import Footer from "./Footer";

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
