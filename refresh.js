const streamerNames = require("./streamersNames.json");
const vars = require("./variables");
const {exec} = require("child_process");

function doRefresh(){
  for (const streamerName in streamerNames) {
    let token = streamerName.refreshToken
    let expires = streamerName.expiresIn
    refresh(streamerName, expires, token)
  }
}



function refresh(streamer, expiresIn, refToken) {


  const curlRefresh = `curl -k -X POST https://id.twitch.tv/oauth2/token -H "Content-Type: application/x-www-form-urlencoded" -d "grant_type=refresh_token&refresh_token=${refToken}&client_id=${process.env.CLENT_ID}&client_secret=${process.env.CLIENT_SECRET}"`


    setTimeout(() => {
      exec(curlRefresh, (error, stdout) => {
        if (error) console.log(error)
        else {
          const values = JSON.parse(stdout)

          if (values.token_type !== undefined) {
            streamer.refreshToken = values.refresh_token
            streamer.accessToken = values.access_token
            streamer.expiresIn = values.expires_in
            console.log("refresh successes")
          } else if (values.status === 400) console.log(values.message)
        }
      })
    }, ((streamer.expiresIn - 20) * 1000))
}
