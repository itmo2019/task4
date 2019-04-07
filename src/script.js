const maxLetterCount = 10;
const inboxLetters = document.createElement('div');
const textLetters = document.createElement('div');

function setInboxLetters() {
    let newLetter = document.createElement('li');
    const template1 = "<label>\n" +
        "                    <input type=\"checkbox\" class=\"mail-box__white-square\">\n" +
        "                </label>\n" +
        "                <img src=\"images/";
    const template2 = "class=\"letter__sender-avatar\">\n" +
        "                <a href=\"#mail-box__show-inbox-letter\" class=\"letter__open-article\">\n" +
        "                    <div class=\"letter__info letter__sender-name letter_unreaded\">";
    const template3 = "</div>\n" +
        "                </a>\n" +
        "                <div class=\"letter_unreaded-circle\"></div>\n" +
        "                <a href=\"#mail-box__show-inbox-letter\" class=\"letter__open-article\">\n" +
        "                    <div class=\"letter__info letter__mail-text letter_unreaded\">";
    const template4 = "</div>\n" +
        "                    <div class=\"letter__info letter__date\">1 апр</div>\n" +
        "                </a>\n" +
        "                <div class=\"mail-box__line\"></div>";
    newLetter.classList.add("letter");
    newLetter.innerHTML = template1 + "saburov.jpg\"" + template2 + "Александр Сабуров" + template3 + "Тело изолировано" + template4;
    inboxLetters.appendChild(newLetter);
    newLetter = document.createElement('li');
    newLetter.classList.add("letter");
    newLetter.innerHTML = template1 + "kain.jpg\"" + template2 + "Георгий Каин" + template3 + "Тревожная весть" + template4;
    inboxLetters.appendChild(newLetter);
    newLetter = document.createElement('li');
    newLetter.classList.add("letter");
    newLetter.innerHTML = template1 + "vlad.jpg\"" + template2 + "Влад Ольгимский" + template3 + "Отчёт о санитарных мерах" + template4;
    inboxLetters.appendChild(newLetter);
    newLetter = document.createElement('li');
    newLetter.classList.add("letter");
    newLetter.innerHTML = template1 + "anna.jpg\"" + template2 + "Анна Ангел" + template3 + "Приглашение" + template4;
    inboxLetters.appendChild(newLetter);
    newLetter = document.createElement('li');
    newLetter.classList.add("letter");
    newLetter.innerHTML = template1 + "inkv.jpg\"" + template2 + "Аглая Лилич" + template3 + "Приказ Инквизитора" + template4;
    inboxLetters.appendChild(newLetter);
    newLetter = document.createElement('li');
    newLetter.classList.add("letter");
    newLetter.innerHTML = template1 + "vladyoung.jpg\"" + template2 + "Влад Ольгимский-младший" + template3 + "Чрезвычайное известие" + template4;
    inboxLetters.appendChild(newLetter);
    newLetter = document.createElement('li');
    newLetter.classList.add("letter");
    newLetter.innerHTML = template1 + "yulia.jpg\"" + template2 + "Юлия Люричева" + template3 + "Записка" + template4;
    inboxLetters.appendChild(newLetter);
    newLetter = document.createElement('li');
    newLetter.classList.add("letter");
    newLetter.innerHTML = template1 + "burah.jpg\"" + template2 + "Артемий Бурах" + template3 + "Предупреждение Гаруспика" + template4;
    inboxLetters.appendChild(newLetter);
    newLetter = document.createElement('li');
    newLetter.classList.add("letter");
    newLetter.innerHTML = template1 + "vlasti.jpg\"" + template2 + "Власти" + template3 + "Письмо властей" + template4;
    inboxLetters.appendChild(newLetter);
    newLetter = document.createElement('li');
    newLetter.classList.add("letter");
    newLetter.innerHTML = template1 + "ispolnitel.jpg\"" + template2 + "Исполнители" + template3 + "Письмо создателей" + template4;
    inboxLetters.appendChild(newLetter);
    newLetter = document.createElement('li');
    newLetter.classList.add("letter");
    newLetter.innerHTML = template1 + "avapic.png\"" + template2 + "Дмитрий Ионов" + template3 + "Моё эссе из ДЗ 1" + template4;
    inboxLetters.appendChild(newLetter);
    let textLetter = document.createElement('div');
    textLetter.classList.add("inbox-letter");
    textLetter.innerHTML = "<a href=\"#hide\">" +
        "                <img onclick=\"deleteAnimation()\" src=\"images/cancel.png\" class=\"inbox-letter-close\"" +
        "                     alt=\"art-close\">" +
        "            </a>" +
        "            <p class=\"inbox-letter-text\">" +
        "                Бакалавр, насколько я знаю, тело изолировано. С ним работает Рубин." +
        "            </p>" +
        "            <p class=\"inbox-letter-text\">" +
        "                Тем не менее, в свете вашего открытия, я прошу Вас придти ко мне в \"Стержень\" завтра, после рассвета. " +
        "Нам нажно обсудить дело чрезвычайной важности." +
        "            </p>" +
        "            <p class=\"inbox-letter-text\">" +
        "                Александр Сабуров" +
        "            </p>";
    textLetters.appendChild(textLetter);
    textLetter = document.createElement('div');
    textLetter.classList.add("inbox-letter");
    textLetter.innerHTML = "<a href=\"#hide\">" +
        "                <img onclick=\"deleteAnimation()\" src=\"images/cancel.png\" class=\"inbox-letter-close\"" +
        "                     alt=\"art-close\">" +
        "            </a>" +
        "            <p class=\"inbox-letter-text\">" +
        "                Прошу вас посетить \"Горны\" при первой возможности." +
        "            </p>" +
        "            <p class=\"inbox-letter-text\">" +
        "                У нас случилось новое несчастье - и оно вновь касается того, ради кого Вы проделали столь долгий путь." +
        "            </p>" +
        "            <p class=\"inbox-letter-text\">" +
        "                Утешаю себя надеждой, что наше горе Вам все еще небезразлично." +
        "            </p>" +
        "            <p class=\"inbox-letter-text\">" +
        "                Каин." +
        "            </p>";
    textLetters.appendChild(textLetter);
    textLetter = document.createElement('div');
    textLetter.classList.add("inbox-letter");
    textLetter.innerHTML = "<a href=\"#hide\">" +
        "                <img onclick=\"deleteAnimation()\" src=\"images/cancel.png\" class=\"inbox-letter-close\"" +
        "                     alt=\"art-close\">" +
        "            </a>" +
        "            <p class=\"inbox-letter-text\">" +
        "                Доктор, сегодня мы сможем предоставить в ваше распоряжение помещения под изолятор, госпиталь и " +
        "покойницкую. Приглашаю вас в \"Сгусток\", обсудить детали." +
        "            </p>" +
        "            <p class=\"inbox-letter-text\">" +
        "                Большой Влад." +
        "            </p>";
    textLetters.appendChild(textLetter);
    textLetter = document.createElement('div');
    textLetter.classList.add("inbox-letter");
    textLetter.innerHTML = "<a href=\"#hide\">" +
        "                <img onclick=\"deleteAnimation()\" src=\"images/cancel.png\" class=\"inbox-letter-close\"" +
        "                     alt=\"art-close\">" +
        "            </a>" +
        "            <p class=\"inbox-letter-text\">" +
        "                Бакалавр!." +
        "            </p>" +
        "            <p class=\"inbox-letter-text\">" +
        "                В связи с вчеращними ужасами. У меня появилась одна блистательная идея. Дело ничтожнейшее и хлопот" +
        "не представляет - ну решительно никаких, нисколечко - а мы с вами станем владельцами огромного состояния!" +
        "            </p>" +
        "            <p class=\"inbox-letter-text\">" +
        "                Так приходите же скорее в \"Вербы\"!" +
        "            </p>" +
        "            <p class=\"inbox-letter-text\">" +
        "                P.S. Никому не говорите об этом письме." +
        "            </p>" +
        "            <p class=\"inbox-letter-text\">" +
        "                P.P.S. Никогда не говорите о наших тайных делах." +
        "            </p>" +
        "            <p class=\"inbox-letter-text\">" +
        "                P.P.P.S. Храните строжайщее инкогнито." +
        "            </p>" +
        "            <p class=\"inbox-letter-text\">" +
        "                Почтительно." +
        "            </p>" +
        "            <p class=\"inbox-letter-text\">" +
        "                А.А.А." +
        "            </p>";
    textLetters.appendChild(textLetter);
    textLetter = document.createElement('div');
    textLetter.classList.add("inbox-letter");
    textLetter.innerHTML = "<a href=\"#hide\">" +
        "                <img onclick=\"deleteAnimation()\" src=\"images/cancel.png\" class=\"inbox-letter-close\"" +
        "                     alt=\"art-close\">" +
        "            </a>" +
        "            <p class=\"inbox-letter-text\">" +
        "                Бакалавру Д.Данковскому, лично в руки - получение подтвердить." +
        "            </p>" +
        "            <p class=\"inbox-letter-text\">" +
        "                Ознакомилась с вашими материалами. Настоятельно рекомендую явиться для объяснительной беседы. " +
        "Вы найдёте меня в городском Соборе." +
        "            </p>" +
        "            <p class=\"inbox-letter-text\">" +
        "                С уважением," +
        "                Аглая Лилич," +
        "                правительственный инквизитор" +
        "            </p>";
    textLetters.appendChild(textLetter);
    textLetter = document.createElement('div');
    textLetter.classList.add("inbox-letter");
    textLetter.innerHTML = "<a href=\"#hide\">" +
        "                <img onclick=\"deleteAnimation()\" src=\"images/cancel.png\" class=\"inbox-letter-close\"" +
        "                     alt=\"art-close\">" +
        "            </a>" +
        "            <p class=\"inbox-letter-text\">" +
        "                Бакалавр, известие чрезвычайной важности и срочности." +
        "            </p>" +
        "            <p class=\"inbox-letter-text\">" +
        "                Исключительная дрянь течет из Термитника. Под угрозой ваше доброе имя и даже профессиональная честь. Поскольку вы, " +
        "как и я помню, планировали посетить этот дом скорби... соблаговолите зайти ко мне для важного разговора." +
        "            </p>" +
        "            <p class=\"inbox-letter-text\">" +
        "                Со всем возможным почтением," +
        "                Влад Ольгимский-младший," +
        "            </p>";
    textLetters.appendChild(textLetter);
    textLetter = document.createElement('div');
    textLetter.classList.add("inbox-letter");
    textLetter.innerHTML = "<a href=\"#hide\">" +
        "                <img onclick=\"deleteAnimation()\" src=\"images/cancel.png\" class=\"inbox-letter-close\"" +
        "                     alt=\"art-close\">" +
        "            </a>" +
        "            <p class=\"inbox-letter-text\">" +
        "                Бакалавр, приглашаю вас в \"Невод\". У вас тут должен быть свой интерес, так как это прямо касается вчерашнего. " +
        "Лучше не медлить, время дорого. В этой игре ещё три участника, нас могут предупредить." +
        "            </p>" +
        "            <p class=\"inbox-letter-text\">" +
        "                Люричева." +
        "            </p>";
    textLetters.appendChild(textLetter);
    textLetter = document.createElement('div');
    textLetter.classList.add("inbox-letter");
    textLetter.innerHTML = "<a href=\"#hide\">" +
        "                <img onclick=\"deleteAnimation()\" src=\"images/cancel.png\" class=\"inbox-letter-close\"" +
        "                     alt=\"art-close\">" +
        "            </a>" +
        "            <p class=\"inbox-letter-text\">" +
        "                У меня есть для вас новости, ойнон." +
        "                Я нашёл то, что вы искали позавчера." +
        "                Не спешите принимать важные решения, пока не поговорите со мной." +
        "            </p>" +
        "            <p class=\"inbox-letter-text\">" +
        "                Я жду вас на заводах, в подвалах под Тучным цехом." +
        "            </p>" +
        "            <p class=\"inbox-letter-text\">" +
        "                Артемий Бурах." +
        "            </p>";
    textLetters.appendChild(textLetter);
    textLetter = document.createElement('div');
    textLetter.classList.add("inbox-letter");
    textLetter.innerHTML = "<a href=\"#hide\">" +
        "                <img onclick=\"deleteAnimation()\" src=\"images/cancel.png\" class=\"inbox-letter-close\"" +
        "                     alt=\"art-close\">" +
        "            </a>" +
        "            <p class=\"inbox-letter-text\">" +
        "                Бакалавр!" +
        "            </p>" +
        "            <p class=\"inbox-letter-text\">" +
        "                Мы решили тебе написать потому что ты ничего не слушаешь! Ты совсем отбился от рук!" +
        "            </p>" +
        "            <p class=\"inbox-letter-text\">" +
        "                В последнее время ты делаешь всё по своему. Так невозможно. Ты портишь игру." +
        "            </p>" +
        "            <p class=\"inbox-letter-text\">" +
        "                Если это письмо дойдёт до тебя, приходи в Многогранник. Тебя пропустят. Спустишься до самого низа, зажмурься" +
        "и скажи: \"Три, четыре, пять\", потом открой глаза." +
        "            </p>" +
        "            <p class=\"inbox-letter-text\">" +
        "                Мы хотим тебе кое-что сказать." +
        "            </p>" +
        "            <p class=\"inbox-letter-text\">" +
        "                Твои хозяева." +
        "            </p>";
    textLetters.appendChild(textLetter);
    textLetter = document.createElement('div');
    textLetter.classList.add("inbox-letter");
    textLetter.innerHTML = "<a href=\"#hide\">" +
        "                <img onclick=\"deleteAnimation()\" src=\"images/cancel.png\" class=\"inbox-letter-close\"" +
        "                     alt=\"art-close\">" +
        "            </a>" +
        "            <p class=\"inbox-letter-text\">" +
        "                Если найдёте время - приходите в театр." +
        "            </p>" +
        "            <p class=\"inbox-letter-text\">" +
        "                Предстоит не особо важный, но серьёзный разговор." +
        "            </p>" +
        "            <p class=\"inbox-letter-text\">" +
        "                Заранее просим прощения за неудобную форму." +
        "            </p>" +
        "            <p class=\"inbox-letter-text\">" +
        "                Исполнители." +
        "            </p>";
    textLetters.appendChild(textLetter);
    textLetter = document.createElement('div');
    textLetter.classList.add("inbox-letter");
    textLetter.innerHTML = "<a href=\"#hide\">\n" +
        "                    <img onclick=\"deleteAnimation()\" src=\"images/cancel.png\" class=\"inbox-letter-close\"\n" +
        "                         alt=\"art-close\">\n" +
        "                </a>\n" +
        "                <ul>\n" +
        "                    <li><p class=\"my-article__text\">Фронтендом я интересовался еще в школе. В 9\n" +
        "                        классе на уроках информатики одним из заданий было написание собственного сайта.\n" +
        "                        К сожалению те файлы не сохранились, но тогда ничего сложного я не писал, просто несколько html\n" +
        "                        страничек,\n" +
        "                        связанных между собой ссылками,\n" +
        "                        никакого css там не использовалось. Однако после этого мне стало интересно, как сайты работают\n" +
        "                        изнутри.\n" +
        "                        Это и было одной из причин, по которой я выбрал изучать курс фронтенда.\n" +
        "                    </p></li>\n" +
        "                    <img src=\"images/cat.jpeg\" class=\"my-article__cat-picture\" alt=\"cat\">\n" +
        "                    <li><p class=\"my-article__text\">\n" +
        "                        Другой причиной является то, что этот курс является практическим, то есть тут\n" +
        "                        можно\n" +
        "                        получить много\n" +
        "                        навыков, которые затем можно использовать.\n" +
        "                        Это мне нравится куда больше, чем учить большое количество теории, без возможности применить её\n" +
        "                        на\n" +
        "                        практике.\n" +
        "                        К тому же практические знания редко бывают лишними, ведь никогда не знаешь когда они могут\n" +
        "                        пригодится\n" +
        "                    </p></li>\n" +
        "                    <li><p class=\"my-article__text\">\n" +
        "                        Прежде всего я надеюсь, что к концу курса научусь писать сайты так, <b>чтобы на них можно было\n" +
        "                        нормально\n" +
        "                        смотреть</b>. То есть хочется научиться\n" +
        "                        использовать возможности <i>html</i> и <em>css</em> для создания приятного для глаз дизайна.\n" +
        "                        Также\n" +
        "                        интересно\n" +
        "                        узнать, чем отличается работа веб-программистов\n" +
        "                        от обычных программистов. Возможно веб-программирование понравится мне даже больше, чем обычные\n" +
        "                        языки\n" +
        "                        программирования.\n" +
        "                    </p></li>\n" +
        "                </ul>";
    textLetters.appendChild(textLetter);
}

