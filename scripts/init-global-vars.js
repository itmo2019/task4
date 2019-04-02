var titlesTemplate = ["hello dudes!", "привет", "отчисления и переводы", "очень не интересный заголовок",
    "очень интеллектуальная генерация", "добрый день!", "Здравствуйте!", "Приветсвтую!", "Добрый вечер!", "HOLA!!!"];
var fromTemplate = ["Яндекс", "Яндекс.Почта", "Яндекс.Карты", "Яндекс.Музыка", "Яндекс.Поиск", "Яндекс.Переводчик",
    "Яндекс.Маркет", "Яндекс.Видео", "Нет заголовка", "Есть заголовок"];

var innerTemplate = ["В это воскресенье 24 марта в университете будет проходить ИОИП  —  олимпиада для школьников. " +
"Нам очень нужна помощь волонтеров." +
"Школьников нужно будет встретить утром в холле, развести их по аудиториям, включить компьютеры, раздать условия, " +
"посмотреть за соблюдением ими правил в течение олимпиады. По времени это займёт около 6 часов (с 10.00 до 16.00). ",
    "Это ваша последняя попытка сдать экзамен/зачет. Как вы знаете, неудачная повторная аттестация приведет к вашей " +
    "академической неуспеваемости, по причине которой вы можете быть отчислены. Если вы уже получили зачет по " +
    "дисциплине, попробуйте добиться, чтобы оценка появилась в системе. Если у вас все хорошо и все стоит в системе," +
    " то на пересдачу вы можете не приходить. Если у вас нет оценки в системе и вы уверены, что сдали, накануне дня" +
    " пересдачи с комиссией напишите ответ на это письмо с информацией о том, когда сдали." +
    "" +
    "Пересдача проходит в формате экзамена/зачета. Требования для получения зачета или оценки E не " +
    "отличаются от того," +
    " что было на предыдущих пересдачах. Если по предмету есть домашние задания, а вы их до сих пор не сделали, " +
    "то вы должны их сделать к комиссии. Если вы их до комиссии не сделали, то вы плохо работали целый семестр и не" +
    " нагнали все за то время, что мы вам позволили, вы не учились, значит вас надо отчислить. " +
    "Если вам надо переписать" +
    " контрольные, то вы их переписываете на комиссии, если преподаватель позволяет переписывать. " +
    "", "Привет, 3 курс." +
    "" +
    "Начиная со следующей недели пары по фронтенду будут проходить по субботам с 10.00 до 13.10 в аудитории 302." +
    "" +
    "На этой неделе (т.е. завтра) пары будут проходить с 13.30 в аудитории 285.",
    "Присылаю список задач." +
    "" +
    "1) Расставьте скобки:" +
    "" +
    "λf.λx.f x a (λc.g f) x a λb.λa.x" +
    "" +
    "2) Проведите бета-редукции и приведите выражения к нормальной форме:" +
    "" +
    "(λf.λx.f (f x)) (λf.λx.f (f x))" +
    "" +
    "(λa.λb.b) ((λх.х х) (λх.х х х))" +
    "" +
    "3) Выразите следующие функции в лямбда-исчислении:"];

var deleteButton = document.getElementById("delete-selected-button");
var markeButton = document.getElementById("marked-selected-button");
var selectAllMails = document.getElementById("select-all-mails");
var createNewLetter = document.getElementById("new-letter-button");
var mailsPlaceholder = document.getElementById("mails-placeholder");
var mailInnerPalceholder = document.getElementById("preview-placeholder");
var closeButtonInnerMail = document.getElementById("placeholder-for-close-button");

var countLetter = 1;

var letterStorage = [];

function findMail(element) {
    let tmp = element;
    while (tmp !== null) {
        let classes = tmp.classList;
        if (classes.contains('mail') && tmp.getAttribute('id') !== null) {
            return tmp;
        }
        tmp = tmp.parentNode;
    }
    return null;
}


function getExistMailCount() {
    return mailsPlaceholder.getElementsByClassName("mail").length;
}

function insertInPlaceholder(mail, mailCount) {
    if (mailCount === 0) {
        mailsPlaceholder.appendChild(mail);
        mail.offsetHeight;
        mail.classList.add("create-animation");
    } else {
        let before = mailsPlaceholder.getElementsByClassName("mail")[0];
        mailsPlaceholder.insertBefore(mail, before);
        mail.offsetHeight;
        mail.classList.add("create-animation");
    }
}

function getRandomValue(left, right) {
    let random = Math.random();
    let dist = right - left + 1;
    let mapping = random * dist;
    return Math.floor(mapping + left);
}
