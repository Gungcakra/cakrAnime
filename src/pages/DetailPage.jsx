import { faStar } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useLoaderData } from "react-router-dom";
import "../assets/css/DetailPages.css"
export async function loader({params}){
const {id} = params;
// fetch data
const response = await fetch(`https://api.jikan.moe/v4/anime/${id}`);
const data = await response.json();
const anime = data.data;

//return anime data

// Reviews
const responseReviews = await fetch(`https://api.jikan.moe/v4/anime/${id}/reviews`);
const dataReviews = await responseReviews.json();
const reviews = dataReviews.data;

return{anime,reviews};
}
export default function AnimeDetail(){
  window.scrollTo(0, 0);
    const {anime,reviews} = useLoaderData();
    return(
        <>
          <div className="container-fluid pt-5">

         

            <div className="row d-flex justify-content-start align-items-center m-5 p-2" style={{ backgroundColor:'#222831' }}>
               <div className="col-12 col-md-2 col-sm-2 d-flex flex-column justify-content-center align-items-center">
                <img src={anime.images.jpg.image_url} alt="img"  style={{ width:'100%', height:'auto', maxWidth:'200px', objectFit:'cover' }}/>
                <h2 className="btn text-white w-100 m-2 fs-5 fw-bold" style={{ backgroundColor:'#4F8A8B' }}>Trailer</h2>
              
               </div>
                <div className="col-12 col-md-10 col-sm-10">
                  <div className="col d-flex">
                    <h2 className="text-start">{anime.title} </h2>
                    
                    <h2 className="btn btn-warning fw-bold"><FontAwesomeIcon icon = {faStar}/> {anime.score}</h2>
                  </div>
                  <div className="col">

                        <p>{anime.type} | {anime.source} | {anime.episodes} Episodes | {anime.status}</p>
                  <div className="col">
                    {anime.genres.map((genre)=> 

                      <p className="btn m-1 p-1 fw-bold text-dark" style={{ backgroundColor:'#EEEEEE' }}>{genre.name}</p>
                      
                    )}
                  </div>
                        <p>{anime.synopsis}</p>
                  </div>
                      
                </div>
            
            </div>
            <div className="container">

            <div className="row">
              <h2 className="text-center text-white">Reviews</h2>
                {(!reviews || reviews.length === 0) ? (
                  <p className="text-center">No Review</p>
                ) : (
                  <div className="row d-flex flex-column">

                  {reviews.map((review)=>(
                    <div className="col-lg-4 bg-danger m-1" key={review.mal_id}>
                      <p className="text-start text-white">{review.user.username}</p>
                      <p className="text-white">{review.review}</p>
                    </div>
                  ))}
                  </div>
                )}
              <div className="row">
              </div>
                </div>
            </div>
          </div>
        </>
    )
}