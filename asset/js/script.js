const postTemp = document.getElementById('post')
const posts = document.querySelector('.posts')
const btnFetch = document.querySelector('.btn-fetch')
const btnAdd = document.querySelector('.btn-add')
btnAdd.addEventListener('click', () => {
    const titleEl = document.getElementById('title')
    const descEl = document.getElementById('description')
    const postEl = document.importNode(postTemp.content, true).firstElementChild


    postEl.querySelector('.post-title').innerText = titleEl.value
    postEl.querySelector('.post-description').innerText = descEl.value
    posts.insertAdjacentElement('beforeEnd', postEl)
    postEl.scrollIntoView()
})

posts.addEventListener('click', (evnt) => {
    const selectedPost = evnt.target.closest('.post')
    const delBtn = selectedPost.querySelector('.btn-delete')
    if (delBtn && evnt.target == delBtn) {
        selectedPost.parentElement.removeChild(selectedPost)
    }
})


btnFetch.addEventListener('click', () => {
    posts.innerHTML = ''

    const xhr = new XMLHttpRequest()
    xhr.open('GET', 'https://jsonplaceholder.typicode.com/posts', async = true)


    xhr.addEventListener('load', (evnt) => {
        const postsData = JSON.parse(xhr.response);
        // console.log(postsData);
        postsData.forEach(postDt => {
            const postEl = document.importNode(postTemp.content, true).firstElementChild
            // console.dir(postEl.querySelector('.post-title'));

            postEl.querySelector('.post-title').innerText = postDt['title']
            postEl.querySelector('.post-description').innerText = postDt['body']
            posts.insertAdjacentElement('beforeEnd', postEl)
        });
    })
    xhr.send()
})

