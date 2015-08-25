## Latest Release: 0.9.5

* Refactored and bug fixed `initResrc()` due to incorrectly breaking out of the loop when iterating through elements with a blank src.
* Exposed the library build version `resrc.version`.
* Added basic unit tests.
* Added Bower package manager support.
* Added Travis continuous integration support.

## 0.9.4

* Bug fix in `replaceElementSrc()` for images with an initial width of 0 being ignored. 
* Refactored `getDeviceScreenInnerWidth()` for better fallback.
* Refactored `pixelRound()` so passing in a value of 0 returns 1 rather than Infinity.
* Added `maxAllowedSize()` which limits the maximum size (default: 10000) the resrcSizeParam variable can return.

## 0.9.3

* Allow URL API parameters that have a key but no value to be parsed correctly.
* Handle `onerror` event loop when the fallback image also errors.

## 0.9.2

* Fixed conditional ternary operator where query parameters were being ignored from the image url.
* Update package.json with script path.

## 0.9.1

* Removed getAttribute("resrc") from the `getImgSrc()` function. This was causing an error in Internet Explorer 8 and below.

## 0.9.0

* Removed redundant multiple calls to parseUri. 
* Added `resrc.configure()` as a public method. 
* resrc.configure() is a utility method for quick options setting.
* resrc.configure() can be chained as it returns the resrc object.
* Renamed `resrc.resrc()` to `resrc.run()`. Made sense for nicer readable code.

Hat Tip to [Alan Pich](https://github.com/alanpich) for his time and effort towards this release.

## 0.8.0

* First open source release. 

### 0.0.1 - 0.7.0

* Responsively awesome things :)