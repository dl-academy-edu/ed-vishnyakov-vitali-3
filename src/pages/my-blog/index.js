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