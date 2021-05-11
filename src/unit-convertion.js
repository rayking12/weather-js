import { currentUnit } from './data-handling';

const temp = document.querySelector('#result-temp');
const minTemp = document.querySelector('#result-mintemp');
const maxTemp = document.querySelector('#result-maxtemp');
const feelingTemp = document.querySelector('#result-feeling');

const tempsElem = [temp, minTemp, maxTemp, feelingTemp];

function convertTemp(temp) {
  if (currentUnit === 0) {
    return 1.8 * Number(temp) + 32;
  } if (currentUnit === 1) {
    return (5 / 9) * (Number(temp) - 32);
  }
  return temp;
}

function convertTemps() {
  const temps = tempsElem.map(
    (temp) => temp.innerText.match(/-?[/\d/.]+(?=[°])/)[0],
  );
  tempsElem.forEach((tempElem, index) => {
    const convertedTemp = convertTemp(temps[index]);
    tempElem.innerText = `${Math.round(convertedTemp * 10) / 10}°`;
  });
  currentUnit = currentUnit === 0 ? 1 : 0;
}

export default convertTemps;
