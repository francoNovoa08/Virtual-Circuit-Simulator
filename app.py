from flask import Flask, render_template, request, send_file
import base64
import io

app = Flask(__name__)

@app.route("/")
def index():
    return render_template("index.html")

@app.route("/save-circuit", methods=["POST"])
def save_circuit():
    data_url = request.form["canvas-data"]
    base64_data = data_url.split(",")[1]
    image_data = base64.b64decode(base64_data)
    
    image_bytes = io.BytesIO(image_data)

    image_name = "circuit.png"
    return send_file(image_bytes, mimetype="image/png", as_attachment=True, download_name=image_name)

if __name__ == "__main__":
    app.run(debug=True)
