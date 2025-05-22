console.log("script OK");

fetch("assets/data/recette.json")
    .then((res) => res.json())
    .then((recette) => {

        const grid = document.querySelector(".recipes-grid");


        function ShowRecipes() {
            console.log("function ShowRecipes run" )

           grid.innerHTML =""; 
           
           recette.recipes.forEach((plat) => {
            const article = document.createElement("article");
            article.classList.add("recipe-card");
            const ingredientsHTML = plat.ingredients.map(item => {
                const quantity = item.quantity ? `${item.quantity}` : "";
                const unit = item.unit ? `${item.unit}` : "";
                return `<li>${quantity}${unit} de ${item.ingredient}</li>`;
            }).join("");

            article.innerHTML = 
            `<h2>${plat.name}</h2>
            <p><strong>Nombre de personnes :</strong> ${plat.servings}</p>
            <ul>${ingredientsHTML}</ul>
            `;

            article.addEventListener("click" , () => {
                openModalWithRecipe(plat);
            })

            grid.appendChild(article);
            
            });
        }

         
         
        ShowRecipes();
         function openModalWithRecipe(plat) {
            const modal = document.getElementById("recipeModal");
            const modalContent = document.getElementById("modalContent");

            const ingredientsHTML = plat.ingredients.map(item => {
                const quantity = item.quantity ? `${item.quantity}` : "";
                const unit = item.unit ? ` ${item.unit}` : "";
                return `<li>${quantity}${unit} de ${item.ingredient}</li>`;
            }).join("");

            modalContent.innerHTML = `
                <h2>${plat.name}</h2>
                <p><strong>Nombre de personnes :</strong> ${plat.servings}</p>
                <h3>Ingrédients :</h3>
                <ul>${ingredientsHTML}</ul>
            `;

            modal.classList.remove("hidden");


        }

        document.getElementById("closeModal").addEventListener("click", () => {
            document.getElementById("recipeModal").classList.add("hidden");
            });

            window.addEventListener("click", (e) => {
            const modal = document.getElementById("recipeModal");
            if (e.target === modal) {
                modal.classList.add("hidden");
            }
            });
        

     });

     

     

    

    