const scriptURL =
  'https://script.google.com/macros/s/AKfycbwDMcqOOuD_oJwpAhenPmtTzmLQOx820z2eGwC5nVNsCaqloqFYgH7oPwrBvPEikixW/exec';
const form = document.forms['anesthesiaForm'];

form.addEventListener('submit', e => {
  e.preventDefault();
  fetch(scriptURL, { method: 'POST', body: new FormData(form) })
    .then(response => {
      //window.localStorage.removeItem('form');
      form.reset();
      console.log('Success!', response);
      window.alert('Sikeres küldés!');
    })
    .catch(error => {
      console.error('Error!', error.message);
      window.alert('Hibás küldés!');
    });
});

document.addEventListener('DOMContentLoaded', init, false);

// let name, email, inus, depts, cookies, comments;
let patientId,
  patientAge,
  patientWeight,
  patientGender,
  patientASA,
  opSpeciality,
  opPriority,
  isDayCase,
  startTime,
  endTime,
  opName;

function init() {
  // get the dom objects one time
  patientId = document.querySelector('#patientId');
  patientAge = document.querySelector('#patientAge');
  patientWeight = document.querySelector('#patientWeight');
  patientGender = document.querySelector('#patientGender');
  patientASA = document.querySelector('#patientASA');
  opSpeciality = document.querySelector('#opSpeciality');
  opPriority = document.querySelector('#opPriority');
  isDayCase = document.querySelector('#isDayCase');
  startTime = document.querySelector('#startTime');
  endTime = document.querySelector('#endTime');
  opName = document.querySelector('#opName');

  /*email = document.querySelector('#email');
	inus = document.querySelector('#inus');
	depts = document.querySelectorAll('input[name=department]');
	cookies = document.querySelectorAll('input[name=cookie]');
	comments = document.querySelector('#comments');*/

  // listen for input on all
  let elems = Array.from(
    document.querySelectorAll(
      '#anesthesiaForm input, #anesthesiaForm select, #anesthesiaForm textarea'
    )
  );
  elems.forEach(e => e.addEventListener('input', handleChange, false));

  /*let elems = Array.from(document.querySelectorAll('#anesthesiaForm input, #anesthesiaForm select, #anesthesiaForm textarea'));
	elems.forEach(e => e.addEventListener('input', handleChange, false));*/

  let cached = getForm();
  if (cached) {
    patientId.value = cached.patientId;
    patientAge.value = cached.patientAge;
    patientWeight.value = cached.patientWeight;
    patientGender.value = cached.patientGender;
    patientASA.value = cached.patientASA;
    opSpeciality.value = cached.opSpeciality;
    opPriority.value = cached.opPriority;
    isDayCase.value = cached.isDayCase;
    startTime.value = cached.startTime;
    endTime.value = cached.endTime;
    opName.value = cached.opName;
  }

  /*document.querySelector('#anesthesiaForm').addEventListener(
    'submit',
    () => {
      window.localStorage.removeItem('form');
    },
    false
  );*/
}

function handleChange(e) {
  console.log('handleChange');

  //get all values and store first the easy ones

  let form = {};
  form.patientId = patientId.value;
  form.patientAge = patientAge.value;
  form.patientWeight = patientWeight.value;
  form.patientGender = patientGender.value;
  form.patientASA = patientASA.value;
  form.opSpeciality = opSpeciality.value;
  form.opPriority = opPriority.value;
  form.isDayCase = isDayCase.value;
  form.startTime = startTime.value;
  form.endTime = endTime.value;
  form.opName = opName.value;

  /*form.email = email.value;
	form.inus = inus.value;
	form.comments = comments.value;*/
  // either null or one
  /*depts.forEach(d => {
		if(d.checked) form.department = d.value;
	});*/
  // either empty array or some things
  /*form.cookies = [];
	cookies.forEach(c => {
		if(c.checked) form.cookies.push(c.value);
	});*/

  // now store
  saveForm(form);
}

function saveForm(form) {
  let f = JSON.stringify(form);
  window.localStorage.setItem('form', f);
}

function getForm() {
  let f = window.localStorage.getItem('form');
  if (f) return JSON.parse(f);
}
