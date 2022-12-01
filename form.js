const saveArticle = document.querySelector('button[type="submit"]')
const deleteInfo = document.querySelector('button[type="reset"]')
const inputs = document.querySelectorAll("input")

const autoSave = JSON.parse(localStorage.getItem("autoSave")) || false

if (autoSave) {
    console.log(autoSave);
    document.querySelector("input[name='auteur']").value = autoSave.auteur
    document.querySelector("input[name='img']").value = autoSave.pictureProfil
    document.querySelector("input[name='categorie']").value = autoSave.categorie
    document.querySelector("input[name='titre']").value = autoSave.titre
}

// Suppression des infos
deleteInfo.addEventListener("click", () => {
    localStorage.removeItem("autoSave")
})

// Sauvegarde auto
inputs.forEach((input)=>{
    input.addEventListener("change", () => {
        let saveArticle = {
            auteur : document.querySelector("input[name='auteur']").value,
            pictureProfil : document.querySelector("input[name='img']").value,
            categorie :document.querySelector("input[name='categorie']").value,
            titre :document.querySelector("input[name='titre']").value,
            contenu :document.querySelector("textarea[name='contenu']").value
        }
        localStorage.setItem("autoSave", JSON.stringify(saveArticle))
        
    })

})

// Ajout de l'article
saveArticle.addEventListener("click", (e) => {
    e.preventDefault()
    let newArticle = {
        auteur : document.querySelector("input[name='auteur']").value,
        pictureProfil : document.querySelector("input[name='img']").value,
        categorie :document.querySelector("input[name='categorie']").value,
        titre :document.querySelector("input[name='titre']").value,
        contenu :document.querySelector("textarea[name='contenu']").value
    }
    localStorage.setItem(newArticle.titre, JSON.stringify(newArticle))
    // Suppression de la sauvegarde auto
    localStorage.removeItem("autoSave")
    document.querySelector("input[name='auteur']").value = ""
    document.querySelector("input[name='img']").value = ""
    document.querySelector("input[name='categorie']").value = ""
    document.querySelector("input[name='titre']").value = ""
    document.querySelector("textarea[name='contenu']").value = ""
})