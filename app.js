$(document).ready(() => {
    $('#hamburger-menu').click(() => {
        $('#hamburger-menu').toggleClass('active')
        $('#nav-menu').toggleClass('active')
    })

    // setting owl carousel

    let navText = ["<i class='bx bx-chevron-left'></i>", "<i class='bx bx-chevron-right'></i>"]

    $('#hero-carousel').owlCarousel({
        items: 1,
        dots: false,
        loop: true,
        nav:true,
        navText: navText,
        autoplay: true,
        autoplayHoverPause: true
    })

    $('#top-movies-slide').owlCarousel({
        items: 2,
        dots: false,
        loop: true,
        autoplay: true,
        autoplayHoverPause: true,
        responsive: {
            500: {
                items: 3
            },
            1280: {
                items: 4
            },
            1600: {
                items: 6
            }
        }
    })

    $('.movies-slide').owlCarousel({
        items: 2,
        dots: false,
        nav:true,
        navText: navText,
        margin: 15,
        responsive: {
            500: {
                items: 2
            },
            1280: {
                items: 4
            },
            1600: {
                items: 6
            }
        }
    })
})


const API_URL = 'https://api.themoviedb.org/3/discover/movie?sort_by=popularity.desc&api_key=a225edd0c7c8e5b544e54355d4a63552&page=1'

const IMG_PATH = "https://image.tmdb.org/t/p/w1280"

const SEARCH_URL = 'https://api.themoviedb.org/3/search/movie?api_key=a225edd0c7c8e5b544e54355d4a63552&query="'

const main = document.getElementById('main')
const form = document.getElementById('form')
const search = document.getElementById('search')

//dapatkan data dari moviedb
getMovies(API_URL)


async function getMovies(url) {
    const res = await fetch(url)
    const data = await res.json()

    showMovies(data.results)
}

function showMovies(movies) {
    main.innerHTML = ''

    movies.forEach((movie) => {
        const { title, poster_path, vote_average, overview} = movie

        const movieEl = document.createElement('div')

        movieEl.classList.add('movie')

        movieEl.innerHTML = `
            <img src="${IMG_PATH + poster_path}" alt="${title}">
            <div class="movie-info">
                <h3>${title}</h3>
                <span class="${getClassByRate(vote_average)}">${vote_average}</span>
            </div>
            <div class="overview">
                <h3>Overview</h3>
                ${overview}
            </div>
        `

        main.appendChild(movieEl)
    })

}

function getClassByRate(vote){
    if(vote>= 8){
        return 'green'
    } else if(vote >= 5){
        return 'orange'
    } else {
        return 'red'
    }
}

form.addEventListener('submit',(e) => {
    e.preventDefault()

    const searchTerm = search.value

    if(searchTerm && searchTerm !== '') {
        getMovies(SEARCH_URL + searchTerm)

        search.value = ''
    } else {
        window.location.reload()
    }
})