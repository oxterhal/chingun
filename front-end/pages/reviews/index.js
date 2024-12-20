import { useState, useEffect } from "react";
import axios from "axios";

export default function Reviews() {
  const [userId, setUserId] = useState("");
  const [productId, setProductId] = useState("");
  const [rating, setRating] = useState("");
  const [reviewText, setReviewText] = useState("");
  const [reviews, setReviews] = useState([]);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchReviews = async () => {
      try {
        const response = await axios.get("http://localhost:4000/reviews");
        setReviews(response.data);
        setError(null);
      } catch (err) {
        setError(err.response?.data?.error || "Failed to fetch reviews");
      }
    };
    fetchReviews();
  }, []);

  const handleCreateReview = async () => {
    if (!userId || !productId || !rating || !reviewText) {
      setError("Please fill in all fields");
      return;
    }
    try {
      await axios.post("http://localhost:4000/createReviews", {
        user_id: parseInt(userId, 10),
        product_id: parseInt(productId, 10),
        rating: parseInt(rating, 10),
        review_text: reviewText,
      });
      setUserId("");
      setProductId("");
      setRating("");
      setReviewText("");
      setError(null);
    } catch (err) {
      setError(err.response?.data?.error || "Error creating review");
    }
  };

  return (
    <div className="min-h-screen bg-[url('https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQUCNONitINNgsibwgla3pR5hiRnyZpSoFXXg&s')] text-gray-100 p-4 md:p-8">
      <div className="max-w-6xl mx-auto">
        <div className="flex flex-col lg:flex-row gap-8">
          {/* Form Section */}
          <div className="lg:w-1/3">
            <div className="bg-gray-800/50 backdrop-blur-sm p-6 rounded-lg border border-gray-700 shadow-xl">
              <h1 className="text-xl font-bold mb-6 flex items-center gap-2">
                <span>Write a Review</span>
              </h1>

              {error && (
                <div className="mb-4 p-3 bg-red-500/10 rounded flex items-center gap-2 text-red-200">
                  <AlertCircle size={18} />
                  <span>{error}</span>
                </div>
              )}

              <div className="space-y-4">
                <div className="relative">
                  <input
                    type="number"
                    value={productId}
                    onChange={(e) => setProductId(e.target.value)}
                    placeholder="Product ID"
                    className="w-full p-3 pl-10 bg-gray-900/50 border border-gray-600 rounded-lg text-white placeholder-gray-400 focus:border-blue-500 focus:ring-1 focus:ring-blue-500"
                  />
                </div>

                <div className="relative">
                  <input
                    type="number"
                    value={userId}
                    onChange={(e) => setUserId(e.target.value)}
                    placeholder="User ID"
                    className="w-full p-3 pl-10 bg-gray-900/50 border border-gray-600 rounded-lg text-white placeholder-gray-400 focus:border-blue-500 focus:ring-1 focus:ring-blue-500"
                  />
                </div>

                <div className="relative">
                  <select
                    value={rating}
                    onChange={(e) => setRating(e.target.value)}
                    className="w-full p-3 pl-10 bg-gray-900/50 border border-gray-600 rounded-lg text-white placeholder-gray-400 focus:border-blue-500 focus:ring-1 focus:ring-blue-500"
                  >
                    <option value="">Select Rating</option>
                    {[1, 2, 3, 4, 5].map((num) => (
                      <option key={num} value={num} className="bg-gray-900">
                        {num} {[...Array(num)].map(() => "★").join("")}
                      </option>
                    ))}
                  </select>
                </div>

                <input
                  value={reviewText}
                  onChange={(e) => setReviewText(e.target.value)}
                  placeholder="Write your review..."
                  rows={4}
                  className="w-full p-3 bg-gray-900/50 border border-gray-600 rounded-lg text-white placeholder-gray-400 focus:border-blue-500 focus:ring-1 focus:ring-blue-500 resize-none"
                />

                <button
                  onClick={handleCreateReview}
                  className="w-full bg-blue-600 p-3 rounded-lg text-white hover:bg-blue-700 transition duration-200 flex items-center justify-center gap-2 focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 focus:ring-offset-gray-900 font-medium"
                >
                  <span>Submit Review</span>
                </button>
              </div>
            </div>
          </div>

          {/* Reviews List Section */}
          <div className="lg:w-2/3">
            <div className="bg-gray-800/50 backdrop-blur-sm p-6 rounded-lg border border-gray-700 shadow-xl">
              <h2 className="text-xl font-bold mb-6">Recent Reviews</h2>
              <div className="grid gap-4">
                {reviews.map((review) => (
                  <div
                    key={review.review_id}
                    className="bg-gray-900/50 p-4 rounded-lg border border-gray-700 hover:border-gray-600 transition duration-200"
                  >
                    <div className="flex items-center justify-between mb-3">
                      <div className="flex items-center gap-2">
                        <span className="text-sm text-gray-400">
                          User #{review.user_id}
                        </span>
                      </div>
                      <div className="flex gap-1 text-yellow-400">
                        {[...Array(review.rating)].map((_, i) => (
                          <>⭐️</>
                        ))}
                      </div>
                    </div>
                    <p className="text-gray-200 ml-10">{review.review_text}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
