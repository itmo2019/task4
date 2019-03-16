const approx_time = new Date();
const approx_time_iso = approx_time.toISOString();
const approx_time_short = approx_time.toLocaleDateString('ru-RU', {day: 'numeric', month: 'short'});
var messages_count = 4;

function get_date_node() {
  let date = document.createElement("time");
  date.classList.add("inbox__message-date");
  date.setAttribute("datetime", approx_time_iso);
  date.innerText = approx_time_short;

  return date;
}

function get_icon() {
  let icon = document.createElement("img");
  icon.classList.add("inbox__message-icon");
  icon.setAttribute("src", "img/ya-default.svg");

  return icon
}

function get_checkbox(id) {
  let message_checkbox = document.createElement("div");
  message_checkbox.classList.add("inbox__message-checkbox");

  let checkbox_id = "checkbox_" + id.toString();

  let message_checkbox_input = document.createElement("input");
  message_checkbox_input.classList.add("checkbox");
  message_checkbox_input.setAttribute("type", "checkbox");
  message_checkbox_input.id = checkbox_id;

  let message_checkbox_label = document.createElement("label");
  message_checkbox_label.classList.add("checkbox__label");
  message_checkbox_label.setAttribute("for", checkbox_id);

  message_checkbox.appendChild(message_checkbox_input);
  message_checkbox.appendChild(message_checkbox_label);

  return message_checkbox
}

function get_author() {
  let body = document.createElement("span");
  body.classList.add("inbox__message-author");
  body.classList.add("inbox__message_bold");
  body.innerText = "И еще Котик из Яндекса";

  return body
}

function get_read() {
  let read = document.createElement("div");
  read.classList.add("inbox__message-read");

  return read
}

function get_body() {
  let body = document.createElement("div");
  body.classList.add("inbox__message-body");
  body.classList.add("inbox__message_bold");
  body.innerText = "Ну посмотрим что тут у нас";

  return body
}

function add_message_with_animation(messages, new_message) {
  var pos = 500;
  new_message.style.left = pos + 'px';
  messages.insertBefore(new_message, messages.firstChild);
  var id = setInterval(move_element_from_right_to_left, 5);

  function move_element_from_right_to_left() {
    if (pos === 0) {
      clearInterval(id);
    } else {
      pos -= 10;
      new_message.style.left = pos.toString() + 'px';
    }
  }
}

function create_new_message() {
  let messages = document.getElementById("messages");
  let new_message = document.createElement("div");
  new_message.classList.add("inbox__message");
  messages_count++;

  new_message.appendChild(get_checkbox(messages_count));
  new_message.appendChild(get_icon());
  new_message.appendChild(get_author(messages_count));
  new_message.appendChild(get_read());
  new_message.appendChild(get_body());
  new_message.appendChild(get_date_node());
  let check_all_checkbox = document.getElementById("checkbox_all");
  check_all_checkbox.checked = false;
  add_message_with_animation(messages, new_message)
}

function check_all_clicked() {
  let check_all_checkbox = document.getElementById("checkbox_all");
  for (var i = 1; i <= messages_count; i++) {
    var checkbox = document.getElementById("checkbox_" + i.toString());
    checkbox.checked = check_all_checkbox.checked;
  }
}