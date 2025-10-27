import { useState } from 'react';
import './App.css';
import axios from 'axios';

function App() {
  const [question, setQuestion] = useState("");
  const [answer, setAnswer] = useState("");

  async function generateAnswer() {
    setAnswer("Loading...");

    try {
      const response = await axios.post("http://localhost:5000/api/generate", {
        question: question
      });

      setAnswer(response.data.answer);
    } catch (error) {
      console.error(error);
      setAnswer("Something went wrong!");
    }
  }

  return (
    <div className='w-full p-4'>
      <h1 className='text-3xl font-bold mb-4'>Chat AI</h1>
      <textarea
        className="border rounded w-full p-2 mb-4"
        value={question}
        onChange={(e) => setQuestion(e.target.value)}
        cols="30"
        rows="10"
        placeholder="Ask anything to me"
      ></textarea>
      <button
        className="bg-blue-500 text-white px-4 py-2 rounded"
        onClick={generateAnswer}
      >
        Generate Answer
      </button>
      <pre className="mt-4">{answer}</pre>
    </div>
  );
}

export default App;
