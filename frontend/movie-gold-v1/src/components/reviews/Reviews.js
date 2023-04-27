import { useEffect, useRef } from "react"
import { useParams } from "react-router-dom"
import { Container, Row, Col } from "react-bootstrap"
import ReviewForm from "../reviewForm/ReviewForm"

import React from "react"

const Reviews = ({ getMovieData, movie, reviews, setReviews }) => {
  const revText = useRef()
  let params = useParams()
  const movieId = params.movieId

  useEffect(() => {
    getMovieData(movieId)
  }, [])

  const addReview = async (e) => {
    e.preventDefault()

    const rev = revText.current

    try {
      const response = await fetch("http://localhost:8080/api/v1/reviews", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          reviewBody: rev.value,
          imdbId: movieId,
        }),
      })

      const updatedReviews = [...(reviews || []), { body: rev.value }]
      rev.value = ""
      setReviews(updatedReviews)
      console.log("reviews: ", reviews)
    } catch (err) {
      console.error(err)
    }
  }

  const divStyle = {
    color: "white",
    padding: "20px",
    borderRadius: "5px",
  }

  const containerStyle = {
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-between",
  }

  return (
    <div style={containerStyle}>
      <img src={movie?.poster} alt="" />
      <div style={divStyle}>
        <ReviewForm
          handleSubmit={addReview}
          revText={revText}
          labelText="Write a Review?"
        />
      </div>
    </div>
  )
}

export default Reviews
