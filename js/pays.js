(function () {
  console.log("rest API");
  // URL de l'API REST de WordPress
  let lien__boutons = document.querySelectorAll(".boutons-pays");
  for (const elm of lien__boutons) {
    elm.addEventListener("mousedown", function () {
      const id = elm.id.split("_")[1];
      // console.log(id);
      let url = `https://gftnth00.mywhc.ca/tim06/wp-json/wp/v2/posts?categories=${id}`;
      mon_fetch(url);
    });
  }

  // Effectuer la requête HTTP en utilisant fetch()
  function mon_fetch(url) {
    fetch(url)
      .then(function (response) {
        // Vérifier si la réponse est OK (statut HTTP 200)
        if (!response.ok) {
          throw new Error(
            "La requête a échoué avec le statut " + response.status
          );
        }

        // Analyser la réponse JSON
        return response.json();
        console.log(response.json());
      })
      .then(function (data) {
        // La variable "data" contient la réponse JSON
        console.log(data);
        let restapi = document.querySelector(".contenu__restapi");
        // Maintenant, vous pouvez traiter les données comme vous le souhaitez
        // Par exemple, extraire les titres des articles comme dans l'exemple précédent

        restapi.innerHTML = "";
        data.forEach(function (article) {
          let titre = article.title.rendered;
          let contenu = article.content.rendered;
          let imageAvant = article.featured_media.rendered;
          console.log(imageAvant);
          //Tronquer les mots des cartes
          let contenuTronque = tronquerContenu(contenu, 30);
          let carte = document.createElement("div");
          carte.classList.add("restapi__carte");

          carte.innerHTML = `
        <h2>${titre}</h2>
        <p>${contenuTronque}</p>
        `;
          restapi.appendChild(carte);
        });
      })
      .catch(function (error) {
        // Gérer les erreurs
        console.error("Erreur lors de la récupération des données :", error);
      });

    //Fonction pour tronquer le contenu des cartes
    function tronquerContenu(texte, numMots) {
      let mots = texte.split(" ");
      if (mots.length > numMots) {
        return mots.slice(0, numMots).join(" ") + "...";
      }
      return texte;
    }
  }
});
