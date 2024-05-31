(function () {
  console.log("rest API");
  // Écouter l'événement de chargement de la page
  window.addEventListener("load", function () {
    // Sélectionner le menu déroulant
    const menuDeroulant = document.getElementById("filtres");
    // Définir la valeur de l'option sélectionnée par défaut (4, Repos)
    const valeurParDefaut = "4";
    // Définir la valeur de l'option sélectionnée dans le menu déroulant
    menuDeroulant.value = valeurParDefaut;
    // Déclencher manuellement l'événement 'change' pour charger les articles correspondant à l'option sélectionnée
    menuDeroulant.dispatchEvent(new Event("change"));
  });
  const menuDeroulant = document.getElementById("filtres");
  menuDeroulant.addEventListener("change", function () {
    // URL de l'API REST de WordPress
    const numeroCategorie = this.value; //culturel: 3, repos: 4
    let urlCategorie = `https://gftnth00.mywhc.ca/tim06/wp-json/wp/v2/categories/${numeroCategorie}`;
    let urlArticles = `https://gftnth00.mywhc.ca/tim06/wp-json/wp/v2/posts?categories=${numeroCategorie}`;

    // Effectuer la requête HTTP pour récupérer les détails de la catégorie
    fetch(urlCategorie)
      .then(function (response) {
        // Vérifier si la réponse est OK (statut HTTP 200)
        if (!response.ok) {
          throw new Error(
            "La requête a échoué avec le statut " + response.status
          );
        }

        // Analyser la réponse JSON
        return response.json();
      })
      .then(function (categorie) {
        let slider = document.querySelector(".slider");
        // La variable "categorie" contient les détails de la catégorie
        console.log("Catégorie:", categorie.name);

        // Effacer le titre de la catégorie précédente s'il existe
        let categorieTitle = document.querySelector(".categorie-filtre");
        if (categorieTitle) {
          categorieTitle.remove();
          // console.log(categorieTitle);
        }

        // Créer un élément <h2> pour afficher le nom de la catégorie
        let titreCatégorie = document.createElement("h2");
        titreCatégorie.classList.add("categorie-filtre");
        titreCatégorie.textContent = categorie.name;
        // Insérer le titre de la catégorie avant l'élément .slider

        slider.parentNode.insertBefore(titreCatégorie, slider);

        // Maintenant que nous avons les détails de la catégorie, effectuons la requête pour les articles
        fetch(urlArticles)
          .then(function (response) {
            // Vérifier si la réponse est OK (statut HTTP 200)
            if (!response.ok) {
              throw new Error(
                "La requête a échoué avec le statut " + response.status
              );
            }

            // Analyser la réponse JSON
            return response.json();
          })
          .then(function (data) {
            // La variable "data" contient les articles de la catégorie
            console.log(data);
            let restapi = document.querySelector(".contenu__restapi");
            if (restapi) {
              restapi.innerHTML = "";
            }

            // Maintenant, vous pouvez traiter les données comme vous le souhaitez
            // Par exemple, extraire les titres des articles comme dans l'exemple précédent
            data.forEach(function (article) {
              let titre = article.title.rendered;
              let contenu = article.content.rendered;
              let contenuTronque = trimWords(contenu, 20);
              let permalink = article.link; // Récupérer le lien permanent de l'article
              console.log(titre);
              let carte = document.createElement("div");
              carte.classList.add("restapi__carte");

              carte.innerHTML = `
             <h2>${titre}</h2>
             <p>${contenuTronque}</p>
             <a href="${permalink}">Lire l'article</a>
           `;
              restapi.appendChild(carte);
            });
          })
          .catch(function (error) {
            // Gérer les erreurs
            console.error(
              "Erreur lors de la récupération des articles :",
              error
            );
          });
      })
      .catch(function (error) {
        // Gérer les erreurs
        console.error(
          "Erreur lors de la récupération des détails de la catégorie :",
          error
        );
      });
  });
})();

// Fonction pour tronquer du texte à un certain nombre de mots
function trimWords(texte, numMots) {
  let mots = texte.split(" ");
  if (mots.length > numMots) {
    return mots.slice(0, numMots).join(" ") + "...";
  }
  return texte;
}
