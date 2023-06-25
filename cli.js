
function writeText(text) {
    if (output.innerText == '') {
        output.innerText = text;
        return;
    } 
    output.innerText += '\n' + text;
}


// ||== Commands ==||
var helpScheme = { // Help Command
    cmdText: 'This is the help menu, choose a command from the list below:\n\thelp - shows this menu\n\topen - opens a profile of me',
    func: () => { 
        writeText(helpScheme.cmdText)
    }
}

var openScheme = { // Open Command
    name: "open",
    cmdText: 'Usage: open [PROFILE]\nOpens one of my Profiles\nPROFILES:\n\t- github: Opens my Github Page',
    helpText: "opens a profile of me",
    func: (cmd) => {
        if (cmd == 'open github') {
            writeText("Opening Github Profile...");
            window.open('https://github.com/thejmc');
        } else {
            writeText(openScheme.cmdText);
        }
    }
}

var timeScheme = { // Time Command
    cmdText: "Usage: time now\nShows the current time",
    func: () => { writeText(new Date().toUTCString()); }
}




// Special Commands
var clearScheme = {
    cmdText: "Usage: clear\nClears the terminal of all text",
    func: () => { output.innerText = ''; }
}

// Main Command Definitions
var commands = {
    help: helpScheme,

    open: openScheme,

    time: timeScheme,

    clear: clearScheme,
    cls: clearScheme

}

// ||== Variables ==|| 
// startText: The text that is displayed when the page is loaded
var startText = `Welcome to JamesOS LTS\nSystem information as of ${new Date().toUTCString()}\n\nSystem load:            ${Math.random().toFixed(4)}\nUsage of /:             ${(Math.random()*100).toFixed(2)}% of ${(Math.random()*100).toFixed(0)}GB\nMemory usage:           ${(Math.random()*100).toFixed(2)}%\nSwap usage:             ${(Math.random()*100).toFixed(2)}%\nProcesses:              ${(Math.random()*100+30).toFixed(0)}\nIPv4 address for www:   35.214.3.155\n\n${(Math.random()*50).toFixed(0)} package(s) can be updated.\nTo check for new updates run: sudo apt update`

var promptValue = 'james@jamesmcc.co.uk$ '


// ||== Document Elements ==||
var cli = document.getElementById('cli');
var output = document.getElementById('output');
var prompt = document.getElementById('prompt');


// ||== Document Events ==||
document.addEventListener("DOMContentLoaded", () => {
    prompt.innerText = promptValue;
    output.innerText = startText;
});

// On CTRL-L clear the terminal
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
        commands.clear.func();
    }
}

// When a command is triggered
cli.addEventListener("keydown", e => {
    if (e.key != "Enter") { return; }
    var command = cli.value; // Get the command
    cli.value = '' // Clear the command line
    writeText(promptValue + command); // Write the command to the terminal

    var rootCMD = command.split(' ')[0]; // Get the root command
    if (commands[rootCMD] == undefined) { // If the root command is not defined
        commands.help.func(); // Run the help command
        return;
    } else {
        commands[rootCMD].func(command); // Run the command
    }
});









