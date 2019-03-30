function checkAll(toolbarCheckbox) {
    let checkboxes = document.querySelectorAll('.checkbox');
    for (let i = 1; i < checkboxes.length; i++) {
        checkboxes[i].checked = toolbarCheckbox.checked;
    }
}

function newMailIncoming() {
    let mails = document.getElementById("messages");
    let mail = document.createElement("section");
    mail.innerHTML = composer();
    mails.insertBefore(mail, mails.firstChild);
    let GC = document.getElementById("message__id");
    setTimeout(() => {
        GC.classList.add("message_show")
    }, 20);
    setTimeout(() => {
        GC.removeAttribute('id');
    }, 500);
}

function deleteMail() {
    let checkboxes = document.querySelectorAll('.checkbox');
    for (let i = 1; i < checkboxes.length; i++) {
        if ((checkboxes[i].checked === true) && (i < 30)) {
            let container = checkboxes[i].parentElement.parentElement;
            container.classList.remove("message_show");
            setTimeout(() => {
                container.parentElement.remove();
            }, 500);
        }
    }
    checkboxes[0].checked = false;
    checkAll(checkboxes[0]);
}

function randomMailIncoming() {
    let randomTimer = Math.random() * (300000 - 10) + 10;
    setTimeout(newMailIncoming, randomTimer);
    setTimeout(randomMailIncoming, 300000 - randomTimer);
}

randomMailIncoming();

let text = 'no text';
let author = 'no author';

function formCroissant() {
    author = 'История круассана'
    text = '<img alt="Свежий круассан" class="message__image" src="body/main/inner/message-list/message/message__image.png" width="180">\n' +
        'Мучные изделия в форме полумесяцев выпекались в Австрии по меньшей мере с XIII века. Но началом\n' +
        'нынешней популярности круассанов можно считать 1839 год, когда австрийский артиллерийский офицер\n' +
        'Август Цанг открыл в Париже «Венскую пекарню», где пекли такие булочки.\n' +
        '<p>Существует легенда, что в 1683 году венский пекарь Петер Вендлер впервые сделал булочку в\n' +
        'честь\n' +
        'неуспеха турецкой осады Вены. Османское войско осадило Вену; пекари, работавшие по ночам и\n' +
        'готовившие для горожан свежие булочки к утру, услышали шум от мотыг и кирок, — поняли, что\n' +
        'турки\n' +
        'делают подкоп под стенами города. Вовремя предупредив об этом солдат, они сорвали план\n' +
        'врага.\n' +
        '<p>По другой версии, спустя некоторое время после осады, шляхтичем Юрием Кульчицким в Вене была\n' +
        'открыта первая знаменитая кофейня, в которой подавали круассаны в форме османского\n' +
        'полумесяца и\n' +
        'ароматный кофе по-восточному. Считается, что с тех пор эти необычные булочки стали очень\n' +
        'популярны среди покупателей.\n' +
        '<p>В 1770 году круассан впервые появился во Франции. Это случилось благодаря приезду из Вены\n' +
        'Марии-Антуанетты и появлению вместе с ней в Париже «венской выпечки». Но венский и\n' +
        'французский\n' +
        'круассаны — это всё же два разных изделия. Ведь из Вены — только форма изделия, а изготовили\n' +
        'его\n' +
        'впервые из слоёного теста с маслом именно французские повара, и это случилось в начале XX\n' +
        'века.\n' +
        'В скором времени появилось целое «семейство» подобных дрожжевых и слоеных булочек, например,\n' +
        'улитка с изюмом, слойка с яблочным пюре, слойка с шоколадом и т. д. В 2013 году\n' +
        'антиправительственные повстанцы в Сирии запретили круассаны на контролируемой ими территории\n' +
        'в\n' +
        'Алеппо, объясняя свой запрет вышеупомянутой австрийской легендой'
}

function formMessagePage(parent) {
    text = parent.getElementsByClassName("message__subject").item(0).textContent;
    author = parent.parentElement.getElementsByClassName("message__contact").item(0).textContent;
}

function changeMessagePage(checkbox) {
    if (checkbox.checked == true) {
        let content = document.getElementsByClassName("message__content").item(0);
        content.getElementsByClassName("message__page").item(0).remove();
        let page = document.createElement("div");
        page.className = "message__page";
        page.innerHTML = '<p>От кого: ' + author + '</p>\n' + '<p>' + text + '</p>';
        content.appendChild(page);
    }
}