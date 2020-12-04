// form data filter

const SERVER_URL = 'https://academy.directlinedev.com';
const VERSION_API = '1.0.0';


const form = document.querySelector(".filter_js");
const tagsBox = document.querySelector(".tagBox_js");
const articleBox = document.querySelector(".article_js");
const paginationBox = document.querySelector(".page-numbers_js");
const buttonPrev = document.querySelector(".pagination-nav-prev_js");
const buttonNext = document.querySelector(".pagination-nav-next_js");
const PAGE_LIMIT = 5;
let data = {
    page: 0
};

function callback(xhr) {
    const response = JSON.parse(xhr.response);
    if (response.success) {
        articleBox.innerHTML = "";
        for(let card of response.data) {
            articleBox.innerHTML += cardCreator(card);
            let posts = [...document.querySelectorAll(".blog__content")];
            let post = posts[posts.length - 1];
            let tagBox = post.querySelector('.postTagBox_js');
            for (let tag of card.tags) {
                tagBox.innerHTML += cardTagCreator(tag);
            }
        }
        let count = response.count,
            index = 0;
        paginationBox.innerHTML = "";
        while(count - PAGE_LIMIT > 0) {
            count -= PAGE_LIMIT;
            const a = pageCreator(index, data, (e) => {
                form.submit(e, true);
            });
            index++;
            paginationBox.insertAdjacentElement("beforeend", a);
        }
        const a = pageCreator(index, data, (e) => {
            form.submit(e, true);
        });
        index++;
        paginationBox.insertAdjacentElement("beforeend", a);
    } else {
        console.error("Произошла ошибка!")
    }
}
(function () {

    tagsBox.innerHTML = preloaderCreator();

    let xhr = new XMLHttpRequest();
    xhr.open("GET", `${SERVER_URL}/api/tags`);
    xhr.send();
    xhr.onload = function() {
        const response = JSON.parse(xhr.response);
        if(response.success) {
            tagsBox.innerHTML = "";
            for(let tag of response.data) {
                tagsBox.innerHTML += tagCreator(tag);
            }
            const params = getParamsFromURL();
            setValueToForm(form, params);
            getPosts(getFormData(form), callback);
        } else {
            alert(response._message);
        }

    }
    xhr.onerror = function() {
        console.error("Произошла ошибка сервера")
    }

    form.addEventListener("submit", function submit(e, isA) {
        e.preventDefault(e);
        let page = data.page || 0;
        data = getFormData(form);
        if(isA) {
            data.page = page;
        } else {
            data.page = 0;
        }
        setParamsToURL(data);
        articleBox.innerHTML = preloaderCreator();
        getPosts(data, callback);
    })
})();

function getPosts(params, onload) {

    let url = new URL("https://qwe.ru");
    if(params.tags[0]) {
        url.searchParams.set("tags", JSON.stringify(params.tags));
    }
    if(params.shows) {
        url.searchParams.set("limit", JSON.stringify(+params.shows));
    }
    url.searchParams.set("v", VERSION_API);
    url.searchParams.set("limit", PAGE_LIMIT);
    url.searchParams.set("offset", (PAGE_LIMIT * params.page || 0));

    let sort = ["id", "ASC"];
    if (params.sort) {
        sort[0] = params.sort;
    }

url.searchParams.set("sort", JSON.stringify(sort));

    let filter = {};
    if(params.title) {
        filter.title = params.title;
    }
    if (params.views) {
        let min = (params.views).split("-")[0];
        let max = (params.views).split("-")[1];
        filter.views = {$between: [min, max]};
    }

    url.searchParams.set("filter", JSON.stringify(filter));
    let xhr = new XMLHttpRequest();
    xhr.open("GET", `${SERVER_URL}/api/posts?${url.searchParams}`, true);
    xhr.send();
    xhr.onload = function() {
        onload(xhr);
    }
    xhr.onerror = function() {
        console.error("Произошла ошибка сервера")
    }
}

function getParamsFromURL() {
    const searchParams = new URL(window.location).searchParams;
    let params = {};
    if(searchParams.has("tags")) {
        params.tags = searchParams.getAll("tags");
    }
    if(searchParams.has("views")) {
        params.views = searchParams.get("views");
    }
    if(searchParams.has("comments")) {
        params.comments = searchParams.getAll("comments");
    }
    if(searchParams.has("show")) {
        params.show = searchParams.get("show");
    }
    if(searchParams.has("sort")) {
        params.sort = searchParams.get("sort");
    }
    if(searchParams.has("search")) {
        params.search = searchParams.get("search");
    }
    if(searchParams.has("page")) {
        params.page = searchParams.get("page");
    }
    return params;
}

function setValueToForm (form, data) {
    let inputs = form.querySelectorAll("input");
    for (let input of inputs) {
        switch (input.type) {
            case "radio":
                if (data[input.name] === input.value) {
                    input.checked = true;
                }
                break;
            case "checkbox":
                if (data[input.name] && data[input.name].includes(input.value)){
                    input.checked = true;
                }
                break;
            default:
                if(data[input.name]) {
                    input.value = data[input.name];
                }
                break;
        }
    }
    let textareas = form.querySelectorAll("textarea");
    for (let textarea of textareas) {
        if(data[textarea.name]) {
            data[textarea.name] = textarea.value;
        }
    }
    return data;
}

function setParamsToURL(params = {}) {
    const keyArray = Object.keys(params);
    let url = new URL("https://qwe.ru");
    for(let key of keyArray) {
        if(typeof params[key] === "object") {
            const arr = params[key];
            for(let item of arr) {
                url.searchParams.append(key, item);
            }
        } else {
            url.searchParams.append(key, params[key]);
        }
    }
    history.replaceState({}, document.title, url.search);
}

