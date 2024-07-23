import React from 'react'
import ReactDOM from 'react-dom/client'
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.bundle.min';
import '@mantine/core/styles.css';
import { MantineProvider } from '@mantine/core';
import {
  createBrowserRouter,
  RouterProvider,
} from "react-router-dom";
import LayoutMain from './layout/LayOutMain.jsx';
import ErrorPage from './pages/error';
import Home from './pages/home.jsx';
import PopularAnimeList from './components/PopularAnimeList.jsx';
import LayoutList from './layout/LayOutAnime.jsx';
import AnimeDetail, {loader as animeDetailLoader} from './pages/DetailPage.jsx';
import AnimeEpisodes , {loader as animeEpisodesLoader} from './components/AnimeEpisodes.jsx';
import AnimeReviews , {loader as animeReviewsLoader} from './components/AnimeReviews.jsx';
import AnimeCharacters, {loader as AnimeCharactersLoader} from './components/AnimeCharacters.jsx';
import { SearchProvider } from './context/SearchContext.jsx';
const router = createBrowserRouter([
  {
    path: "/",
    element: <LayoutMain />,
    errorElement: <ErrorPage />,
    children: [
      {
        path: "/",
        element: <Home />,
      },
      
      
    ],

    
  },
  {
    path: "/anime/:id",
    element: <LayoutList />,
    loader: animeDetailLoader,
    children:[
      {
        path:"/anime/:id/episodes",
        element: <AnimeEpisodes />,
        loader: animeEpisodesLoader
      },
      {
        path:"/anime/:id",
        element: <AnimeEpisodes />,
        loader: animeEpisodesLoader
      },
      {
        path:"/anime/:id/characters",
        element: <AnimeCharacters />,
        loader: AnimeCharactersLoader
      },
      {
        path:"/anime/:id/reviews",
        element: <AnimeReviews />,
        loader: animeReviewsLoader
      },
    ]
  },
  // {
  //   path : "/",
  //   element:<LayoutList />,
  //   children:[
  //     {
  //       path:"/",
  //       element : <AnimeList />,
  //     }
  //   ]
  // },
 
]);

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
  <SearchProvider>
    

   <RouterProvider router={router} />
  </SearchProvider>
  </React.StrictMode>,
)
