// Set fixed horarios and dias
localStorage.setItem('horarios', JSON.stringify(['8:30', '10:30', '13:30', '15:30', '18:30']));
localStorage.setItem('dias', JSON.stringify(['Segunda', 'Terça', 'Quarta', 'Quinta', 'Sexta']));

// Fill tables and options
fillCadeirasTable();
fillTurmasTable();
fillDiasOptions();
fillCadeiraOptions();
fillHorarioOptions();

// Handle cadeiras form
const cadeirasForm = document.querySelector('#cadeiras-form');
cadeirasForm.addEventListener('submit', (e) => {
	e.preventDefault();

	const { value } = cadeirasForm.elements['name'];
	addToLocalStorageArray(value, 'cadeiras');
	fillCadeirasTable();
	fillCadeiraOptions();

	cadeirasForm.reset();
});

// Handle turmas form
const turmasForm = document.querySelector('#turmas-form');
turmasForm.addEventListener('submit', (e) => {
	e.preventDefault();

	const turma = {
		cadeira: turmasForm.elements['cadeira'].value,
		horario: turmasForm.elements['horario'].value,
		turma: turmasForm.elements['turma'].value,
		dias: Array.from(document.querySelectorAll('input[name="dias"]:checked')).map((checkbox) => checkbox.value),
	};

	addToLocalStorageArray(turma, 'turmas');
	fillTurmasTable();

	turmasForm.reset();
});

function addToLocalStorageArray(item, arrayName) {
	const array = JSON.parse(localStorage.getItem(arrayName)) || [];
	if (!array.includes(item)) {
		array.push(item);
		localStorage.setItem(arrayName, JSON.stringify(array));
	}
}

function fillCadeiraOptions() {
	const cadeiras = JSON.parse(localStorage.getItem('cadeiras')) || [];
	const container = document.querySelector('#cadeira-options');

	cadeiras.sort((a, b) => a.localeCompare(b, 'pt-BR'));

	for (const cadeira of cadeiras) {
		const option = document.createElement('option');
		option.innerText = cadeira;
		option.value = cadeira;

		container.appendChild(option);
	}
}

function fillCadeirasTable() {
	const cadeiras = JSON.parse(localStorage.getItem('cadeiras')) || [];
	const cadeirasTable = document.querySelector('#cadeiras-table');

	cadeiras.sort((a, b) => a.localeCompare(b, 'pt-BR'));

	cadeirasTable.innerHTML = cadeiras.map((cadeira) => `<tr><td>${cadeira}</td></tr>`).join('');
}

function fillDiasOptions() {
	const dias = JSON.parse(localStorage.getItem('dias'));
	const container = document.querySelector('#dias-options');

	for (const dia of dias) {
		const checkbox = document.createElement('input');
		checkbox.type = 'checkbox';
		checkbox.name = 'dias';
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

function fillTurmasTable() {
	const turmas = JSON.parse(localStorage.getItem('turmas')) || [];
	const turmasTable = document.querySelector('#turmas-table');

	if (!!turmas.length)
		turmasTable.innerHTML = `<thead><tr><th>Cadeira</th><th>Horário</th><th>Turma</th><th>Dias</th></tr></thead>`;

	turmas.sort(
		(a, b) =>
			a.cadeira.localeCompare(b.cadeira) || a.horario.localeCompare(b.horario) || a.turma.localeCompare(b.turma)
	);

	turmasTable.innerHTML += turmas
		.map(
			(item) =>
				`<tr><td>${item.cadeira}</td><td>${item.horario}</td><td>${item.turma}</td><td>${item.dias}</td></tr>`
		)
		.join('');
}
