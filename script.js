const form = document.querySelector('form');
const input = document.querySelector('#txtTaskname'); //input un id sini aldık
const btndeleteAll = document.querySelector('#btnDeleteAll')
const tasklist = document.querySelector('#task-list');
const list = document.querySelector('.list-group-item list-group-item-secondary');
const headdiv = document.querySelector('.headdiv');


let items;

//load items
loadItems();

//call eventListeners
eventListeners();
function eventListeners() {

    form.addEventListener('submit', addNewItem);
    tasklist.addEventListener('click', deleteItem);
    btndeleteAll.addEventListener('click', deleteAllItems)
    input.addEventListener('click', inputfls);

}


function inputfls() {
    input.placeholder = '';
}

//add new item
function addNewItem(e) {

    if (input.value === '') {
        alert('add new item');
    }
    else {
        //create item
        createItem(input.value);
        //save to LS
        setItemToLS(input.value);
        // clear input
        input.value = '';
    }

    e.preventDefault(); //varsayılan olarak submit olmasını kapattık.

}

function createicons(headdiv, li) {
    const icon = document.createElement('i');
    icon.className = "material-icons float-center";
    icon.textContent = 'block';
    icon.id = 'icon';

    headdiv.appendChild(icon);
    li.appendChild(headdiv);



}
function warningbutton(headdiv, li) {           //text e basılan butonun bulunduğu li nin id si geliyor


    createicons(headdiv, li);


}

// delete an item
function succes(text) {
    const succesText = document.createElement('h8');
    succesText.className = 'succesText';
    succesText.textContent = text + '   işlemi Başarı ile Gerçekleşti.';
    tasklist.appendChild(succesText);
}
function deleteItem(e) {

    if (e.target.className === 'btn btn-light') {
        if (confirm('İptal Etmek İstediğine Emin misin?')) {
            e.target.parentElement.parentElement.remove();
            deleteItemFromLS(e.target.parentElement.firstChild.textContent);
        };
    }
    else if (e.target.id === 'btnsucces') {


        setTimeout(function () {

            e.target.parentElement.parentElement.remove();
            deleteItemFromLS(e.target.parentElement.firstChild.textContent);
        }, 300);
        succes(e.target.parentElement.firstChild.textContent)


    }
    else if (e.target.className === 'btn btn-warning') {

        warningbutton(e.target.parentElement, e.target.parentElement.parentElement);

    }
    else if (e.target.className === 'btn btn-danger') {
        createunsucces(e.target.parentElement.firstChild);
        e.target.parentElement.parentElement.remove();
        e.target.remove();

        //iTags=document.querySelectorAll('i');
        //iTags.forEach(function(item){
        //    item.remove();})

    }

    e.preventDefault();
}
function createunsucces(headdiv) {

    const unsuccess = document.createElement('del');
    unsuccess.className = 'textt'
    unsuccess.innerText = headdiv.firstChild.textContent + '   İşlemi Yapılamadı.'
    tasklist.appendChild(unsuccess);

}
function deleteItemFromLS(text) {
    items = getItemFromLS();
    items.forEach(function (item, index) { // index dizi içerisinde hangi eleman olduğu
        if (item === text) {
            items.splice(index, 1)
        } //kaç eleman silinecekse o sayı
    });
    localStorage.setItem('items', JSON.stringify(items));

}

//delete all items
function deleteAllItems(e) {
    if (confirm('Emin misin?')) {

        //tasklist.innerHTML = ''; //alternatif
        while (tasklist.firstChild) { //ul nin firstchild ı olduğu sürece dönecek
            tasklist.removeChild(tasklist.firstChild);
        }
        localStorage.clear();

    }
    e.preventDefault();
}

function loadItems() {
    items = getItemFromLS();
    items.forEach(function (item, index) {
        createItem(item, index);
    });
}
function createItem(text, index) {
    const headdiv = document.createElement('div');
    headdiv.className = 'headdiv'
    headdiv.id = 'div' + index;

    const li = document.createElement('li');
    li.className = 'list-group-item list-group-item-secondary';
    li.id = 'li' + index;
    //create a


    const a = document.createElement('a') //bir a etiketi oluşturalım
    a.classList = 'delete-item float-right';
    a.setAttribute('href', '#');   //href e  " # "ekledik
    a.innerHTML = '<i class="fas fa-times"></i>'

    const succesdiv = document.createElement('button');
    succesdiv.type = 'button'
    succesdiv.className = 'btn btn-success';
    succesdiv.textContent = 'Başarılı';
    succesdiv.id = 'btnsucces';


    const warndiv = document.createElement('button');
    warndiv.type = 'button';
    warndiv.className = 'btn btn-warning';
    warndiv.textContent = 'Ertele';


    const dangerdiv = document.createElement('button');
    dangerdiv.type = 'button';
    dangerdiv.className = 'btn btn-danger';
    dangerdiv.textContent = 'Yapılamadı';


    const textdiv = document.createElement('div');
    textdiv.className = 'textdiv'
    textdiv.textContent = text;

    const linkdiv = document.createElement('button');
    linkdiv.type = 'button'
    linkdiv.className = 'btn btn-light';
    linkdiv.textContent = 'İptal'
    linkdiv.id = 'cancel';

    headdiv.appendChild(textdiv);
    headdiv.appendChild(succesdiv);
    headdiv.appendChild(warndiv);
    headdiv.appendChild(dangerdiv);
    headdiv.appendChild(linkdiv);

    li.appendChild(headdiv);
    tasklist.appendChild(li);
}
//get item from local stroge
function getItemFromLS() {
    if (localStorage.getItem('items') === null) {
        items = [];

    }
    else {
        items = JSON.parse(localStorage.getItem
            ('items'));                //dönştürüp itemsları alıyoyruz
    }
    return items;
}
function setItemToLS(text) {
    items = getItemFromLS();
    items.push(text); //liste üzerine bir eleman eklendi
    localStorage.setItem('items', JSON.stringify(items)); //string bir ifade içinde köşeli parantez olacak(eğer eklenmezse sadece araya virgül ekleyerek bir string ifade ekler)

}