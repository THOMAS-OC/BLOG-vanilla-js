

let posts = [] 
const main = document.querySelector("main")
const filtreContain = document.querySelector("ul")
const inputSearch = document.querySelector("input[type='search']")
let search = ""
let filtres = document.querySelectorAll("li")
let activeFilter = ""

let updateBtn = document.querySelectorAll(".update")

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

    if (!posts[0]){
        main.innerHTML = `<p class="empty">Aucun article n'a été rédigé à ce jour. <br> <a href="form.html"> Ecrivez le <strong> premier ! </strong> </a> </p>`
    }

    else {
        if (search) {
            for (const iterator of posts) {
                if (iterator.contenu.toLowerCase().includes(search.toLowerCase()) || iterator.titre.toLowerCase().includes(search.toLowerCase()) || iterator.auteur.toLowerCase().includes(search.toLowerCase())) {
                    main.innerHTML += `<article data-id=${iterator.id}>
                    <img src="img/${iterator.pictureProfil}" alt="Photo de profil">
                    <h2> ${iterator.titre}</h2>
                    <h3> ${iterator.auteur} - ${iterator.date}</h3>
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
    
        else if (activeFilter) {
            for (const iterator of posts) {
                if (iterator.categorie === activeFilter) {
                    main.innerHTML += `<article data-id=${iterator.id}>
                    <img src="img/${iterator.pictureProfil}" alt="Photo de profil">
                    <h2> ${iterator.titre}</h2>
                    <h3> ${iterator.auteur} - ${iterator.date}</h3>
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
                main.innerHTML += `<article data-id=${iterator.id}>
                <img src="img/${iterator.pictureProfil}" alt="Photo de profil">
                <h2> ${iterator.titre}</h2>
                <h3> ${iterator.auteur} - ${iterator.date}</h3>
                <p> ${iterator.contenu}</p>            
                <div>
                    <button class="delete">Supprimer</button>
                    <button class="update">Modifier</button>
                </div>
            
                </article>
                `
            }
        }
        updateBtn = document.querySelectorAll(".update")
    }



    
}

insertPost()

// Suppression d'un post
const buttonDelete = document.querySelectorAll(".delete")
buttonDelete.forEach((btn)=>{
    btn.addEventListener("click", () => {
        let articleParent = btn.parentNode.parentNode
        let id = articleParent.getAttribute("data-id")
        localStorage.removeItem(id)
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
        asideBtn.style.transform = "rotate(0deg)"
        main.style.transform = "translateX(0vw)"
    }
    
    else {
        asideBtn.style.transform = "rotate(-180deg)"
        aside.className = "view"
        main.style.transform = "translateX(10vw)"
        window.setTimeout(() => {
            aside.className = ""
            asideBtn.style.transform = "rotate(0deg)"
            main.style.transform = "translateX(0vw)"
        }, 8000)
    }

})

// Affichages des filtres
function updateFilters() {
    filtreContain.innerHTML = ""
    let listFilter = []
    for (const iterator of posts) {
        if (!listFilter.includes(iterator.categorie))  {
            filtreContain.innerHTML += `<li> ${iterator.categorie} </li>`
            filtres = document.querySelectorAll("li")
            listFilter.push(iterator.categorie)
        }
    }
    if (filtreContain.innerHTML) {
        filtreContain.innerHTML += `<li> X </li>`
        filtres = document.querySelectorAll("li")
    } 
}

updateFilters()

// Filtrage des posts
filtres.forEach((el) => {
    el.addEventListener("click", () => {
        if (el.innerText == "X") {
            activeFilter = ""
            removeStyleFilters()
            insertPost()
        }
        else {
            console.log(el)
            activeFilter = el.innerText
            removeStyleFilters()
            el.style.fontWeight = "bolder"
            el.style.textDecoration = "underline"
            insertPost()
        }

    })
})

// removeStyleFilters
function removeStyleFilters(){
    filtres.forEach((el) => {
        el.style.textDecoration = "none"
        el.style.fontWeight = "normal"
    })
}

// Recherche dynamique
inputSearch.addEventListener("keyup", () => {
    search = inputSearch.value
    insertPost()
})

// Mise à jour de post
updateBtn.forEach((el) => {
    el.addEventListener("click", () => {
        let articleParent = el.parentNode.parentNode
        let id = articleParent.getAttribute("data-id")
        location.assign(`http://127.0.0.1:5500/form.html?updateId=${id}`)
    })
})
