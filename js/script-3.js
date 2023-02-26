const scriptURL =
  'https://script.google.com/macros/s/AKfycbwDMcqOOuD_oJwpAhenPmtTzmLQOx820z2eGwC5nVNsCaqloqFYgH7oPwrBvPEikixW/exec';
const form = document.forms['anesthesiaForm'];

form.addEventListener('submit', e => {
  e.preventDefault();
  fetch(scriptURL, { method: 'POST', body: new FormData(form) })
    .then(response => {
      //window.localStorage.removeItem('form');
      //Küldésnél törlés - kikapcsolva: form.reset();
      console.log('Success!', response);
      window.alert('Sikeres küldés!');
    })
    .catch(error => {
      console.error('Error!', error.message);
      window.alert('Hibás küldés!');
    });
});

/*
const aForm = document.getElementById('anesthesiaForm');
const aFormElements = Array.from(aForm.elements);
*/

// get DOM objects
const aFormFields = document.querySelectorAll(
  '#anesthesiaForm input, #anesthesiaForm select, #anesthesiaForm textarea'
);
// create an array from DOM object
const arrayAFormFieldElements = Array.from(aFormFields);
// az "arrayAFormFieldElements[0]" megfelel a "patientId = document.querySelector('#patientId');" kifejezésnek

document.addEventListener('DOMContentLoaded', init, false);

function init() {
  itemBMI = document.querySelector('.item-bmi-value');
  itemIBW = document.querySelector('.item-ibw-value');

  // listen for input on all
  let elems = Array.from(
    document.querySelectorAll(
      '#anesthesiaForm input, #anesthesiaForm select, #anesthesiaForm textarea'
    )
  );
  elems.forEach(e => e.addEventListener('input', handleChange, false));

  /*let elems = Array.from(document.querySelectorAll('#anesthesiaForm input, #anesthesiaForm select, #anesthesiaForm textarea'));
	elems.forEach(e => e.addEventListener('input', handleChange, false));*/

  // load form data from localstorage
  const cached = getForm('form');

  // if localstorage available, then fill form from localstorage
  if (cached) {
    aFormFields.forEach(element => {
      element.value = cached[element.name];
    });
  }
}

function handleChange(e) {
  console.log('handleChange');

  // creat the 'form' object, and assign the arrayAFormFieldElement to that
  const form = {};
  arrayAFormFieldElements.forEach(element => {
    form[element.name] = element.value;
  });

  // calculate BMI and IBW
  let bmi = calculateBMI(form['patientHeight'], form['patientWeight']);
  let ibw = calculateIBW(form['patientGender'], form['patientHeight']);
  setAnthropometry(bmi, ibw);

  // now store
  saveForm(form, 'form');
}

function getForm(formName) {
  let f = window.localStorage.getItem(formName);
  if (f) return JSON.parse(f);
}

function saveForm(form, formName) {
  let f = JSON.stringify(form);
  window.localStorage.setItem(formName, f);
}

function loadForm(formName) {
  // load form data from localstorage
  let cached = getForm(formName);
  // if localstorage available, then fill form from localstorage
  if (cached) {
    aFormFields.forEach(element => {
      element.value = cached[element.name];
    });
  }
}

function storeForm(formName) {
  // creat the 'form' object, and assign the arrayAFormFieldElement to that
  const form = {};
  arrayAFormFieldElements.forEach(element => {
    form[element.name] = element.value;
  });

  // now store
  saveForm(form, formName);
}

function calculateBMI(height, weight) {
  // calculate BMI
  let bmi = Math.round((weight / (height * height)) * 10000);

  // console.log(bmi);
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
  // console.log(ibw);
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
