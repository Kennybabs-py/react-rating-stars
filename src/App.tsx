import "./App.css";
import RatingStars from "./components/RatingsStars";
import StaticRatingStars from "./components/StaticRatingStars";

function App() {
  return (
    <div className="App">
      <RatingStars color="red" />
      <div>
        <StaticRatingStars />
      </div>
    </div>
  );
}

export default App;
