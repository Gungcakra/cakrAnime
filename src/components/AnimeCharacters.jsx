import { useLoaderData } from "react-router-dom";
import "../assets/css/DetailPages.css"
import "../assets/css/AnimeCharacters.css"
export async function loader({params}){
    const {id} = params;

    const response = await fetch(`https://api.jikan.moe/v4/anime/${id}/characters`);
    const data = await response.json();
    const characters = data.data;

    return {characters};
}

export default function AnimeCharacters(){
    const {characters} = useLoaderData();

    if (!characters || characters.length === 0) {
        return (
          <>
            <h2 className="text-center mt-5">No characters</h2>
          </>
        );
      }
    return(
        <>
        <h1 className="text-center mt-5">Anime Characters</h1>
        <div className="horizontal-scroll">

       <div id="char-bg" className="container">

        {characters.map((chr)=>
            <div id="chr-card" className="m-1 rounded d-flex flex-column justify-content-center align-items-center" key={chr.mal_id}>
            <img id="char-img" src={chr.character.images.jpg.image_url} alt="" />
                <p className="text-start fs-6 fw-bold">{chr.character.name}</p>
                <p className="text-start fs-6">{chr.role}</p>
            </div>
        )}
       </div>
        </div>
        </>
    )
}