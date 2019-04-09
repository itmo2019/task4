let letter_num = 6;
let check_name = "check_mark";
let mail_name = "mail";
let content = "content";
let hide_name = "hide";
let logo_name = "logo";
let date_name = "date";
let len_of_alphabet = 26;
const month_names = ["янв", "фев", "мар", "апр", "май", "июн", "июл", "авг", "сен", "окт", "ноя", "дек"];
const letters = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
const us_letters = "abcdefghijklmnopqrstuvwxyz";
const symbols = "0123456789.,";

let chosen_for_del = new Set();

for (let i = 1; i < letter_num; i++) {
    add_remove_animation(i);
}

run_letter_timer();

function add_remove_animation(i) {
    let element = document.getElementById(check_name + i).onclick = function () {
        if (chosen_for_del.has(i)) {
            chosen_for_del.delete(i);
            this.style.background = "#ffffff";
        } else {
            chosen_for_del.add(i);
            this.style.background = "#666666";
        }
    };
}

function get_hole_positive_num() {
    let rand = Math.random() * 10000000;
    if (rand < 0)
        rand *= -1;
    return Math.floor(rand);
}

function random_string(min_len, max_len) {
    let len = get_hole_positive_num() % (max_len - min_len) + min_len;
    let res_string = letters.charAt(get_hole_positive_num() % len_of_alphabet);
    for (let i = 1; i < len; i++) {
        let lett = us_letters.charAt(get_hole_positive_num() % len_of_alphabet);
        if (get_hole_positive_num() % 5 == 0)
            lett = letters.charAt(get_hole_positive_num() % len_of_alphabet);
        if (get_hole_positive_num() % 10 == 0)
            lett = symbols;
        res_string += lett;
    }
    return res_string;
}

function random_date() {
    let month = get_hole_positive_num() % 12;
    if ((month < 6 && (month % 2) == 0) || (month >= 6 && (month % 2) == 1)) {
        return (get_hole_positive_num() % 31 + 1) + " " + month_names[month];
    }
    if (month == 1) {
        return (get_hole_positive_num() % 29 + 1) + " " + month_names[month];
    }
    return (get_hole_positive_num() % 30 + 1) + " " + month_names[month];
}

function add_new_letter() {
    var new_letter = document.createElement("div");
    new_letter.classList.add(mail_name);
    new_letter.classList.add(hide_name);
    new_letter.setAttribute("id", content + letter_num);
    var check_mark = document.createElement("div");
    check_mark.setAttribute("id", check_name + letter_num);
    check_mark.className = check_name;
    new_letter.appendChild(check_mark);

    var sender = document.createElement("div");
    sender.className = "from from_unread";
    sender.innerText = random_string(3, 40);
    var logo = document.createElement("div");
    logo.className = logo_name;
    logo.innerText = sender.textContent[0];
    new_letter.appendChild(logo);
    new_letter.appendChild(sender);

    var read_mark = document.createElement("div");
    read_mark.className = "unread_mark";
    new_letter.appendChild(read_mark);

    var date = document.createElement("div");
    date.className = date_name;
    date.innerText = random_date();
    new_letter.appendChild(date);

    var letter_text = document.createElement("div");
    letter_text.className = "message message_unread";
    letter_text.innerText = random_string(2, 100);
    new_letter.appendChild(letter_text);

    let element = document.getElementById("mails");
    element.insertBefore(new_letter, element.firstChild);
    let added_letter = document.getElementById(content + letter_num);
    added_letter.classList.remove(hide_name);
    add_remove_animation(letter_num);
    letter_num++;
    run_letter_timer();
}

function run_letter_timer () {
    let letter_timer = get_hole_positive_num();
    letter_timer %= 5000;
    letter_timer += 5000;
    setTimeout(add_new_letter, letter_timer);
}

function delete_mail (i) {
    document.getElementById(content + i).classList.add("hide");
    setTimeout(function (){
        document.getElementById(content + i).remove()
    }, 900);
}

let remove = document.getElementById("remove").onclick = function () {
    if (chosen_for_del.size > 0) {
        chosen_for_del.forEach(mail_num => delete_mail(mail_num));
        chosen_for_del.clear();
    }
}

let create = document.getElementById("create").onclick = function () {
    document.getElementById(content + 5).classList.remove("hide");
    document.getElementById("create").remove();
}