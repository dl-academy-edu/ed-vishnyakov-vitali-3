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



(function() {
    let passwordChange = document.querySelector(".password-modal_js"),
        buttonOpen = document.querySelector(".password-open_js"),
        buttonClose = document.querySelector(".password-close_js"),
        inputText = document.querySelector(".input-text-password_js");

    buttonOpen.addEventListener("click", function() {
        passwordChange.classList.add("password_open");
        inputText.focus();
    });
    buttonClose.addEventListener("click", function() {
        passwordChange.classList.remove("password_open");
        inputText.focus();
    });
    window.addEventListener("keydown", function (event) {
        if (event.code === "Escape" && passwordChange.classList.contains("password_open")) {
            passwordChange.classList.remove("password_open");
        }
    });
    window.addEventListener("click", function (event) {      
        if (event.target == passwordChange) {
            passwordChange.classList.remove("password_open");
        }
    })
})();