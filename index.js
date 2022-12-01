let posts = [] 
const main = document.querySelector("main")
const filtreContain = document.querySelector("ul")

let filtres = document.querySelectorAll("li")
console.log(filtres);
let activeFilter = ""

// Ajout des post au tableau

function updatePosts () {
    posts = []
    for (let key of Object.keys(localStorage)) {
    
        if (key != "autoSave") {
            let post = JSON.parse(localStorage.getItem(key))
            posts.push(post)
        }
    
    }
}

updatePosts()
// Insertion des posts dans le DOM HTML
function insertPost() {
    main.innerHTML = ""

    if (activeFilter) {
        for (const iterator of posts) {
            if (iterator.categorie === activeFilter) {
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
        }
    }

    else {
        for (const iterator of posts) {
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
    }
}

insertPost()

// Suppression d'un post
const buttonDelete = document.querySelectorAll(".delete")
buttonDelete.forEach((btn)=>{
    btn.addEventListener("click", () => {
        let articleParent = btn.parentNode.parentNode
        let title = articleParent.querySelector("h2").innerText
        localStorage.removeItem(title)
        articleParent.style.display = "none"
        updatePosts()
        updateFilters()
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

// Affichages des filtres
function updateFilters() {
    filtreContain.innerHTML = ""
    let listFilter = []
    for (const iterator of posts) {
        if (!listFilter.includes(iterator.categorie))  {
            console.log(iterator.categorie);
            filtreContain.innerHTML += `<li> ${iterator.categorie} </li>`
            filtres = document.querySelectorAll("li")
            listFilter.push(iterator.categorie)
        }
    }
}

updateFilters()

// Filtrage des posts
filtres.forEach((el) => {
    el.addEventListener("click", () => {
        activeFilter = el.innerText
        insertPost()
    })
})