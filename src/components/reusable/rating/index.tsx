import { Rating, Star } from "@smastrom/react-rating";
import "@smastrom/react-rating/style.css";

const myStyles = {
  itemShapes: Star,
  activeFillColor: "white",
  activeBoxColor: "#0e82fd",
  inactiveFillColor: "white",
  inactiveBoxColor: "#0e82fd7d",
};

export function RatingScore(value: any) {
  return (
    <Rating
      style={{ maxWidth: 115 }}
      value={value}
      itemStyles={myStyles}
      spaceBetween="small"
      halfFillMode="box"
      readOnly
    />
  );
}
