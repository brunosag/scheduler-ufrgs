// Fill tables and options
fillCadeirasTable();
fillDiasOptions();
fillHorarioOptions();

// Set fixed horarios and dias
localStorage.setItem('horarios', JSON.stringify(['8:30', '10:30', '13:30', '15:30', '18:30', '20:30']));
localStorage.setItem('dias', JSON.stringify(['Segunda', 'Terça', 'Quarta', 'Quinta', 'Sexta']));

// Handle cadeiras form
const cadeirasForm = document.querySelector('#cadeiras-form');
cadeirasForm.addEventListener('submit', (e) => {
	e.preventDefault();

	const { value } = cadeirasForm.elements['name'];
	addToLocalStorageArray(value, 'cadeiras');
	fillCadeirasTable();

	cadeirasForm.reset();
});

function addToLocalStorageArray(item, arrayName) {
	const array = JSON.parse(localStorage.getItem(arrayName)) || [];
	if (!array.includes(item)) {
		array.push(item);
		localStorage.setItem(arrayName, JSON.stringify(array));
	}
}

function fillCadeirasTable() {
	const cadeirasTable = document.querySelector('#cadeiras-table');
	const cadeiras = JSON.parse(localStorage.getItem('cadeiras')) || [];

	cadeiras.sort((a, b) => a.localeCompare(b, 'pt-BR'));

	cadeirasTable.innerHTML = cadeiras.map((cadeira) => `<tr><td>${cadeira}</td></tr>`).join('');
}

function fillDiasOptions() {
	const dias = JSON.parse(localStorage.getItem('dias'));
	const container = document.querySelector('#dias-options');

	for (const dia of dias) {
		const checkbox = document.createElement('input');
		checkbox.type = 'checkbox';
		checkbox.value = dia;

		const label = document.createElement('label');
		label.htmlFor = dia;
		label.textContent = dia;

		container.appendChild(checkbox);
		container.appendChild(label);
	}
}

function fillHorarioOptions() {
	const horarios = JSON.parse(localStorage.getItem('horarios'));
	const container = document.querySelector('#horario-options');

	for (const horario of horarios) {
		const optionElement = document.createElement('option');
		optionElement.value = horario;
		optionElement.textContent = horario;
		container.appendChild(optionElement);
	}
}
