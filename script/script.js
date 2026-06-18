let defaultArticles = [
  {
    id: 1,
    titre: "Introduction au JavaScript",
    resume: "JavaScript est un langage incontournable du web moderne.",
    auteur: "Karim",
    date: "12/05/2026",
    categorie: "tech",
    favori: false,
  },
  {
    id: 2,
    titre: "Les bases du CSS",
    resume: "Apprendre à styliser des pages web facilement et efficacement.",
    auteur: "Sara",
    date: "10/05/2026",
    categorie: "design",
    favori: true,
  },
  {
    id: 3,
    titre: "Découvrir le DOM",
    resume: "Le DOM permet d'interagir dynamiquement avec la page.",
    auteur: "Karim",
    date: "08/05/2026",
    categorie: "tech",
    favori: false,
  },
  {
    id: 4,
    titre: "Le SEO en 2026",
    resume: "Les bonnes pratiques pour bien référencer son site.",
    auteur: "Fatima",
    date: "05/05/2026",
    categorie: "marketing",
    favori: false,
  },
  {
    id: 5,
    titre: "Accessibilité web",
    resume: "Rendre ses sites accessibles à tous les utilisateurs.",
    auteur: "Sara",
    date: "03/05/2026",
    categorie: "design",
    favori: true,
  },
];

let articles = JSON.parse(localStorage.getItem("articles")) || defaultArticles;

// compteur
let numberOfArticle = document.getElementsByClassName("number-of-article")[0];
function compteur(items) {
  numberOfArticle.textContent = `Articles affichés: ${items.length}`;
}

// container
let containerArticle = document.getElementsByClassName("container-article")[0];

function creatArticle(items) {
  containerArticle.innerHTML = "";

  for (let i = 0; i < items.length; i++) {
    containerArticle.innerHTML += `
      <div class="article" data-id="${items[i].id}">
        <h1>${items[i].titre}</h1>
        <h3 class="resume">${items[i].resume}</h3>
        <div class="info">
          <p>${items[i].auteur}</p>
          <p>${items[i].date}</p>
          <p class="tag ${items[i].categorie}">${items[i].categorie}</p>
        </div>
        <button class="Favoris">Favoris</button>
        <button class="supprimer">Supprime</button>
      </div>
    `;
  }

  let article = document.getElementsByClassName("article");
  let favoris = document.getElementsByClassName("Favoris");

  // FAVORIS
  for (let i = 0; i < items.length; i++) {
    favoris[i].style.background = items[i].favori ? "red" : "";
    article[i].style.background = items[i].favori ? "yellow" : "";

    favoris[i].addEventListener("click", function () {
      let id = Number(favoris[i].parentElement.getAttribute("data-id"));

      let art = items.find((x) => x.id === id);

      art.favori = !art.favori;

      localStorage.setItem("articles", JSON.stringify(items));

      creatArticle(items);
    });
  }

  // SUPPRIMER
  let supprimer = document.getElementsByClassName("supprimer");

  for (let i = 0; i < supprimer.length; i++) {
    supprimer[i].addEventListener("click", function (e) {
      let id = Number(e.target.parentElement.dataset.id);
      items = items.filter((a) => a.id !== id);
      localStorage.setItem("articles", JSON.stringify(items));
      creatArticle(items);
      compteur(items);
    });
  }
  compteur(items);
}
creatArticle(articles);

// search
let search = document.getElementsByClassName("search")[0];
let arrSearch = [];
search.addEventListener("input", function (e) {
  for (let i = 0; i < articles.length; i++) {
    if (
      articles[i].titre.toLowerCase().includes(e.target.value.toLowerCase())
    ) {
      arrSearch.push(articles[i]);
    }
  }
  creatArticle(arrSearch);
  compteur(arrSearch);
  arrSearch = [];
});

// categorie
let categorie = document.getElementById("categorie");
let arrCategorie = [];
categorie.addEventListener("change", function () {
  for (let i = 0; i < articles.length; i++) {
    if (articles[i].categorie === categorie.value) {
      arrCategorie.push(articles[i]);
      creatArticle(arrCategorie);
      compteur(arrCategorie);
    } else if (categorie.value === "All") {
      creatArticle(articles);
      compteur(articles);
    }
  }
  arrCategorie = [];
});

// arrangement
let arrangement = document.getElementById("arrangement");
arrangement.addEventListener("change", function () {
  if (arrangement.value === "A-Z") {
    articles.sort((a, b) => a.titre.localeCompare(b.titre));
  } else if (arrangement.value === "Z-A") {
    articles.sort((a, b) => b.titre.localeCompare(a.titre));
  }
  creatArticle(articles);
  compteur(articles);
});

// Favoris uniquement
let FavorisUniquement =
  document.getElementsByClassName("Favoris-uniquement")[0];
let arrFavoris = [];
FavorisUniquement.addEventListener("click", function () {
  for (let i = 0; i < articles.length; i++) {
    if (articles[i].favori) {
      arrFavoris.push(articles[i]);
    }
  }
  creatArticle(arrFavoris);
  compteur(arrFavoris);
});

// Ajouter
let ajouter = document.getElementsByClassName("Addition")[0];
let containerForm = document.getElementsByClassName("container-form")[0];
ajouter.addEventListener("click", function () {
  containerForm.style.display = "block";
});

let btnAnnuler = document.getElementsByClassName("btn-annuler")[0];
btnAnnuler.addEventListener("click", function (event) {
  event.preventDefault();
  containerForm.style.display = "none";
});

let btnValider = document.getElementsByClassName("btn-valider")[0];
let Titre = document.getElementsByClassName("titre")[0];
let Resume = document.getElementsByClassName("Resume99")[0];
let auteur = document.getElementsByClassName("auteur")[0];
let Tags = document.getElementsByClassName("Tags")[0];
btnValider.addEventListener("click", function (event) {
  event.preventDefault();
  let arrId = [];
  for (let i = 0; i < articles.length; i++) {
    arrId.push(articles[i].id);
  }
  let addArticle = {
    id: Math.max(...arrId) + 1,
    titre: Titre.value,
    resume: `${Resume.value}`,
    auteur: `${auteur.value}`,
    date: "03/05/2026",
    categorie: `${Tags.value}`,
    favori: true,
  };
  articles.unshift(addArticle);
  localStorage.setItem("articles", JSON.stringify(articles));
  creatArticle(articles);
  compteur(articles);
});


