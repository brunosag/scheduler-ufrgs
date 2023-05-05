// Set fixed horarios and dias
localStorage.setItem('horarios', JSON.stringify(['8:30', '10:30', '13:30', '15:30', '18:30']));
localStorage.setItem('dias', JSON.stringify(['Segunda', 'Terça', 'Quarta', 'Quinta', 'Sexta']));

// Fill tables and options
fillCadeirasTable();
fillTurmasTable();
fillGradeTable();
hightlightSelectedTurmas();
fillDiasOptions();
fillCadeiraOptions();
fillHorarioOptions();
fillGradeOptions();
listenToGradeOptions();

// Handle cadeiras form
const cadeirasForm = document.querySelector('#cadeiras-form');
cadeirasForm.addEventListener('submit', (e) => {
	e.preventDefault();

	const cadeira = {
		name: cadeirasForm.elements['name'].value,
		color: getRandomColor(),
	};
	addToLocalStorageArray(cadeira, 'cadeiras');
	fillCadeirasTable();
	fillCadeiraOptions();
	fillGradeOptions();

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
	fillGradeOptions();
	fillGradeTable();

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

	cadeiras.sort((a, b) => a.name.localeCompare(b.name, 'pt-BR'));

	container.innerHTML = '';

	for (const cadeira of cadeiras) {
		const option = document.createElement('option');
		option.innerText = cadeira.name;
		option.value = cadeira.name;

		container.appendChild(option);
	}
}

function fillCadeirasTable() {
	const cadeiras = JSON.parse(localStorage.getItem('cadeiras')) || [];
	const cadeirasTable = document.querySelector('#cadeiras-table');

	cadeiras.sort((a, b) => a.name.localeCompare(b.name, 'pt-BR'));

	cadeirasTable.innerHTML = cadeiras.map((cadeira) => `<tr><td>${cadeira.name}</td></tr>`).join('');
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

function fillGradeOptions() {
	const cadeiras = JSON.parse(localStorage.getItem('cadeiras')) || [];
	const turmas = JSON.parse(localStorage.getItem('turmas')) || [];
	const selectedTurmas = JSON.parse(localStorage.getItem('selectedTurmas')) || null;
	const gradeOptions = document.querySelector('#grade-options');

	cadeiras.sort((a, b) => a.name.localeCompare(b.name, 'pt-BR'));

	gradeOptions.innerHTML = '';

	cadeiras
		.filter((cadeira) => turmas.some((turma) => turma.cadeira === cadeira.name))
		.forEach((cadeira) => {
			const filteredTurmas = turmas.filter((turma) => turma.cadeira === cadeira.name);
			const select = document.createElement('select');
			select.name = cadeira.name;

			select.innerHTML = filteredTurmas
				.map((turma) => `<option value="${turma.turma}">${turma.turma}</option>`)
				.join('');

			const row = document.createElement('tr');
			row.innerHTML = `<td><span style="color: ${cadeira.color};">${cadeira.name}</span></td><td></td>`;
			row.querySelector('td:last-child').appendChild(select);
			gradeOptions.appendChild(row);
		});

	if (selectedTurmas) {
		selectedTurmas.forEach((selectedTurma) => {
			const { cadeira, turma } = selectedTurma;
			const selectElement = gradeOptions.querySelector(`select[name="${cadeira}"]`);
			const optionElement = selectElement.querySelector(`option[value="${turma}"]`);

			if (optionElement) {
				optionElement.selected = true;
			}
		});
	}

	getSelectedTurmas();
	listenToGradeOptions();
}

function fillGradeTable() {
	const gradeTable = document.querySelector('#grade-table');
	const turmas = JSON.parse(localStorage.getItem('turmas')) || [];
	const horarios = JSON.parse(localStorage.getItem('horarios'));
	const dias = JSON.parse(localStorage.getItem('dias'));

	gradeTable.innerHTML = '';

	horarios.forEach((horario) => {
		let filled = false;
		turmas.forEach((turma) => {
			if (turma.horario === horario) {
				const row = document.createElement('tr');
				row.innerHTML = filled ? `<td></td>` : `<td>${turma.horario}</td>`;
				filled = true;
				row.innerHTML += dias
					.map((dia) => `<td>${turma.dias.includes(dia) ? turma.cadeira + ` (${turma.turma})` : ''}</td>`)
					.join('');
				gradeTable.appendChild(row);
			}
		});
		if (!filled) {
			const row = document.createElement('tr');
			row.innerHTML = `<td>${horario}</td>`;
			gradeTable.appendChild(row);
		}
	});
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
				`<tr><td>${item.cadeira}</td><td>${item.horario}</td><td>${item.turma}</td><td>${item.dias.join(
					', '
				)}</td></tr>`
		)
		.join('');
}

function getRandomColor() {
	const r = Math.floor(Math.random() * 256);
	const g = Math.floor(Math.random() * 256);
	const b = Math.floor(Math.random() * 256);

	const colorCode = `rgb(${r}, ${g}, ${b})`;

	return colorCode;
}

function getSelectedTurmas() {
	const selectedTurmas = [];
	const turmas = JSON.parse(localStorage.getItem('turmas')) || [];
	const cadeiras = JSON.parse(localStorage.getItem('cadeiras')) || [];
	const gradeOptions = document.querySelector('#grade-options');
	const filteredCadeiras = cadeiras.filter((cadeira) => turmas.some((turma) => turma.cadeira === cadeira.name));

	for (const cadeira of filteredCadeiras) {
		const selectedTurma = gradeOptions.querySelector(`select[name="${cadeira.name}"]`).value;
		selectedTurmas.push({ cadeira: cadeira.name, turma: selectedTurma });
	}

	localStorage.setItem('selectedTurmas', JSON.stringify(selectedTurmas));
}

function hightlightSelectedTurmas() {
	const selectedTurmas = JSON.parse(localStorage.getItem('selectedTurmas')) || [];
	const cadeiras = JSON.parse(localStorage.getItem('cadeiras')) || [];
	const gradeTable = document.querySelector('#grade-table');

	cadeiras.forEach((cadeira) => {
		const matchingCells = Array.from(gradeTable.getElementsByTagName('td')).filter((cell) => {
			return cell.textContent.includes(`${cadeira.name}`);
		});
		matchingCells.forEach((cell) => {
			cell.style.color = 'rgba(0, 0, 0, 0.25)';
		});
	});

	selectedTurmas.forEach((selectedTurma) => {
		const matchingCadeira = cadeiras.find((cadeira) => cadeira.name === selectedTurma.cadeira);
		const matchingCells = Array.from(gradeTable.getElementsByTagName('td')).filter((cell) => {
			return cell.textContent.includes(`${selectedTurma.cadeira} (${selectedTurma.turma})`);
		});
		matchingCells.forEach((cell) => {
			cell.style.color = matchingCadeira.color;
		});
	});
}

function listenToGradeOptions() {
	const gradeOptions = document.querySelector('#grade-options');
	const selectElements = gradeOptions.querySelectorAll('select');
	selectElements.forEach((select) => {
		select.addEventListener('change', () => {
			getSelectedTurmas();
			hightlightSelectedTurmas();
		});
	});
}
