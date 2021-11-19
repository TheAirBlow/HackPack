# UchiHack
This is a script that can solve everything on Uchi.ru, except:
* Olympiads
* Games

**THIS SOFTWARE IS PROVIDED "AS IS" WITHOUT ANY WARRANTIES.**\
**IT DOESN'T HACK ANYTHING. IT IS A CLIENT-SIDE THING THAT UTILIZES UNMODIFIED UCHI.RU FUNCTIONS.**

## Changelog
* v0.1.0 - shitcode
* v1.0.0 - first version
* v1.1.0 - old exercises
* v1.1.1 - bugfix
* v2.0.0 - control buttons on left
* v2.1.0 - now they are on bottom, looks better
* v2.2.0 - status
* v2.2.1 - bugfix
* v2.2.2 - decreased `__score` setTimeout time
* v2.2.3 - show version
* v2.2.4 - all setTimeouts' times were decreased
* v2.2.5 - do not load if already loaded
* v2.2.5-fix - bugfix
* v2.2.5-fix2 - bugfix
* v2.2.5-fix3 - bugfix
* v2.2.5-fix4 - bugfix
* v2.3.0 - english instead of russian, a lot of comments

## How to use
**Warning!** Console script and tampermonkey are now deprecated.

### Firefox Plugin
Version v2.3.0\
https://addons.mozilla.org/addon/uchihack/

## How to report bugs?
**I will ignore anything related to olympiads.**

* Open [link](https://theairblow.github.io/)
* Scroll down
* Press the e-mail button
* Write link to the exercise
* Write error that was thrown
* Write how to reproduce it

## FAQ
### How it works?
Uchi.ru checks answers `server-side`, not `client-side`, and sends `events` if it was successful or not. Progress is sent using `$store`.

Exercise is marked as solved by sending `$lesson_finish`, but it doesn't change the progress which may get you banned.
### What are the `events`?
1) Clicking on buttons
2) Click on Done button
3) Dragging
4) Exercise solved right
5) Exercise solved wrong
6) Entire exercise marked as solved

## Other
Beads count can't be bypassed, it will throw `no_beads_left` if you try to send a request.

