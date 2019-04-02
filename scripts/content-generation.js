const RANDOM_TEXT_API_URL = 'https://baconipsum.com/api'

 const RANDOM_TEXT_TYPES = {
  ALL_MEAT: 'all-meat',
  MEAT_AND_FILLER: 'meat-and-filler',
}

 const RANDOM_TEXT_FORMATS = {
  JSON: 'json',
  TEXT: 'text',
  HTML: 'html',
}


const newRandomArticle = () => {
  return {
   _format: null,
   _type: null,
   _paras: null,
   
   _appendParam(url, name, value) { // no url encode happens in here
     return `${url}&${name}=${value}`
   },
   
   _buildUrl() {
     let result = `${RANDOM_TEXT_API_URL}?type=${this._type}`
     if (this._paras) {
         result = this._appendParam(result, 'paras', this._paras)
     }
     if (this._format) {
       result = this._appendParam(result, 'format', this._format)
     }
     
     return result
   },
   
   format(value) {
     this._format = value
     return this
   },
   type(value) {
     this._type = value
     return this
   },
   paras(value) {
     this._paras = value
     return this
   },
   
   async get() {
     if (this._type) {
       return await window.Requests.fetchJSON(this._buildUrl())
     }
     
     throw new Error('Can not generate article: type is not set')
   }
 }
}

// handy-export :D
window.contentGen = {
  RANDOM_TEXT_TYPES,
  RANDOM_TEXT_FORMATS,
  newRandomArticle
}
