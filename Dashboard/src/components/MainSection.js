import "../assets/css/mainSection.css";
import Totalizers from "./Totalizers";
import LastProduct from "./LastProduct";

let ultimoProducto = {
    name: "Fender Stratocaster",
    image: "lalala.png",
    description: "Esta es la descripcion del producto",
    price: "$ 100000",
};

function MainSection() {
    return (
        <div id="main-section">
            <Totalizers />
            <LastProduct {...ultimoProducto} />
        </div>
    );
}

export default MainSection;
