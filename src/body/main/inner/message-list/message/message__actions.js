
function checkAll(toolbarCheckbox) {
    let checkboxes = document.querySelectorAll('.checkbox');
    for (let i = 1; i < checkboxes.length; i++) {
        checkboxes[i].checked = toolbarCheckbox.checked;
    }
}

async function newMail() {
    let mailList = document.getElementById("messages");
    let mail = document.createElement("section");
    mail.appendChild(await composeMail());
    mailList.insertBefore(mail, mailList.firstChild);
    setTimeout(() => {
        mail.querySelector(".message_not-read")
            .classList.add("message_show");
    }, 20);
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
    setTimeout(newMail, randomTimer);
    setTimeout(randomMailIncoming, 300000 - randomTimer);
}

randomMailIncoming();

let text = 'no text';
let author = 'no author';

function formCroissant() {
    author = 'История круассана';
    text = `<img alt="Свежий круассан" class="message__image" src="body/main/inner/message-list/message/message__image.png" width="180">\n
        Мучные изделия в форме полумесяцев выпекались в Австрии по меньшей мере с XIII века. Но началом
        нынешней популярности круассанов можно считать 1839 год, когда австрийский артиллерийский офицер
        Август Цанг открыл в Париже «Венскую пекарню», где пекли такие булочки.
        <p>Существует легенда, что в 1683 году венский пекарь Петер Вендлер впервые сделал булочку в
        честьнеуспеха турецкой осады Вены. Османское войско осадило Вену; пекари, работавшие по ночам и
        готовившие для горожан свежие булочки к утру, услышали шум от мотыг и кирок, — поняли, что
        турки делают подкоп под стенами города. Вовремя предупредив об этом солдат, они сорвали план врага.
        <p>По другой версии, спустя некоторое время после осады, шляхтичем Юрием Кульчицким в Вене была
        открыта первая знаменитая кофейня, в которой подавали круассаны в форме османского полумесяца и
        ароматный кофе по-восточному. Считается, что с тех пор эти необычные булочки стали очень
        популярны среди покупателей.
        <p>В 1770 году круассан впервые появился во Франции. Это случилось благодаря приезду из Вены
        Марии-Антуанетты и появлению вместе с ней в Париже «венской выпечки». Но венский и французский
        круассаны — это всё же два разных изделия. Ведь из Вены — только форма изделия, а изготовили
        его впервые из слоёного теста с маслом именно французские повара, и это случилось в начале XX
        века.
        В скором времени появилось целое «семейство» подобных дрожжевых и слоеных булочек, например,
        улитка с изюмом, слойка с яблочным пюре, слойка с шоколадом и т. д. В 2013 году
        антиправительственные повстанцы в Сирии запретили круассаны на контролируемой ими территории
        в Алеппо, объясняя свой запрет вышеупомянутой австрийской легендой`;
    let checkbox = document.querySelector("#message-list__cutter");
    changeMessagePage();
    checkbox.checked = true;
}

function formMessagePage(parent) {
    text = parent.querySelector('.message__subject').textContent;
    author = parent.parentElement.querySelector('.message__contact').textContent;
    let checkbox = document.querySelector("#message-list__cutter");
    changeMessagePage();
    checkbox.checked = true;
}

function changeMessagePage() {
        document.querySelector('.message__page').remove();
        let content = document.querySelector('.message__content');
        let page = document.createElement("div");
        page.classList.add("message__page");
        let page__author = document.createElement("p");
        page__author.textContent = 'От кого: ' + author;
        let page__text = document.createElement("p");
        page__text.innerHTML = text;
        page.innerHTML = page__author.outerHTML + page__text.outerHTML;
        content.appendChild(page);

}