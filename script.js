// Récupération des éléments HTML nécessaires
var form = document.getElementById("myForm"),
    title = document.getElementById("title"),
    category = document.getElementById("category"),
    message = document.getElementById("message"),
    submitBtn = document.querySelector(".submit"),
    ideaList = document.getElementById("ideas"),
    modal = document.getElementById("ideaForm"),
    modalTitle = document.querySelector("#ideaForm .modal-title"),
    newIdeaBtn = document.querySelector(".newIdea");

// Initialisation du tableau d'idées depuis le localStorage
let ideas = localStorage.getItem('ideas') ? JSON.parse(localStorage.getItem('ideas')) : [];

let isEdit = false, editId;

// Fonction pour afficher les idées dans le tableau
displayIdeas();

newIdeaBtn.addEventListener('click', () => {
    submitBtn.innerText = 'Soumettre';
    modalTitle.innerText = "Soumettre une Idée";
    isEdit = false;
    form.reset();
});

function displayIdeas() {
    // Suppression de toutes les lignes d'idées existantes pour éviter les doublons
    document.querySelectorAll('.ideaDetails').forEach(idea => idea.remove());

    // Parcours de toutes les idées et création de lignes HTML pour chaque idée
    ideas.forEach((idea, index) => {
        // Calcul de l'index pour afficher (dernière idée ajoutée aura l'index 1)
        let displayIndex = ideas.length - index;
        
        let row = `
            <tr class="ideaDetails">
                <td>${displayIndex}</td>
                <td>${idea.title}</td>
                <td>${idea.category}</td>
                <td>${idea.message}</td>
                <td>${idea.status}</td>
                <td>
                    <button class="btn btn-success" onclick="approveIdea(${index})"><i class="bi bi-check-circle"></i></button>
                    <button class="btn btn-warning" onclick="disapproveIdea(${index})"><i class="bi bi-x-circle"></i></button>
                    <button class="btn btn-danger" onclick="deleteIdea(${index})"><i class="bi bi-trash"></i></button>
                </td>
            </tr>
        `;
        
        // Ajout de la ligne à la liste des idées affichées sur la page
        ideaList.insertAdjacentHTML('afterbegin', row);
    });
}


function approveIdea(index) {
    ideas[index].status = 'Approuvé';
    localStorage.setItem("ideas", JSON.stringify(ideas));
    displayIdeas();
}

function disapproveIdea(index) {
    ideas[index].status = 'Désapprouvé';
    localStorage.setItem("ideas", JSON.stringify(ideas));
    displayIdeas();
}

function deleteIdea(index) {
    if (confirm("Êtes-vous sûr de vouloir supprimer cette idée?")) {
        ideas.splice(index, 1);
        localStorage.setItem("ideas", JSON.stringify(ideas));
        displayIdeas();
    }
}

form.addEventListener('submit', (e) => {
    e.preventDefault();
    
    const newIdea = {
        title: title.value,
        category: category.value,
        message: message.value,
        status: 'En attente'
    };
    
    if (!isEdit) {
        ideas.push(newIdea);
    } else {
        isEdit = false;
        ideas[editId] = newIdea;
    }
    
    localStorage.setItem('ideas', JSON.stringify(ideas));
    
    submitBtn.innerText = "Soumettre";
    modalTitle.innerText = "Soumettre une Idée";
    
    displayIdeas();
    
    form.reset();
    
    // Fermer la modal
    var bootstrapModal = bootstrap.Modal.getInstance(modal);
    bootstrapModal.hide();
});
