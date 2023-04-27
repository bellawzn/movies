import logo from "./logo.svg"
import "./App.css"
import { useState, useEffect } from "react"
import Layout from "./components/Layout"
import { Routes, Route } from "react-router-dom"
import Home from "./components/home/Home"
import Header from "./components/header/Header"
import Trailer from "./components/trailer/Trailer"
import Reviews from "./components/reviews/Reviews"
import NotFound from "./components/notFound/NotFound"
import api from "./api/axiosConfig"
import Sample from "./components/Sample"

function App() {
  const [movies, setMovies] = useState()
  const [movie, setMovie] = useState()
  const [reviews, setReviews] = useState([])

  const getMovies = async () => {
    try {
      console.log("Fetching movies...")
      const response = await fetch("http://localhost:8080/api/v1/movies")
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`)
      }
      const data = await response.json()
      console.log("Movies data:", data)
      setMovies(data)
    } catch (error) {
      console.error("Error fetching movies:", error)
    }
  }

  const getSingleMovie = async (movieId) => {
    try {
      console.log("Fetching single movie data...")
      const response = await fetch(
        `http://localhost:8080/api/v1/movies/${movieId}`
      )
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`)
      }
      const singleMovie = await response.json()
      console.log("Single Movies data:", singleMovie)
      console.log("Movie ID:", movieId)
      setMovie(singleMovie)
      setReviews(singleMovie.reviewIds)
    } catch (error) {
      console.log("Movie ID:", movieId)
      console.error("Error fetching movies:", error)
    }

    console.log("Movie review in App:", reviews)
  }
  useEffect(() => {
    getMovies()
  }, [])

  return (
    <div className="App">
      {/* <Header /> */}
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route path="/" element={<Home movies={movies} />}></Route>
          <Route path="/Trailer/:ytTrailerId" element={<Trailer />}></Route>
          <Route
            path="/Reviews/:movieId"
            element={
              <Reviews
                getMovieData={getSingleMovie}
                movie={movie}
                reviews={reviews}
                setReviews={setReviews}
              />
            }
          ></Route>
          <Route path="*" element={<NotFound />}></Route>
        </Route>
      </Routes>
    </div>
  )
}

export default App
