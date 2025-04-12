import { Rating, Star } from "@smastrom/react-rating";
import "@smastrom/react-rating/style.css";

const myStyles = {
  itemShapes: Star,
  activeFillColor: "white",
  activeBoxColor: "#0e82fd",
  inactiveFillColor: "white",
  inactiveBoxColor: "#0e82fd7d",
};

type RatingScoreProps = {
  value: number;
  width?: number;
};

export function RatingScore({ value, width = 115 }: RatingScoreProps) {
  return (
    <Rating
      style={{ maxWidth: width }}
      value={value}
      itemStyles={myStyles}
      spaceBetween="small"
      halfFillMode="box"
      readOnly
    />
  );
}