function showLetter(num) {
    const showWindow = document.querySelector(".mail-box__show-letter");
    const textArray = Array.from(textLetters.children);
    const newLetterText = textArray[num].cloneNode(true);
    showWindow.innerHTML = newLetterText.outerHTML;
}

function checkAll() {
    const letters = document.querySelector(".mail-box__letters");
    const lettersArray = Array.from(letters.children);
    const mainCheck = document.querySelector(".mail-box__main-white-square");
    let count = lettersArray.length;
    if (count > maxLetterCount) {
        count = maxLetterCount;
    }
    for (let i = 0; i < count; i++) {
        lettersArray[i].querySelector(".mail-box__white-square").checked = mainCheck.checked;
    }
}

function firstAdd() {
    const listLettersArray = Array.from(inboxLetters.children);
    let newLetter = listLettersArray[10].cloneNode(true);
    newLetter.classList.remove("added-animated-letter");
    newLetter.addEventListener("click", function () {
        showLetter(10);
    });
    const letters = document.querySelector(".mail-box__letters");
    letters.appendChild(newLetter);
    newLetter = listLettersArray[0].cloneNode(true);
    newLetter.classList.remove("added-animated-letter");
    newLetter.addEventListener("click", function () {
        showLetter(0);
    });
    const lettersArray = Array.from(letters.children);
    letters.insertBefore(newLetter, lettersArray[0]);
}

