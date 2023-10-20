async function sendHttpRequest(method, url) {
    try {
        const response = await fetch(url, {
            method: method,
            headers: {
                accept: 'application/json',
                Authorization: 'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiI3ZThiNDE0NTM2ODE3MjJhZDZjYzY3ZmNkODBjNmQxMCIsInN1YiI6IjY1MmYxZjYxYTgwMjM2MDBlMGFjOGIwMSIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.YFW0YEmPcxnGxR14jWV_7zAANVoaA1Monw4bSTmMtVE'
            }
        })
        if (!response.ok) {
            throw new Error("ERROR");
        }
        else {
            const data = await response.json();
            return data;
        }
    }
    catch (err) {
        throw new Error("EOREORWEOREO")
    }
}
async function fetchpost(value) {
    const responseData = await sendHttpRequest('GET', 'https://api.themoviedb.org/3/movie/top_rated?language=en-US&page=1')
    console.log(responseData)

    responseData.results.forEach ( data => {
        const postTemplate = document.querySelector(".posts");
        const postli = document.createElement("div");


        postli.className = "movie-card"
        postli.id = data.id

        const postimg = document.createElement("img");
        postimg.src = "https://image.tmdb.org/t/p/w500" + data.backdrop_path

        const score = document.createElement("p");
        score.textContent =   `⭐  ${data.vote_average}`; 

        const posth3 = document.createElement("h3")
        posth3.textContent = data.original_title

        const postp = document.createElement("p");
        postp.textContent = data.overview

        postli.appendChild(postimg)
        
        postli.appendChild(posth3)
        posth3.appendChild(score)
        postli.appendChild(postp)
        postTemplate.appendChild(postli)
        
        postli.addEventListener("click", event => {
            alert("MOVIE ID: " + data.id)
        })
    });

}
function handlerSearch(event) {
    event.preventDefault();
    const inputElement = document.getElementById("search-input");
    const searchValue = inputElement.value.toLowerCase();
    filter(searchValue)
    
}
function filter(search){
    const card = document.querySelectorAll(".movie-card")
    card.forEach((filter) => {
        const title = filter.querySelector("h3");
        const titleelement = title.textContent.toLowerCase();
        if(!titleelement.includes(search)){
            filter.style.display = "none"
        }
        else{
            filter.style.display ="inline-block"
        }
    })
}

fetchpost();










