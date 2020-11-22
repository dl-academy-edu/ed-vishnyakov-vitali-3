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

// password popup

(function() {
    let passwordChange = document.querySelector(".password-modal_js"),
        buttonOpen = document.querySelector(".password-open_js"),
        buttonClose = document.querySelector(".password-close_js"),
        inputText = document.querySelector(".input-text-password_js");

    buttonOpen.addEventListener("click", openPasswordPopup);

    function openPasswordPopup() {
        passwordChange.classList.add("password_open");
        inputText.focus();

        buttonClose.addEventListener("click", closePasswordPopup);

        window.addEventListener("keydown", function (event) {
            if (event.code === "Escape") {
                closePasswordPopup()
            }
        });

        passwordChange.addEventListener("click", function (event) {
            if (event.target === passwordChange) {
                closePasswordPopup()
            }
        });
    }

    function closePasswordPopup() {
        passwordChange.classList.remove("password_open");
        buttonClose.removeEventListener("click", closePasswordPopup);
    }
})();

// data popup

(function() {
    let dataChange = document.querySelector(".data-modal_js"),
        buttonOpen = document.querySelector(".data-open_js"),
        buttonClose = document.querySelector(".data-close_js"),
        inputText = document.querySelector(".input-text-data_js");

    buttonOpen.addEventListener("click", openDataPopup);

    function openDataPopup() {
        dataChange.classList.add("data_open");
        inputText.focus();

        buttonClose.addEventListener("click", closeDataPopup);

        window.addEventListener("keydown", function (event) {
            if (event.code === "Escape") {
                closeDataPopup()
            }
        });

        dataChange.addEventListener("click", function (event) {
            if (event.target === dataChange) {
                closeDataPopup()
            }
        });
    }

    function closeDataPopup() {
        dataChange.classList.remove("data_open");
        buttonClose.removeEventListener("click", closeDataPopup);
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
    const form = document.forms.editingPassword;

    form.addEventListener("submit", function (event) {
        event.preventDefault();
        const data = getFormData(event.target);
        const errors = validateData(data);
        if (Object.keys(errors).length + 1) {
            setFormError(form, errors);
        }
    });
    function validateData(data, errors = {}) {
        if (data.passwordCurrent === "") {
            errors.passwordCurrent = "Нужно ввести старый пароль";
        }
        if (data.passwordNew === data.passwordCurrent || data.passwordNew === "") {
            errors.passwordNew = "Enter a new password";
        } else if (data.passwordNew.length < 8) {
            errors.passwordNew = "Short password"
        }
        if (data.passwordNewRepeat !== data.passwordNew || data.passwordNewRepeat === "") {
            errors.passwordNewRepeat = "Пароль не совпал";
        }
        return errors;
    }
})();

(function () {
    const form = document.forms.editingData;

    form.addEventListener("submit", function (event) {
        event.preventDefault();
        const data = getFormData(event.target);
        const errors = validateData(data);
        if (Object.keys(errors).length) {
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
        if(data.password.length < 8) {
            errors.password = "Short password";
        }
        if(data.password!=data.repeatPassword) {
            errors.password = "password does not match.";
        }
        if(data.location === "") {
            errors.location = "Enter city";
        }  
        if (+(data.age) <= 0) {
            errors.age = "Age is incorrect";
        } 
        return errors;
    }
})();