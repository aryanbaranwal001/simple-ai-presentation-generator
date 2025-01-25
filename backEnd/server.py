# server.py (corrected version)
from flask import Flask, request, jsonify
from flask_cors import CORS
import subprocess

# Initialize Flask app FIRST
app = Flask(__name__)
CORS(app)  # Enable CORS

# THEN define routes
@app.route('/run-script', methods=['POST'])
def run_script():
    try:
        data = request.json
        
        # Get form data (corrected variable names)
        topic = data.get('topic')
        addPrompt = data.get('addPrompt')  # Fixed from 'prompt'
        pages = data.get('pages')
        theme = data.get('theme')
        dimensions = data.get('dimensions')

        # Validation
        if not all([topic, addPrompt, pages, theme, dimensions]):
            return jsonify({"error": "Missing required fields"}), 400

        # Run script with parameters
        result = subprocess.run(
            ['python', 'local.py', topic, addPrompt, str(pages), theme, dimensions],
            capture_output=True,
            text=True
        )

        # Handle response
        if result.returncode == 0:
            return jsonify({"output": result.stdout})
        return jsonify({"error": result.stderr}), 500

    except Exception as e:
        return jsonify({"error": str(e)}), 500

if __name__ == '__main__':
    app.run(host='0.0.0.0', port=5000, debug=True)


    