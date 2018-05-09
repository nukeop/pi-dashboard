# pi-dashboard

A Raspberry Pi-oriented terminal dashboard with information I consider useful.

## Getting started

I use a Pi 3 as a home server with an external HDD attached to it. To monitor its status easily, I have also purchased a small LCD TFT screen with a case for it and the Pi. This dashboard will look best on one of those simple screens, such as the [Waveshare models](https://www.waveshare.com/3.5inch-rpi-lcd-a.htm).

To run the project, clone this repo, and run these commands:

```bash
$ cd pi-dashboard
$ npm install
$ npm start
```

Before you run, edit `config.js` and change the monitoredDisk to a device you want to monitor, such as `/dev/sda1`.

## Developing

There is no special development mode, run the same commands as above to test changes to your code.

## Deploying

I configured my Pi to start a tmux session on startup, and run the dashboard in the first tab. This way whenever Pi reboots, it starts displaying the dashboard on the LCD automatically.

# Features

The dashboard features several screns that display different sets of data.
They rotate every few seconds.

* Disk monitor - shows free/used space
* Network monitor - shows local IP and network utilization

# Screenshots

![1](https://i.imgur.com/KhSq0tD.jpg)

![2](https://i.imgur.com/cKYmqez.jpg)

# Contributing

Feel free to open a pull request with anything you like.
If you want to add a larger feature, it would likely make sense to encapsulate it in a separate screen.

# Licensing

GNU GPLv3.
