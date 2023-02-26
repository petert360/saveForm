function calculateBMI(height, weight) {
  // calculate BMI
  let bmi = Math.round((weight / (height * height)) * 10000);
  console.log(bmi);
  return bmi;
}

function calculateIBW(gender, height) {
  // https://pubs.asahq.org/anesthesiology/article/127/1/203/18747/Calculating-Ideal-Body-Weight-Keep-It-Simple
  let ibw;
  if (gender == 1) {
    ibw = Math.round(50 + 0.91 * (height - 152.4));
  } else if (gender == 2) {
    ibw = Math.round(45.5 + 0.91 * (height - 152.4));
  }
  console.log(ibw);
  return ibw;
}

function setAnthropometry(bmi, ibw) {
  if (bmi > 10 && bmi < 50) {
    itemBMI.innerText = 'BMI: ' + bmi + ' m\u00B2/kg';
  } else {
    itemBMI.innerText = 'BMI:';
  }
  if (ibw > 0 && ibw < 150) {
    itemIBW.innerText = 'IBW: ' + ibw + ' kg';
  } else {
    itemIBW.innerText = 'IBW:';
  }
}

calculateIBW(1, 193);

calculateBMI(193, 80);
