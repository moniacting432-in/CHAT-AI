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
      setAnswer("Something went wrong! Please try again.");
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-100 via-indigo-50 to-purple-100 flex items-center justify-center px-4">
      <div className="bg-white rounded-2xl shadow-2xl w-full max-w-md p-6">
        <h1 className="text-3xl font-bold text-center mb-6 text-blue-600">
          Chat AI 🤖
        </h1>

        <textarea
          className="border border-gray-300 rounded-xl w-full p-3 mb-4 focus:ring-2 focus:ring-blue-400 focus:outline-none resize-none text-gray-700"
          value={question}
          onChange={(e) => setQuestion(e.target.value)}
          rows="6"
          placeholder="Ask me anything..."
        ></textarea>

        <button
          className={`w-full py-3 rounded-xl font-semibold text-white transition-all ${
            loading
              ? "bg-gray-400 cursor-not-allowed"
              : "bg-blue-500 hover:bg-blue-600 active:scale-95"
          }`}
          onClick={generateAnswer}
          disabled={loading}
        >
          {loading ? "Generating..." : "Generate Answer"}
        </button>

        {answer && (
          <div className="mt-5 bg-gray-50 p-4 rounded-xl border border-gray-200">
            <h2 className="font-semibold text-gray-700 mb-2">Answer:</h2>
            <p className="text-gray-800 whitespace-pre-wrap leading-relaxed">{answer}</p>
          </div>
        )}
      </div>

      <footer className="absolute bottom-3 text-sm text-gray-500">
        Made with 💙 by <span className="font-medium text-blue-500">Manisha Banerjee</span>
      </footer>
    </div>
  );
}

export default App;
