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

// sign in popup

(function() {
    let signIn = document.querySelector(".sign-modal_js"),
        buttonOpen = document.querySelector(".sign-open_js"),
        buttonClose = document.querySelector(".sign-close_js"),
        inputText = document.querySelector(".input-text-sign_js");

    buttonOpen.addEventListener("click", openSignInPopup);

    function openSignInPopup() {
        signIn.classList.add("sign_open");
        inputText.focus();

        buttonClose.addEventListener("click", closeSignInPopup);

        window.addEventListener("keydown", function (event) {
            if (event.code === "Escape") {
                closeSignInPopup()
            }
        });

        signIn.addEventListener("click", function (event) {
            if (event.target === signIn) {
                closeSignInPopup()
            }
        });
    }

    function closeSignInPopup() {
        signIn.classList.remove("sign_open");
        buttonClose.removeEventListener("click", closeSignInPopup);
    }
})();

// register popup

(function() {
    let register = document.querySelector(".register-modal_js"),
        buttonOpen = document.querySelector(".register-open_js"),
        buttonClose = document.querySelector(".register-close_js"),
        inputText = document.querySelector(".input-text-register_js");

    buttonOpen.addEventListener("click", openRegisterPopup);

    function openRegisterPopup() {
        register.classList.add("register_open");
        inputText.focus();

        buttonClose.addEventListener("click", closeRegisterPopup);

        window.addEventListener("keydown", function (event) {
            if (event.code === "Escape") {
                closeRegisterPopup()
            }
        });

        register.addEventListener("click", function (event) {
            if (event.target === register) {
                closeRegisterPopup()
            }
        });
    }

    function closeRegisterPopup() {
        register.classList.remove("register_open");
        buttonClose.removeEventListener("click", closeRegisterPopup);
    }
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

// validation

function checkEmail(email) {
    return email.match(/^[\w-\.]+@[\w-]+\.[a-z]{2,4}$/i);
}

function checkPhone(phone) {
    return phone.match(/^(\s*)?(\+)?([- _():=+]?\d[- _():=+]?){10,14}(\s*)?$/);
}

function inputSetInvalid(input) {
    if(input.hasAttribute("isInvalid")) {
        return;
    }
    input.setAttribute("isInvalid", "");
    function handel() {
        input.classList.remove("isInvalid");
        input.removeAttribute("isInvalid");
    }
    input.classList.add("isInvalid");
    input.addEventListener("input", handel);
}

function inputSetInvalidFeedback(input, error) {
    if(input.hasAttribute("invalidFeedback")) {
        return;
    }
    input.setAttribute("invalidFeedback", "");
    function handel() {
        message.remove();
        input.removeEventListener("input", handel);
        input.removeAttribute("invalidFeedback");
    }
    const message = document.createElement("span");
    message.classList.add("invalidFeedback");
    message.innerText = error;
    input.insertAdjacentElement("beforebegin", message);
    input.addEventListener("input", handel);
}

function inputSetNormal(input) {
    if(input.hasAttribute("isNormal")) {
        return;
    }
    input.setAttribute("isNormal", "");
    function handel() {
        input.classList.remove("isNormal");
        input.removeAttribute("isNormal");
    }
    input.classList.add("isNormal");
    input.addEventListener("input", handel);
}

function inputSetNormalFeedback(input) {
    if(input.hasAttribute("normalFeedback")) {
        return;
    }
    input.setAttribute("normalFeedback", "");
    function handel() {
        message.remove();
        input.removeEventListener("input", handel);
        input.removeAttribute("normalFeedback");
    }
    const message = document.createElement("span");
    message.classList.add("normalFeedback");
    message.innerText = "All right";
    input.insertAdjacentElement("beforebegin", message);
    input.addEventListener("input", handel);
}

function setFormError(form, errors) {
    let inputs = form.querySelectorAll("input");
    for (let input of inputs) {
        if(errors[input.name]) {
            inputSetInvalid(input);
            inputSetInvalidFeedback(input, errors[input.name]);
        } else {
            inputSetNormal(input);
            inputSetNormalFeedback(input);
        }
    }
    let textareas = form.querySelectorAll("textarea");
    for (let textarea of textareas) {
        if(errors[textarea.name]) {
            inputSetInvalid(textarea);
            inputSetInvalidFeedback(input, errors[input.name]);
        }
    }
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

(function () {
    const form = document.forms.signIn;

    form.addEventListener("submit", function (event) {
        event.preventDefault();
        const data = getFormData(event.target);
        const errors = validateData(data);
        if (Object.keys(errors).length + 1) {
            setFormError(form, errors);
        }
    });
    function validateData(data, errors = {}) {
        if(!checkEmail(data.email)) {
            errors.email = "Please enter a valid email address";
        }
        if(data.password.length < 8) {
            errors.password = "Short password";
        }
        return errors;
    }
})();

(function () {
    const form = document.forms.register;

    form.addEventListener("submit", function (event) {
        event.preventDefault();
        const data = getFormData(event.target);
        const errors = validateData(data);
        if (Object.keys(errors).length + 1) {
            setFormError(form, errors);
        }
    });
    function validateData(data, errors = {}) {
        if(!checkEmail(data.email)) {
            errors.email = "Please enter a valid email address";
        }
        if(!data.name) {
            errors.name = "Wrong name";
        }
        if(!data.surname) {
            errors.surname = "Wrong last name";
        }
        if (data.password === "") {
            errors.password = "Enter password";
        } else if (data.password.length < 8) {
            errors.password = "Short password"
        }
        if (data.repeatPassword !== data.password || data.repeatPassword === "") {
            errors.repeatPassword = "The password did not match";
        }
        if(data.location === "") {
            errors.location = "Enter city";
        }  
        if (isNaN(data.age)  || data.age === "") {
            errors.age = "Age is incorrect";
        } 
        if(data.subscribe[0] !== "yes") {
            errors.subscribe = "Mandatory item";
        }
        return errors;
    }
})();

(function () {
    const form = document.forms.message;

    form.addEventListener("submit", function (event) {
        event.preventDefault();
        const data = getFormData(event.target);
        const errors = validateData(data);
        if (Object.keys(errors).length + 1) {
            setFormError(form, errors);
        }
    });
    function validateData(data, errors = {}) {
        if(!data.name) {
            errors.name = "Wrong name";
        }

        if(!data.messageSubject) {
            errors.messageSubject = "Enter the subject of the message";
        }
        
        if(!checkEmail(data.email)) {
            errors.email = "Please enter a valid email address";
        }

        if(!checkEmail(data.phone)) {
            errors.phone = "Please enter a valid phone number";
        }
        if(data.subscribe[0] !== "yes") {
            errors.subscribe = "Mandatory item";
        }
        return errors;
    }
})();

// sliders

(function () {
    const option = {
        sliderEl: ".information__slider",
        defaultActiveSlide: +localStorage.getItem("activeSlide") || 0,
    };
    const sliderBox = slider(option);

    function slider({sliderEl, defaultActiveSlide = 0}) {
        const slider = document.querySelector(sliderEl);
        const wrapper = slider.querySelector(".information__slider-wrapper");
        const inner = wrapper.querySelector(".information__slider-inner");
        const paginationDots = slider.querySelector(".information__pagination");
        const buttonPrev = slider.querySelector(".pagination-prev");
        const buttonNext = slider.querySelector(".pagination-next");
        const slides = [...wrapper.querySelectorAll(".information__slider-slide")];
        const aniTime = 500;
    
        let activeSlide = defaultActiveSlide;
        let slideWidth = 0;
        let dots = [];
        let timerId = null;
    
        initSlidesWidth();
        createPagination();
        setActiveSlide(activeSlide, false);
    
        window.addEventListener("resize", function() {
            initSlidesWidth();
            setActiveSlide(activeSlide, false);
        });
    
        function addAnimation(duration) {
            clearTimeout(timerId);
            inner.style.transition = `transform ${duration}ms`;
            timerId = setTimeout(function () {
                inner.style.transition = "";
            }, duration);
        }
    
        function createPagination() {
            for(let i = 0; i < slides.length; i++) {
                let dot = createDot(i);
                paginationDots.insertAdjacentElement("beforeend", dot);
                dots.push(dot);
            }
        }
    
        function createDot(index) {
            let dot  = document.createElement("button");
            dot.classList.add("information__pagination-dot");
            if(index === activeSlide) {
                dot.classList.add("information__pagination-dot-active");
            }
            dot.addEventListener("click", function () {
                setActiveSlide(index);
            })
            return dot;
        }
    
        function initSlidesWidth () {
            slideWidth =  wrapper.clientWidth;
            slides.forEach(slide => {
                slide.style.width = `${slideWidth}px`;
            });
        }
        function setActiveSlide(index, playAnimation = true) {
    
            buttonNext.removeAttribute("disabled");
            if(index < 0 || index >= slides.length){
                return;
            }
            if(playAnimation) {
                addAnimation(aniTime);
            }
            dots[activeSlide].classList.remove("information__pagination-dot-active");
            dots[index].classList.add("information__pagination-dot-active");
            
            if(index === 0) {
                buttonPrev.setAttribute("disabled", "");
            } else {
                buttonPrev.removeAttribute("disabled");
            }
            if(index === slides.length - 1) {
                buttonNext.setAttribute("disabled", "");
            } else {
                buttonNext.removeAttribute("disabled");
            }
            inner.style.transform = `translateX(-${slideWidth * index}px)`;
            activeSlide = index; 
            localStorage.setItem("activeSlide", activeSlide)
        }
        buttonPrev.addEventListener("click", function () {
            setActiveSlide(activeSlide - 1);
        });
    
        buttonNext.addEventListener("click", function () {
            setActiveSlide(activeSlide + 1);
        });
    
        return {
            setActiveSlide: setActiveSlide,
        }
    }
    console.log(setActiveSlide);

})();

(function () {
    var mySwiper = new Swiper('.swiper-container', {
        // Optional parameters
        direction: 'horizontal',
        loop: true,
        // Navigation arrows
        navigation: {
            nextEl: '.swiper-button-next',
            prevEl: '.swiper-button-prev',
        },
    });
})();