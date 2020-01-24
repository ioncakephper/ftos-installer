var prompt = require("prompt-sync")({});
const fs = require("fs");
const path = require("path")
const Handlebars = require("handlebars")
const util = require("util");


let message;

let kitpath = "C:\\";
message = util.format("Path of installation kit -- decompressed folder whose name ends with GOLD (default %s): ", kitpath);
kitPath = prompt(message, kitpath);
let instanceName = prompt("Instance name: ");

let instancePath = path.join("C:", instanceName);
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
    studioPath: studioPath,
    portalPath: portalPath,
    dbName: dbName,
    kitPath: kitPath
};

let content = render_template("install.handlebars", data);
save_install_bat(path.join(instancePath, "install.bat"), content);

function render_template(basename, data) {
    let source = fs.readFileSync(path.join(__dirname, basename), "utf8");
    let template = Handlebars.compile(source);
    return template(data);
}
function save_install_bat(filename, content) {
    console.log(content);
    console.log(filename);
    // fs.writeFileSync(filename, content, "utf8");
}





