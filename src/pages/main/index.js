// top button
(function () {
    const buttonTop = document.querySelector(".btn-top__js");
    if(!buttonTop) {
        return;
    }

    function handleScroll() {
        if (window.pageYOffset > 1000) {
            if (buttonTop.classList.contains("visually-hidden")) {
                buttonTop.classList.remove("visually-hidden");
            }
        } else {
            if (!buttonTop.classList.contains("visually-hidden")) {
                buttonTop.classList.add("visually-hidden");
            }
        }
    }

    function handleClick(event) {
        if ((window.pageYOffset > 1000) && (buttonTop.contains(event.target))) {
            window.scrollTo({
                top: 0,
                behavior: "smooth"
            });
        }
    }

    window.addEventListener("scroll", handleScroll);
    window.addEventListener("click", handleClick);
    
})();



// sign in

(function() {
    let signIn = document.querySelector(".sign-modal_js"),
        buttonOpen = document.querySelector(".sign-open__js"),
        buttonClose = document.querySelector(".sign-close__js"),
        inputText = document.querySelector(".input-text-sign_js");

    buttonOpen.addEventListener("click", function() {
        signIn.classList.add("sign_open");
        inputText.focus();
    });
    buttonClose.addEventListener("click", function() {
        signIn.classList.remove("sign_open");
        inputText.focus();
    });
    window.addEventListener("keydown", function (event) {
        if (event.code === "Escape" && signIn.classList.contains("sign_open")) {
            signIn.classList.remove("sign_open");
        }
    });
    window.addEventListener("click", function (event) {      
        if (event.target == signIn) {
            signIn.classList.remove("sign_open");
        }
    })
})();

// register

(function() {
    let register = document.querySelector(".register-modal_js"),
        buttonOpen = document.querySelector(".register-open__js"),
        buttonClose = document.querySelector(".register-close__js"),
        inputText = document.querySelector(".input-text-register_js");

    buttonOpen.addEventListener("click", function() {
        register.classList.add("register_open");
        inputText.focus();
    });
    buttonClose.addEventListener("click", function() {
        register.classList.remove("register_open");
        inputText.focus();
    });
    window.addEventListener("keydown", function (event) {
        if (event.code === "Escape" && register.classList.contains("register_open")) {
            register.classList.remove("register_open");
        }
    });
    window.addEventListener("click", function (event) {      
        if (event.target == register) {
            register.classList.remove("register_open");
        }
    })
})();

// message

(function() {
    let message = document.querySelector(".message-modal_js"),
        buttonOpen = document.querySelector(".message-open__js"),
        buttonClose = document.querySelector(".message-close__js"),
        inputText = document.querySelector(".input-text-message_js");

        console.log(buttonOpen);

    buttonOpen.addEventListener("click", function() {
        message.classList.add("message_open");
        inputText.focus();
    });
    buttonClose.addEventListener("click", function() {
        message.classList.remove("message_open");
        inputText.focus();
    });
    window.addEventListener("keydown", function (event) {
        if (event.code === "Escape" && massage.classList.contains("message_open")) {
            message.classList.remove("message_open");
        }
    });
    window.addEventListener("click", function (event) {      
        if (event.target == message) {
            message.classList.remove("message_open");
        }
    })
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

