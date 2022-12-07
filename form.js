// Add or Update
const isUpdate = new URL(location.href).searchParams.get("updateId")

const saveArticle = document.querySelector('button[type="submit"]')
const deleteInfo = document.querySelector('button[type="reset"]')
const inputs = document.querySelectorAll("input")

const autoSave = JSON.parse(localStorage.getItem("autoSave")) || false

if (autoSave && !isUpdate) {
    console.log(autoSave);
    document.querySelector("input[name='auteur']").value = autoSave.auteur
    document.querySelector("input[name='img']").value = autoSave.pictureProfil
    document.querySelector("input[name='categorie']").value = autoSave.categorie
    document.querySelector("input[name='titre']").value = autoSave.titre
}

else if (isUpdate) {
    const updateArticle = JSON.parse(localStorage.getItem(isUpdate)) || false
    document.querySelector("input[name='auteur']").value = updateArticle.auteur
    document.querySelector("input[name='img']").value = updateArticle.pictureProfil
    document.querySelector("input[name='categorie']").value = updateArticle.categorie
    document.querySelector("input[name='titre']").value = updateArticle.titre
    document.querySelector("textarea").value = updateArticle.contenu
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

// Ajout ou modification de l'article
saveArticle.addEventListener("click", (e) => {
    e.preventDefault()
    let newArticle = {
        id : isUpdate ? isUpdate : (localStorage.length + 1).toString(),
        date : new Date().toLocaleDateString("fr"),
        auteur : document.querySelector("input[name='auteur']").value,
        pictureProfil : document.querySelector("input[name='img']").value || "anonyme.jpg",
        categorie :document.querySelector("input[name='categorie']").value.toUpperCase(),
        titre :document.querySelector("input[name='titre']").value,
        contenu :document.querySelector("textarea[name='contenu']").value
    }
    localStorage.setItem(newArticle.id, JSON.stringify(newArticle))
    // Suppression de la sauvegarde auto
    localStorage.removeItem("autoSave")
    document.querySelector("input[name='auteur']").value = ""
    document.querySelector("input[name='img']").value = ""
    document.querySelector("input[name='categorie']").value = ""
    document.querySelector("input[name='titre']").value = ""
    document.querySelector("textarea[name='contenu']").value = ""

    // Redirection vers l'accueil
    let url = location.href
    url = url.slice(0, url.lastIndexOf("/"))
    url = `${url}/index.html`;
    location.assign(url)
})