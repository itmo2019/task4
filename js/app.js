var mails = [
    new Mail("assets/spam.png", "Неспамнеспамнеспамнеспам", "Легкий способ зарабатывать 10000000000 в секунду, нужно всего-лишь...", "Jan 1", "[Читать продолжение в источнике]"),
    new Mail("assets/cat-face.png", "Кот", "Старое сообщение", "Feb 23", "Какое-то старое сообщение", true),
    new Mail("assets/owl-face.jpg", "Сова", "От совы", "Mar 9", `<h1>Как падают кошки</h1>
                                                                    <article>
                                                                        <section>
                                                                            Большинство представителей семейства кошачьих имеет склонность к обзору местности с высоты. Крупные лесные кошки-рыси вообше значительную часть времени проводят на деревьях, находясь в засаде или погоне за добычей. А львы и леопарды в саваннах Африки приспособились в жаркое время отдыхать на деревьях, распластавшись на ветках и опустив вниз лапы. Случается, однако, что кошки не удерживаются на высоте и падают. Но и в падении у них есть свои особенности. Многим приходилось наблюдать, как падает обыкновенная кошка, сорвавшись с карниза дома, с дерева или с забора. Сначала она падает к земле головой, спиной или боком, но затем, сделав резкий поворот в воздухе, вывертывается и становится на лапки. И так всегда. Как бы ни падала кошка, приземляется она всегда на лапки и тотчас же может бежать дальше. Такое мгновенное выравнивание положения тела у кошек обеспечивается действием ее вестибулярного аппарата.
                                                                        </section>
                                                                        <img class="article__sova" src="assets/sova.png" height="300" class="sova"></img>
                                                                        <section>
                                                                            При падении кошки вестибулярный аппарат помогает ей осуществить ряд последовательно возникающих рефлексов и приземлиться на лапы. Ненормальное положение тела в пространстве приводит в раздражение отолитовый прибор каналов внутреннего уха кошки. В ответ на это раздражение происходит рефлекторное сокращение мускулов шеи, приводящих голову животного в нормальное положение по отношению к горизонту. Это - первый рефлекс. Сокращение же шейных мышц и постановка шеи при повороте головы являются возбудителем для осуществления другого рефлекса - сокращения определенных мышц туловища и конечностей. В итоге животное принимает правильное положение.
                                                                        </section>
                                                                        <section>
                                                                            Этот сложный врожденный цепной рефлекс выработался у некоторых животных как приспособление к образу жизни. Ведь животным, особенно из семейства кошачьих, часто приходится во время охоты прыгать и падать с деревьев, скал или со спины своей жертвы. И не будь у них этого приспособительного рефлекса, от них не только ушла бы добыча, но иной раз и самому охотнику пришлось бы пострадать от зубов, рогов или копыт своей жертвы.
                                                                        </section>
                                                                        <p>Текст статьи взят с сайта <a href="https://petsi.net/articles/cats/how-cat-comes-down">petsi.net</a></p>
                                                                    </article>`)
];

const maxMails = 30;

window.onload = init;

function init() {
    var mailList = document.getElementsByClassName("mailbox__mail-list")[0];
    mails.forEach(mail => {
        mailList.insertAdjacentHTML("afterBegin", mail.toHTML());
        var mailElement = document.getElementsByClassName("mailbox__mail")[0];
        mailElement.removeAttribute("state");
        mailElement.addEventListener('click', () => setMailContents(mailElement.id));
    })

    setTimeout(autoMails, getRandomInt(10, 600000));
}

function autoMails() {
    var timeout = getRandomInt(300000, 600000);
    newMail();
    setTimeout(autoMails, timeout);
}

function findMailById(id) {
    return mails.filter(mail => mail.id == id)[0];
}

function setMailContents(id) {
    document.getElementsByClassName("mail-contents__html")[0].innerHTML = findMailById(id).text;
}

function inflateMail(id) {
    var mailElement = document.getElementById(id);
    mailElement.setAttribute("state", "showing");
    mailElement.style.display = 'block';
    mailElement.addEventListener('click', () => setMailContents(mailElement.id));
    setTimeout(function() {
        mailElement.removeAttribute("state");
    }, 400);
}

function deflateMail(id) {
    var mail = document.getElementById(id);
    mail.setAttribute("state", "deleted");
    setTimeout(function() {
        mail.style.display = "none";
    }, 400);
}

function newMail() {
    var mailList = document.getElementsByClassName("mailbox__mail-list")[0];
    var mail = generateMail();
    mails.push(mail);
    mailList.insertAdjacentHTML("afterBegin", mail.toHTML());
    inflateMail(mail.id);

    if (mails.length > maxMails) {
        deflateMail(mails[mails.length - maxMails - 1].id);
    }
}

function deleteMail(message) {
    deflateMail(message.id);
    if (mails.length > maxMails) {
        inflateMail(mails[mails.length - maxMails - 1].id);
    }
    mails = mails.filter(mail => mail.id != message.id);
    setTimeout(function() {
        message.remove();
    }, 400);

}

function deleteSelected() {
    var mailList = Array.from(document.getElementsByClassName("mailbox__mail"));
    var checkedMailList = mailList.filter(mail => mail.getElementsByClassName("checkbox__input")[0].checked);
    checkedMailList.forEach(deleteMail);
}