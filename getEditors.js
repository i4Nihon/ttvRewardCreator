const {exec} = require("child_process")
function getEditors(id, token, clientId, editorName){
  let founded = false;
  const curlGetEditors = `curl -X GET "https://api.twitch.tv/helix/channels/editors?broadcaster_id=${id}" -H "Authorization: Bearer ${token}" -H "Client-Id:${clientId}"`
  exec(curlGetEditors, (error, stdout) => {
    if (error) console.log(error)
    else {
      const data = stdout.data
      for (const user in data) {
        if (user.user_name === editorName)
          founded = true
      }
    }
  })
  return founded;
}

module.exports = getEditors();