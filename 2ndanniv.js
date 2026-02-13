window.addEventListener("DOMContentLoaded", () => {
    const sound = document.getElementById("cuteclick");

    document.addEventListener("click", (e) => {
        const el = e.target.closest("[data-sound]");
        if (!el) return;

        e.preventDefault();

        sound.currentTime = 0;
        sound.play().catch(() => {});

        const show = el.dataset.show;
        const hide = el.dataset.hide;

        if (show && hide) {
            setTimeout(() => {
                document.getElementById(show).style.display = "block";
                document.getElementById(hide).style.display = "none";
            }, 700);
        }
    });

    const sound2 = document.getElementById("gamestart");

    document.addEventListener("click", (e) => {
        const el = e.target.closest("[dat-sound]");
        if (!el) return;

        e.preventDefault();

        sound2.currentTime = 0;
        sound2.play().catch(() => {});

        const show = el.dataset.show;
        const hide = el.dataset.hide;

        if (show && hide) {
            setTimeout(() => {
                document.getElementById(show).style.display = "block";
                document.getElementById(hide).style.display = "none";
            }, 650);
        }
    });

    const quizdone = localStorage.getItem("quizdone");
    if (quizdone === "true") {
        document.querySelector(".reward").style.display = "block";
    }
});


const correctsound = document.getElementById("scorrect");
const wrongsound = document.getElementById("swrong");
const timesupsound = document.getElementById("stimesup");

const playSound = (sound) => {
    sound.currentTime = 0;
    sound.play().catch(() => {});
};





let currentQuestion = null;
let questionIndex = 0;
let score = 0;
const status = document.querySelector(".next");
const timerdisplay = document.querySelector(".duration");
const timesup = document.querySelector(".timesup");
const quiztimer = 15;
let currenttime = quiztimer;
let timer = null;
let shuffledQuestions = [];

document.addEventListener("click", (e) => {
    const el = e.target.closest("[dat-sound]");
    if (!el) return;

    const show = el.dataset.show;
    const hide = el.dataset.hide;

    if (show === "Page3") {
        startQuiz();
    }
});


const startQuiz = () => {
    questionIndex = 0;
    score = 0;
    shuffledQuestions = [...questions].sort(() => Math.random() - 0.5);
    renderQuestion();
};


const resettimer = () => {
    clearInterval(timer);
    currenttime = quiztimer;
    timerdisplay.textContent = `${currenttime}s`;
    timesup.textContent = ``;
}

const starttimer = () => {
    timer = setInterval(() => {
        currenttime--;
        timerdisplay.textContent = `${currenttime}s`;

        if (currenttime <= 0) {
            timesup.textContent = `Times up!`;
            playSound(timesupsound);
            clearInterval(timer);
            showCorrectAnswer(); 
        }
    }, 1000);
};

const renderQuestion = () => {
    currentQuestion = shuffledQuestions[questionIndex];

    document.querySelector(".question").textContent =
        currentQuestion.question;

    const optionsEl = document.querySelector(".options");
    optionsEl.innerHTML = "";
    
    currentQuestion.options.forEach((opt, index) => {
        const li = document.createElement("li");
        li.className = "option";
        li.innerHTML = `<p>${opt}</p>`;

        li.addEventListener("click", () => checkAnswer(index, li));
        optionsEl.appendChild(li);
    });

    updatestats();
    document.querySelector(".quizstatus").innerHTML =
    `<b>${questionIndex + 1}</b> of <b>10</b>`;
    resettimer();
    starttimer();
};

const checkAnswer = (index, el) => {
    clearInterval(timer);
    const correct = currentQuestion.answer;

    document.querySelectorAll(".option").forEach(opt => {
        opt.style.pointerEvents = "none";
    });

    if (index === correct) {
        el.classList.add("correct");
        playSound(correctsound); 
        score++;
    } else {
        el.classList.add("wrong");
        playSound(wrongsound); 
        document.querySelectorAll(".option")[correct].classList.add("correct");
        
    }
};

const showCorrectAnswer = () => {
    const correct = currentQuestion.answer;
    const options = document.querySelectorAll(".option");

    options.forEach(opt => {
        opt.style.pointerEvents = "none";
    });

    if (options[correct]) {
        options[correct].classList.add("correct");
    }
};


document.querySelector(".next").addEventListener("click", () => {
    questionIndex++;

    if (questionIndex >= 10) {
        showResult();
    } else {
        renderQuestion();
    }
});

const showResult = () => {
    document.getElementById("Page3").style.display = "none";
    document.getElementById("Page4").style.display = "block";

    localStorage.setItem("quizdone", "true");
    localStorage.setItem("quizscore", score);

    document.querySelector(".resultmessage").innerHTML =
        `You answered <b>${score}</b> out of <b>10</b> questions correctly!<br>
        Make sure to send me a screenshoot of your result!`;

    document.getElementById("reward").style.display = "block";
};

const questions = [
        {
            question: "When did we meet?",
            options: ["2014", "2015", "2013", "2016"],
            answer: 1,
        },
        {
            question: "What's our anniversary date?",
            options: ["6 February", "7 February", "8 February", "9 February"],
            answer: 2,
        },
        {
            question: "What keychain did I give you?",
            options: ["Capybara", "Dog", "Whale", "Cat"],
            answer: 2,
        },
        {
            question: "What's inside the crystal ball lamp you gave me?",
            options: ["Planet", "Flower", "Heart", "Clover"],
            answer: 3,
        },
        {
            question: "In what grade did that jadi contoh motoran berdua di depan happen?",
            options: ["4", "5", "6", "7"],
            answer: 1,
        },
        {
            question: "What did we do after lu nembak?",
            options: ["Go home", "Eat", "Maimai", "Badminton"],
            answer: 3,
        },
        {
            question: "What's my duck doll name",
            options: ["Kwok", "Kwak", "Kwek", "Kwik"],
            answer: 3,
        },
        {
            question: "What was the cheese that we ate in my home name?",
            options: ["Camembert", "Brie", "Blue", "Gouda"],
            answer: 0,
        },
        {
            question: "What was the film we watched before we ate some cheese?",
            options: ["FNAF 2", "Wicked:For Good", "FNAF 1", "West Side Story"],
            answer: 0,
        },
        {
            question: "What was the last Abbott Elementary episode we watched together?",
            options: ["S1 EP3", "S1 EP4", "S1 EP5", "S1 EP6"],
            answer: 1,
        }
]

const updatestats = ()=> {
    const progress = ((questionIndex + 1)/10)*100;
    const progressbar = document.getElementById("barp");
    progressbar.style.width = `${progress}%`;
};

document.getElementById("goHome").addEventListener("click", () => {
    document.getElementById("Page4").style.display = "none";
    document.getElementById("Page1").style.display = "block";
});

document.getElementById("goHome1").addEventListener("click", () => {
    document.getElementById("Page5").style.display = "none";
    document.getElementById("Page1").style.display = "block";
});




