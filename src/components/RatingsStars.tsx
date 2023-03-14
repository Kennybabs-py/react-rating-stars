import { useState, useRef } from "react";
import { AiFillStar, AiOutlineStar } from "../assets/icons";

import "../styles/ratingstars.css";

type StarsPropType = {
  totalStars?: number;
  precision?: number;
  color?: string;
};

type MouseType = React.MouseEvent<HTMLDivElement, MouseEvent>;

export default function RatingStars(props: StarsPropType) {
  const { totalStars = 5, precision = 0.25, color = "#000" } = props;

  const [activeStar, setActiveStar] = useState<number>(-1);
  const [hoverActiveStar, setHoverActiveStar] = useState<number>(-1);
  const [isHovered, setIsHovered] = useState(false);

  const ratingBoxRef = useRef<HTMLDivElement>(null);

  function handleChangeRating(e: MouseType): number {
    const boxRef = ratingBoxRef.current;

    if (boxRef !== null) {
      const { width, left } = boxRef.getBoundingClientRect();
      const percentOfStars = (e.clientX - left) / width;
      const numberOfStars = percentOfStars * totalStars;
      const nearestNumber =
        Math.round((numberOfStars + precision / 2) / precision) * precision;

      return Number(
        nearestNumber.toFixed(precision.toString().split(".")[1]?.length || 0)
      );
    }

    return activeStar;
  }

  function handleClick(e: MouseType) {
    setIsHovered(false);
    setActiveStar(handleChangeRating(e));
  }

  function handleMouseMove(e: MouseType) {
    setIsHovered(true);
    setHoverActiveStar(handleChangeRating(e));
  }

  function handleMouseLeave(e: MouseType) {
    setHoverActiveStar(-1);
    setIsHovered(false);
  }

  return (
    <div
      className="outer_rating_stars__container"
      onClick={handleClick}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      ref={ratingBoxRef}
    >
      {[...new Array(totalStars)].map((arr, index) => {
        const activeState = isHovered ? hoverActiveStar : activeStar;

        const showEmptyIcon = activeState === -1 || activeState < index + 1;

        const isActiveRating = activeState !== 1;
        const isRatingWithPrecision = activeState % 1 !== 0;
        const isRatingEqualToIndex = Math.ceil(activeState) === index + 1;
        const showRatingWithPrecision =
          isActiveRating && isRatingWithPrecision && isRatingEqualToIndex;

        return (
          <div className="inner_rating_stars__container" key={index}>
            <div
              className="filled_star__container"
              style={{
                width: showRatingWithPrecision
                  ? `${(activeState % 1) * 100}%`
                  : "0%",
              }}
            >
              <AiFillStar color={color} />
            </div>

            <div>
              {showEmptyIcon ? (
                <AiOutlineStar color={color} />
              ) : (
                <AiFillStar color={color} />
              )}
            </div>
          </div>
        );
      })}
    </div>
  );
}
