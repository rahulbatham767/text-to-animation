import React, { useState } from "react";
import axios from "axios";
import { Textarea, Button } from "react-daisyui";

const Rating = () => {
  const [rating, setRating] = useState(0);

  const handleClick = (newRating) => {
    setRating(newRating);
  };

  return (
    <div className="flex space-x-1 ">
      {[1, 2, 3, 4, 5].map((star) => (
        <span
          key={star}
          className={`cursor-pointer text-4xl ${
            star <= rating ? "text-yellow-500" : "text-gray-300"
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
  const [rating, setRating] = useState(4);
  const [feedback, setFeedback] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    // Handle form submission here (e.g., send feedback to server)
    console.log(`Rating: ${rating}, Feedback: ${feedback}`);

    const formData = {
      feedbackText: feedback,
      starRating: rating,
    };
    axios
      .post(
        "https://text-to-animation-backend.vercel.app/api/v1/feedback",
        formData
      )
      .then((Response) => {
        if (Response.data.success) {
          toast.success(Response.data.message);
        }
      })
      .catch((err) => {
        console.log(err);
        toast.error(err.message);
        return err.message;
      });

    setRating(0);
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
          <Rating name="rating" value={rating} onChange={setRating} />
        </div>
        <div className="mb-5">
          <label htmlFor="feedback" className="block mb-2 text-lg font-medium">
            Share Your Feedback:
          </label>
          <Textarea
            id="feedback"
            name="feedback"
            value={feedback}
            onChange={(e) => setFeedback(e.target.value)}
            rows="7"
            className="w-full"
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
