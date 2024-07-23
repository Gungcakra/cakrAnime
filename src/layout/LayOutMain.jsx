import { Outlet } from "react-router-dom";
import Footer from "../pages/footer";
import NavBar from "../pages/NavBar";
import React, { Suspense } from 'react';
const Recomentdation = React.lazy(() => import ('../components/Recomendation'))
export default function LayoutMain(){
    return (
       <>
       <NavBar />
       <Suspense fallback={<div>Loading...</div>}>
        <Recomentdation />
      </Suspense>
        <Outlet />
       <Footer />
       
       </>
    )
}