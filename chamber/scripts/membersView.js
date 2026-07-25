document.addEventListener("DOMContentLoaded", () => {

    const viewButton = document.querySelector("#view-button");

    const directory = document.querySelector("#directory");

    viewButton.addEventListener("click", () => {

        if (viewButton.textContent.includes("list view")) {
            
            directory.classList.add("list");

            directory.classList.remove("grid");

            viewButton.textContent = "grid view";

        } else if (viewButton.textContent.includes("grid view")) {
            
            directory.classList.add("grid");

            directory.classList.remove("list");

            viewButton.textContent = "list view";

        };

    });

});
