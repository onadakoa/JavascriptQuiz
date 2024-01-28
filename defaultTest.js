/**
 * @typedef {{id:number, description:string, answers:{value:string, valid:boolean}[]}} Question
 * @typedef {{id:number, title:string,description:string,questions:Question[]}} Test
 */

function copyObj(obj) {
  return JSON.parse(JSON.stringify(obj));
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
      description: "quest one",
      answers: [
        {
          value: "odp A",
        },
        {
          value: "odp B",
        },
        {
          value: "odp C",
        },
        {
          value: "odp D",
        },
      ],
    },
    {
      id: 1,
      description: "question two",
      answers: [
        { value: "lorem A" },
        { value: "lorem B" },
        { value: "lorem C" },
        { value: "lorem D" },
      ],
    },
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
