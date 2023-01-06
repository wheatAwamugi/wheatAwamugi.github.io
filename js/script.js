var currentLang = 'en';
var currentSurv = 'Survivor is not selected';
var currentKiller = 'Killer is not selected';

function changeHeaderTitle() {
	let headerTitle = document.querySelector('.header-title');
	let headerDesc = document.querySelector('.header-desc');

	let NavFilter = document.querySelector('#filter-tab');
	let NavLang = document.querySelector('.title-lang');
	let NavSelectSurv = document.querySelector('.list-select .title-surv');
	let NavSelectKiller = document.querySelector('.list-select .title-killer');
	let NavSelectSurvResetBtn = document.querySelector('.reset-surv-select');
	let NavSelectKillerResetBtn = document.querySelector('.reset-killer-select');
	let NavMsgTips = document.querySelector('.msg-tips');

	if(currentLang == 'en') {
		headerTitle.innerHTML = 'Dead By Daylight Perks';
		headerDesc.innerHTML = 'Three language cheet sheet';
		NavFilter.innerHTML = 'Filter';
		NavLang.innerHTML = 'Language : ';
		NavSelectSurv.innerHTML = 'Survivor : ';
		NavSelectKiller.innerHTML = 'killer : ';
		NavSelectSurvResetBtn.innerHTML = 'Reset';
		NavSelectKillerResetBtn.innerHTML = 'Reset';
		NavMsgTips.innerHTML = 'You can search a perk by name using Ctrl+f or Command+f';
	} else if(currentLang == 'ja') {
		headerTitle.innerHTML = 'デッドバイデイライト　パーク一覧';
		headerDesc.innerHTML = '３言語早見表';
		NavFilter.innerHTML = '絞り込み';
		NavLang.innerHTML = '言語 : ';
		NavSelectSurv.innerHTML = 'サバイバー : ';
		NavSelectKiller.innerHTML = 'キラー : ';
		NavSelectSurvResetBtn.innerHTML = '未選択にする';
		NavSelectKillerResetBtn.innerHTML = '未選択にする';
		NavMsgTips.innerHTML = 'Ctrl+f か Command+f を使ってパーク名検索ができます。';
	} else {
		headerTitle.innerHTML = 'Dead By Daylight Competenze';
		headerDesc.innerHTML = 'Foglio di 3 lingue';
		NavFilter.innerHTML = 'Filtro';
		NavLang.innerHTML = 'Linguaggio : ';
		NavSelectSurv.innerHTML = 'Sopravvissuto : ';
		NavSelectKiller.innerHTML = 'Assassino : ';
		NavSelectSurvResetBtn.innerHTML = 'Ripristina';
		NavSelectKillerResetBtn.innerHTML = 'Ripristina';
		NavMsgTips.innerHTML = 'Puoi cercare un vantaggio per nome usando Ctrl+f o Command+f';
	}

}


function resetList() {
	let list = getListBase();
	list.remove();
}

function makeListBase() {
	let list = document.createElement('ul');
	list.classList.add('list-perk');
	list.setAttribute('id', 'list-perk');
	return list;
}

function getListBase() {
	let list = document.getElementById('list-perk');
	return list;
}

function makeListItem(title, belongto, id, index, imgFile) {
	let listItem = document.createElement('li');
		listItem.classList.add('list-perk-item');
		listItem.setAttribute('perk-id', id);

	if(index > 0) {
		listItem.classList.add('list-perk-item-'+index);
	}

	if(imgFile != '') {
		let listImage = document.createElement('img');
			listImage.setAttribute('src', 'img/perk/'+imgFile);
		listItem.append(listImage);
	}

	if(title != '') {
		let titleP = document.createElement('h3');
			titleP.classList.add('list-perk-title');
			titleP.innerHTML = title;
		listItem.append(titleP);
	}

	if(belongto != '') {
		let belongP = document.createElement('p');
			belongP.classList.add('list-perk-belong');
			belongP.innerHTML = belongto;
		listItem.append(belongP);
	}

	return listItem;
}

function createPerkNav() {
	let navPerk = document.getElementById('nav-perk');
	let list = makeListBase();
	navPerk.append(list);

	perk.forEach(function(item, index)	{
		let list = getListBase();

		if(currentSurv != 'Survivor is not selected' 
			&& currentKiller != 'Killer is not selected'
			) {
			if(item.side == 'killer' && currentKiller != item.belongTo_en) {
				return;
			} else if (item.side == 'surv' && currentSurv != item.belongTo_en) {
				return;
			}
			
		} else if (currentSurv != 'Survivor is not selected') {
			if (currentSurv != item.belongTo_en) {
				return;
			}
		} else if (currentKiller != 'Killer is not selected') {
			if (currentKiller != item.belongTo_en) {
				return;
			}
		}

		if(currentLang == 'en') {
			let listItem = makeListItem(
					item.name_en, 
					item.belongTo_en, 
					item.id, 
					0, 
					item.image_file
				);
			list.append(listItem);
		} else if(currentLang == 'ja') {
			let listItem = makeListItem(
					item.name_ja,
					item.belongTo_ja,
					item.id, 
					0, 
					item.image_file
				);
			list.append(listItem);
		} else {
			let listItem = makeListItem(
					item.name_it,
					item.belongTo_it,
					item.id, 
					0, 
					item.image_file
				);
			list.append(listItem);
		}
	})

}


