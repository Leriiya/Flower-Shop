const init = () => {
    const myMap = new ymaps.Map(
        'map',
        {
            center: [44.5942998889445, 33.46099827299463],
            zoom: 16,
            controls: ['smallMapDefaultSet'],
        },
        {},
    );
    const myPlacemark = new ymaps.Placemark(
        [55.7724, 37.6252],
        {},
        {
            iconLayout: 'default#image',
            iconImageHref: 'img/mark.svg',
            iconImageSize: [70, 70],
            iconImageOffset: [-35, -70],
        },
    );
    myMap.geoObjects.add(myPlacemark);
};
ymaps.ready(init);


const disabledScroll = () => {
    document.body.scrollPosition = window.scrollY;
    document.body.style.cssText = `
    overflow: hidden;
    position: fixed;
    top: -${document.body.scrollPosition}px;
    left: 0;
    height: 100wh;
    width: 100wv;
    padding-right: ${window.innerWidth - document.body.offsetWidth}px;
    `;
}

const enabledScroll = () => {
    document.body.style.cssText = '';
    window.scroll({top: document.body.scrollPosition})
}

const createElement = (tag, attr) => {
    const element = document.createElement(tag);

    return Object.assign(element, { ...attr })
}

const createModal = (title, description) => {
    const overlayElement = createElement('div', { className: 'modal' });
    const modalElement = createElement('div', { className: 'modal_block' });
    const modalContainerElement = createElement('div', { className: 'modal_container' });
    const titleElement = createElement('h2', {
        className: 'modal_title',
        textContent: `Заказать ${title}`,
    });
    const descriptionElement = createElement('p', {
        className: 'modal_description',
        textContent: description,
    });
    const formElement = createElement('form', {
        className: 'modal_form',
        method: 'post',
        action: 'https://jsonplaceholder.typicode.com/posts',
        id: 'order',
    });
    const nameLabelElement = createElement('label', {
        className: 'modal_label'
    })
    const nameSpanElement = createElement('span', {
        className: 'modal_text',
        textContent: 'Имя'
    })
    const nameInputElement = createElement('input', {
        className: 'modal_input',
        placeholder: 'Введите Ваше имя',
        name: 'name',
        required: true,
    })
    const phoneLabelElement = createElement('label', {
        className: 'modal_label'
    })
    const phoneSpanElement = createElement('span', {
        className: 'modal_text',
        textContent: 'Телефон'
    })
    const phoneInputElement = createElement('input', {
        className: 'modal_input',
        placeholder: 'Введите Ваше телефон',
        name: 'phone',
        required: true,
    });
    const hideInput = createElement('input', {
        type: 'hidden',
        name: 'product',
        value: title
    });
    const btnSubmit = createElement('button', {
        className: 'modal_btn',
        textContent: 'Заказать',
        type: 'submit'
    })
    btnSubmit.setAttribute('form', 'order');

    const closeModalBtn = createElement('button', {
        className: 'modal_close',
        innerHTML: `<svg width="30" height="30" viewBox="0 0 30 30" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path d="M23.75 8.0125L21.9875 6.25L15 13.2375L8.0125 6.25L6.25 8.0125L13.2375 15L6.25 21.9875L8.0125 23.75L15 16.7625L21.9875 23.75L23.75 21.9875L16.7625 15L23.75 8.0125Z" fill="#18171A"/>
        </svg>
        `
    })

    overlayElement.addEventListener('click', event => {
        const target = event.target;
        if (target === overlayElement || target.closest('.modal_close')) {
            overlayElement.remove();
            enabledScroll()
        }
    })

    nameLabelElement.append(nameSpanElement, nameInputElement);
    phoneLabelElement.append(phoneSpanElement, phoneInputElement);
    formElement.append(nameLabelElement, phoneLabelElement, hideInput);

    modalContainerElement.append(titleElement, descriptionElement, formElement, btnSubmit, closeModalBtn);
    modalElement.append(modalContainerElement);
    overlayElement.append(modalElement);
    disabledScroll();
    document.body.append(overlayElement); 
}

const productTitile = document.querySelectorAll('.product_title');
const productDescription = document.querySelectorAll('.product_description');
const productBtn = document.querySelectorAll('.product_btn');

for (let i = 0; i < productBtn.length; i++) {
    productBtn[i].addEventListener('click', () => {
        const title = productTitile[i].textContent;
        const description = productDescription[i].textContent;
        createModal(title, description);

    })
}


