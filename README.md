# PCH code collection

Hi. This repository contains all information I could gather when I was writing a library and ioBroker adapter which allows to communicate with Philips Clean Home devices. It only allows communication to newer generations which uses COAP protocol with encryption.

I did that because the app often does not get a connection to the device at all and the device does a lot of communication with server running in AWS Shanghai. Most communication to the device is via internet which seems unneeded. Furthermore, I wanted to be more flexible when controlling the device.

There are still some issues regarding error handling and some message seems to be rejected.

Sadly I do not have the time to maintain any of it. But maybe it helps you with writing your own applications. If you want you can also use the ioBroker adapter as base for a maintained version. Keep in mind though that there is a dependency to the pch library in this repository. Both is not pushed to npm. I resolved the dependency via file path on my machine.

