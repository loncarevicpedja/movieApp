import { BrowserRouter, Route, Routes } from "react-router-dom";
import "./App.css";
import Navigation from "./components/Navigation";
import Home from "./pages/Home";
import MovieDetails from "./pages/MovieDetails";
import Login from "./pages/Login";
import Register from "./pages/Register";
import { IdentityProvider } from "./contexts/identityContext";
import Movies from "./pages/Movies";
import AdminPanel from "./pages/AdminPanel";
import AdminAddCategory from "./pages/AdminAddCategory";
import AdminCategories from "./pages/AdminCategories";
import AdminDirectors from "./pages/AdminDirectors";
import AddMovie from "./pages/AddMovie";
import WatchList from "./pages/WatchList";

function App() {
  return (
    <div className="App">
      <IdentityProvider>
        <BrowserRouter>
          <Navigation />
          <Routes>
            <Route path="/" exact element={<Home />} />
            <Route path="/movies" exact element={<Movies />} />
            <Route path="/movies/:id" exact element={<MovieDetails />} />
            <Route path="/login" exact element={<Login />} />
            <Route path="/register" exact element={<Register />} />
            <Route path="/admin" exact element={<AdminPanel />} />
            <Route path="/admin-add-category" exact element={<AdminAddCategory />} />
            <Route path="/admin-categories" exact element={<AdminCategories />} />
            <Route path="/admin-directors" exact element={<AdminDirectors />} />
            <Route path="/watchlist" exact element={<WatchList />} />
            <Route path="/add-movie" exact element={<AddMovie />} />
          </Routes>
        </BrowserRouter>
      </IdentityProvider>
    </div>
  );
}

export default App;
