let gItems = [
    {
        id: 0,
        src: "assets/images/web0.png",
        web: "https://hej-its-her.com/"
    },
    {
        id: 1,
        src: "assets/images/web1.png",
        web: "https://www.zavenstore.com/"
    },
    {
        id: 2,
        src: "assets/images/web2.png",
        web: "https://amanda-brennan-creative-producer.jimdosite.com/"
    }
]

let tItems = [
    {
        id: 0,
        ico: "assets/images/pfp0.jpeg",
        name: "Natasha",
        review: "As the owner of a small business, I was looking for a reliable partner for software development, and xxDev was the best choice. From our first meeting, I was impressed by their professional approach and deep IT knowledge. Not only did they create custom software tailored to our needs, but they also utilized the latest technologies, ensuring high performance and scalability. The design was intuitive and user-friendly, making it very easy for our entire team to use. Thank you xxDev for the excellent work, and I highly recommend their services to everyone!"
    },
    {
        id: 1,
        ico: "assets/images/pfp1.jpeg",
        name: "Igor",
        review: "Our company needed a new website and e-commerce solution to reach a wider audience. xxDev not only developed a responsive website that looks amazing on all devices but also integrated strong SEO strategies, significantly increasing our visibility on search engines. The e-commerce platform they created is robust and very user-friendly, providing our customers with a great shopping experience. Working with xxDev was truly a great experience, and thanks to their expertise, we now have a website that truly supports our business. I highly recommend their services!"
    },
    {
        id: 2,
        ico: "assets/images/pfp2.jpeg",
        name: "Nikita",
        review: "We needed a mobile application available on both iOS and Android, and xxDev handled this challenge exceptionally well. Their team developed an application that is not only high-quality and functional on both platforms but also focused on elements that enhance user engagement. The result is an app that our users love and often return to. In addition, xxDev provided us with valuable IT consultations that helped us better plan our IT strategy and manage risks. Their comprehensive approach and expertise truly helped us achieve our goals. I unequivocally recommend xxDev to any company seeking quality IT services!"
    }
]





console.log(gItems);

let gPrev = document.querySelector("#g-prev")

gItems.forEach(item => {
    gPrev.innerHTML += `<img id="prev${item.id}" class="prev" onclick="selectP(${item.id})" src=${item.src} alt="website">`;
});

let post = 0;
let gallery = document.querySelector("#gallery");

document.addEventListener('DOMContentLoaded', () => {
    document.getElementById("prev" + post).classList.add("active");
    item = gItems[post];
    gallery.innerHTML = `<div id="img${item.id}" class='g-item fade-in'><img src="${item.src}" alt='website'><a href='${item.web}'>${item.web}</a></div>`;
});

function next() {
    let currentItem = document.querySelector('.g-item');
    currentItem.classList.remove('fade-in');
    currentItem.classList.add('fade-out');

    currentItem.addEventListener('animationend', () => {
        currentItem.classList.remove('fade-out');

        document.getElementById("prev" + post).classList.remove("active");
        if (post < gItems.length - 1) {
            post++;
        } else {
            post = 0;
        }

        document.getElementById("prev" + post).classList.add("active");
        item = gItems[post];
        gallery.innerHTML = `<div id="img${item.id}" class='g-item fade-in'><img src="${item.src}" alt='website'><a href='${item.web}'>${item.web}</a></div>`;
    }, { once: true });
}

function prev() {
    let currentItem = document.querySelector('.g-item');
    currentItem.classList.remove('fade-in');
    currentItem.classList.add('fade-out');

    currentItem.addEventListener('animationend', () => {
        currentItem.classList.remove('fade-out');

        document.getElementById("prev" + post).classList.remove("active");
        if (post > 0) {
            post--;
        } else {
            post = gItems.length - 1;
        }

        document.getElementById("prev" + post).classList.add("active");
        item = gItems[post];
        gallery.innerHTML = `<div id="img${item.id}" class='g-item fade-in'><img src="${item.src}" alt='website'><a href='${item.web}'>${item.web}</a></div>`;
    }, { once: true });
}

function selectP(p) {
    let currentItem = document.querySelector('.g-item');
    currentItem.classList.remove('fade-in');
    currentItem.classList.add('fade-out');

    currentItem.addEventListener('animationend', () => {
        currentItem.classList.remove('fade-out');

        document.getElementById("prev" + post).classList.remove("active");
        post = p;
        document.getElementById("prev" + post).classList.add("active");
        item = gItems[post];
        gallery.innerHTML = `<div id="img${item.id}" class='g-item fade-in'><img src="${item.src}" alt='website'><a href='${item.web}'>${item.web}</a></div>`;
    }, { once: true });
}




t = document.querySelector(".testim");




tItems.forEach(item => {
    t.innerHTML += `
        <div class="t-item">
            <div class="top">
                <img src="${item.ico}" alt="person">
                <h2>${item.name}</h2>
            </div>
            <p class="t-text">${item.review}</p>
        </div>`;
});




let tPost = 0;

document.addEventListener('DOMContentLoaded', () => {
    document.getElementById("t" + tPost).classList.add("tActive");
    document.querySelector('.testim').style.left = `-${tPost * 100}%`;
});

function tNext() {
    document.getElementById("t" + tPost).classList.remove("tActive");
    if (tPost < tItems.length - 1) {
        tPost++;
    } else {
        tPost = 0;
    }
    document.querySelector('.testim').style.left = `-${tPost * 100}%`;
    document.getElementById("t" + tPost).classList.add("tActive");
}

function tPrev() {
    document.getElementById("t" + tPost).classList.remove("tActive");
    if (tPost > 0) {
        tPost--;
    } else {
        tPost = tItems.length - 1;
    }
    document.querySelector('.testim').style.left = `-${tPost * 100}%`;
    document.getElementById("t" + tPost).classList.add("tActive");
}

function selectT(p) {
    document.getElementById("t" + tPost).classList.remove("tActive");
    tPost = p;
    document.querySelector('.testim').style.left = `-${tPost * 100}%`;
    document.getElementById("t" + tPost).classList.add("tActive");
}



window.onscroll = function() {
    const goToTopButton = document.getElementById("goToTop");
    if (document.body.scrollTop > 20 || document.documentElement.scrollTop > 20) {
        goToTopButton.style.display = "block";
    } else {
        goToTopButton.style.display = "none";
    }
};


function scrollToTop() {
    window.scrollTo({
        top: 0,
        behavior: 'smooth'
    });
}

