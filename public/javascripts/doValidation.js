const {exec} = require("child_process");


const curlPrompt = `curl -X GET 'https://id.twitch.tv/oauth2/validate' -H 'Authorization: Bearer '${req.session.accessToken}'`

    exec(curlPrompt, (error, stdout, stderr) => {
        if (error) {
            console.log(`error: ${error.message}`);
            return;
        }
        let outputValue ='';
        if (stderr){
            outputValue = stderr; // Pobranie wartości output z kontekstu szablonu
        }
        else if (stdout){
            outputValue = stdout; // Pobranie wartości output z kontekstu szablonu
        }
        const outputParagraf = document.getElementById("outputParagraf");

        outputParagraf.textContent = outputValue;
    });

