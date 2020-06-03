const url = 'https://www.goal.com/en-us/news/best-football-quiz-questions-trivia-answers/1dfwcyp3388zg1lon8wlit8q42';
const fetch = require('node-fetch');
const cheerio = require('cheerio');


async function getTriviaHeader() {
  const response = await fetch(url);
  const html = await response.text();
  const $ = cheerio.load(html);
  const qHeader = [];
  $('.body > ol:nth-child(9)').find('li > strong > a').each((index, element) => {
    const header = $(element).text();
    qHeader.push({
      header,
    });
  });
  return qHeader;
}

async function getTriviaQandA() {
  // const questionSet = 2;
  const response = await fetch(url);
  const html = await response.text();
  const $ = cheerio.load(html);
  const outputQA = [];
  for (let j = 0; j < 7; j += 1) {
    const qSetnumHeader = (j - 1);
    const qSetnumQ = 11 + ((j - 1) * 4);
    const qSetnumA = 13 + ((j - 1) * 4);

    var qHeader = [];
    $('.body > ol:nth-child(9)').find('li > strong > a').each((index, element) => {
      qHeader.push($(element).text());
    });
    const qHeaderUsed = qHeader[qSetnumHeader];
    const questionsSet = [];
    $(`.body > ol:nth-child(${qSetnumQ})`).find('li').each((index, element) => {
      const Ques = $(element).text();
      questionsSet.push(Ques);
    });
    const questionSetAnswers = [];
    $(`.body > ol:nth-child(${qSetnumA})`).find('li').each((index, element) => {
      const ans = $(element).text();
      questionSetAnswers.push(ans);
    });

    for (let i = 0; i < questionsSet.length; i += 1) {
      const quein = questionsSet[i];
      const ansin = questionSetAnswers[i];
      const headerin = qHeaderUsed;
      outputQA.push({
        quein,
        ansin,
        headerin,
      });
    }
  }

  return outputQA;
}

module.exports = {
  getTriviaQandA,
  getTriviaHeader,
};