function addLetter() {
    const randomNum = Math.floor(Math.random() * 11);
    const listLettersArray = Array.from(inboxLetters.children);
    const newLetter = listLettersArray[randomNum].cloneNode(true);
    newLetter.addEventListener("click", function () {
        showLetter(randomNum);
    });
    const letters = document.querySelector(".mail-box__letters");
    const lettersArray = Array.from(letters.children);
    letters.insertBefore(newLetter, lettersArray[0]);
    newLetter.classList.add("added-animated-letter");
    newLetter.offsetHeight;
    newLetter.classList.add("added-animated-letter_visible");
    if (lettersArray.length > maxLetterCount - 1) {
        lettersArray[maxLetterCount - 1].classList.add("hidden-letter");
    }
}

function deleteLetter() {
    const letters = document.querySelector(".mail-box__letters");
    const lettersArray = Array.from(letters.children);
    for (let i = 0; i < lettersArray.length; i++) {
        if (lettersArray[i].querySelector(".mail-box__white-square").checked) {
            if (lettersArray[i].classList.contains("added-animated-letter")) {
                lettersArray[i].classList.remove("added-animated-letter");
            }
            lettersArray[i].classList.add("deleted-animated-letter");
            let delIndex = i;
            setTimeout(function () {
                const size = lettersArray.length;
                letters.removeChild(lettersArray[delIndex]);
                const lettersArrayLocal = Array.from(letters.children);
                if (size > maxLetterCount - 1) {
                    for (let j = 0; j < lettersArrayLocal.length; j++) {
                        if (lettersArrayLocal[j].classList.contains("hidden-letter")) {
                            lettersArrayLocal[j].classList.remove("hidden-letter");
                            if (lettersArrayLocal[j].classList.contains("added-animated-letter")) {
                                lettersArrayLocal[j].classList.remove("added-animated-letter");
                            }
                            break;
                        }
                    }
                }
                document.querySelector(".mail-box__main-white-square").checked = false;
            }, 500);
        }
    }
}

function deleteAnimation() {
    const letters = document.querySelector(".mail-box__letters");
    const lettersArray = Array.from(letters.children);
    for (let i = 0; i < lettersArray.length; i++)
        if (lettersArray[i].classList.contains("added-animated-letter"))
            lettersArray[i].classList.remove("added-animated-letter");
}

let lastLetterTime = 0;

function generateLetters() {
    addLetter();
    const letterTime = Math.max(300000 - lastLetterTime, Math.random() * (600000 - 10) + 10);
    lastLetterTime = letterTime;
    setTimeout(generateLetters, letterTime);
}

function newMail() {
    const letterTime = Math.random() * (600000 - 10) + 10;
    lastLetterTime = 300000;
    setTimeout(generateLetters, letterTime);
}

function initialize() {
    setInboxLetters();
    firstAdd();
    newMail();
}