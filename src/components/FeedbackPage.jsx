import React, { useContext, useState } from "react";
import axios from "axios";
import { Textarea, Button } from "react-daisyui";
import toast from "react-hot-toast";
import { useAuth } from "./AuthProvider";

const Rating = ({ starRating, setRating }) => {
  const handleClick = (newRating) => {
    setRating(newRating);
  };
  const { login, logout, setLoading, loading } = useAuth();
  return (
    <div className="flex space-x-1 ">
      {[1, 2, 3, 4, 5].map((star) => (
        <span
          key={star}
          className={`cursor-pointer text-4xl ${
            star <= starRating ? "text-yellow-500" : "text-gray-300"
          }`}
          onClick={() => handleClick(star)}
        >
          ★
        </span>
      ))}
    </div>
  );
};

const FeedbackPage = () => {
  const [starRating, setStarRating] = useState(0);
  const [feedbackText, setFeedback] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    // Handle form submission here (e.g., send feedback to server)
    console.log(`Rating: ${starRating}, Feedback: ${feedbackText}`);
    loading(true);
    const formData = {
      feedbackText: feedbackText,
      starRating: starRating,
    };
    axios
      .post(
        "https://text-to-animation-backend.vercel.app/api/v1/feedback",
        formData
      )
      .then((Response) => {
        console.log(Response);
        if (Response.status === 201) {
          toast.success(Response.data.message);
        }
      })
      .catch((err) => {
        console.log(err);
        toast.error(err.data.message);
      });
    setLoading(false);
    setStarRating(0);
    setFeedback("");
  };

  return (
    <div className="container mx-auto mt-10 flex flex-col items-center text-white p-5">
      <h1 className="text-3xl font-bold mb-5">Your Feedback Matters</h1>
      <form onSubmit={handleSubmit} className="w-5/6">
        <div className="mb-5">
          <label htmlFor="rating" className="block mb-2 text-lg font-medium">
            Rate Your Experience:
          </label>
          <Rating starRating={starRating} setRating={setStarRating} />
        </div>
        <div className="mb-5">
          <label htmlFor="feedback" className="block mb-2 text-lg font-medium">
            Share Your Feedback:
          </label>
          <Textarea
            id="feedback"
            name="feedback"
            value={feedbackText}
            onChange={(e) => setFeedback(e.target.value)}
            rows="7"
            placeholder="Enter your feedback"
            className="w-full bg-transparent border-2 border-white placeholder-gray-light text-3xl"
            required
          />
        </div>
        <Button type="submit" className="btn-primary">
          Submit Feedback
        </Button>
      </form>
    </div>
  );
};

export default FeedbackPage;
