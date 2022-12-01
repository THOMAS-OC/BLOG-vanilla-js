const saveArticle = document.querySelector('button[type="submit"]')

saveArticle.addEventListener("click", (e) => {
    e.preventDefault()
    let newArticle = {
        auteur : document.querySelector("input[name='auteur']").value,
        pictureProfil : document.querySelector("input[name='img']").value,
        categorie :document.querySelector("input[name='categorie']").value,
        titre :document.querySelector("input[name='titre']").value,
        contenu :document.querySelector("textarea[name='contenu']").value
    }
    console.log(newArticle)
    localStorage.setItem(newArticle.titre, JSON.stringify(newArticle))
    console.log(localStorage)
})