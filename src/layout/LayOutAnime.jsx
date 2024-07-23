import { Outlet } from "react-router-dom";
import NavBarAnimeDetail from "../pages/NavBarAnimeDetail";
import Footer from "../pages/footer";
import DetailAnime from "../components/DetailAnime";
export default function LayoutList(){

    return (
        <>
            <NavBarAnimeDetail/>
            <DetailAnime />
            <div className="row d-flex justify-content-center align-items-center">
            <Outlet />
            </div>
            <Footer />
        </>
    )
}