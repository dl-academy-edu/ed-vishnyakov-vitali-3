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

// form data 

(function () {
    const form = document.querySelector(".filter_js"); 
    const params = getParamsFromURL();
    setValueToForm(form, params);

    form.addEventListener("submit", function (event) {
        event.preventDefault();
        const data = getFormData(form);
        console.log(data);
        setParamsToURL(data);
})
})();

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
    console.log(url);
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