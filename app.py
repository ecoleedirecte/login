from flask import Flask, request, render_template

app = Flask(__name__)

# Page d'accueil : formulaire HTML
@app.route("/")
def home():
    return render_template("index.html")

# Route pour traiter les données du formulaire
@app.route("/login", methods=["POST"])
def login():
    username = request.form["username"]
    password = request.form["password"]
    
    # Stockage dans un fichier texte
    with open("logins.txt", "a") as file:
        file.write(f"Username: {username}, Password: {password}\n")
    
    return "Données enregistrées avec succès. (Simulation de connexion)"

if __name__ == "__main__":
    app.run(debug=True)
