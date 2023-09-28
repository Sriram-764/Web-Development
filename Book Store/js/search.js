const searchbtn = document.getElementById('search_icon');

searchbtn.addEventListener("click", () => {
    searchBook(document.getElementById('search').value);
})

function searchBook(e) {
    const api = "AIzaSyBkW5B7CC8s5ApjcXtoEAlEyoNfnE9g6Qc";
    const url = `https://www.googleapis.com/books/v1/volumes?q=${e}&fields=items(volumeInfo(title,authors,imageLinks,industryIdentifiers,categories))&$key=${api}`

    fetch(url)
    .then(response => response.json())
    .then(data => {
        const books = data.items;
        const output = document.getElementById("output-list");
        output.innerHTML = "";

        if(!books) {
            output.textContent = `No books Found!`;
            return;
        }
        books.forEach(book => {
            const title = book.volumeInfo.title;
            const authors = book.volumeInfo.authors ? book.volumeInfo.authors.join(', ') : 'Unknown';
            const imageLink = book.volumeInfo.imageLinks ? book.volumeInfo.imageLinks.thumbnail : '/images/book.png';
            const isbnArray = book.volumeInfo.industryIdentifiers ? book.volumeInfo.industryIdentifiers || [] : null;
            const isbn10 = book.volumeInfo.industryIdentifiers ? isbnArray[0].identifier : null;
            const isbn13 = book.volumeInfo.industryIdentifiers ? isbnArray[1].identifier : null;
            const categories = book.volumeInfo.categories ? book.volumeInfo.categories.join(', ') : 'Genres not available';

            const bookElement = document.createElement("div");
            bookElement.setAttribute("id","bookElement")
            const imageElement = document.createElement("div");
            imageElement.setAttribute("id","imageElement");
            const detailsElement = document.createElement("div");
            detailsElement.setAttribute("id","detailsElement")
            const seperator = document.createElement("hr");
            const read = document.createElement("button");
            read.innerHTML = "Read me";
            read.setAttribute("data-isbn13",isbn13);
            read.onclick = function() {
                const exportIsbn = this.getAttribute("data-isbn13");
                var openUrl = `viewer.html?isbn13=${exportIsbn}`;
                window.open(openUrl,'blank');
            }
            imageElement.innerHTML = `<img src="${imageLink}" alt="${title}">`
            detailsElement.innerHTML = 
                                        `<h3>Title: ${title}</h3>
                                        <p>Authors: ${authors}</p>
                                        <p>ISBN 10: ${isbn10}</p>
                                        <p>ISBN 13: ${isbn13}</p>
                                        <p>Genres: ${categories}</p>`;
            detailsElement.appendChild(read);
            bookElement.appendChild(imageElement);
            bookElement.appendChild(detailsElement);
            output.appendChild(bookElement);
            output.appendChild(seperator);
        });
    })
    .catch(error => console.log(error))
}