const ENABLED_DEBUG             = true // switch this off for anything execpt for debug

const ID_FETCH_INBOX                  = 'fetch-inbox'
const ID_EMAIL_SENDER_PART            = 'email__sender-part'
const ID_DELETE_SELECTED_EMAILS       = 'delete-selected-mails'
const ID_SELECT_ALL_EMAILS_CHECKBOX   = 'select-all-emails-checkbox'
const ID_OPENNED_EMAIL_CONTAINER      = 'content__email-content'
const ID_CLOSE_OPENED_EMAIL_BUTTON    = 'close-opened-email'
const ID_EMAILS_LIST_CONTAINER        = 'content__mail-screen-and-footer'
const ID_OPENNED_EMAIL_TEXT_CONTAINER = 'email-content-message-container'

const CLASS_EMAILS_CONTAINER = 'mail-emails'
const CLASS_EMAIL_CHECKBOX   = 'mail-screen__checkbox'

const ANIMATION_BOUNCE_IN_CLASS        = 'bounceIn'
const ANIMATION_BOUNCE_OUT_RIGHT_CLASS = 'bounceOutRight'

const EMAIL_ID_PREFIX = '__msg'

const EMailsStorage = {}

/*
<msgId>: {
  hasCat: boolean
  paragraphs: string[]
}
*/

function LOG() {
  [...arguments].forEach((a) => console.log(a))
}

const isEmailId = (elementId /*: string | null */) => {
  if (!elementId) {
    return false
  }
  
  const regexp = new RegExp(`${EMAIL_ID_PREFIX}*`)
  return regexp.test(elementId)
}

const extractEmailIdFromElementId = (elementId /*: string*/) => {
  return parseInt(elementId.substr(EMAIL_ID_PREFIX.length))
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

const composeNewMessage = async (msgId /*: number*/) => {
  const hasCat     = getRand(1, 2) == 1
  const paragraphs = await window.contentGen.newRandomArticle()
    .type(RANDOM_TEXT_TYPES.ALL_MEAT)
    .paras(getRand(2, 10))
    .format(RANDOM_TEXT_FORMATS.JSON)
    .get()
  const title      = possibleMailTitles[getRand(0, possibleMailTitles.length - 1)]
  const day        = getRand(1, 28)
  const month      = possibleMonths[getRand(0, possibleMonths.length - 1)] 
  
  if (!paragraphs) {
    throw new Error('Failure to generate new message text')
  }
  
  EMailsStorage[msgId] = {
    hasCat,
    paragraphs
  }

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

const createNewMessageAndUpdateDOM = async () => {
  const newMessageId   = getMaximalExistingMessageId() + 1
  const newMessageHTML = await composeNewMessage(newMessageId)
  const newMessageNode = stringToNode(newMessageHTML)
  
  const emailsContainer = getFirstByClass(CLASS_EMAILS_CONTAINER)
  emailsContainer.insertBefore(newMessageNode, emailsContainer.firstChild)

  resetSelectAllEmailsCheckbox()

  setTimeout(() => {
    document.getElementById(getEmailIdByNum(newMessageId)).classList.remove(ANIMATION_BOUNCE_IN_CLASS)
  }, 600)
}

/* Как раз та функция, которую от нас просят в задании! */
const newMail = createNewMessageAndUpdateDOM

const sleep = (ms) => {
  return new Promise(resolve => setTimeout(resolve, ms));
}

const runNewEmailGeneration = async () => {
  await sleep(getRand(10, 3000))
  await newMail()
  
  while (true) {
    await sleep(1000 * 60 * 5 + getRand(0, 1000 * 60 * 5))
    await newMail()
  }
}

const fetchInboxClickHandler = async (event /*: any*/) => {
  LOG('fetchInbox button has been clicked', event)

  await createNewMessageAndUpdateDOM()
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

const closeOpenedEmailClickHandler = (event /*: any*/) => {
  getFirstByClass(ID_EMAILS_LIST_CONTAINER).style.display = 'none'
  getFirstByClass(ID_OPENNED_EMAIL_CONTAINER).style.display = 'block'
}

const emailsContainerCLickHandler = (event /*: any*/) => {
  LOG('emailsContainer has received a click event', event)
  
  if (event && 
      event.path && 
      event.target.classList.contains(ID_EMAIL_SENDER_PART)) {
    let messageId = null
    event.path.forEach(element => {
      if (isEmailId(element.id)) {
        messageId = extractEmailIdFromElementId(element.id)
      }
    })

    if (messageId) {
      showMessageById(messageId)
    }
  }
}

const getEmailHTMLContent = (messageId /* number */) => {
  let result = ''
  const emailContent = EMailsStorage[messageId]
  console.log(emailContent)
  if (emailContent.hasCat) {
    result = `<div id="#cat-image"></div>`
  }
  
  for (const p of emailContent.paragraphs) {
    LOG(`One more paragraph ${p}`)
    result += `<p>${p}</p>`
  }
  
  return `<div>${result}</div>`
}

const showMessageById = (messageId /* number */) => {
  const emailContent = document.getElementById(ID_OPENNED_EMAIL_TEXT_CONTAINER)
  emailContent.insertBefore(
    stringToNode(getEmailHTMLContent(messageId)), 
    emailContent.firstChild
  )
  
  getFirstByClass(ID_EMAILS_LIST_CONTAINER).style.display = 'none'
  getFirstByClass(ID_OPENNED_EMAIL_CONTAINER).style.display = 'block'
}

const initListeners = () => {
  const emailsContainer = getFirstByClass(CLASS_EMAILS_CONTAINER)
  const fetchInboxButton = document.getElementById(ID_FETCH_INBOX)
  const deleteSelectedEmailsButton = document.getElementById(ID_DELETE_SELECTED_EMAILS)
  const selectAllEmailsCheckbox = document.getElementById(ID_SELECT_ALL_EMAILS_CHECKBOX)
  const closeOpenedEmailButton = document.getElementById(ID_CLOSE_OPENED_EMAIL_BUTTON)
  
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
  
  if (emailsContainer !== null) {
    LOG('emailsContainer has been successfully assigned a bubbling click listener')
    emailsContainer.addEventListener('click', emailsContainerCLickHandler, false)
  }
  
  if (closeOpenedEmailButton !== null) {
    LOG('closeOpenedEmailButton has been assigned a click listener')
    closeOpenedEmailButton.addEventListener('click', closeOpenedEmailClickHandler, false)
  }
}

const init = () => {
  if (!ENABLED_DEBUG) {
    LOG = () => {}
  }
  initListeners()
  runNewEmailGeneration()
}

window.onload = init
