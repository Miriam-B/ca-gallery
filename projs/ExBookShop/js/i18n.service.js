var gTrans = {
    title: {
        en: 'Welcome to the Bookshop',
        he: 'ברוכים הבאים לחנות הספרים'
    },
    'language-choise': {
        en: 'Choose a language',
        he: 'בחרו שפה',
    },
    'book-title': {
        en: 'Title',
        he: 'כותרת',
    },
    'price': {
        en: 'Price',
        he: 'מחיר'
    },
    'new-book': {
        en: 'Create new book',
        he: 'צרו ספר חדש'
    },
    'id': {
        en: 'ID',
        he: 'מספר זהות',
    },
    'actions': {
        en: 'Actions',
        he: 'פעולות',
    },
    'read': {
        en: 'Read',
        he: 'לקרוא',
    },
    update: {
        en: 'Update',
        he: 'לעדכן',
    },
    'delete': {
        en: 'Delete',
        he: 'למחוק',
    },
    'back': {
        en: 'Back',
        he: 'חזרה'
    },
    'next': {
        en: 'Next',
        he: 'קדימה'
    }
};

var gCurrLang = 'en';

function getTrans(transKey) {
    var keyTrans = gTrans[transKey];
    if (!keyTrans) return 'UNKNOWN';

    var txt = keyTrans[gCurrLang];
    if (!txt) txt = keyTrans['en'];

    return txt;
}

function doTrans() {
    var els = document.querySelectorAll('[data-trans]')

    els.forEach(function (el) {
        var transKey = el.dataset.trans;
        var txt = getTrans(transKey);

        if (el.nodeName === 'INPUT') {
            // el.placeholder = txt
            // THE SAME!!
            el.setAttribute('placeholder', txt);
        } else {
            el.innerText = txt;
        }
    });
}

function setLang(lang) {
    gCurrLang = lang;
}

function formatCurrency(num) {
    if(gCurrLang === 'en') {
        return new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD' }).format(num);
    } else if(gCurrLang === 'he') {
        return new Intl.NumberFormat('he-IL', { style: 'currency', currency: 'ILS' }).format(num);
    }
}