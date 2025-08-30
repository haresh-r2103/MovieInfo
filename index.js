const stbn = document.getElementById('sbtn');


stbn.addEventListener('click', () => {
    const movieName = document.getElementById('input').value.trim();
    if (movieName.length === 0) {
        alert("Please enter the movie correctly!!");
    } else {
        getMovieData(movieName);
        
    }
});

// async -> try -> await -> do all stuff -> catch
async function getMovieData(mn) {
    const dis = document.querySelector('.display'); 
    const loader = document.getElementById('loader');
    loader.style.display = 'block';
    dis.innerHTML = "";
    try {
        const details = await fetch(`https://www.omdbapi.com/?apikey=5c59530e&t=${mn}`);
        const js = await details.json();
        await new Promise(res => setTimeout(res, 1000));
        loader.style.display = 'none';

        if (js.Response === "True") {
            dis.innerHTML = `
                <h2>${js.Title} (${js.Year})</h2>
                <img src="${js.Poster}" alt="${js.Title}">
                <p><strong>Genre:</strong> ${js.Genre}</p>
                <p><strong>Plot:</strong> ${js.Plot}</p>
                <p><strong>Actors:</strong> ${js.Actors}</p>
                <p><strong>IMDB Rating:</strong> ${js.imdbRating}</p>
            `;
        } else {
            dis.innerHTML = `<p>Movie not found! Try again.</p>`;
        }

    } catch (err) {
        console.error("Error fetching movie data:", err);
        dis.innerHTML = `<p>Something went wrong!</p>`;
    }
}
