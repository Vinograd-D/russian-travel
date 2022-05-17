import item1 from '../images/__item.jpg'
import item2 from '../images/__item-1.jpg'
import item3 from '../images/__item-2.jpg'
import item4 from '../images/__item-3.jpg'
import item5 from '../images/__item-4.jpg'
import item6 from '../images/__item-5.jpg'
import item7 from '../images/__item-6.jpg'
import item8 from '../images/__item-7.jpg'
import item9 from '../images/__item-8.jpg'
import item10 from '../images/__item-9.jpg'
import item11 from '../images/__item-10.jpg'
import item12 from '../images/__item-11.jpg'


let items = [
    {
      url:  item1,
      alt: "Эргаки"
    },
    {
      url:  item2,
      alt: "Байкал"
    },
    {
        url:  item3,
        alt: "Камчатка"
    },
    {
        url:  item4,
        alt: "Камчатка"
    },
    {
        url:  item5,
        alt: "Станислав Кондратиев"
    },
    {
        url:  item6,
        alt: "Эльбрус"
    },
    {
        url:  item7,
        alt: "Байкал"
    },
    {
        url:  item8,
        alt: "Машина на льду"
    },
    {
        url:  item9,
        alt: "Вид сверху туман в лесу"
    },
    {
        url:  item10,
        alt: "Собака на сене"
    },
    {
        url:  item11,
        alt: "Атхарва Тулси"
    },
    {
        url:  item12,
        alt: "Поезд"
    }

]

let container = document.querySelector('.photo-grid')
let createFrag = document.createDocumentFragment()
let imgArray = () => {
    let img = document.createElement('img')
    img.classList.add('photo-grid__item')
}

items.forEach(function(images, index, originalArray) {
    let img = document.createElement('img')
    img.classList.add('photo-grid__item')
    img.src = images.url;
    img.alt = images.alt;
    createFrag.appendChild(img);
});


container.appendChild(createFrag);

