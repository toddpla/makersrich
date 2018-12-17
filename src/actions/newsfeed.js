export const sendNewsfeedMessage = (message) => ({
  type: 'ADD_MESSAGE',
  message: message
})

export const startSendNewsfeedMessage = (message) => {
  return (dispatch, getState) => {
    const messages = getState().newsfeed
    messages.unshift(message)
    messages.pop()
    dispatch(sendNewsfeedMessage(message))
  }
}
