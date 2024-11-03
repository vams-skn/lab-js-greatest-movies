// Iteration 1: All directors? - Get the array of all directors.
// _Bonus_: It seems some of the directors had directed multiple movies so they will pop up multiple times in the array of directors.
// How could you "clean" a bit this array and make it unified (without duplicates)?
function getAllDirectors(moviesArray) {
  const allDirectors = moviesArray.map(function (movie){
    return movie.director;
  });
  return new Set(allDirectors); //solution for Bonus
}
const directors = getAllDirectors(movies);
console.log(directors);

// Iteration 2: Steven Spielberg. The best? - How many drama movies did STEVEN SPIELBERG direct?
function howManyMovies(moviesArray) {
  const count = moviesArray.filter(function (movie){
    return movie.director === 'Steven Spielberg';
  });
  return count.length;
}
console.log(howManyMovies(movies));

// Iteration 3: All scores average - Get the average of all scores with 2 decimals
function scoresAverage(moviesArray) {
  if(moviesArray.length === 0) return 0;
  const total = moviesArray.reduce(function (acc,movie){
    return acc + movie.score;
  },0);
  return Math.round(total / moviesArray.length);
}
console.log(scoresAverage(movies));

// Iteration 4: Drama movies - Get the average of Drama Movies
function dramaMoviesScore(moviesArray) {
  const dramaMovies = moviesArray.filter(function (movie){
    return movie.genre.includes('Drama');
  });
  if(dramaMovies.length === 0) return 0;
  return scoresAverage(dramaMovies);
}
console.log(dramaMoviesScore(movies));

// Iteration 5: Ordering by year - Order by year, ascending (in growing order)
function orderByYear(moviesArray) {
  const orderedArray = moviesArray.sort(function (a,b){
    if (a.year === b.year){
      function compare(a,b){
        if (a.title < b.title) return -1;
        else return 1;
      }
    }
    return a.year - b.year;
  });
  return orderedArray;
}
console.log(orderByYear(movies));

// Iteration 6: Alphabetic Order - Order by title and print the first 20 titles
function orderAlphabetically(moviesArray) {
  const titles = moviesArray.map(function (movie){
      return movie.title;
  });
  const orderedArray = titles.sort();
  if(orderedArray.length<20) return orderedArray;
  return orderedArray.slice(0,20);
}
console.log(orderAlphabetically(moviesArray));

// BONUS - Iteration 7: Time Format - Turn duration of the movies from hours to minutes
function turnHoursToMinutes(moviesArray) {
  const convertedArray = moviesArray.map(function (movie){
      const totalTime = movie.duration.split(' ');
      let mins = 0;
      for(let time of totalTime){
        if(time.includes('h'))
          mins = mins + parseInt(time)*60;
        else if (time.includes('min'))
          mins = mins + parseInt(time);
      }
    return {...movie, duration: mins};
  });
  return convertedArray;
}
console.log(turnHoursToMinutes(moviesArray));

// BONUS - Iteration 8: Best yearly score average - Best yearly score average
function bestYearAvg(moviesArray) {
  const yearlyTotal = {};
  for(let movie of moviesArray){
    const year = movie.year;
    const score = movie.score;
    if(!yearlyTotal[year]){
      yearlyTotal[year] = {count: 1, score: score};
    }
    else{
      yearlyTotal[year].score += score;
      yearlyTotal[year].count += 1;
    }
  }
  let bestAvg = 0.0;
  let bestYear = 0;
  for(let item in yearlyTotal){
    let avg = Math.round(yearlyTotal[item].score / yearlyTotal[item].count);
    if(avg>bestAvg){
      bestAvg = avg;
      bestYear = item;
    }
  }
  return `The best year was ${bestYear} with an average score of ${bestAvg}`;
}
console.log(bestYearAvg(moviesArray));


// The following is required to make unit tests work.
/* Environment setup. Do not modify the below code. */
if (typeof module !== 'undefined') {
  module.exports = {
    getAllDirectors,
    howManyMovies,
    scoresAverage,
    dramaMoviesScore,
    orderByYear,
    orderAlphabetically,
    turnHoursToMinutes,
    bestYearAvg,
  };
}
