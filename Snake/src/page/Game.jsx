import { useState, useEffect } from "react";
import "./Game.css";

function Game() {
  const [choice, setChoice] = useState("");
  const [result, setResult] = useState("");
  const [computerChoice, setComputerChoice] = useState("");
  const [userChoice, setUserChoice] = useState("");
  const [bgColor, setBgColor] = useState("");
  const [score, setScore] = useState({ player: 0, computer: 0 });

  useEffect(() => {
    if (result.includes("You win")) {
      setBgColor("linear-gradient(135deg, #00ff7f, #32cd32)");
      setScore((prev) => ({ ...prev, player: prev.player + 1 }));
    } else if (result.includes("Computer wins")) {
      setBgColor("linear-gradient(135deg, #ff4b2b, #ff416c)");
      setScore((prev) => ({ ...prev, computer: prev.computer + 1 }));
    } else if (result.includes("Tie")) {
      setBgColor("linear-gradient(135deg, #2193b0, #6dd5ed)");
    }
  }, [result]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!choice) {
      alert("Please select Snake (s), Water (w), or Gun (g)");
      return;
    }

    try {
      const res = await fetch("http://localhost:5000/play", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ choice }),
      });
      const data = await res.json();
      setResult(data.result);
      setUserChoice(data.user_choice);
      setComputerChoice(data.computer_choice);
    } catch (error) {
      console.error("Error:", error);
    }
  };

  return (
    <div
      className="game-container"
      style={{
        background: bgColor,
        transition: "background 1s ease",
      }}
    >
      <h2>Wanna Play Snake, Water, Gun?</h2>

      <div className="score-board">
        <p>Player Score: {score.player}</p>
        <p>Computer Score: {score.computer}</p>
      </div>

      <form onSubmit={handleSubmit} className="game-form">
        <select value={choice} onChange={(e) => setChoice(e.target.value)}>
          <option value="">-- Select Choice --</option>
          <option value="s">Snake</option>
          <option value="w">Water</option>
          <option value="g">Gun</option>
        </select>
        <button type="submit">Play</button>
      </form>

      {result && (
        <div className="result">
          <p>
            <strong>Your choice:</strong> {userChoice}
          </p>
          <p>
            <strong>Computer's choice:</strong> {computerChoice}
          </p>
          <p className="winner">{result}</p>
        </div>
      )}
    </div>
  );
}

export default Game;
