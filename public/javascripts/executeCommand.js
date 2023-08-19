const {exec} = require("child_process");

function doCmd(){
    exec(``, (error, stdout, stderr) => {
        if (error) {
            console.log(`error: ${error.message}`);
            return;
        }
        if (stderr) {
            console.log(`stderr: ${stderr}`);
            return;
        }

        if (stderr){
            let outputValue = stderr; // Pobranie wartości output z kontekstu szablonu
        }
        else if (stdout){
            let outputValue = stdout; // Pobranie wartości output z kontekstu szablonu
        }
        const outputParagraf = document.getElementById("outputParagraf");

        outputParagraf.textContent = outputValue;
    });

}

