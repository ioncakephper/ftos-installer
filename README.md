<!-- omit in toc -->
# ftos-installer

![GitHub code size in bytes](https://img.shields.io/github/languages/code-size/ioncakephper/ftos-installer) ![GitHub repo size](https://img.shields.io/github/repo-size/ioncakephper/ftos-installer) ![npm](https://img.shields.io/npm/dt/ftos-installer)  [![GitHub](https://img.shields.io/github/license/ioncakephper/ftos-installer)](https://github.com/ioncakephper/ftos-installer/blob/master/LICENSE)

CLI app to assist the installation process of FintechOS framework

- [Installation](#installation)
- [Usage](#usage)
- [What it does](#what-it-does)
- [Collecting installation information](#collecting-installation-information)
- [Know your `ftosin`](#know-your-ftosin)
- [Examples](#examples)
  - [Example 1](#example-1)
  - [Example 2](#example-2)
  - [Example 3](#example-3)
  - [Example 4](#example-4)
  - [Example 5](#example-5)
  - [Example 6](#example-6)
  - [Example 7](#example-7)
  - [Example 8](#example-8)
  - [Example 9](#example-9)
  - [Example 10](#example-10)
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
  -V, --version          output the version number
  -d, --defaults [file]  Filename or full path to file with default values (default: "ftos-defaults.json")
  --no-pause             skip creating pause command in install.bat
  --no-verify            do not check paths are valid
  --no-database          skip installing instance database
  --no-studio            skip installing instance Studio
  --no-portal            skip installing instance Portal
  -s, --save [file]      save answers to default answers file (default: "ftos-defaults.json")
  -t, --template <file>  install .bat template file with .handlebars extension (default: "C:\\Users\\ion.gireada\\Documents\\VSCodeProjects\\ftos-installer\\install.handlebars")
  -o, --output <file>    full path to generated install file, or filename (default: "install.bat")
  -h, --help             output usage information
```

Creating `install.bat`

```bash
ftosin --no-verify
```

`ftosin` will prompt you for installation details, and creates the `install.bat` in current folder.

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

## Know your `ftosin`

```bash
ftosin --version # or ftosin -V
```

Get current version

```bash
ftosin -h # or ftosin --help
```

Get usage information

## Examples

### Example 1

```bash
ftosin --no-verify
```

Ask installation details to create `install.bat` in the local folder. Load default detail values from `ftos0defaults.json`. The `--no-verify` switch skips checking whether path/to/ftos/GOLD exists.

```txt
REM
REM ================ FintechOS Installation ===================
REM
REM NOTE: To run this file, you MUST have Administrative rights
REM
REM                       S U M M A R Y
REM
REM             Install kit path: C:\Users\ion.gireada\Downloads\FTOS-CORE-RLS-v20.1.0\FTOS-CORE-RLS-v20.1.0\FTOS-CORE-RLS-v20.1.0.0-b197-GOLD
REM                Instance Name: AlexG20
REM
REM         Instance Studio path: C:\AlexG20\Studio
REM  Studio IIS Application Name: AlexG20Studio
REM
REM         Instance Portal path: C:\AlexG20\Portal
REM  Portal IIS Application Name: AlexG20Portal
REM
REM       .bat file generated on: 2020-01-29 13:04:01
REM Initialize instance database: true
REM      Install instance Studio: true
REM      Install instance Portal: true
REM           IIS Parent Website: Default Web Site
REM              Connection name: training0001
REM
REM ===========================================================
REM

IF NOT EXIST "C:\AlexG20" GOTO MKINSTANCE
RMDIR /S /Q C:\AlexG20
:MKINSTANCE
MKDIR C:\AlexG20
MKDIR C:\AlexG20\EBS_DIR
MKDIR C:\AlexG20\EBS_DIR

CD "C:\Users\ion.gireada\Downloads\FTOS-CORE-RLS-v20.1.0\FTOS-CORE-RLS-v20.1.0\FTOS-CORE-RLS-v20.1.0.0-b197-GOLD\SQL"
start BasicDbUpgrader.exe -i -s training0001 -d AlexG20 && BasicDbUpgrader.exe -w -s training0001 -d AlexG20 && BasicDbUpgrader.exe -g -s training0001 -d AlexG20
pause

powershell.exe -File "C:\Users\ion.gireada\Downloads\FTOS-CORE-RLS-v20.1.0\FTOS-CORE-RLS-v20.1.0\FTOS-CORE-RLS-v20.1.0.0-b197-GOLD\DesignerWebApp\DesignerWebAppInstaller.ps1" -p_MainCommand Install -p_InstallDir "C:\AlexG20\Studio" -p_IisWebSite "Default Web Site" -p_IisApp AlexG20Studio -p_IisAppPool AlexG20Studio -p_DbConnServer "training0001" -p_DbConnSqlAuthUser host -p_DbConnSqlAuthPass host -p_DbConnDb AlexG20 C:\AlexG20\EBS_DIR
pause

powershell.exe -File "C:\Users\ion.gireada\Downloads\FTOS-CORE-RLS-v20.1.0\FTOS-CORE-RLS-v20.1.0\FTOS-CORE-RLS-v20.1.0.0-b197-GOLD\PortalWebApp\PortalWebAppInstaller.ps1" -p_MainCommand Install -p_InstallDir "C:\AlexG20\Portal" -p_IisWebSite "Default Web Site" -p_IisApp AlexG20Portal -p_IisAppPool AlexG20Portal -p_DbConnServer "training0001" -p_DbConnSqlAuthUser host -p_DbConnSqlAuthPass host -p_DbConnDb AlexG20 -p_UploadEBSDir C:\AlexG20\EBS_DIR 
pause

```

### Example 2

```bash
ftosin --no-verify -o another-install.bat
```

Same as above, except it creates the `another-install.bat` instead of `install.bat`.

The `another-install.bat` has the same content as in [Example 1](#example-1).

### Example 3

```bash
ftosin --no-verify -d another-defaults.json
```

Same as first example, except it uses default values in `another-defaults.json` 

In `another-defaults.json`:

```json
{
    "defaults": {
        "connectionName": "training0001",
        "database": true,
        "dbName": "AlexG20",
        "dbSqlAuthPass": "host",
        "dbSqlAuthUser": "host",
        "iisWebSite": "Default Web Site",
        "instanceName": "AlexG20",
        "instancePath": "C:\\AlexG20",
        "kitPath": "C:\\Users\\ion.gireada\\Downloads\\FTOS-CORE-RLS-v20.1.0\\FTOS-CORE-RLS-v20.1.0\\FTOS-CORE-RLS-v20.1.0.0-b197-GOLD",
        "portal": true,
        "portalPath": "C:\\AlexG20\\Portal",
        "rootInstallationTarget": "C:\\",
        "studio": true,
        "studioPath": "C:\\AlexG20\\Studio",
        "template": "C:\\Users\\ion.gireada\\Documents\\VSCode Projects\\ftos-installer\\install.handlebars"
    }
}
```

### Example 4

```bash
ftosin --no-verify -d another-defaults.json -s new-defaults.json
```

Same as above and save installation values as defaults in `new-defaults.json`

### Example 5

```bash
ftosin --no-verify --no-database
```

Same as first example, except the `install.bat` will not have commands related to initializing and updating the database.

In `install.bat`:

```txt
REM
REM ================ FintechOS Installation ===================
REM
REM NOTE: To run this file, you MUST have Administrative rights
REM
REM                       S U M M A R Y
REM
REM             Install kit path: C:\Users\ion.gireada\Downloads\FTOS-CORE-RLS-v20.1.0\FTOS-CORE-RLS-v20.1.0\FTOS-CORE-RLS-v20.1.0.0-b197-GOLD
REM                Instance Name: AlexG20
REM
REM         Instance Studio path: C:\AlexG20\Studio
REM  Studio IIS Application Name: AlexG20Studio
REM
REM         Instance Portal path: C:\AlexG20\Portal
REM  Portal IIS Application Name: AlexG20Portal
REM
REM       .bat file generated on: 2020-01-29 13:11:05
REM Initialize instance database: true
REM      Install instance Studio: true
REM      Install instance Portal: true
REM           IIS Parent Website: Default Web Site
REM              Connection name: training0001
REM
REM ===========================================================
REM

IF NOT EXIST "C:\AlexG20" GOTO MKINSTANCE
RMDIR /S /Q C:\AlexG20
:MKINSTANCE
MKDIR C:\AlexG20
MKDIR C:\AlexG20\EBS_DIR
MKDIR C:\AlexG20\EBS_DIR

CD "C:\Users\ion.gireada\Downloads\FTOS-CORE-RLS-v20.1.0\FTOS-CORE-RLS-v20.1.0\FTOS-CORE-RLS-v20.1.0.0-b197-GOLD\SQL"
start BasicDbUpgrader.exe -i -s training0001 -d AlexG20 && BasicDbUpgrader.exe -w -s training0001 -d AlexG20 && BasicDbUpgrader.exe -g -s training0001 -d AlexG20
pause

powershell.exe -File "C:\Users\ion.gireada\Downloads\FTOS-CORE-RLS-v20.1.0\FTOS-CORE-RLS-v20.1.0\FTOS-CORE-RLS-v20.1.0.0-b197-GOLD\DesignerWebApp\DesignerWebAppInstaller.ps1" -p_MainCommand Install -p_InstallDir "C:\AlexG20\Studio" -p_IisWebSite "Default Web Site" -p_IisApp AlexG20Studio -p_IisAppPool AlexG20Studio -p_DbConnServer "training0001" -p_DbConnSqlAuthUser host -p_DbConnSqlAuthPass host -p_DbConnDb AlexG20 C:\AlexG20\EBS_DIR
pause

powershell.exe -File "C:\Users\ion.gireada\Downloads\FTOS-CORE-RLS-v20.1.0\FTOS-CORE-RLS-v20.1.0\FTOS-CORE-RLS-v20.1.0.0-b197-GOLD\PortalWebApp\PortalWebAppInstaller.ps1" -p_MainCommand Install -p_InstallDir "C:\AlexG20\Portal" -p_IisWebSite "Default Web Site" -p_IisApp AlexG20Portal -p_IisAppPool AlexG20Portal -p_DbConnServer "training0001" -p_DbConnSqlAuthUser host -p_DbConnSqlAuthPass host -p_DbConnDb AlexG20 -p_UploadEBSDir C:\AlexG20\EBS_DIR 
pause
```

### Example 6
```bash
ftosin --no-verify --no-studio
```

Same as first example, except the `install.bat` will not have commands related to creating the Studio application.

In `install.bat`:

```txt
REM
REM ================ FintechOS Installation ===================
REM
REM NOTE: To run this file, you MUST have Administrative rights
REM
REM                       S U M M A R Y
REM
REM             Install kit path: C:\Users\ion.gireada\Downloads\FTOS-CORE-RLS-v20.1.0\FTOS-CORE-RLS-v20.1.0\FTOS-CORE-RLS-v20.1.0.0-b197-GOLD
REM                Instance Name: AlexG20
REM
REM         Instance Studio path: C:\AlexG20\Studio
REM  Studio IIS Application Name: AlexG20Studio
REM
REM         Instance Portal path: C:\AlexG20\Portal
REM  Portal IIS Application Name: AlexG20Portal
REM
REM       .bat file generated on: 2020-01-29 13:13:05
REM Initialize instance database: true
REM      Install instance Studio: false
REM      Install instance Portal: true
REM           IIS Parent Website: Default Web Site
REM              Connection name: training0001
REM
REM ===========================================================
REM

IF NOT EXIST "C:\AlexG20" GOTO MKINSTANCE
RMDIR /S /Q C:\AlexG20
:MKINSTANCE
MKDIR C:\AlexG20
MKDIR C:\AlexG20\EBS_DIR

CD "C:\Users\ion.gireada\Downloads\FTOS-CORE-RLS-v20.1.0\FTOS-CORE-RLS-v20.1.0\FTOS-CORE-RLS-v20.1.0.0-b197-GOLD\SQL"
start BasicDbUpgrader.exe -i -s training0001 -d AlexG20 && BasicDbUpgrader.exe -w -s training0001 -d AlexG20 && BasicDbUpgrader.exe -g -s training0001 -d AlexG20
pause


powershell.exe -File "C:\Users\ion.gireada\Downloads\FTOS-CORE-RLS-v20.1.0\FTOS-CORE-RLS-v20.1.0\FTOS-CORE-RLS-v20.1.0.0-b197-GOLD\PortalWebApp\PortalWebAppInstaller.ps1" -p_MainCommand Install -p_InstallDir "C:\AlexG20\Portal" -p_IisWebSite "Default Web Site" -p_IisApp AlexG20Portal -p_IisAppPool AlexG20Portal -p_DbConnServer "training0001" -p_DbConnSqlAuthUser host -p_DbConnSqlAuthPass host -p_DbConnDb AlexG20 -p_UploadEBSDir C:\AlexG20\EBS_DIR 
pause
```

### Example 7

```bash
ftosin --no-verify --no-portal
```

Same as first example, except the `install.bat` will not have commands related to creating the Portal application.

```txt
REM
REM ================ FintechOS Installation ===================
REM
REM NOTE: To run this file, you MUST have Administrative rights
REM
REM                       S U M M A R Y
REM
REM             Install kit path: C:\Users\ion.gireada\Downloads\FTOS-CORE-RLS-v20.1.0\FTOS-CORE-RLS-v20.1.0\FTOS-CORE-RLS-v20.1.0.0-b197-GOLD
REM                Instance Name: AlexG20
REM
REM         Instance Studio path: C:\AlexG20\Studio
REM  Studio IIS Application Name: AlexG20Studio
REM
REM         Instance Portal path: C:\AlexG20\Portal
REM  Portal IIS Application Name: AlexG20Portal
REM
REM       .bat file generated on: 2020-01-29 13:14:08
REM Initialize instance database: true
REM      Install instance Studio: true
REM      Install instance Portal: false
REM           IIS Parent Website: Default Web Site
REM              Connection name: training0001
REM
REM ===========================================================
REM

IF NOT EXIST "C:\AlexG20" GOTO MKINSTANCE
RMDIR /S /Q C:\AlexG20
:MKINSTANCE
MKDIR C:\AlexG20
MKDIR C:\AlexG20\EBS_DIR

CD "C:\Users\ion.gireada\Downloads\FTOS-CORE-RLS-v20.1.0\FTOS-CORE-RLS-v20.1.0\FTOS-CORE-RLS-v20.1.0.0-b197-GOLD\SQL"
start BasicDbUpgrader.exe -i -s training0001 -d AlexG20 && BasicDbUpgrader.exe -w -s training0001 -d AlexG20 && BasicDbUpgrader.exe -g -s training0001 -d AlexG20
pause

powershell.exe -File "C:\Users\ion.gireada\Downloads\FTOS-CORE-RLS-v20.1.0\FTOS-CORE-RLS-v20.1.0\FTOS-CORE-RLS-v20.1.0.0-b197-GOLD\DesignerWebApp\DesignerWebAppInstaller.ps1" -p_MainCommand Install -p_InstallDir "C:\AlexG20\Studio" -p_IisWebSite "Default Web Site" -p_IisApp AlexG20Studio -p_IisAppPool AlexG20Studio -p_DbConnServer "training0001" -p_DbConnSqlAuthUser host -p_DbConnSqlAuthPass host -p_DbConnDb AlexG20 C:\AlexG20\EBS_DIR
pause
```

### Example 8

```bash
ftosin --no-verify --no-portal --no-database
```

Same as first example, except the `install.bat` will not have commands related to neither initializing and updating the database, nor creating the Portal application.

In `install.bat`:

```txt
REM
REM ================ FintechOS Installation ===================
REM
REM NOTE: To run this file, you MUST have Administrative rights
REM
REM                       S U M M A R Y
REM
REM             Install kit path: C:\Users\ion.gireada\Downloads\FTOS-CORE-RLS-v20.1.0\FTOS-CORE-RLS-v20.1.0\FTOS-CORE-RLS-v20.1.0.0-b197-GOLD
REM                Instance Name: AlexG20
REM
REM         Instance Studio path: C:\AlexG20\Studio
REM  Studio IIS Application Name: AlexG20Studio
REM
REM         Instance Portal path: C:\AlexG20\Portal
REM  Portal IIS Application Name: AlexG20Portal
REM
REM       .bat file generated on: 2020-01-29 13:15:24
REM Initialize instance database: false
REM      Install instance Studio: true
REM      Install instance Portal: false
REM           IIS Parent Website: Default Web Site
REM              Connection name: training0001
REM
REM ===========================================================
REM

IF NOT EXIST "C:\AlexG20" GOTO MKINSTANCE
RMDIR /S /Q C:\AlexG20
:MKINSTANCE
MKDIR C:\AlexG20
MKDIR C:\AlexG20\EBS_DIR


powershell.exe -File "C:\Users\ion.gireada\Downloads\FTOS-CORE-RLS-v20.1.0\FTOS-CORE-RLS-v20.1.0\FTOS-CORE-RLS-v20.1.0.0-b197-GOLD\DesignerWebApp\DesignerWebAppInstaller.ps1" -p_MainCommand Install -p_InstallDir "C:\AlexG20\Studio" -p_IisWebSite "Default Web Site" -p_IisApp AlexG20Studio -p_IisAppPool AlexG20Studio -p_DbConnServer "training0001" -p_DbConnSqlAuthUser host -p_DbConnSqlAuthPass host -p_DbConnDb AlexG20 C:\AlexG20\EBS_DIR
pause
```

### Example 9

```bash
ftosin --no-verify --no-studio --no-database
```

Same as first example, except the `install.bat` will not have commands related to neither initializing and updating the database, nor creating the Studio application.

In `install.bat`:

```txt
REM
REM ================ FintechOS Installation ===================
REM
REM NOTE: To run this file, you MUST have Administrative rights
REM
REM                       S U M M A R Y
REM
REM             Install kit path: C:\Users\ion.gireada\Downloads\FTOS-CORE-RLS-v20.1.0\FTOS-CORE-RLS-v20.1.0\FTOS-CORE-RLS-v20.1.0.0-b197-GOLD
REM                Instance Name: AlexG20
REM
REM         Instance Studio path: C:\AlexG20\Studio
REM  Studio IIS Application Name: AlexG20Studio
REM
REM         Instance Portal path: C:\AlexG20\Portal
REM  Portal IIS Application Name: AlexG20Portal
REM
REM       .bat file generated on: 2020-01-29 13:17:15
REM Initialize instance database: false
REM      Install instance Studio: false
REM      Install instance Portal: true
REM           IIS Parent Website: Default Web Site
REM              Connection name: training0001
REM
REM ===========================================================
REM

IF NOT EXIST "C:\AlexG20" GOTO MKINSTANCE
RMDIR /S /Q C:\AlexG20
:MKINSTANCE
MKDIR C:\AlexG20
MKDIR C:\AlexG20\EBS_DIR



powershell.exe -File "C:\Users\ion.gireada\Downloads\FTOS-CORE-RLS-v20.1.0\FTOS-CORE-RLS-v20.1.0\FTOS-CORE-RLS-v20.1.0.0-b197-GOLD\PortalWebApp\PortalWebAppInstaller.ps1" -p_MainCommand Install -p_InstallDir "C:\AlexG20\Portal" -p_IisWebSite "Default Web Site" -p_IisApp AlexG20Portal -p_IisAppPool AlexG20Portal -p_DbConnServer "training0001" -p_DbConnSqlAuthUser host -p_DbConnSqlAuthPass host -p_DbConnDb AlexG20 -p_UploadEBSDir C:\AlexG20\EBS_DIR 
pause
```

### Example 10

```bash
ftosin --no-verify --no-studio --no-database --no-portal
```

Same as first example, except the `install.bat` will not have commands related to neither initializing and updating the database, creating the Studio application, nor creating the Portal application.

In `install.bat`:

```txt
REM
REM ================ FintechOS Installation ===================
REM
REM NOTE: To run this file, you MUST have Administrative rights
REM
REM                       S U M M A R Y
REM
REM             Install kit path: C:\Users\ion.gireada\Downloads\FTOS-CORE-RLS-v20.1.0\FTOS-CORE-RLS-v20.1.0\FTOS-CORE-RLS-v20.1.0.0-b197-GOLD
REM                Instance Name: AlexG20
REM
REM         Instance Studio path: C:\AlexG20\Studio
REM  Studio IIS Application Name: AlexG20Studio
REM
REM         Instance Portal path: C:\AlexG20\Portal
REM  Portal IIS Application Name: AlexG20Portal
REM
REM       .bat file generated on: 2020-01-29 13:18:49
REM Initialize instance database: false
REM      Install instance Studio: false
REM      Install instance Portal: false
REM           IIS Parent Website: Default Web Site
REM              Connection name: training0001
REM
REM ===========================================================
REM

IF NOT EXIST "C:\AlexG20" GOTO MKINSTANCE
RMDIR /S /Q C:\AlexG20
:MKINSTANCE
MKDIR C:\AlexG20
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
`connectionName` | string | Connection name | "training0001"
`database` | boolean | Switch indicates to create `.bat` section to initialize and upgrade database | true
`dbName` | string | Name of database to use | `options.dbName`
`dbSqlAuthPass` | string | Password of username for Microsoft SQL Server Manager | `host`
`dbSqlAuthUser` | string | Username for Microsoft SQL Server Manager | `host`
`dateTime` | DateTime | Date and time of `install.bat` generation | application-provided value as `yyyy-mm-dd hh:mm:ss`
`iisWebSite` | string | Name of website on IIS. Studio and Portal apps will be hosted here. | "Default Web Site"
 `instanceName` | string | Name of FintechOS installation -- used as base for several values | `options.instanceName`
 `instancePath` | string | Instance applications root folder | C:\{{instanceName}}
 `kitPath` | string | Path to installation kit - folder ending in -GOLD | options.kitPath
 `portal` | boolean | Switch to indicate portal application commands will be generated  | true
 `portalPath` | string | Path where portal application will be stored | `options.portalPath`
 `studio` | boolean | Switch to indicate studio application commands will be generated | true
 `studioPath` | string | Path where studio application will be stored | `options.studioPath`
