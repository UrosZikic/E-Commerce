import Slider from "react-slick";
import { useProducts } from "../useProducts";
import "../styles/slick.css";

export default function MultipleItems() {
  const { data } = useProducts();
  const caroData = data && data;
  console.log(caroData, 1);
  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 4,
    slidesToScroll: 2,
    responsive: [
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: 3,
          slidesToScroll: 1,
          infinite: true,
          dots: true,
        },
      },
      {
        breakpoint: 600,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 1,
        },
      },
      {
        breakpoint: 400,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
        },
      },
    ],
  };
  return (
    <div className="slider-container defaultWidth">
      <>
        <Slider {...settings}>
          {caroData &&
            caroData.map(
              (item, id) =>
                item.specials && (
                  <div
                    className="caroItem"
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
      </>
    </div>
  );
}
