import { useLoaderData } from "react-router-dom";
import "../assets/css/DetailPages.css"
export async function loader({params}){
  //get id from params
    const {id} = params;
//fetch api
    const response = await fetch(`https://api.jikan.moe/v4/anime/${id}/reviews`);
    const data = await response.json();
    const reviews = data.data;

    return {reviews};
}

export default function AnimeReviews(){
    //review data
    const {reviews} = useLoaderData();

    //review max length
    const reviewLength = (review, maxLength) => {
        if (review.length <= maxLength) return review;
        return review.slice(0, maxLength) + '...';
      };
//check if reviews exits?
      if (!reviews || reviews.length === 0) {
        return (
          <>
            <h2 className="text-center mt-5">No Reviews</h2>
          </>
        );
      }
    return(
        <>
        <h1 className="text-center mt-5">Anime Reviews</h1>
        {reviews.map((revs)=>
            <div id="eps-card" className="col-10 col-lg-2 col-md-2 col-sm-2 m-2 p-3 rounded" key={revs.mal_id}>
                <p className="text-start fw-bold">{revs.user.username}</p>
                <p className="text-start">{revs.date}</p>
                <p className="text-start fs-6">{reviewLength(revs.review, 100)} </p>
            </div>
        )}
        </>
    )
}