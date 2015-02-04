# osvr-device-descriptor-editor

> Browser-based editor for OSVR device descriptor JSON..

## Build instructions
You need `npm`, `grunt-cli`, and `bower` installed globally. I think. Get `npm` with your package system, then this should get the rest:

```bash
npm i -g grunt-cli
npm i -g bower
```

Add `sudo` as needed.

If you're on Windows, use of [Chocolatey](https://chocolatey.org) is recommended, in which case

```
choco install nodejs.commandline npm
```

should take place before the `npm` commands above.

To build this web site:

```bash
npm i && grunt
```

Output ends up in `dist`.

You can serve it locally with

```bash
grunt server
```

## About

This system is based around the "JSON Schema Based Editor" [jdorn/json-editor](https://github.com/jdorn/json-editor) for the main interactivity.

[Bootstrap](http://getbootstrap.org) is used for styling, of course.

`Assemble` is used for the static site assembly from source.


## License
Copyright (c) 2014-2015 Sensics, Inc., contributors.
Intended to be released under the Apache-2.0 license

***
