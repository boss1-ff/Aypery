/* =====================================================
   НАСТРОЙКИ
===================================================== */

// Пароль секретного раздела
const SECRET_PASSWORD = "aiperi";


// Текст письма
const LETTER_TEXT =
`Айпери, мы знакомы совсем недолго, всего несколько недель, но за это время ты успела стать особенным человеком.

Мне хочется сохранить эти моменты, наши разговоры и всё хорошее, что связано с тобой.

Спасибо тебе за улыбки, общение и просто за то, что ты есть.

Пусть впереди у нас будет ещё много красивых воспоминаний. ❤️`;


// =====================================================
// МОБИЛЬНОЕ МЕНЮ
// =====================================================

const menuBtn = document.getElementById("menuBtn");
const nav = document.getElementById("nav");

menuBtn.addEventListener("click", () => {

    nav.classList.toggle("active");

});


nav.querySelectorAll("a").forEach(link => {

    link.addEventListener("click", () => {

        nav.classList.remove("active");

    });

});


// =====================================================
// ПОЯВЛЕНИЕ ЭЛЕМЕНТОВ
// =====================================================

const revealElements =
    document.querySelectorAll(".reveal");


const observer = new IntersectionObserver(

    entries => {

        entries.forEach(entry => {

            if (entry.isIntersecting) {

                entry.target.classList.add("visible");

                observer.unobserve(entry.target);

            }

        });

    },

    {
        threshold: 0.12
    }

);


revealElements.forEach(element => {

    observer.observe(element);

});


// =====================================================
// ПЛАВАЮЩИЕ СЕРДЕЧКИ
// =====================================================

const particles =
    document.getElementById("particles");


function createHeart() {

    const heart =
        document.createElement("span");

    heart.className = "particle";

    heart.innerHTML =
        Math.random() > 0.25
            ? "♥"
            : "✦";

    heart.style.left =
        Math.random() * 100 + "%";

    heart.style.fontSize =
        8 + Math.random() * 15 + "px";

    heart.style.animationDuration =
        8 + Math.random() * 8 + "s";

    particles.appendChild(heart);


    setTimeout(() => {

        heart.remove();

    }, 16000);

}


for (let i = 0; i < 10; i++) {

    setTimeout(createHeart, i * 500);

}


setInterval(createHeart, 1300);


// =====================================================
// ФОТО LIGHTBOX
// =====================================================

function openPhoto(src) {

    const modal =
        document.getElementById("photoModal");

    const image =
        document.getElementById("bigPhoto");

    image.src = src;

    modal.classList.add("active");

    document.body.classList.add("no-scroll");

}


function closePhoto() {

    document
        .getElementById("photoModal")
        .classList.remove("active");

    document.body.classList.remove("no-scroll");

}


// Если фото не существует
document
    .getElementById("bigPhoto")
    .addEventListener("error", function() {

        this.style.display = "none";

    });


// =====================================================
// ПИСЬМО
// =====================================================

const envelope =
    document.getElementById("envelope");

const letterBtn =
    document.getElementById("letterBtn");

const letterText =
    document.getElementById("letterText");


let letterOpened = false;


function typeLetter() {

    letterText.textContent = "";

    let index = 0;

    function write() {

        if (index < LETTER_TEXT.length) {

            letterText.textContent +=
                LETTER_TEXT[index];

            index++;

            setTimeout(write, 18);

        }

    }

    write();

}


function toggleLetter() {

    letterOpened =
        !letterOpened;


    envelope.classList.toggle(
        "open",
        letterOpened
    );


    letterBtn.textContent =
        letterOpened
            ? "Закрыть письмо"
            : "Открыть письмо";


    if (letterOpened) {

        typeLetter();

    }

}


envelope.addEventListener(
    "click",
    toggleLetter
);


letterBtn.addEventListener(
    "click",
    toggleLetter
);


// =====================================================
// СЮРПРИЗ
// =====================================================

const surprise =
    document.getElementById("surprise");


function openSurprise() {

    surprise.classList.remove("active");

    void surprise.offsetWidth;

    surprise.classList.add("active");

    document.body.classList.add("no-scroll");


    // Создаём дополнительные сердечки

    for (let i = 0; i < 30; i++) {

        setTimeout(() => {

            createSurpriseHeart();

        }, i * 50);

    }

}


function closeSurprise() {

    surprise.classList.remove("active");

    document.body.classList.remove("no-scroll");

}


function createSurpriseHeart() {

    const heart =
        document.createElement("span");

    heart.className = "particle";

    heart.innerHTML = "♥";

    heart.style.left =
        40 + Math.random() * 20 + "%";

    heart.style.bottom =
        35 + Math.random() * 10 + "%";

    heart.style.fontSize =
        10 + Math.random() * 20 + "px";

    heart.style.animationDuration =
        2 + Math.random() * 3 + "s";

    particles.appendChild(heart);


    setTimeout(() => {

        heart.remove();

    }, 6000);

}


// =====================================================
// СЕКРЕТНЫЙ РАЗДЕЛ
// =====================================================

function openPassword() {

    const modal =
        document.getElementById(
            "passwordModal"
        );

    const input =
        document.getElementById(
            "passwordInput"
        );

    const error =
        document.getElementById(
            "passwordError"
        );


    input.value = "";

    error.textContent = "";

    modal.classList.add("active");

    document.body.classList.add("no-scroll");

    setTimeout(() => {

        input.focus();

    }, 200);

}


function closePassword() {

    document
        .getElementById("passwordModal")
        .classList.remove("active");

    document.body.classList.remove("no-scroll");

}


function checkPassword() {

    const input =
        document.getElementById(
            "passwordInput"
        );

    const error =
        document.getElementById(
            "passwordError"
        );


    if (
        input.value ===
        SECRET_PASSWORD
    ) {

        closePassword();

        setTimeout(() => {

            document
                .getElementById("secretModal")
                .classList.add("active");

            document.body.classList.add(
                "no-scroll"
            );

        }, 250);

    }

    else {

        error.textContent =
            "Кажется, это не тот пароль 🙈";

        input.select();

    }

}


function closeSecret() {

    document
        .getElementById("secretModal")
        .classList.remove("active");

    document.body.classList.remove("no-scroll");

}


// =====================================================
// ЗАКРЫТИЕ МОДАЛОК ПО ESC
// =====================================================

document.addEventListener(
    "keydown",
    event => {

        if (event.key === "Escape") {

            closePhoto();

            closePassword();

            closeSecret();

            closeSurprise();

        }

    }
);


// =====================================================
// КЛИК ПО ФОНУ МОДАЛЬНОГО ОКНА
// =====================================================

document.querySelectorAll(".modal")
    .forEach(modal => {

        modal.addEventListener(
            "click",
            event => {

                if (
                    event.target === modal
                ) {

                    modal.classList.remove(
                        "active"
                    );

                    document.body.classList.remove(
                        "no-scroll"
                    );

                }

            }
        );

    });