function getSelectBase(elmn_id) {
	let select = document.getElementById(elmn_id);
	return select;
}

function resetSelect() {
	let selectSurv = document.getElementById('surv');
		selectSurv.remove();

	let selectKiller = document.getElementById('killer');
		selectKiller.remove();
}

function makeSelectOptionItem(name, value) {
	let optionItem = document.createElement('option');
		optionItem.setAttribute('value', value);
		optionItem.innerHTML = name;

	if(value == currentSurv) {
		optionItem.setAttribute('selected', 'selected');
	}
	if(value == currentKiller) {
		optionItem.setAttribute('selected', 'selected');
	}

	return optionItem;
}

function createSelect() {
	let selectSurvWrapper = getSelectBase('select_surv');
	let selectSurv = document.createElement('select');
		selectSurv.setAttribute('id','surv');
		selectSurv.setAttribute('name','surv');
		selectSurv.addEventListener('change', function(event) {
			currentSurv = this.value;
			resetList();
			createPerkNav();
		});

	surv.forEach(function(item, index) {
		if(currentLang == 'en') {
			let optionItem = makeSelectOptionItem(item.name_en, item.name_en, currentSurv);
			selectSurv.append(optionItem);
		} else if(currentLang == 'ja') {
			let optionItem = makeSelectOptionItem(item.name_ja, item.name_en, currentSurv);
			selectSurv.append(optionItem);
		} else {
			let optionItem = makeSelectOptionItem(item.name_it, item.name_en, currentSurv);
			selectSurv.append(optionItem);
		}
	});
	selectSurvWrapper.append(selectSurv);

	let selectKillerWrapper = getSelectBase('select_killer');
	let selectKileer = document.createElement('select');
		selectKileer.setAttribute('id','killer');
		selectKileer.setAttribute('name','killer');
		selectKileer.addEventListener('change', function(event) {
			currentKiller = this.value;
			resetList();
			createPerkNav();
		});

	killer.forEach(function(item, index) {
		if(currentLang == 'en') {
			let optionItem = makeSelectOptionItem(item.name_en, item.name_en, currentKiller);
			selectKileer.append(optionItem);
		} else if(currentLang == 'ja') {
			let optionItem = makeSelectOptionItem(item.name_ja, item.name_en, currentKiller);
			selectKileer.append(optionItem);
		} else {
			let optionItem = makeSelectOptionItem(item.name_it, item.name_en, currentKiller);
			selectKileer.append(optionItem);
		}
	});
	selectKillerWrapper.append(selectKileer);
	
}

function addSwitchLangEvent() {
	let switchLangElmn = document.querySelectorAll('#switch-lang input');
	switchLangElmn.forEach(function(item, index) {
		item.addEventListener('change', function() {
			currentLang = this.value;
			changeHeaderTitle();
			resetList();
			createPerkNav();

			resetSelect();
			createSelect();
		});
	});
}



window.onload = function() {
	let NavSelectSurvResetBtn = document.querySelector('.reset-surv-select');
	NavSelectSurvResetBtn.addEventListener('click', function() {
		currentSurv = 'Survivor is not selected';
		let selectSurv = document.querySelector('select#surv');
			selectSurv.value = currentSurv;
		resetList();
		createPerkNav();
	});

	let NavSelectKillerResetBtn = document.querySelector('.reset-killer-select');
	NavSelectKillerResetBtn.addEventListener('click', function() {
		currentKiller = 'Killer is not selected'
		let selectKiller = document.querySelector('select#killer');
			selectKiller.value = currentKiller;
		resetList();
		createPerkNav();
	});

	let Nav = document.querySelector('.nav');
	let NavHeight = Nav.offsetHeight;
	Nav.style.bottom = '-'+NavHeight+'px';
	Nav.style.visibility = 'visible';

	let NavFilterBtn = document.querySelector('#filter-tab');
	NavFilterBtn.addEventListener('click', function() {
		let Nav = document.querySelector('.nav');
		let isOpen = Nav.getAttribute('data-is-open');

		if(isOpen == 'false') {
			Nav.setAttribute('data-is-open', 'true');
		} else {
			Nav.setAttribute('data-is-open', 'false');
		}

	});

	createPerkNav();
	createSelect();
	addSwitchLangEvent();
};
