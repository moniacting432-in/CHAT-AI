import { useState } from 'react';
import axios from 'axios';

function App() {
  const [question, setQuestion] = useState("");
  const [answer, setAnswer] = useState("");
  const [loading, setLoading] = useState(false);

  async function generateAnswer() {
    if (!question.trim()) return;
    setLoading(true);
    setAnswer("");

    try {
      const response = await axios.post("https://chat-ai-2-igqi.onrender.com/api/generate", {
        question: question
      });
      setAnswer(response.data.answer);
    } catch (error) {
      console.error(error);
      setAnswer("Something went wrong. Please try again.");
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="min-h-screen bg-gray-100 flex items-center justify-center px-4">
      <div className="bg-white w-full max-w-lg p-6 rounded-2xl shadow-lg">
        <h1 className="text-2xl md:text-3xl font-semibold text-center mb-6 text-gray-800">
          Chat AI
        </h1>

        <textarea
          className="w-full border border-gray-300 rounded-lg p-3 focus:ring-2 focus:ring-blue-400 focus:outline-none text-gray-700 resize-none mb-4"
          rows="6"
          placeholder="Ask something..."
          value={question}
          onChange={(e) => setQuestion(e.target.value)}
        ></textarea>

        <button
          onClick={generateAnswer}
          disabled={loading}
          className={`w-full py-3 rounded-lg font-medium text-white transition ${
            loading
              ? "bg-gray-400 cursor-not-allowed"
              : "bg-blue-500 hover:bg-blue-600 active:scale-95"
          }`}
        >
          {loading ? "Generating..." : "Generate Answer"}
        </button>

        {answer && (
          <div className="mt-5 p-4 border border-gray-200 rounded-lg bg-gray-50">
            <p className="text-gray-800 whitespace-pre-wrap leading-relaxed">
              {answer}
            </p>
          </div>
        )}
      </div>
    </div>
  );
}

export default App;
