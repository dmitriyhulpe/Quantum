const selects = document.getElementsByTagName('select');

if (selects.length > 0) {
	selectsInit();
}

function selectsInit() {
	for (const select of selects) {
		selectInit(select);
	}

	document.addEventListener('click', function (event) {
		selectsClose(event);
	});

	document.addEventListener('keydown', function (event) {
		if (event.which == 27) {
			selectsClose(event);
		}
	});
}

function selectsClose(event) {
	const selects = document.querySelectorAll('.select');

	if (!event.target.closest('.select')) {
		for (const select of selects) {

			const selectBodyOptions = select.querySelector('.select__options');
			select.classList.remove('active');
			slideUp(selectBodyOptions, 100);
		}
	}
}

function selectInit(select) {
	const selectParent = select.parentElement;
	const selectSelectedOption = select.querySelector('option:checked');
	select.setAttribute('data-default', selectSelectedOption.value);
	select.style.display = 'none';

	selectParent.insertAdjacentHTML('beforeend', '<div class="select"></div>');

	let newSelect = select.parentElement.querySelector('.select');
	newSelect.appendChild(select);
	selectItem(select);
}

function selectItem(select) {
	const selectParent = select.parentElement;
	const selectItems = selectParent.querySelector('.select__item');
	const selectOptions = select.querySelectorAll('option');
	const selectSelectedOption = select.querySelector('option:checked');
	const selectSelectedText = selectSelectedOption.text;
	const selectType = select.getAttribute('data-type');

	if (selectItems) {
		selectItems.remove();
	}

	let selectTypeContent = '';

	if (selectType == 'input') {
		selectTypeContent = '<div class="select__value"><input autocomplete="off" type="text" name="form[]" value="' + selectSelectedText + '" data-error="Error" data-value="' + selectSelectedText + '" class="select__input"></div>';
	} else {
		selectTypeContent = '<div class="select__value"><span>' + selectSelectedText + '</span></div>';
	}

	selectParent.insertAdjacentHTML('beforeend',
		'<div class="select__item">' +
		'<div class="select__title">' + selectTypeContent + '</div>' +
		'<div class="select__options">' + selectGetOptions(selectOptions) + '</div>' +
		'</div></div>');

	selectActions(select, selectParent);
}

function selectActions(original, select) {
	const selectItem = select.querySelector('.select__item');
	const selectBodyOptions = select.querySelector('.select__options');
	const selectOptions = select.querySelectorAll('.select__option');
	const selectType = original.getAttribute('data-type');
	const selectInput = select.querySelector('.select__input');

	selectItem.addEventListener('click', function () {
		const selects = document.querySelectorAll('.select');

		for (const select of selects) {
			const selectBodyOptions = select.querySelector('.select__options');

			if (select != selectItem.closest('.select')) {
				select.classList.remove('active');
				slideUp(selectBodyOptions, 100);
			}
		}

		slideToggle(selectBodyOptions, 100);
		select.classList.toggle('active');
	});

	for (const selectOption of selectOptions) {
		const selectOptionValue = selectOption.getAttribute('data-value');
		const selectOptionText = selectOption.innerHTML;

		if (selectType == 'input') {
			selectInput.addEventListener('keyup', selectSearch);
		} else {
			if (selectOption.getAttribute('data-value') == original.value) {
				selectOption.style.display = 'none';
			}
		}

		selectOption.addEventListener('click', function () {
			for (const element of selectOptions) {
				element.style.display = 'block';
			}

			if (selectType == 'input') {
				selectInput.value = selectOptionText;
				original.value = selectOptionValue;
			} else {
				select.querySelector('.select__value').innerHTML = '<span>' + selectOptionText + '</span>';
				original.value = selectOptionValue;
				selectOption.style.display = 'none';
			}
		});
	}
}

function selectGetOptions(selectOptions) {
	if (selectOptions) {
		let selectOptionsContent = '';

		for (const selectOption of selectOptions) {
			const selectOptionValue = selectOption.value;

			if (selectOptionValue != '') {
				const selectOptionText = selectOption.text;
				selectOptionsContent = selectOptionsContent + '<div data-value="' + selectOptionValue + '" class="select__option">' + selectOptionText + '</div>';
			}
		}
		return selectOptionsContent;
	}
}

function selectSearch(event) {
	let selectBlock = event.target.closest('.select').querySelector('.select__options');
	let selectOptions = event.target.closest('.select').querySelectorAll('.select__option');
	let selectSearchText = event.target.value.toUpperCase();

	for (const selectOption of selectOptions) {
		let selectTextValue = selectOption.textContent || selectOption.innerText;

		if (selectTextValue.toUpperCase().indexOf(selectSearchText) > -1) {
			selectOption.style.display = "";
		} else {
			selectOption.style.display = "none";
		}
	}
}

function selectsUpdateAll() {
	const selects = document.querySelectorAll('select');
	if (selects) {
		for(const select of selects) {
			selectItem(select);
		}
	}
}

let slideUp = (target, duration = 500) => {
	target.style.transitionProperty = 'height, margin, padding';
	target.style.transitionDuration = duration + 'ms';
	target.style.height = target.offsetHeight + 'px';
	target.offsetHeight;
	target.style.overflow = 'hidden';
	target.style.height = 0;
	target.style.paddingTop = 0;
	target.style.paddingBottom = 0;
	target.style.marginTop = 0;
	target.style.marginBottom = 0;

	window.setTimeout(() => {
		target.style.display = 'none';
		target.style.removeProperty('height');
		target.style.removeProperty('padding-top');
		target.style.removeProperty('padding-bottom');
		target.style.removeProperty('margin-top');
		target.style.removeProperty('margin-bottom');
		target.style.removeProperty('overflow');
		target.style.removeProperty('transition-duration');
		target.style.removeProperty('transition-property');
		target.classList.remove('slide');
	}, duration);
}

let slideDown = (target, duration = 500) => {
	target.style.removeProperty('display');
	let display = window.getComputedStyle(target).display;

	if (display === 'none') {
		display = 'block';
	}

	target.style.display = display;
	let height = target.offsetHeight;
	target.style.overflow = 'hidden';
	target.style.height = 0;
	target.style.paddingTop = 0;
	target.style.paddingBottom = 0;
	target.style.marginTop = 0;
	target.style.marginBottom = 0;
	target.offsetHeight;
	target.style.transitionProperty = "height, margin, padding";
	target.style.transitionDuration = duration + 'ms';
	target.style.height = height + 'px';
	target.style.removeProperty('padding-top');
	target.style.removeProperty('padding-bottom');
	target.style.removeProperty('margin-top');
	target.style.removeProperty('margin-bottom');

	window.setTimeout(() => {
		target.style.removeProperty('height');
		target.style.removeProperty('overflow');
		target.style.removeProperty('transition-duration');
		target.style.removeProperty('transition-property');
		target.classList.remove('slide');
	}, duration);
}

let slideToggle = (target, duration = 500) => {
	if (!target.classList.contains('slide')) {
		target.classList.add('slide');

		if (window.getComputedStyle(target).display === 'none') {
			return slideDown(target, duration);
		} else {
			return slideUp(target, duration);
		}
	}
}