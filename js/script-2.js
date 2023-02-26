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

const aFormFields = document.querySelectorAll('#anesthesiaForm input, #anesthesiaForm select, #anesthesiaForm textarea');
const arrayAFormFieldElements = Array.from(aFormFields);
az "arrayAFormFieldElements[0]" megfelel a "patientId = document.querySelector('#patientId');" kifejezésnek
*/

document.addEventListener('DOMContentLoaded', init, false);

// let name, email, inus, depts, cookies, comments;
let patientId,
  patientAge,
  patientHeight,
  patientWeight,
  patientGender,
  patientASA,
  opSpeciality,
  opPriority,
  isDayCase,
  startTime,
  endTime,
  opName,
  supervision,
  supervisor,
  proc1Name,
  isProc1Successful,
  proc1Note,
  proc2Name,
  isProc2Successful,
  proc2Note,
  proc3Name,
  isProc3Successful,
  proc3Note,
  proc4Name,
  isProc4Successful,
  proc4Note,
  toDo,
  otherNote,
  itemBMI;

function init() {
  // get the dom objects one time
  patientId = document.querySelector('#patientId');
  patientAge = document.querySelector('#patientAge');
  patientHeight = document.querySelector('#patientHeight');
  patientWeight = document.querySelector('#patientWeight');
  patientGender = document.querySelector('#patientGender');
  patientASA = document.querySelector('#patientASA');
  opSpeciality = document.querySelector('#opSpeciality');
  opPriority = document.querySelector('#opPriority');
  isDayCase = document.querySelector('#isDayCase');
  startTime = document.querySelector('#startTime');
  endTime = document.querySelector('#endTime');
  opName = document.querySelector('#opName');
  supervision = document.querySelector('#supervision');
  supervisor = document.querySelector('#supervisor');

  proc1Name = document.querySelector('#proc1Name');
  isProc1Successful = document.querySelector('#isProc1Successful');
  proc1Note = document.querySelector('#proc1Note');

  proc2Name = document.querySelector('#proc2Name');
  isProc2Successful = document.querySelector('#isProc2Successful');
  proc2Note = document.querySelector('#proc2Note');

  proc3Name = document.querySelector('#proc3Name');
  isProc3Successful = document.querySelector('#isProc3Successful');
  proc3Note = document.querySelector('#proc3Note');

  proc4Name = document.querySelector('#proc4Name');
  isProc4Successful = document.querySelector('#isProc4Successful');
  proc4Note = document.querySelector('#proc4Note');

  toDo = document.querySelector('#toDo');
  otherNote = document.querySelector('#otherNote');

  itemBMI = document.querySelector('.item-bmi-value');
  itemIBW = document.querySelector('.item-ibw-value');
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

  let cached = getForm('form');
  if (cached) {
    patientId.value = cached.patientId;
    patientAge.value = cached.patientAge;
    patientHeight.value = cached.patientHeight;
    patientWeight.value = cached.patientWeight;
    patientGender.value = cached.patientGender;
    patientASA.value = cached.patientASA;
    opSpeciality.value = cached.opSpeciality;
    opPriority.value = cached.opPriority;
    isDayCase.value = cached.isDayCase;
    startTime.value = cached.startTime;
    endTime.value = cached.endTime;
    opName.value = cached.opName;
    supervision.value = cached.supervision;
    supervisor.value = cached.supervisor;

    proc1Name.value = cached.proc1Name;
    isProc1Successful.value = cached.isProc1Successful;
    proc1Note.value = cached.proc1Note;

    proc2Name.value = cached.proc2Name;
    isProc2Successful.value = cached.isProc2Successful;
    proc2Note.value = cached.proc2Note;

    proc3Name.value = cached.proc3Name;
    isProc3Successful.value = cached.isProc3Successful;
    proc3Note.value = cached.proc3Note;

    proc4Name.value = cached.proc4Name;
    isProc4Successful.value = cached.isProc4Successful;
    proc4Note.value = cached.proc4Note;

    toDo.value = cached.toDo;
    otherNote.value = cached.otherNote;
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
  form.patientHeight = patientHeight.value;
  form.patientWeight = patientWeight.value;
  form.patientGender = patientGender.value;
  form.patientASA = patientASA.value;
  form.opSpeciality = opSpeciality.value;
  form.opPriority = opPriority.value;
  form.isDayCase = isDayCase.value;
  form.startTime = startTime.value;
  form.endTime = endTime.value;
  form.opName = opName.value;
  form.supervision = supervision.value;
  form.supervisor = supervisor.value;

  form.proc1Name = proc1Name.value;
  form.isProc1Successful = isProc1Successful.value;
  form.proc1Note = proc1Note.value;

  form.proc2Name = proc2Name.value;
  form.isProc2Successful = isProc2Successful.value;
  form.proc2Note = proc2Note.value;

  form.proc3Name = proc3Name.value;
  form.isProc3Successful = isProc3Successful.value;
  form.proc3Note = proc3Note.value;

  form.proc4Name = proc4Name.value;
  form.isProc4Successful = isProc4Successful.value;
  form.proc4Note = proc4Note.value;

  form.toDo = toDo.value;
  form.otherNote = otherNote.value;

  //objektum létrehozása
  /*
    const objA = {}
    arrayAFormFieldElements.forEach((elem, i) => {
    objA[i] = elem.name;
  });*/

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

  // calculate BMI
  let bmi, ibw;
  bmi = Math.round(
    (patientWeight.value / (patientHeight.value * patientHeight.value)) * 10000
  );
  //https://pubs.asahq.org/anesthesiology/article/127/1/203/18747/Calculating-Ideal-Body-Weight-Keep-It-Simple
  if (patientGender.value == 1) {
    ibw = Math.round(50 + 0.91 * (patientHeight.value - 152.4));
  } else if (patientGender.value == 2) {
    ibw = Math.round(45.5 + 0.91 * (patientHeight.value - 152.4));
  }

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

  // now store
  saveForm(form, 'form');
}

function saveForm(form, formName) {
  let f = JSON.stringify(form);
  window.localStorage.setItem(formName, f);
}

function getForm(formName) {
  let f = window.localStorage.getItem(formName);
  if (f) return JSON.parse(f);
}

function loadForm(formName) {
  let cached = getForm(formName);
  if (cached) {
    patientId.value = cached.patientId;
    patientAge.value = cached.patientAge;
    patientHeight.value = cached.patientHeight;
    patientWeight.value = cached.patientWeight;
    patientGender.value = cached.patientGender;
    patientASA.value = cached.patientASA;
    opSpeciality.value = cached.opSpeciality;
    opPriority.value = cached.opPriority;
    isDayCase.value = cached.isDayCase;
    startTime.value = cached.startTime;
    endTime.value = cached.endTime;
    opName.value = cached.opName;
    supervision.value = cached.supervision;
    supervisor.value = cached.supervisor;

    proc1Name.value = cached.proc1Name;
    isProc1Successful.value = cached.isProc1Successful;
    proc1Note.value = cached.proc1Note;

    proc2Name.value = cached.proc2Name;
    isProc2Successful.value = cached.isProc2Successful;
    proc2Note.value = cached.proc2Note;

    proc3Name.value = cached.proc3Name;
    isProc3Successful.value = cached.isProc3Successful;
    proc3Note.value = cached.proc3Note;

    proc4Name.value = cached.proc4Name;
    isProc4Successful.value = cached.isProc4Successful;
    proc4Note.value = cached.proc4Note;

    toDo.value = cached.toDo;
    otherNote.value = cached.otherNote;
  }
}

function storeForm(formName) {
  let form = {};
  form.patientId = patientId.value;
  form.patientAge = patientAge.value;
  form.patientHeight = patientHeight.value;
  form.patientWeight = patientWeight.value;
  form.patientGender = patientGender.value;
  form.patientASA = patientASA.value;
  form.opSpeciality = opSpeciality.value;
  form.opPriority = opPriority.value;
  form.isDayCase = isDayCase.value;
  form.startTime = startTime.value;
  form.endTime = endTime.value;
  form.opName = opName.value;
  form.supervision = supervision.value;
  form.supervisor = supervisor.value;

  form.proc1Name = proc1Name.value;
  form.isProc1Successful = isProc1Successful.value;
  form.proc1Note = proc1Note.value;

  form.proc2Name = proc2Name.value;
  form.isProc2Successful = isProc2Successful.value;
  form.proc2Note = proc2Note.value;

  form.proc3Name = proc3Name.value;
  form.isProc3Successful = isProc3Successful.value;
  form.proc3Note = proc3Note.value;

  form.proc4Name = proc4Name.value;
  form.isProc4Successful = isProc4Successful.value;
  form.proc4Note = proc4Note.value;

  form.toDo = toDo.value;
  form.otherNote = otherNote.value;

  // now store
  saveForm(form, formName);
}
