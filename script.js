"use strict"

var lettersDiv = document.getElementById("very-letters");

var cross = document.getElementById("hide-article-cross");
var article = document.getElementById("article");
var deleteLetter = document.getElementById("delete");

/*** onclick handlers ***/

var clickOnTheme = function() {
	lettersDiv.style.display = 'none';
	cross.style.display = 'block';
	article.style.display = 'block';
}

deleteLetter.onclick = function() {
	var toRemove = [];
	var toRemoveIdx = [];
	for (var i = 0; i < lettersDiv.children.length; i++) {
		var child = lettersDiv.children[i];
		//alert("kek");
		if (child.firstElementChild.checked) {
			//alert(i + " checked");
			toRemove.push(child);
			toRemoveIdx.push(i);
		}
	}
	for (var i = 0; i < toRemove.length; i++) {
		lettersDiv.removeChild(toRemove[i]);
	}
	for (var i = 0; i < toRemoveIdx.length; i++) {
		lettersArray.splice(i, 1);
	}
}


cross.onclick = function() {
	article.style.display = 'none';
	cross.style.display = 'none';
	lettersDiv.style.display = 'block';
}


lettersDiv.children[0].getElementsByClassName('theme')[0].onclick = function() {
	lettersDiv.style.display = 'none';
	cross.style.display = 'block';
	article.style.display = 'block';
	article.getElementsByTagName('h3')[0].innerHTML = 'Доступ к аккаунту';
	article.getElementsByTagName('p')[0].innerHTML = 
								'Получить доступ к аккаунту очень просто, нужно всего лишь...<a href>читать далее</a>';
	lettersDiv.children[0].getElementsByClassName('theme')[0].className = 'theme';
	lettersDiv.children[0].getElementsByClassName('author unread')[0].className = 'author';
	lettersDiv.children[0].getElementsByClassName('unread-oval')[0].style.display = 'none';
}

lettersDiv.children[1].getElementsByClassName('theme')[0].onclick = function() {
	lettersDiv.style.display = 'none';
	cross.style.display = 'block';
	article.style.display = 'block';
	article.getElementsByTagName('h3')[0].innerHTML = 'Как читать почту с мобильного';
	article.getElementsByTagName('p')[0].innerHTML = 
								'Для начала надо установить мобильное приложение Яндекс.Почты. Затем...';
	lettersDiv.children[1].getElementsByClassName('theme')[0].className = 'theme';
	lettersDiv.children[1].getElementsByClassName('author unread')[0].className = 'author';
	lettersDiv.children[1].getElementsByClassName('unread-oval')[0].style.display = 'none';
}

lettersDiv.children[2].getElementsByClassName('theme')[0].onclick = function() {
	lettersDiv.style.display = 'none';
	cross.style.display = 'block';
	article.style.display = 'block';
	article.getElementsByTagName('h3')[0].innerHTML = 'Как читать почту с мобильного';
	article.getElementsByTagName('p')[0].innerHTML = 
								'Пользуйтесь Яндексом и на Ваших мобильных приложениях..';
}

lettersDiv.children[3].getElementsByClassName('theme')[0].onclick = function() {
	lettersDiv.style.display = 'none';
	cross.style.display = 'block';
	article.style.display = 'block';
	article.getElementsByTagName('h3')[0].innerHTML = 'Соберите всю почту в этот ящик';
	article.getElementsByTagName('p')[0].innerHTML = 'Чем больше человечество использует интернет, тем больше..';
}


/*** author and theme generators ***/

function getRandomInt(min, max) {
  return Math.floor(Math.random() * (max - min)) + min;
}


var authors = ['Яндекс', 'Google'];

function rndAuthor() {
	return authors[getRandomInt(0, authors.length)];
}

var themes = {
	'Яндекс' : ['Яндекс.Технологии', 'Яндекс.Музыка', 'Яндекс.Дзен'],
	'Google' : ['Google Play', 'GDrive']	
};

var contents = {
	'Яндекс.Технологии' : 'Мы расскажем вам про Яндекс.Технологии',
	'Яндекс.Музыка' : 'Подписывайтесь на Яндекс.Музыку',
	'Яндекс.Дзен' : 'Умная лента от Яндекс позволит Вам оставаться в курсе новостей',
	'Google Play' : 'Would you like to know more about Google Play?',
	'GDrive' : 'Here is a simple tutorial to get started with GDrive'
}

function rndTheme(author) {
	var concreteThemes = themes[author];
	return concreteThemes[getRandomInt(0, concreteThemes.length)];
}


/*** new mail ***/

function newLetter() {
	var letter = document.createElement('div');
	letter.className = "letter";
	
	var checkbox = document.createElement('input');
	checkbox.type = 'checkbox';
	checkbox.className = "letter-markers";
	letter.appendChild(checkbox);

	/*var authorImage = document.createElement('div');
	authorImage.className = 'author-image';
	authorImage.style.background = 'grey';
	letter.appendChild(authorImage);*/

	var unreadOval = document.createElement('figure');
	unreadOval.className = 'unread-oval';
	unreadOval.innerHTML = '<img src="images/Oval.png">'
	letter.appendChild(unreadOval);

	var author = document.createElement('p');
	author.className = 'author unread';
	author.innerHTML = rndAuthor();
	letter.appendChild(author);

	var theme = document.createElement('p');
	theme.className = 'theme unread';
	theme.innerHTML = rndTheme(author.innerHTML);
	letter.appendChild(theme);

	var date = document.createElement('p');
	date.className = 'date';
	date.innerHTML = '23 мар';
	letter.appendChild(date);

	var line = document.createElement('div');
	line.className = 'letter-lines';
	letter.appendChild(line);


	theme.onclick = function() {
		lettersDiv.style.display = 'none';
		cross.style.display = 'block';
		article.style.display = 'block';
		article.getElementsByTagName('h3')[0].innerHTML = theme.innerHTML;
		article.getElementsByTagName('p')[0].innerHTML = contents[theme.innerHTML];
		unreadOval.style.display = 'none';
		theme.className = 'theme';
		author.className = 'author';
	}

	lettersDiv.insertBefore(letter, lettersDiv.firstElementChild);

}


var sum = 0;

for (var i = 1; i < 300; i++) {
	sum += 10 * getRandomInt(1, 60000)
	setTimeout(newLetter, sum);
}


