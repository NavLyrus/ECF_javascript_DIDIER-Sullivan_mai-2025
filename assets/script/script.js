
console.log("script OK");

fetch("assets/data/recette.json")
  .then((res) => res.json())
  .then((recette) => {
    const grid = document.querySelector(".recipes-grid");
    const searchInput = document.getElementById("searchInput");
    const modal = document.getElementById("recipeModal");
    const modalContent = document.getElementById("modalContent");
    const closeModal = document.getElementById("closeModal");

    const recettes = recette.recipes; 

   function ShowRecipes(recettesFiltrees) {
  grid.innerHTML = "";

  recettesFiltrees.forEach((plat) => {
    const article = document.createElement("article");
    article.classList.add("recipe-card");

    const ingredientsHTML = plat.ingredients
      .map((item) => {
        const quantity = item.quantity ? `${item.quantity}` : "";
        const unit = item.unit ? ` ${item.unit}` : "";
        return `<li>${quantity}${unit} de ${item.ingredient}</li>`;
      })
      .join("");

    article.innerHTML = `
      <h2>${plat.name}</h2>
      <p><strong>Pour ${plat.servings} personnes</strong></p>
      <ul>${ingredientsHTML}</ul>
    `;

    article.addEventListener("click", () => {
      openModalWithRecipe(plat);
    });

    grid.appendChild(article);
  });
}

    function openModalWithRecipe(plat) {
      const ingredientsHTML = plat.ingredients
        .map((item) => {
          const quantity = item.quantity ? `${item.quantity}` : "";
          const unit = item.unit ? ` ${item.unit}` : "";
          return `<li>${quantity}${unit} de ${item.ingredient}</li>`;
        })
        .join("");

      modalContent.innerHTML = `
        <h2>${plat.name}</h2>
        <p><strong>Nombre de personnes :</strong> ${plat.servings}</p>
        <p><strong>Durée : ${plat.time} minutes</strong></p>
        <h3>Ingrédients :</h3>
        <ul>${ingredientsHTML}</ul>
        <p><em>Vous aurez besoin de : ${plat.ustensils} <br>
        et aussi : ${plat.appliance}</em> </p>
        <p>${plat.description}</p>
      `;

      modal.classList.remove("hidden");
    }

    closeModal.addEventListener("click", () => {
      modal.classList.add("hidden");
    });

    window.addEventListener("click", (e) => {
      if (e.target === modal) {
        modal.classList.add("hidden");
      }
    });

    searchInput.addEventListener("input", (e) => {
      const keyword = e.target.value.toLowerCase();

      const filtres = recettes.filter((plat) => {
        const nameMatch = plat.name.toLowerCase().includes(keyword);
        return nameMatch ;
      });

      ShowRecipes(filtres);
    });

    
    ShowRecipes(recettes);
  })
  .catch((err) => {
    console.error("Erreur lors du chargement du JSON :", err);
  });

     

     

    

    