function getFormData(form, data = {}) {
    let inputs = form.querySelectorAll("input");
    for (let input of inputs) {
        switch (input.type) {
            case "radio":
                if (input.checked) {
                    data[input.name] = input.value;
                }
                break;
            case "checkbox":
                if (!data[input.name]) {
                    data[input.name] = [];
                }
                if (input.checked) {
                    data[input.name].push(input.value);
                }
                break;
            case "file":
                data[input.name] = input.files;
                break;
            default:
                data[input.name] = input.value;
                break;
        }
    }
    let textareas = form.querySelectorAll("textarea");
    for (let textarea of textareas) {
        data[textarea.name] = textarea.value;
    }
    return data;
}

function preloaderCreator() {
    return `<div class="container-preloader">
                <div class="item-1"></div>
                <div class="item-2"></div>
                <div class="item-3"></div>
                <div class="item-4"></div>
                <div class="item-5"></div>
            </div>`;
}

function tagCreator(tag) {
    return `<div class="filter__checkbox-tags">
                <label class="filter__label">
                    <input class="filter__input-checkbox" name="tags" type="checkbox" value="${tag.id}">
                    <span class="filter__input-fake" style = "border-color: ${tag.color}">
                </label>
            </div>`;
}

function cardCreator(card) {
    return `<article class="blog__content">
                <picture class="blog__picture">
                        <source srcset="${SERVER_URL}${card.photo.desktopPhotoUrl}" srcset="${SERVER_URL}${card.photo.desktop2xPhotoUrl} 2x" media="(min-width: 800px)">
                        <source srcset="${SERVER_URL}${card.photo.tabletPhotoUrl}" srcset="${SERVER_URL}${card.photo.tablet2xPhotoUrl} 2x" media="(min-width: 670px) and (max-width: 799px)">
                        <source srcset="${SERVER_URL}${card.photo.mobilePhotoUrl}" srcset="${SERVER_URL}${card.photo.mobile2xPhotoUrl} 2x" media="(max-width: 669px)">
                        <img class="blog__img" src="${SERVER_URL}${card.photo.desktopPhotoUrl}" alt="${card.title}">
                </picture>
                <div class="blog__filling">
                    <div class="blog__tags postTagBox_js"></div>
                    <div class="blog__info">
                        <span class="blog__info-date">${new Date(card.date).toLocaleDateString()}</span>
                        <span class="blog__info-views">${card.views} views</span>
                        <span class="blog__info-comments">${card.commentsCount} comments</span>
                    </div>
                    <h3 class="blog__title">${card.title}</h3>
                    <p class="blog__text">${card.text}</p>
                    <a class="blog__link" href="/">Go to this post</a>
                </div>
            </article>`
}

function cardTagCreator(tag) {
    return `<span class="blog__tag" style="background-color: ${tag.color}"></span>`;
  }

function pageCreator(index, data, onclick) {
    let li = document.createElement("li");
    li.classList.add("blog__pages-item");
    let a = document.createElement("a");
            a.setAttribute("href", `?page=${+index+1}`);
            a.classList.add("blog__pages-number",`page_${+index}`);
    a.addEventListener("click", function(e) {
        e.preventDefault();
        data.page = index;
        onclick(e);
    });
  a.innerText = +index + 1;
  li.insertAdjacentElement("beforeend", a);
    return li;
}

// mobile menu

(function() {
    let mobileMenu = document.querySelector(".mobile-menu"),
        buttonOpenMenu = document.querySelector(".button-open-menu_js"),
        buttonCloseMenu = document.querySelector(".button-close-menu_js"),
        mobileMenuFocus = document.querySelector(".mobile-menu-focus_js");

        buttonOpenMenu.addEventListener("click", () => {
            mobileMenu.classList.add("mobile-menu_open");
            mobileMenuFocus.focus();
        });

        buttonCloseMenu.addEventListener("click", () => {
            mobileMenu.classList.remove("mobile-menu_open");
            mobileMenuFocus.focus();
        });
})();

// message popup

(function() {
    let message = document.querySelector(".message-modal_js"),
        buttonOpen = document.querySelector(".message-open_js"),
        buttonClose = document.querySelector(".message-close_js"),
        inputText = document.querySelector(".input-text-message_js");

    buttonOpen.addEventListener("click", openMessagePopup);

    function openMessagePopup() {
        message.classList.add("message_open");
        inputText.focus();

        buttonClose.addEventListener("click", closeMessagePopup);

        window.addEventListener("keydown", function (event) {
            if (event.code === "Escape") {
                closeMessagePopup()
            }
        });

        message.addEventListener("click", function (event) {
            if (event.target === message) {
                closeMessagePopup()
            }
        });
    }

    function closeMessagePopup() {
        message.classList.remove("message_open");
        buttonClose.removeEventListener("click", closeMessagePopup);
    }
})();



// top button

(function () {
    const buttonTop = document.querySelector(".btn-top__js");
    if(!buttonTop) {
        return;
    }

function handleScroll() {
        if (window.pageYOffset > 1000) {
                buttonTop.classList.remove("visually-hidden");
        } else {
                buttonTop.classList.add("visually-hidden");
        }
    }

    function handleClick() {
            window.scrollTo({
                top: 0,
                behavior: "smooth"
            });
        }

    buttonTop.addEventListener("click", handleClick);
    window.addEventListener("scroll", handleScroll);

})();