// mobile menu

(function() {
    let mobileMenu = document.querySelector(".mobile-menu"),
        buttonOpenMenu = document.querySelector(".button-open-menu_js"),
        buttonCloseMenu = document.querySelector(".button-close-menu_js"),
        mobileMenuFocus = document.querySelector(".mobile-menu-focus_js");

        console.log(buttonOpenMenu);

        buttonOpenMenu.addEventListener("click", () => {
            mobileMenu.classList.add("mobile-menu_open");
            mobileMenuFocus.focus();
        });

        buttonCloseMenu.addEventListener("click", () => {
            mobileMenu.classList.remove("mobile-menu_open");
            mobileMenuFocus.focus();
        });
})();

// password

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

// data

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
                closedataPopup()
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