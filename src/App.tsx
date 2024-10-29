// import "./App.css";
import { RouterProvider, createBrowserRouter } from "react-router-dom";
import CallApiPage from "../src/pages/CallApi";
import Header from "./hearder/Hearder";
import MoviePage from "./pages/Movie";
import ShowMoviePage from "./pages/ShowMove";

const routers = createBrowserRouter([
  { path: "/call", element: <CallApiPage />,errorElement : <h1>ไม่มีข้อมูลหนังนี้อยู่ใน API</h1> },
  { path: "/", element: <MoviePage />,errorElement : <h1>ไม่มีข้อมูลหนังนี้อยู่ใน API</h1>},
  { path: "/showmovie", element: <ShowMoviePage/> ,errorElement : <h1>ไม่มีข้อมูลหนังนี้อยู่ใน API</h1> },
]);

function App() {
  return (
    <>
    <div >
    <Header></Header>
    <RouterProvider router={routers} />
    </div>
  </>
  )
}

export default App;