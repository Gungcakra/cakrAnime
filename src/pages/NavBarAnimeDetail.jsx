
import { faArrowLeft } from "@fortawesome/free-solid-svg-icons";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Link, useNavigate } from "react-router-dom";

export default function NavBarAnimeDetail(){
  
    return (

        <nav
            className="navbar fixed-top navbar-expand-sm navbar-dark bg-dark"
        >
            <div className="container">
                <Link className="navbar-brand fs-5 btn"  to={"/"} style={{ color: '#FBD46D', fontWeight:'bold' }}> <FontAwesomeIcon icon={faArrowLeft}/>Back</Link>
      
            </div>
        </nav>
        
    )
}