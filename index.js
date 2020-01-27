#!/usr/bin/env node

var prompt = require("prompt-sync")({});
const fs = require("fs");
const path = require("path")
const Handlebars = require("handlebars")
const util = require("util");
const program = require("commander");

let package = JSON.parse(fs.readFileSync(path.join(__dirname, "./package.json"), "utf8"));
let version = package.version;

program
    .version(version)
    .description("Generate install.bat for FintechOS Framework. Provide your values or accept suggested values.")
    .option("-d, --defaults [file]", "Filename or full path to file with default values", "ftos-defaults.json")
    .option("--no-verify", "do not check paths are valid")
    .option("--no-database", "skip installing instance database")
    .option("--no-studio", "skip installing instance Studio")
    .option("--no-portal", "skip installing instance Portal")
    .option("-t, --template <file>", "install .bat template file with .handlebars extension", path.join(__dirname, './install.handlebars'))
    .option("-o, --output <file>", "full path to generated install file, or filename", "install.bat")
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
if (!instanceName.match(/[ a-zA-Z0-9\-_]+/g)) {
    console.log("Instance name is invalid %s", instanceName);
    process.exit(1);
}

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
    database: options.database,
    studio: options.studio,
    portal: options.portal,
    instanceName: instanceName,
    instancePath: instancePath,
    studioPath: studioPath,
    portalPath: portalPath,
    dbName: dbName,
    kitPath: kitPath
};

let templateFilename = options.template;
let content = render_template(path.resolve(templateFilename), data);

let installFilename = options.output;
save_install_bat(installFilename, content);

function render_template(filename, data) {
    data.dateTime = new Date().toISOString().replace(/T/, ' ').replace(/\..+/, '');
    let source = fs.readFileSync(filename, "utf8");
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





