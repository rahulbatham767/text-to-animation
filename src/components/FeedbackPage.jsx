import React, { useContext, useState } from "react";
import { Textarea, Button } from "react-daisyui";
import toast from "react-hot-toast";
import { useDispatch, useSelector } from "react-redux";
import { User_Feedback } from "../app/features/AnimationSlice";
const Rating = ({ starRating, setRating }) => {
  const handleClick = (newRating) => {
    setRating(newRating);
  };
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
  const dispatch = useDispatch();
  const { message, success, darkmode } = useSelector(
    (state) => state.TextAnimation
  );
  const handleSubmit = (e) => {
    e.preventDefault();
    // Handle form submission here (e.g., send feedback to server)
    console.log(`Rating: ${starRating}, Feedback: ${feedbackText}`);

    const formData = {
      feedbackText: feedbackText,
      starRating: starRating,
    };
    dispatch(User_Feedback(formData))
      .then((Response) => {
        console.log(Response);
        if (success) {
          toast.success("Feedback successfully Submitted");
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
    <div
      className={`container mx-auto mt-10 flex flex-col items-center ${
        darkmode ? "text-white" : "text-black"
      }  p-5`}
    >
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
            className="w-full bg-transparent border-2 shadow-xl p-2 border-white placeholder-gray-light text-3xl"
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
