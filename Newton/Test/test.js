const startpopup = document.getElementById('start-pop-up');
const startbutton = document.getElementById('start-btn');
const test = document.getElementById('test');

startbutton.addEventListener("click", () => {
    StartTest();
})

function StartTest(){
    startpopup.classList.add("hidden");
    test.classList.remove("hidden");

    const question = document.getElementById('question');
    const nextbtn = document.getElementById('next-btn');
    const prevbtn = document.getElementById('prev-btn');
    let currQuestion = 1;
    let points = 0;

    // questions and answers
    const allQuestions = [
        "Какво гласи първият закон на Нютон (закон за инерцията)?",
        "Какво определя вторият закон на Нютон?",
        "Коя от следните величини има посока?",
        "Какво се случва с едно тяло, ако върху него действа ненулева равнодействаща сила?",
        "Как се нарича съпротивлението, което тялото оказва на всяка промяна в скоростта си?",
        "Каква е формулата за силата според втория закон на Нютон?",
        "Кога един предмет е в равновесие?",
        "Третият закон на Нютон гласи, че:",
        "Ако върху две тела действат равни сили, но едното тяло има по-голяма маса, то:",
        "Какво е теглото на тялото?",
        "Какво ще се случи с едно тяло, ако равнодействащата сила върху него стане нула?",
        "Кое от изброените НЕ е следствие на първия закон на Нютон?",
        "Тяло с маса 5 kg се движи под действието на сила от 20 N. Намерете ускорението на тялото.",
        "Две сили F1 = 10 N и F2 = 6 N действат върху едно тяло в противоположни посоки. Намерете равнодействащата сила и нейната посоката (посока на F1 или F2).",
        "Камък с маса 1 kg е хвърлен нагоре с начална скорост 10m/s. Намерете силата на тежестта, която действа върху камъка, и ускорението му по време на движението."
    ]

    const allAnswers = {
        1: {
            "Тялото се движи равномерно, ако върху него не действат сили или действа равнодействаща сила, равна на нула.": 1,
            "Всяко действие има равно по големина и противоположно по посока противодействие.": 0,
            "Ускорението на тялото е пропорционално на действащата върху него сила.": 0
        },
        2: {
            "Скоростта на едно тяло зависи от неговата маса.": 0,
            "Ускорението на едно тяло е пропорционално на действащата върху него сила.": 1,
            "Силата е равна на произведението на масата по скоростта.": 0
        },
        3: {
            "Маса": 0,
            "Сила": 1,
            "Път": 0
        },
        4: {
            "То запазва равномерното си движение.": 0,
            "То променя посоката на движение, но не и скоростта.": 0,
            "То променя скоростта или посоката на движение.": 1
        },
        5: {
            "Сила на тежестта": 0,
            "Ускорение": 0,
            "Инерция": 1
        },
        6: {
            "F = m * v": 0,
            "F = m * a": 1,
            "F = v/t": 0
        },
        7: {
            "Когато върху него не действат никакви сили.": 0,
            "Когато сумата от всички сили, действащи върху него, е равна на нула.": 1,
            "Когато върху него действат само противоположни сили.": 0
        },
        8: {
            "Ускорението на едно тяло зависи от неговата маса и силата, която му действа.": 0,
            "Всяко действие има равно по големина и противоположно по посока противодействие.": 1,
            "Тялото остава в покой, ако върху него не действат сили.": 0
        },
        9: {
            "И двете тела ще получат едно и също ускорение.": 0,
            "Тялото с по-голяма маса ще има по-малко ускорение.": 1,
            "Тялото с по-голяма маса ще има по-голямо ускорение.": 0
        },
        10: {
            "Маса, умножена по ускорението.": 0,
            "Силата, с която Земята привлича това тяло.": 1,
            "Скоростта на свободно падане на тялото.": 0
        },
        11: {
            "Тялото ще започне да се ускорява.": 0,
            "Тялото ще запази състоянието си на покой или равномерно праволинейно движение.": 1,
            "Тялото ще спре да се движи.": 0
        },
        12: {
            "Спиране на влак изисква прилагане на сила.": 0,
            "Лодка се движи равномерно, ако не се гребе.": 0,
            "Камък, хвърлен във въздуха, остава в покой.": 1
        },
        13: "4 m/s^2",
        14: "4 N, F1",
        15: "9.8 N, 9.8 m/s^2"
    }

    function displayQuestion(){
        question.innerHTML = `${currQuestion}:  ` + allQuestions[currQuestion - 1];
        document.getElementById("answers").innerHTML = "";

        if (currQuestion < 13) {
            for (let i = 0; i < 3; i++) {
                let answer = document.createTextNode(Object.keys(allAnswers[currQuestion])[i]);
                let answerHolder = document.createElement("p");

                answerHolder.appendChild(answer);
                answerHolder.classList.add("closed-answer");
                document.getElementById("answers").appendChild(answerHolder);

                answerHolder.addEventListener("click", () => {
                    document.querySelectorAll(".closed-answer").forEach(e => e.classList.remove("selected"));
                    answerHolder.classList.add("selected");
                });
            }
        }
        else {
            let answerbox = document.createElement("textarea");
            answerbox.placeholder = "Запиши отговорът с мерната единица, разделени с празно място (например: 5 m/s^2; 60 N). Ако се изискат два или повече отговора, отдели ги с запетайка и празно място (8 N, 10 m/s^2; 2 N, F2).";
            answerbox.id = "open-answer";

            document.getElementById("answers").appendChild(answerbox);
        }
    }
    function checkAnswer(){
        if (currQuestion < 13){
            let selected = document.querySelector(".selected");
            if (selected === null){
                alert("Не забравяй да избереш отговор!");
                return;
            }
            if (allAnswers[currQuestion][selected.innerHTML] === 1){
                points++;
                console.log(points);
            }
        }
        else {
            let answer = document.getElementById("open-answer").value;
            if (answer === allAnswers[currQuestion]){
                points += 3;
                console.log(points);
            }
        }
    }
    function endTest(){
        if (document.getElementById("result") === null) { // more than one click on the button won't create more results
            const result = document.createElement("div");
            result.id = "result";
            result.innerHTML = `
            <h2>Тестът приключи!</h2>
            <p>
                Ти събра ${points}/21 точки. <br>
                Твоята оценка е ${(((points / 21) * 4) + 2).toFixed(2)}
            </p>
        `;

            document.body.appendChild(result);
        }
    }

    displayQuestion();

    nextbtn.addEventListener("click", () => {
        if (currQuestion < allQuestions.length){
            checkAnswer();
            currQuestion++;
            displayQuestion();

            if (currQuestion === 15){
                nextbtn.innerHTML = "Приключи теста";
                nextbtn.addEventListener("click", () => {
                    console.log("end of test")
                    endTest();
                });
            }
        }
    });

    prevbtn.addEventListener("click", () => {
        if (document.getElementById("result") === null) {
            if (currQuestion > 1) {
                if (currQuestion < 13) {
                    if (points > 0)
                        points--;
                    // points won't go below 0
                    console.log(points);
                } else {
                    if (points > 2)
                        points -= 3;
                    // points won't go below 0
                }

                currQuestion--;
                displayQuestion();
                nextbtn.innerHTML = "Следващ въпрос";
            }
        }
    });
}