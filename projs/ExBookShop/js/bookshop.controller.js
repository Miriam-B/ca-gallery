'use strict'

function onInit() {
    renderBooks();
}

function renderBooks() {
    var books = getBooks();
    var strHTML = books.map(function (book) {
        return `
        <tr>
            <td>${book.id}</td>
            <td>${book.title}</td>
            <td>${formatCurrency(book.price)}</td> 
            <td class="actions">
              <button data-trans="read" class="read btn-primary" onclick="onReadBook(${book.id})">Read</button>
              <button data-trans="update" class="update btn-warning" onclick="renderPriceModal(${book.id})">Update</button>
              <button data-trans="delete" class="delete btn-danger" onclick="onRemoveBook(${book.id})">Delete</button>
            </td>
        </tr>`
    }).join('')
    var elTbody = document.querySelector('tbody');
    elTbody.innerHTML = strHTML;
}

function onRemoveBook(bookId) {
    removeBook(bookId);
    renderBooks();
}

function onAddBook(ev) {
    ev.preventDefault();
    var elInputs = document.querySelectorAll('.new-book input');
    var name = document.querySelector('input[name="title"]').value;
    var price = +document.querySelector('input[name="price"]').value;
    elInputs.forEach(function (input) {
        input.value = '';
    })
    addBook(name, price);
    renderBooks();
}

function onUpdateBook(bookId) {
    var bookPrice = +document.querySelector('.price-input').value;
    updateBook(bookId, bookPrice);
    onCloseModal();
    renderBooks();
}

function renderPriceModal(bookId) {
    var strHTML = `
    <input class="price-input" type="number"/>
    <button class="btn-dark" onclick="onUpdateBook(${bookId})">Update Price</button>`;

    var elModal = document.querySelector('.modal');
    elModal.innerHTML = strHTML;
    elModal.style.display = 'flex';
}

function onReadBook(bookId) {
    var book = getBookById(bookId);
    renderModal(book);
}

function onCloseModal() {
    var elModal = document.querySelector('.modal');
    elModal.style.display = 'none';
}

function onUpdateRate(diff, bookId) {
    updateRate(diff, bookId);
    onReadBook(bookId);
}

function renderModal(book) {
    var strHTML = `
    <h4>Book Name: <span>${book.title}</span></h4>
    <h4>Book Price: <span>${book.price}</span></h4>
    <h4 class="rate">Book Rate: 
        <button class="rate-btn" onclick="onUpdateRate(-1, ${book.id})">-</button>
        <span>${book.rate}</span>
        <button class="rate-btn" onclick="onUpdateRate(1, ${book.id})">+</button>
    </h4>
    <h4>Book Summary:
            <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Tempore consequatur, vel inventore
                non
                eligendi enim dolores exercitationem fugit. Vero quisquam aperiam amet expedita possimus
                adipisci
                debitis voluptas, vitae maiores in iusto fuga fugiat molestias iste officiis, veritatis sit
                similique ullam, deserunt non necessitatibus saepe commodi quia excepturi. Totam sint
                voluptatem
                nostrum dolor harum culpa optio repellat nesciunt assumenda aperiam facere dolores aut sed
                aliquam
                obcaecati consequatur consequuntur.</p>
    </h4>
    <img src="${book.imgUrl}.jpg" alt="No Book Image">
    <button class="close" onclick="onCloseModal()">Close</button>`;

    var elModal = document.querySelector('.modal');
    elModal.innerHTML = strHTML;
    elModal.style.display = 'flex';
}

function onSortBooks(sortBy) {
    sortBooks(sortBy);
    renderBooks();
}

function onSetPage(diff) {
    var pageNum = setPage(diff);
    renderBooks();
    var elPageNum = document.querySelector('.current-page');
    elPageNum.innerText = pageNum;
}

function onSetLang(lang) {
    setLang(lang);
    if (lang === 'he') document.body.classList.add('rtl')
    else document.body.classList.remove('rtl')
    doTrans();
    renderBooks();
}