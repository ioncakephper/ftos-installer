#!/usr/bin/env node

var prompt = require("prompt-sync")({});
const fs = require("fs");
const path = require("path")
const Handlebars = require("handlebars")
const util = require("util");
const program = require("commander");


program
    .option("-d, --defaults [filename]", "Filename or full path to file with default values", "ftos-defaults.json")
    .option("--no-verify", "do not check paths are valid")
    ;

program.parse(process.argv);

let defaults = {}
let options = program.opts();
if (options.defaults) {
    if (!fs.existsSync(options.defaults)) {
        let jsonSource = fs.readFileSync(options.defaults, "utf8");
        let dfltObj = JSON.parse(jsonSource);
        let definedDefaults = dfltObj.defaults;
        for (const d in definedDefaults) {
            defaults[d] = definedDefaults[d];
        }
    }
}


let message;

let kitPath = (defaults.kitPath) ? defaults.kitPath : "C:\\";
message = util.format("Path of installation kit -- decompressed folder whose name ends with GOLD (default %s): ", kitPath);
kitPath = prompt(message, kitPath);
if (options.verify) {
    if (!fs.existsSync(kitPath)) {
        console.log("Path %s does not exist.", kitPath);
        process.exit(1);
    };
}

let instanceName = prompt("Instance name: ");

let rootInstallationTarget = (defaults.rootInstallationTarget) ? defaults.rootInstallationTarget : "C:\\";
let instancePath = path.join(rootInstallationTarget, instanceName);
message = util.format("Instance path (default %s): ", instancePath);
instancePath = prompt(message, instancePath);

let studioPath = path.join(instancePath, "Studio");
message = util.format("Path to instance Studio (default %s): ", studioPath);
studioPath = prompt(message, studioPath);

let portalPath = path.join(instancePath, "Portal");
message = util.format("Path to instance Portal (default %s): ", portalPath)
portalPath = prompt(message, portalPath);

let dbName = instanceName;
message = util.format("Instance database name (default %s): ", dbName);
dbName = prompt(message, instanceName);

data = {
    instanceName: instanceName,
    instancePath: instancePath,
    studioPath: studioPath,
    portalPath: portalPath,
    dbName: dbName,
    kitPath: kitPath
};

let content = render_template("install.handlebars", data);
save_install_bat(path.join(".", "install.bat"), content);

function render_template(basename, data) {
    data.dateTime = new Date().toISOString().replace(/T/, ' ').replace(/\..+/, '');
    let source = fs.readFileSync(path.join(__dirname, basename), "utf8");
    let template = Handlebars.compile(source);
    return template(data);
}
function save_install_bat(filename, content) {
    console.log(content);
    a = "Y";
    a = prompt("Is this correct (Y/N) (default Y)? ", a);
    if (a.match(/ *[yY].*/)) {
        fs.writeFileSync(filename, content, "utf8");
    }
}





