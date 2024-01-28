/**
 * @typedef {{id:number, description:string, answers:{value:string, valid:boolean}[]}} Question
 * @typedef {{id:number, title:string,description:string,questions:Question[]}} Test
 */

function copyObj(obj) {
  return JSON.parse(JSON.stringify(obj));
}
function random(max, min = 0) {
  return Math.floor((Math.random() * max) + min);
}

/**
 * @type {Test}
 */
const DEFAULT_TEST = {
  id: 0,
  title: "default",
  description: "podstawowy zestaw pytan",
  questions: [
    {
      id: 0,
      description:
        "Które słowo kluczowe jest używane do definiowania funkcji w JavaScript?",
      answers: [
        {
          value: "function",
        },
        {
          value: "def",
        },
        {
          value: "fun",
        },
        {
          value: "<typ zminnej jaki zwróci funkcja> np. void, int",
        },
      ],
    },
    {
      id: 1,
      description: "Jak sprawdzić długość tablicy?",
      answers: [
        {
          value: "array.length",
        },
        { value: "array.size" },
        { value: "array.length()" },
        { value: "array.size()" },
      ],
    },
    {
      id: 2,
      description: "Co zwraca funkcja parseInt('5.51') w JavaScript?",
      answers: [
        { value: "5" },
        { value: "6" },
        { value: "NaN" },
        { value: "5.51" },
      ],
    },
    {
      id: 3,
      description: "Jak przechodzić przez każdy element w tablicy?",
      answers: [
        {value: "array.forEach()"},
        {value: "array.every()"},
        {value: "array.all()"},
        {value: "array.loop()"}
      ]
    },
    {
      id: 4,
      description: "Jak zadeklarować zmienną prywatną w klasie w Javascript?",
      answers: [
        {value: "#varName"},
        {value: "private varName"},
        {value: "hidden varName"},
        {value: ".varName"}
      ]
    },
    {
      id: 5,
      description: "Jaka funkcja jest używana do wykonywania kody po jakimś okresie czasu?",
      answers: [
        {value: "setTimeout()"},
        {value: "sleep()"},
        {value: "wait()"},
        {value: "setInterval()"}
      ]
    },
    {
      id: 6,
      description: "Podaj rozwinięcie słowa 'JSON' w kontekście JavaScript?",
      answers: [
        {value: "JavaScript Object Notation"},
        {value: "JavaScript Oriented Navigation"},
        {value: "JavaScript Over Network"},
        {value: "JavaScript Operation Namespace"}
      ]
    },
    {
      id: 7,
      description: "Która z tych deklaracji funkcji jest nazywana funckcją 'strzałkową'?",
      answers: [
        {value: "()=>{}"},
        {value: "function(){}"},
        {value: "(){}"},
        {value: "||{}"}
      ]
    },
    {
      id: 8,
      description: "Która metoda służy do usuwania pierwszego elementu z tablicy w JavaScript?",
      answers: [
        {value: "shift()"},
        {value: "removeFirst()"},
        {value: "pop()"},
        {value: "split()"}
      ]
    },
    {
      id: 9,
      description: "Podaj najpopularniejsze środowisko wykonywawcze dla javascript, które pozwala wykonywać kod javascript poza przeglądarką",
      answers: [
        {value: "NodeJs"},
        {value: "Webpack"},
        {value: "React"},
        {value: "Electron"}
      ]
    }
  ],
};

const NEW_QUESTION = {
  id: -1,
  description: "new",
  answers: [
    { value: "A" },
    { value: "B" },
    { value: "C" },
    { value: "D" },
  ],
};
