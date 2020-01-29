<!-- omit in toc -->
# ftos-installer

![GitHub code size in bytes](https://img.shields.io/github/languages/code-size/ioncakephper/ftos-installer) ![GitHub repo size](https://img.shields.io/github/repo-size/ioncakephper/ftos-installer) ![npm](https://img.shields.io/npm/dt/ftos-installer)  [![GitHub](https://img.shields.io/github/license/ioncakephper/ftos-installer)](https://github.com/ioncakephper/ftos-installer/blob/master/LICENSE)

CLI app to assist the installation process of FintechOS framework

- [Installation](#installation)
- [Usage](#usage)
- [What it does](#what-it-does)
- [Collecting installation information](#collecting-installation-information)
- [Default template](#default-template)
- [Template variables](#template-variables)

## Installation

Install the package globally. The global install provides the `ftosin` CLI command, which is the only way to use this package.

```bash
npm install ftos-installer -g
```

## Usage

Check `ftosin` is available as a command:

```bash
ftosin -h
```

```txt
Usage: ftosin [options]

Generate install.bat for FintechOS Framework. Provide your values or accept suggested values.

Options:
  -V, --version                    output the version number
  -d, --defaults [filename]        Filename or full path to file with default values (default: "ftos-defaults.json")
  --no-verify                      do not check paths are valid
  --no-database                    skip installing instance database
  --no-studio                      skip installing instance Studio
  --no-portal                      skip installing instance Portal
  -t, --template <file>            install bat template file with .handlebars extension (default: "C:\\Users\\ion.gireada\\Documents\\VSCodeProjects\\ftos-installer\\install.handlebars")
  -o, --output <fullfilenamepath>  full path to generated install file, or filename (default: "install.bat")
  -h, --help                       output usage information
```

## What it does

ftosin collects information from the user, and then it generates an `install.bat` file. The user will run the `install.bat` file as Administrator to install the FintechOS Framework.

## Collecting installation information

When you run `ftosin`, you are asked to provide installation information such as path to installation kit, instance name, path to Studio and Portal applications, etc.

Most information items have a default value. To accept the default value, simply press `Enter`. ftosin provides these default values using previous information.

Following the installation information questions, you will review the generated content, and asked to confirm it. If you confirm it, the content is saved in the `install.bat`.  

At the command prompt, type:

```bash
mkdir C:\Users\default\Documents\FintechOS-Installations
cd C:\Users\default\Documents\FintechOS-Installations
ftosin --no-verify --output ./v20-install/install-SheldonG20.bat
```

## Default template

```txt
REM
REM ================ FintechOS Installation ===================
REM
REM NOTE: To run this file, you MUST have Administrative rights
REM
REM                       S U M M A R Y
REM
REM             Install kit path: {{kitPath}}
REM                Instance Name: {{instanceName}}
REM
REM         Instance Studio path: {{studioPath}}
REM  Studio IIS Application Name: {{studioIisApp}}
REM
REM         Instance Portal path: {{portalPath}}
REM  Portal IIS Application Name: {{portalIisApp}}
REM
REM       .bat file generated on: {{dateTime}}
REM Initialize instance database: {{database}}
REM      Install instance Studio: {{studio}}
REM      Install instance Portal: {{portal}}
REM           IIS Parent Website: {{iisWebSite}}
REM              Connection name: {{connectionName}}
REM
REM ===========================================================
REM

IF NOT EXIST "{{instancePath}}" GOTO MKINSTANCE
RMDIR /S /Q {{instancePath}}
:MKINSTANCE
MKDIR {{instancePath}}
{{#if studio}}
MKDIR {{instancePath}}\EBS_DIR
{{/if}}
{{#if portal}}
MKDIR {{instancePath}}\EBS_DIR
{{/if}}

{{#if database}}
CD "{{kitPath}}\SQL"
start BasicDbUpgrader.exe -i -s {{connectionName}} -d {{dbName}} && BasicDbUpgrader.exe -w -s {{connectionName}} -d {{dbName}} && BasicDbUpgrader.exe -g -s {{connectionName}} -d {{dbName}}
pause
{{/if}}

{{#if studio}}
powershell.exe -File "{{kitPath}}\DesignerWebApp\DesignerWebAppInstaller.ps1" -p_MainCommand Install -p_InstallDir "{{studioPath}}" -p_IisWebSite "{{iisWebSite}}" -p_IisApp {{studioIisApp}} -p_IisAppPool {{instanceName}}Studio -p_DbConnServer "{{connectionName}}" -p_DbConnSqlAuthUser {{dbSqlAuthUser}} -p_DbConnSqlAuthPass {{dbSqlAuthPass}} -p_DbConnDb {{dbName}} {{instancePath}}\EBS_DIR
pause
{{/if}}

{{#if portal}}
powershell.exe -File "{{kitPath}}\PortalWebApp\PortalWebAppInstaller.ps1" -p_MainCommand Install -p_InstallDir "{{portalPath}}" -p_IisWebSite "{{iisWebSite}}" -p_IisApp {{portalIisApp}} -p_IisAppPool {{instanceName}}Portal -p_DbConnServer "{{connectionName}}" -p_DbConnSqlAuthUser {{dbSqlAuthUser}} -p_DbConnSqlAuthPass {{dbSqlAuthPass}} -p_DbConnDb {{dbName}} -p_UploadEBSDir {{instancePath}}\EBS_DIR
pause
{{/if}}
```

## Template variables

Name | Type | Description | Default
---------|---------|---------|-------
`connectionName` | string | v2 | "Default Web Site"
`database` | boolean | Switch indicates to create `.bat` section to initialize and upgrade database | true
`dbName` | string | v2 | specified value
`dbSqlAuthPass` | string | v2 | specified value
`dbSqlAuthUser` | string | v2 | specified value
`dateTime` | DateTime | v1 | application-provided value as `yyyy-mm-dd hh:mm:ss`
`dbName` | B1 | v1 | NA
`iisWebSite` | B1 | v1 | NA
 `instanceName` | B1 | v1 | NA
 `instancePath` | B2 | v1 | NA
 `kitPath` | B2 | v1 | NA
 `portal` | boolean | v1 | true
 `portalPath` | B3 | v1 | NA
 `studio` | boolean | v1 | true
 `studioPath` | B3 | v1 | NA
