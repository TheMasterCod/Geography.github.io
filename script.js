// string - ""
// list - []
// dictionary - {}

const quizData = [
    {
        question: "What U.S. state is home to no documented poisonous snakes?",
        options: ["ALASKA","LOS ANGELES","ILLINOIS","ALABAMA"],
        answer: "ALASKA"
    },

    {
        question: "What is the official currency of the United Kingdom?",
        options: ["Pound sterling","Pound","Baht","Rupees"],
        answer: "Pound sterling"
    },

    {
        question:"How many time zones does Russia have?",
        options:["11","12","4","97"],
        answer: "11"
    },

    {
        question:"Peking Duck is the national dish of what country?",
        options:["Macau","Hong Kong","China","Nigeria"],
        answer:"China"
    },

    {
        question:"How many countries are located in the Southern Hemisphere?",
        options:["65","32","78","19"],
        answer: "32"
    }
    
];


const questionElement = document.getElementById('question');
const startButton = document.getElementById("start-btn");
const timerElement = document.getElementById('timer');
const timerText = document.getElementById('countdown');
const progressBar = document.getElementById('progress-bar');
const progressBarContainer = document.getElementById('progress-bar-container');
const optionsElement = document.getElementById('option-container');
const resultElement = document.getElementById('result');


progressBar.style.width = '0%';

let currentQuestion = 0;
let score = 0;
let timer = 0;


startButton.addEventListener('click', startQuiz);


function startQuiz()
{
    startButton.style.display='none';
    progressBarContainer.style.display = 'block'
    resultElement.textContent = `You scored ${score} points`;
    loadQuestion();
}

function loadQuestion()
{
    clearInterval(timer);

    if(currentQuestion<quizData.length)
    {
        progressBar.style.width = `${((currentQuestion + 1) / quizData.length) * 100}%`;
        const currentquizData = quizData[currentQuestion];
        questionElement.textContent = currentquizData.question;
        //set intial countdown value
        timerText.textContent= 25;
        optionsElement.innerHTML = '';
        currentquizData.options.forEach((option) => {
            const button = document.createElement('button');
            button.textContent = option;
            button.classList.add('option-btn')
            optionsElement.appendChild(button);

            button.addEventListener('click', () => {
                checkAnswer(option);
            });
        });
        //start timer countdown
        timer = setInterval(()=> {
            timerText.textContent = parseInt(timerText.textContent)-1;
            if(parseInt(timerText.textContent) === 0)
            {
                clearInterval(timer);

                currentQuestion = currentQuestion + 1;
                loadQuestion();

            }
        }, 1000);
    } else
    {
        endQuiz();
    }
}


function checkAnswer(option)
{
   const currentQuizData = quizData[currentQuestion];

   if(option === currentQuizData.answer)
   {
       score++;
   }
   resultElement.textContent = `You scored ${score} points`;
   currentQuestion++;
   loadQuestion();
}

function endQuiz()
{
    progressBarContainer.style.display = 'none';
    questionElement.textContent = "QUIZ HAS ENDED!GOOD JOB!";
    optionsElement.style.display = 'none';
    timerElement.style.display = 'none';
}