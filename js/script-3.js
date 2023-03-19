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
      //window.alert('Sikeres küldés!');
      showModal('Sikeres küldés');
    })
    .catch(error => {
      console.error('Error!', error.message);
      //window.alert('Hibás küldés!');
      showModal('Hibás küldés');
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

let formIdNumber;

// launch init()
document.addEventListener('DOMContentLoaded', init, false);

function init() {
  formIdElement = document.querySelector('.formID');
  itemBMI = document.querySelector('.item-bmi-value');
  itemIBW = document.querySelector('.item-ibw-value');

  // listen for input on all
  let elems = Array.from(
    document.querySelectorAll(
      '#anesthesiaForm input, #anesthesiaForm select, #anesthesiaForm textarea'
    )
  );
  elems.forEach(e => e.addEventListener('input', handleChange, false));

  // load form data from localstorage
  const cached = getForm('form');

  // if localstorage available, then fill form from localstorage
  if (cached) {
    setFormIdElement(cached['id']);
    aFormFields.forEach(element => {
      if (element.type == 'checkbox') {
        // if element is a checkbox, test, if it's value is 'true' then assigt the test result to the element.checked status
        element.checked = cached[element.name] === 'true';
      } else {
        element.value = cached[element.name];
      }
    });

    // calculate BMI and IBW
    let bmi = calculateBMI(cached['patientHeight'], cached['patientWeight']);
    let ibw = calculateIBW(cached['patientGender'], cached['patientHeight']);
    setAnthropometry(bmi, ibw);
  }
}

function handleChange(e) {
  console.log('handleChange');

  // creat the 'form' object, and assign the arrayAFormFieldElement to that
  // if the element is a checkbox, assant the true/false status
  const form = {};
  form['id'] = 'temporary';
  arrayAFormFieldElements.forEach(element => {
    if (element.type == 'checkbox') {
      form[element.name] = element.checked.toString();
    } else {
      form[element.name] = element.value;
    }
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
    setFormIdElement(cached['id']);
    aFormFields.forEach(element => {
      if (element.type == 'checkbox') {
        element.checked = cached[element.name] === 'true';
      } else {
        element.value = cached[element.name];
      }
    });
  }
}

function storeForm(formName) {
  // create the 'form' object, and assign the arrayAFormFieldElement to that
  setFormIdElement(formName);
  const form = {};
  form['id'] = formName;
  arrayAFormFieldElements.forEach(element => {
    if (element.type == 'checkbox') {
      form[element.name] = element.checked.toString();
    } else {
      form[element.name] = element.value;
    }
  });

  // save to localstorage
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
    if (bmi < 18.5) {
      itemBMI.style.color = 'blue';
    } else if (bmi >= 18.5 && bmi < 25) {
      itemBMI.style.color = 'green';
    } else if (bmi >= 25 && bmi < 30) {
      itemBMI.style.color = 'goldenrod';
    } else if (bmi >= 30 && bmi < 35) {
      itemBMI.style.color = 'darkorange';
    } else if (bmi >= 35) {
      itemBMI.style.color = 'red';
    }
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

function setFormIdElement(id) {
  formIdNumber = id;
  formIdElement.innerText = id;
}

// THE MODAL
// Get the modal
var modal = document.getElementById('myModal');

// Get the button that opens the modal
var btn = document.getElementById('myBtn');

// Get the <span> element that closes the modal
var span = document.getElementsByClassName('close')[0];

// Get the modal-message div
const modalMessage = document.querySelector('.modal-message');

// When the user clicks the button, open the modal
/*btn.onclick = function () {
  modal.style.display = 'block';
};*/

// When the user clicks on <span> (x), close the modal
span.onclick = function () {
  modal.style.display = 'none';
};

// When the user clicks anywhere outside of the modal, close it
window.onclick = function (event) {
  if (event.target == modal) {
    modal.style.display = 'none';
  }
};

function showModal(msg) {
  modalMessage.innerText = msg;
  modal.style.display = 'block';
}
