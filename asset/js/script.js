const postTemp = document.getElementById('post')
const posts = document.querySelector('.posts')
const btnFetch = document.querySelector('.btn-fetch')
const btnAdd = document.querySelector('.btn-add')
const descEl = document.getElementById('description')

descEl.addEventListener('keypress', (evnt) => {
    if (evnt.key == 'Enter') {
        btnAdd.click()
    }
})

btnAdd.addEventListener('click', (evnt) => {
    evnt.preventDefault()
    const titleEl = document.getElementById('title')
    const descEl = document.getElementById('description')
    const postEl = document.importNode(postTemp.content, true).firstElementChild


    postEl.querySelector('.post-title').innerText = titleEl.value
    postEl.querySelector('.post-description').innerText = descEl.value
    posts.insertAdjacentElement('beforeEnd', postEl)
    postEl.scrollIntoView()

    //clear inputs
    titleEl.value = ''
    descEl.value = ''
})

posts.addEventListener('click', (evnt) => {
    const selectedPost = evnt.target.closest('.post')
    const delBtn = selectedPost.querySelector('.btn-delete')
    if (delBtn && evnt.target == delBtn) {
        selectedPost.parentElement.removeChild(selectedPost)
    }
})


function getResponseData() {
    const promise = new Promise((resolve, reject) => {
        const xhr = new XMLHttpRequest()
        xhr.open('GET', 'https://jsonplaceholder.typicode.com/posts', async = true)


        xhr.addEventListener('load', (evnt) => {
            document.querySelector('.spinner').classList.add('hidden')
            if (xhr.status >= 200 && xhr.status < 300)
                resolve(xhr.response);
            else
                reject(xhr.response)
        })
        xhr.addEventListener('error', (evnt) => {
            document.querySelector('.spinner').classList.add('hidden')
            reject(xhr.response);
        })
        xhr.send()
    })
    return promise
}
btnFetch.addEventListener('click', async (evnt) => {
    posts.innerHTML = ''
    evnt.target.disabled = true
    document.querySelector('.spinner').classList.remove('hidden')
    let data;
    try {
        data = await getResponseData()
    } catch (error) {
        console.error('error');
        return
    }
    const postsData = JSON.parse(data)
    postsData.forEach(postDt => {
        const postEl = document.importNode(postTemp.content, true).firstElementChild
        // console.dir(postEl.querySelector('.post-title'));

        postEl.querySelector('.post-title').innerText = postDt['title']
        postEl.querySelector('.post-description').innerText = postDt['body']
        posts.insertAdjacentElement('beforeEnd', postEl)
    });
    evnt.target.disabled = false
})

