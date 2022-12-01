let posts = []

for (let key of Object.keys(localStorage)) {
    
    if (key != "autoSave") {
        console.log(key);
        let post = JSON.parse(localStorage.getItem(key))
        posts.push(post)
    }

}

console.log(posts);