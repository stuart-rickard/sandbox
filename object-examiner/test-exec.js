const { exec } = require("child_process");

const filename = '/team-profile.html';
const path = __dirname;
const chromeCommand = 'start chrome --new-tab ' + path + filename;
console.log( 'The following command has been made in a separate shell: ' + chromeCommand );

exec( chromeCommand, (error, stdout, stderr) => {
    if (error) {
        console.log(`error: ${error.message}`);
        return;
    }
    if (stderr) {
        console.log(`stderr: ${stderr}`);
        return;
    }
    console.log(`stdout: ${stdout} no errors`);
});
