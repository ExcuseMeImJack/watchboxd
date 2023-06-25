import "./ReviewsHistogram.css";

const ReviewsHistogram = ({ reviewCounter }) => {
  const highestRating = () => {
    let highest = 0;
    for (let i = 0; i < reviewCounter.length; i++) {
      if (Object.values(reviewCounter[i])[0] > highest) {
        highest = Object.values(reviewCounter[i])[0];
      }
    }
    return highest;
  };

  const calculatedHeight = (ratingCount) => {
    let height;
    if (Object.values(ratingCount) / highestRating() === 0) {
      height = 0.05 * 40;
    } else {
      height = (Object.values(ratingCount) / highestRating()) * 40;
    }
    return { height: height };
  };

  return (
    <div className="histogram-panel">
      {reviewCounter.map((ratingCount, i) => (
        <div
          id="histogram-bar"
          key={i}
          style={calculatedHeight(ratingCount)}
          title={`${
            Object.keys(ratingCount)[0] === "1"
              ? Object.keys(ratingCount) + " Star"
              : Object.keys(ratingCount) + " Stars"
          } | ${
            Object.values(ratingCount)[0] === 1
              ? Object.values(ratingCount) + " Rating"
              : Object.values(ratingCount) + " Ratings"
          }`}
        ></div>
      ))}
    </div>
  );
};

export default ReviewsHistogram;
