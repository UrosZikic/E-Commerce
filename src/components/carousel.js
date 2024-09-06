import Slider from "react-slick";
import { useProducts } from "../useProducts";
import "../styles/slick.css";

export default function MultipleItems() {
  const { data } = useProducts();

  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 4,
    slidesToScroll: 2,
  };
  return (
    <div className="slider-container defaultWidth">
      <Slider {...settings}>
        {data &&
          data.map(
            (item, id) =>
              item.specials && (
                <div
                  className="caroItem"
                  style={{
                    width: "100%",
                    maxWidth: "30rem",
                    padding: "0 1rem",
                  }}
                  key={item + Math.random() * 200 + id}
                >
                  <a href={`/pages/product?id=${item.id}`}>
                    <img
                      src={"../images/" + item.image + ".webp"}
                      alt={item.description}
                      style={{ width: "100%" }}
                    />
                    <p style={{ color: "white" }}>{item.name}</p>
                  </a>
                </div>
              )
          )}
      </Slider>
    </div>
  );
}
