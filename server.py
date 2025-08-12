from flask import Flask, request, jsonify
from flask_cors import CORS
import random

app = Flask(__name__)
CORS(app)  # Allow all origins

choice_map = {"s": 1, "w": -1, "g": 0}
reverse_map = {1: "Snake", -1: "Water", 0: "Gun"}

@app.route("/play", methods=["POST"])
def play_game():
    data = request.json
    user_choice = data.get("choice")

    if user_choice not in choice_map:
        return jsonify({"error": "Invalid choice"}), 400

    user_value = choice_map[user_choice]
    computer_value = random.choice(list(choice_map.values()))

    if computer_value == -1 and user_value == 1:
        result = "You win"
    elif computer_value == -1 and user_value == 0:
        result = "Computer wins"
    elif computer_value == 0 and user_value == 1:
        result = "You win"
    elif computer_value == 0 and user_value == -1:
        result = "Computer wins"
    elif computer_value == 1 and user_value == 0:
        result = "Computer wins"
    elif computer_value == 1 and user_value == -1:
        result = "You win"
    else:
        result = "It's a Tie"

    return jsonify({
        "user_choice": reverse_map[user_value],
        "computer_choice": reverse_map[computer_value],
        "result": result
    })

if __name__ == "__main__":
    app.run(port=5000, debug=True)
