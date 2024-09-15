import { useRef } from "react";
import { useReviews } from "../useReviews";
import { useProfiles } from "../useProfiles";

export default function Reviews({ pageValue }) {
  const reviewInfo = localStorage.getItem("review");
  const convertInfo = reviewInfo && reviewInfo.split(",");

  let validate =
    convertInfo && convertInfo[3] === "true" && pageValue === convertInfo[2]
      ? true
      : false;
  return (
    <section className="reviews defaultWidth defaultFlex flexJustifyBetween">
      {validate ? <ReviewForm convertInfo={convertInfo} /> : <div></div>}
      <ReviewsList pageValue={pageValue} />
    </section>
  );
}

function ReviewForm({ convertInfo }) {
  const refs = {
    comment: useRef(""),
  };

  function updateProductInfo(e, refName) {
    return (refs[refName].current = e.target.value);
  }
  function submitReview(e) {
    e.preventDefault();
    return refs.comment.current.length > 0
      ? (window.location.href = `http://localhost:80/review.php?user_id=${convertInfo[0]}&offset=${convertInfo[1]}&comment=${refs.comment.current}&review=true&game_id=${convertInfo[2]}`)
      : false;
  }

  return (
    <form action="">
      <p>Submit a review</p>
      <textarea
        name="comment"
        onChange={(e) => updateProductInfo(e, "comment")}
      ></textarea>
      <button onClick={submitReview}>submit review</button>
    </form>
  );
}

function ReviewsList({ pageValue }) {
  const { reviewData } = useReviews();
  const gameReviews =
    reviewData && reviewData.filter((item) => item.game_id === pageValue);
  const { dataProfile } = useProfiles();

  const reviewCount =
    gameReviews && gameReviews.filter((item) => !!item.comment);
  return (
    <section className="defaultFlex flexColumn reviewSection">
      <h2>Reviews ({reviewCount && reviewCount.length})</h2>
      {gameReviews &&
        gameReviews.map(
          (item, id) =>
            item.comment && (
              <div key={id}>
                <p>
                  By:{" "}
                  {dataProfile &&
                    dataProfile.find(
                      (profile) =>
                        parseInt(profile.id) === parseInt(item.user_id)
                    ).name}
                </p>
                <p>Review: {item.comment}</p>
              </div>
            )
        )}
    </section>
  );
}
