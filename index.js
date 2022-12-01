let posts = []
const main = document.querySelector("main")

// Ajout des post au tableau
for (let key of Object.keys(localStorage)) {
    
    if (key != "autoSave") {
        let post = JSON.parse(localStorage.getItem(key))
        posts.push(post)
    }

}

// Insertion des posts dans le DOM HTML
for (const iterator of posts) {
    console.log(iterator);
    main.innerHTML += `<article>
    <img src="img/${iterator.pictureProfil}" alt="Photo de profil">
    <h2> ${iterator.titre}</h2>
    <h3> ${iterator.auteur} - date</h3>
    <p> ${iterator.contenu}</p>            
    <div>
        <button class="delete">Supprimer</button>
        <button class="update">Modifier</button>
    </div>

    </article>
    `
}

// Suppression d'un post
const buttonDelete = document.querySelectorAll(".delete")
buttonDelete.forEach((btn)=>{
    btn.addEventListener("click", () => {
        // alert("test")
        let articleParent = btn.parentNode.parentNode
        let title = articleParent.querySelector("h2").innerText
        // console.log(title);
        localStorage.removeItem(title)
        articleParent.style.display = "none"
    })
})

// Affichage de aside
const aside = document.querySelector("aside")
const asideBtn = document.querySelector(".arrow")

asideBtn.addEventListener("click", () => {

    if (aside.className == "view") {
        aside.className = ""
        main.style.transform = "translateX(0vw)"
    }
    
    else {
        aside.className = "view"
        main.style.transform = "translateX(10vw)"
    }

})