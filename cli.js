var startText = `Welcome to JamesOS LTS
            
System information as of ${new Date().toUTCString()}
               
System load:            ${Math.random().toFixed(4)}
Usage of /:             ${(Math.random()*100).toFixed(2)}% of ${(Math.random()*100).toFixed(0)}GB
Memory usage:           ${(Math.random()*100).toFixed(2)}%
Swap usage:             ${(Math.random()*100).toFixed(2)}%
Processes:              ${(Math.random()*100+30).toFixed(0)}
IPv4 address for www:   35.214.3.155

${(Math.random()*50).toFixed(0)} package(s) can be updated.
To check for new updates run: sudo apt update
`

var cli = document.getElementById('cli');
var output = document.getElementById('output');
var prompt = document.getElementById('prompt');

var promptValue = 'james@jamesmcc.co.uk$ '

document.addEventListener("DOMContentLoaded", () => {
    prompt.innerText = promptValue;
    output.innerText = startText;
});


cli.addEventListener("keydown", e => {
    if (e.key == "Enter") {
        var command = cli.value;
        cli.value = ''
        output.innerText += '\n' + promptValue + command;
        switch (true) {

            // Main Command Loops 
            case /^help$/.test(command): // Help Command
                help();
                break;

                
            case /^open /.test(command): // Open Command
                openCmd(command);
                break;

            case /^clear$|^cls$/.test(command): // Clear Command
                clearTerm();
                break;

            // Default Command
            case true:
                output.innerText += '\n' + 'Command not found, type help for a list of commands';
        }
    }
});

document.onkeydown = e => {
    if (
        (!e.altKey && !e.ctrlKey && !e.metaKey && !e.shiftKey) ||
        e.key === 'Meta' ||
        e.key === 'Shift' ||
        e.key === 'Control' ||
        e.key === 'alt'
    ) {
        return;
    } else if (e.ctrlKey && e.key === 'l') {
        clearTerm();
    }
}

function help() {
    output.innerText += '\n' + 'This is the help menu, choose a command from the list below:';
    output.innerText += '\n' + 'help - shows this menu';
    output.innerText += '\n' + 'open - opens a profile of me';
}

function openCmd(cmd) {
    var helpText = "Usage: open [PROFILE]\nOpens one of my Profiles\nPROFILES:\n\t- github: Opens my Github Page"

    if (cmd == 'open -h') {
        output.innerText += helpText;
    } else if (cmd == 'open github') {
        output.innerText += "\nOpening Github Profile...";
        window.open('https://github.com/thejmc');
    }
}

function clearTerm() {
    output.innerText = '';
}