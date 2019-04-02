const PROXY_URL = 'https://cors-anywhere.herokuapp.com'

const HTTPRequests = {
  GET: 'GET',
  POST: 'POST',
}

 const fetchJSON = async (
  url, /*: string */
  errorHandler /*: (error) => void */
) => {
  try {
    const response = await makeRequest(
      url,
      HTTPRequests.GET,
      errorHandler
    )
    const result = await response.json()
    return result
  } catch (error) {
    console.log(error)
  }
  
  return null
}

const getProxiedUrl = (url /* string */) => {
  return `${PROXY_URL}/${url}`
}

 const makeRequest = async (
  url, /*: string */
  method, /*: string */
  errorHandler /*: (error) => void */
) => {
  try {
    return await fetch(
      getProxiedUrl(url),
      { method }
    )
  } catch (error) {
    if (errorHandler) {
      errorHandler(error)
      return null
    }
  }
}

// handy-export :D
window.Requests = {
  makeRequest,
  fetchJSON,
  HTTPRequests
}
