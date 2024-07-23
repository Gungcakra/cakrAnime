import { useLoaderData } from "react-router-dom";
import "../assets/css/DetailPages.css"
export async function loader({params}){
  //get id from params
    const {id} = params;
  //fetch api
    const response = await fetch(`https://api.jikan.moe/v4/anime/${id}/episodes`);
    const data = await response.json();
    const episodes = data.data;

    return {episodes};
}

export default function AnimeEpisodes(){
    const {episodes} = useLoaderData();
//check if episodes exits?
    if (!episodes || episodes.length === 0) {
        return (
          <>
            <h2 className="text-center mt-5">No Episodes</h2>
          </>
        );
      }
    return(
        <>
        <h1 className="text-center mt-5">Anime Episodes</h1>
       
        {episodes.map((eps)=>
            <div id="eps-card" className="col-10 col-lg-2 col-md-2 col-sm-2 m-2 p-3 rounded" key={eps.mal_id}>
                <p className="text-start">Episode : {eps.mal_id}</p>
                <p className="text-start fs-6">Title : {eps.title}</p>
            </div>
        )}
        </>
    )
}