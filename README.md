# ftos-installer

CLI app to assist the installation process of FintechOS framework

## Installation

Install the package globally.

```bash
$ npm install ftos-installer -g
```

## Usage

```
Usage: ftosin [options]

Options:
  -d, --defaults [filename]        Filename or full path to file with default values (default: "ftos-defaults.json")
  --no-verify                      do not check paths are valid
  --no-database                    skip installing instance database
  --no-studio                      skip installing instance Studio
  --no-portal                      skip installing instance Portal
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
$ mkdir C:\Users\default\Documents\FintechOS-Installations
$ cd C:\Users\default\Documents\FintechOS-Installations
$ ftosin --no-verify --output ./v20-install/install-SheldonG20.bat
```


