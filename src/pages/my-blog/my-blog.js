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

// message

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