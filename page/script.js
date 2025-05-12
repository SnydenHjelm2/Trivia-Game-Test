document.querySelector("#q-b").addEventListener("click", async () => {
    const qP = document.querySelector("#q");
    const a = document.querySelector("#answers");
    const answerOpts = ["a", "b", "c", "d"];

    qP.innerHTML = "";
    a.innerHTML = "";
    questionAnswered = false;

    let req = new Request("https://opentdb.com/api.php?amount=10");
    let resp = await fetch(req);
    let reso = await resp.json();
    let randomQ = Math.floor(Math.random() * reso.results.length);
    let q = reso.results[randomQ];
    questionOBJ = q;
    console.log(q);
    if (q.type === "multiple") {
        qP.textContent = q.question.replace(/&quot;/g, '"').replace(/&#039;/g, "'");
        let allAnswers = [];
        allAnswers.push(q.correct_answer);
        for (let a of q.incorrect_answers) {
            allAnswers.push(a);
        }
        let counter = 0;
        while (counter < 4) {
            let num = Math.floor(Math.random() * allAnswers.length);
            let p = document.createElement("p");
            p.textContent = `${answerOpts[counter]}) ${allAnswers[num]}`;
            p.id = answerOpts[counter];
            a.appendChild(p);
            allAnswers.splice(allAnswers.indexOf(allAnswers[num]), 1);
            counter++;
        }
    } else {
        qP.textContent = q.question;
        if (q.correct_answer === "True") {
            let p = document.createElement("p");
            p.textContent = `${answerOpts[0]}) ` +  q.correct_answer;
            p.id = answerOpts[0];

            let p2 = document.createElement("p");
            p2.textContent = answerOpts[1] + ") False";
            p2.id = answerOpts[1];

            a.appendChild(p);
            a.appendChild(p2);
        } else if (q.correct_answer === "False") {
            let p = document.createElement("p");
            p.textContent = `${answerOpts[0]}) ` +  "True";
            p.id = answerOpts[0];

            let p2 = document.createElement("p");
            p2.textContent = `${answerOpts[1]}) ` +  "False";
            p2.id = answerOpts[1];

            a.appendChild(p);
            a.appendChild(p2);
        }
    }
});

document.querySelector("#submit-a").addEventListener("click", async () => {
    const input = document.querySelector("input");
    const answerOpts = ["a", "b", "c", "d"];
    const status = document.querySelector("#status")
    if (questionAnswered) {
        status.textContent = "You've already answered this question, get a new one";
        return;
    }
    let answer = input.value.toLowerCase();
    input.value = "";
    if (!answerOpts.includes(answer)) {status.textContent = "Invalid answer"; return;};

    let answerP = document.querySelector(`#${answer}`);
    let answerText = answerP.textContent.substring(3);
    
    if (answerText === questionOBJ.correct_answer) {
        status.textContent = "Correct answer!";
        let correct = document.querySelector("#correct");
        let newNum = parseInt(correct.textContent) + 1;
        correct.textContent = newNum;
    } else {
        status.textContent = "Sorry, wrong answer!";
    }

    questionAnswered = true;
});

let questionOBJ;
let questionAnswered = false;