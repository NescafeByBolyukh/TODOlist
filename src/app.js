let getId = x => document.getElementById(x);

let input = getId('input');
let add = getId('add');
getId('input').disabled = false;
let count = 0;
let ten = 10;
let nine = 9;
let keyCodeEnter = 13;
let elem;

let makeList = (function () {

	return {
		addNewElement: function () {
			let liName = input.value;
			let newNode = document.createElement('p');
			let iconCheck = document.createElement('i');
			let iconDelete = document.createElement('i');
			let div = document.createElement('div');
			div.setAttribute('class', 'listElem');
			div.setAttribute('draggable', true);
			div.setAttribute('ondragover', 'dragOver(event)');
			div.setAttribute('ondragstart', 'dragStart(event)');
			getId('list-wrapper').appendChild(div);
			iconCheck.innerHTML = 'check_box_outline_blank';
			iconCheck.classList.add('material-icons');
			iconCheck.classList.add('check');
			iconDelete.innerHTML = 'delete';
			iconDelete.classList.add('material-icons');
			iconDelete.classList.add('del');
			div.appendChild(iconCheck);
			newNode.innerHTML = liName;
			div.appendChild(newNode);
			div.appendChild(iconDelete);
			input.value = '';
			count++;
			if (count === ten) {
				input.disabled = true;
				add.removeAttribute('add');
				getId('notification').style.display = 'block';
			}
		},
		changeIcon: function () {
			let changeClick = document.getElementsByClassName('check');
			for (let i = 0; i < changeClick.length; i++) {
				changeClick[i].onclick = function () {
					this.innerHTML = 'check_box';
				}
			}
		},
		deleteElement: function () {
			let delClick = document.getElementsByClassName('del');
			for (let i = 0; i < delClick.length; i++) {
				delClick[i].onclick = function (e) {
					e.target.parentElement.parentElement.removeChild(e.target.parentElement);
					count--;
					if (count <= nine) {
						input.disabled = false;
						document.getElementsByClassName('add').id = 'add';
						getId('notification').style.display = 'none';
					}
				}
			}
		}
	}
}())

add.addEventListener('click', function () {
	if (input.value === '') {
		add.removeAttribute('add');
	} else {
		makeList.addNewElement();
		makeList.deleteElement();
		makeList.changeIcon();
	}
})

// it wasnt on the list of requirements, but its more comfortable to use enter for adding elements on laptop
input.addEventListener('keydown', function () {
	if (input.value === '') {
		add.removeAttribute('add');
	} else if (event.keyCode === keyCodeEnter) {
		makeList.addNewElement();
		makeList.deleteElement();
		makeList.changeIcon();
	}
})

function dragOver(e) {
	if (before(elem, e.target)) {
		e.target.parentElement.insertBefore(elem, e.target);
	} else {
		e.target.parentElement.appendChild(e.target);
	}
}

function dragEnd() {
	elem = null;
}

function dragStart(e) {
	e.dataTransfer.effectAllowed = 'move';
	e.dataTransfer.setData('text/plain', null);
	elem = e.target;
}

function before(elem1, elem2) {
	if (elem2.parentNode === elem1.parentNode) {
		for (let smt = elem1.previousSibling; smt; smt = smt.previousSibling) {
			if (smt === elem2) {
				return true;
			}
		}
		return false;
	}
}
