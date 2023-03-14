import { useState, useEffect } from "react";
import { AiFillStar, AiOutlineStar } from "../assets/icons";

import "../styles/ratingstars.css";

type StarsPropType = {
  totalStars?: number;
  rating?: number;
  precision?: number;
  color?: string;
};

export default function StaticRatingStars(props: StarsPropType) {
  const {
    totalStars = 5,
    rating = 4.5,
    precision = 0.25,
    color = "#000",
  } = props;

  const [activeStar, setActiveStar] = useState<number>(rating);

  useEffect(() => {
    function handleChangeRating(value: number): number {
      const numberOfStars = value;
      const nearestNumber =
        Math.round((numberOfStars + precision / 2) / precision) * precision;

      return Number(
        nearestNumber.toFixed(precision.toString().split(".")[1]?.length || 0)
      );
    }

    setActiveStar(handleChangeRating(rating));

    handleChangeRating(rating);
  }, []);

  return (
    <div className="outer_rating_stars__container">
      {[...new Array(totalStars)].map((arr, index) => {
        const activeState = activeStar;

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
