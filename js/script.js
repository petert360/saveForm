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
  opName,
  supervision,
  supervisor,
  proc1Name,
  isProc1Successful,
  reasonProc1Failed,
  proc2Name,
  isProc2Successful,
  reasonProc2Failed,
  proc3Name,
  isProc3Successful,
  reasonProc3Failed,
  proc4Name,
  isProc4Successful,
  reasonProc4Failed,
  toDo,
  otherNote;


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
  supervision = document.querySelector('#supervision');
  supervisor = document.querySelector('#supervisor');

  proc1Name = document.querySelector('#proc1Name');
  isProc1Successful = document.querySelector('#isProc1Successful');
  reasonProc1Failed = document.querySelector('#reasonProc1Failed');

  proc2Name = document.querySelector('#proc2Name');
  isProc2Successful = document.querySelector('#isProc2Successful');
  reasonProc2Failed = document.querySelector('#reasonProc2Failed');

  proc3Name = document.querySelector('#proc3Name');
  isProc3Successful = document.querySelector('#isProc3Successful');
  reasonProc3Failed = document.querySelector('#reasonProc3Failed');

  proc4Name = document.querySelector('#proc4Name');
  isProc4Successful = document.querySelector('#isProc4Successful');
  reasonProc4Failed = document.querySelector('#reasonProc4Failed');

  toDo = document.querySelector('#toDo');
  otherNote = document.querySelector('#otherNote');

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
    supervision.value = cached.supervision;
    supervisor.value = cached.supervisor;

    proc1Name.value = cached.proc1Name;
    isProc1Successful.value = cached.isProc1Successful;
    reasonProc1Failed.value = cached.reasonProc1Failed;

    proc2Name.value = cached.proc2Name;
    isProc2Successful.value = cached.isProc2Successful;
    reasonProc2Failed.value = cached.reasonProc2Failed;

    proc3Name.value = cached.proc3Name;
    isProc3Successful.value = cached.isProc3Successful;
    reasonProc3Failed.value = cached.reasonProc3Failed;

    proc4Name.value = cached.proc4Name;
    isProc4Successful.value = cached.isProc4Successful;
    reasonProc4Failed.value = cached.reasonProc4Failed;

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
  form.reasonProc1Failed = reasonProc1Failed.value;

  form.proc2Name = proc2Name.value;
  form.isProc2Successful = isProc2Successful.value;
  form.reasonProc2Failed = reasonProc2Failed.value;

  form.proc3Name = proc3Name.value;
  form.isProc3Successful = isProc3Successful.value;
  form.reasonProc3Failed = reasonProc3Failed.value;

  form.proc4Name = proc4Name.value;
  form.isProc4Successful = isProc4Successful.value;
  form.reasonProc4Failed = reasonProc4Failed.value;

  form.toDo = toDo.value;
  form.otherNote = otherNote.value;

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
