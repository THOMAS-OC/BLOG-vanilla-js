let posts = []
const main = document.querySelector("main")

for (let key of Object.keys(localStorage)) {
    
    if (key != "autoSave") {
        let post = JSON.parse(localStorage.getItem(key))
        posts.push(post)
    }

}

for (const iterator of posts) {
    console.log(iterator);
    main.innerHTML += `<article>
    <img src="${iterator.pictureProfil}" alt="Photo de profil">
    <h2> ${iterator.titre}</h2>
    <h3> ${iterator.auteur} - date</h3>
    <p> ${iterator.contenu}</p>            
    <div>
        <button class="delete">Supprimer</button>
        <button class="update">Sauvegarder</button>
    </div>

    </article>
    `
}
