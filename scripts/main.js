const ENABLED_DEBUG             = true // switch this off for anything execpt for debug

const ID_FETCH_INBOX                = 'fetch-inbox'
const ID_DELETE_SELECTED_EMAILS     = 'delete-selected-mails'
const ID_SELECT_ALL_EMAILS_CHECKBOX = 'select-all-emails-checkbox'

const CLASS_EMAILS_CONTAINER = 'mail-emails'
const CLASS_EMAIL_CHECKBOX   = 'mail-screen__checkbox'

const ANIMATION_BOUNCE_IN_CLASS        = 'bounceIn'
const ANIMATION_BOUNCE_OUT_RIGHT_CLASS = 'bounceOutRight'

const EMAIL_ID_PREFIX = '__msg'

function LOG() {
  [...arguments].forEach((a) => console.log(a))
}

const resetSelectAllEmailsCheckbox = () => {
  const selectAllEmailsCheckbox = document.getElementById(ID_SELECT_ALL_EMAILS_CHECKBOX)
  if (selectAllEmailsCheckbox !== null) {
    selectAllEmailsCheckbox.checked = false
  }
}

const getEmailIdByNum = (num /*: number */) => {
  return `${EMAIL_ID_PREFIX}${num}`
}

const getAllEmailsSelectCheckboxes = () => {
  return document.querySelectorAll(`.${CLASS_EMAIL_CHECKBOX}`)
}

const getMaximalExistingMessageId = () => {
  return [...getAllEmailsSelectCheckboxes()]
    .reduce((acc, current) => {
      try {
        const msgId = parseInt(current.dataset.msg)
        if (!Number.isNaN(msgId) && msgId > acc) {
          return msgId
        }
      } catch (ignored) {
      }
      
      return acc
    }, 0)
}

const getRand = (from, to) => {
  return Math.floor(Math.random() * (to - from + 1) ) + from;
}

const possibleMailTitles = [
    'Это новое письмо!',
    'Попробуйте еще больше этих свежих и сочных французских булочек',
    'ШОК! Афоня TV выращивает Льва и Тигра!'
]

const possibleMonths = ['янв', 'фев', 'мар', 'апр', 'май', 'июн', 'июл', 'авг', 'сен', 'окт', 'ноя', 'дек']

const getFirstByClass = (className /*: string*/) => {
  const elements = document.querySelectorAll(`.${className}`)
  if (elements && elements.length > 0) {
    return elements[0]
  }
  
  return null
}

const composeNewMessage = (msgId /*: number*/) => {
  const title       = possibleMailTitles[getRand(0, possibleMailTitles.length - 1)]
  const day         = getRand(1, 28)
  const month       = possibleMonths[getRand(0, possibleMonths.length - 1)] 
  return `<section id="${getEmailIdByNum(msgId)}" class="mail-screen-element-wrapper ${ANIMATION_BOUNCE_IN_CLASS}">
    <div class="unread email">
      <div class="email__mail-date">${day} ${month}</div>
      <input data-msg="${msgId}" type="checkbox" class="mail-screen__checkbox"/>
      <img class="email__sender-photo" src="images/yandex-logo.png" />
      <div class="email__sender-part email__sender-name">Команда Яндекс.Письма</div>
      <div class="email__unread-flag"></div>
      <div class="email__sender-part email__sender-title">${title}</div>
    </div>
  </section>`
}

const stringToNode = (s /*: string */) => {
  return new DOMParser().parseFromString(s, 'text/html').body.firstChild
}

const fetchInboxClickHandler = (event /*: any*/) => {
  LOG('fetchInbox button has been clicked', event)

  const newMessageId   = getMaximalExistingMessageId() + 1
  const newMessageHTML = composeNewMessage(newMessageId)
  const newMessageNode = stringToNode(newMessageHTML)
  
  const emailsContainer = getFirstByClass(CLASS_EMAILS_CONTAINER)
  emailsContainer.insertBefore(newMessageNode, emailsContainer.firstChild)

  resetSelectAllEmailsCheckbox()

  setTimeout(() => {
    document.getElementById(getEmailIdByNum(newMessageId)).classList.remove(ANIMATION_BOUNCE_IN_CLASS)
  }, 600)
}

const selectAllEmailsCheckboxClickHandler = (event /*: any*/) => {
  LOG('selectAllEmailsCheckbox has been changed', event)
  
  const updateChecked = (checkbox) => {
    checkbox.checked = event.target.checked
  }
  
  [...getAllEmailsSelectCheckboxes()].map(updateChecked)
}

const getSelectedEmails = () => {
  return [...getAllEmailsSelectCheckboxes()]
    .filter((checkbox) => checkbox.checked)
    .map((checkbox) => {
      const emailNum = checkbox.dataset.msg
      if (!emailNum) {
        return null
      }
      
      const emailId = getEmailIdByNum(emailNum)
      return document.getElementById(emailId)
    })
    .filter((checkbox) => !!checkbox)
}

const deleteSelectedEmailsClickHandler = (event /*: any*/) => {
  LOG('deleteSelectedEmails button has been clicked', event)
  
  const selectedEmails = getSelectedEmails()
  for (const email of selectedEmails) {
    if (email.classList) {
      email.classList.add(ANIMATION_BOUNCE_IN_CLASS)
      setTimeout(() => {
        email.classList.remove(ANIMATION_BOUNCE_IN_CLASS)
        email.classList.add(ANIMATION_BOUNCE_OUT_RIGHT_CLASS)
      }, 600)
      setTimeout(() => {
        email.parentNode.removeChild(email)
      }, 900)
    }
  }

  setTimeout(resetSelectAllEmailsCheckbox, 800)
}

const initListeners = () => {
  const fetchInboxButton = document.getElementById(ID_FETCH_INBOX)
  const deleteSelectedEmailsButton = document.getElementById(ID_DELETE_SELECTED_EMAILS)
  const selectAllEmailsCheckbox = document.getElementById(ID_SELECT_ALL_EMAILS_CHECKBOX)
  
  if (fetchInboxButton !== null) {
    LOG('fetchInboxButton has been successfully assigned a click listener')
    fetchInboxButton.addEventListener('click', fetchInboxClickHandler, false)
  }
  
  if (deleteSelectedEmailsButton !== null) {
    LOG('deleteSelectedEmailsButton has been successfully assigned a click listener')
    deleteSelectedEmailsButton.addEventListener('click', deleteSelectedEmailsClickHandler, false)
  }

  if (selectAllEmailsCheckbox !== null) {
    LOG('selectAllEmailsCheckbox has been successfully assigned a click listener')
    selectAllEmailsCheckbox.addEventListener('click', selectAllEmailsCheckboxClickHandler, false)
  }
}

const init = () => {
  if (!ENABLED_DEBUG) {
    LOG = () => {}
  }
  initListeners()
}

window.onload = init
