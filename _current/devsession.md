---
layout: page
title: DevSession
permalink: /current/devsession
tags: development tool nodejs editor javascript collaboration windows linux macos ide
category: current
comments: true
---

DevSession is an open-source collarborative IDE that is built on modern web-technologies and allows users
to quickly jump into a coding session from one of a users local directories. DevSession can be started
by entering a terminal command in the directory of a project on which users want to collaborate on, and
a new coding session will be started and a shareable link is created that everyone can join with.

The session features an IDE that can be accessed from any browser and that allows everyone to view
and edit seperate files, while selections and positions of other users are highlighted in the editor.
It also includes more features such as an integrated terminal, integrated port-sharing, a permission-system
and more.

Currently work-in-progress/early alpha, but you can try it out with ``npx devsession`` in
the directory in which you want to start a coding session, or by downloading the GUI starter
from the [latest release](https://github.com/lukasbach/devsession/releases/latest).

More details are available on the devsession website: 
[https://devsession.js.org](https://devsession.js.org)

## CLI

You can run devsession from anywhere by entering ``npx devsession``, which will automatically download, 
install and run devsession. You can install it globally by entering ``npm i -g devsession``, so you can
just invoke ``devsession`` at any time.

You can also install devsession as a dev dependency to your project and create an npm script in your
``package.json`` with preset CLI arguments to quickly enter a session that fits the projects needs.

You can use the following arguments:

* ``-p, --port [port]``, The port on which to run the server. Defaults to 8020.
* ``-k, --adminkey [key]``, This key can be used to register a user as an admin. Defaults to a random string.
* ``-d, --dir [dir]``, The project directory. Defaults to the current directory.
* ``-v, --verbose``, Log all socket messages for debugging.
* ``-a, --autosave``, Duration (in seconds) of periodic auto saving of all open files. 0 = disabled. Defaults to 120.

## Building/Contributing

The project is set up as a monorepo using Lerna. Note that, prior to doing anything else and 
especially prior to installing dependencies, you need to run ``npx lerna link`` to establish
symlinks between the packages.

 * To start developing, run ``yarn && yarn start`` in the root directory. This will start
   a development server for the backend and the frontend and automatically recompile if
   changes are detected. The backend starts on port 8020, the frontend on port 3000.
   To debug, open the frontend from the url:
   ``http://localhost:3000/?adminkey=adminkey&backend=http://localhost:8020``
   
 * To run a new build, run ``yarn && yarn build``. This will build the common package,
   the backend, the frontend, the website and the guistarter app.
   
 * To release a new version, run ``yarn && yarn pub``. This will build everything, bump
   versions for all packages, upload new versions for the packages which are deployed
   on npm and commit and push the version bumps. The CI pipeline will pick that up and
   redeploy the website and attach the guistarter binaries with the github release.
   
## Acknowledgements

Notable third-party frameworks used are:

 * Microsofts Monaco as editor frontend
 * Microsofts Typescript as primary programming language
 * Facebooks React for frontend development
 * Redux and Palantirs Redoodle for state management
 * Palantirs BlueprintJs as UI library
 * ExpressJS for the backend
 * Socket.io for real-time communication between frontend and backend
 * Electron for creating a standalone binary of the GUI starter
 * ngrok and localtunnel as built-in port-forwarding service
 * Node-pty for running terminals in the backend
 * xterm for displaying terminals in the frontend
 
 ...as well as many others.
