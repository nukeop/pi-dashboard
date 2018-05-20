class Carousel {
  constructor(views, options) {
    this.currentView = 0;
    this.views = views;
    this.options = options;
    this.screen = this.options.screen;
  }

  move() {
    let i = this.screen.children.length;
    while (i--) {
      this.screen.children[i].detach();
    }

    this.views[this.currentView].create();
    this.views[this.currentView].draw();
    this.screen.render();
  }

  next() {
    this.views[this.currentView].destroy();
    
    this.currentView++;
    if (this.currentView===this.views.length) {
      this.currentView = 0;
    }

    this.move();
  }

  start() {
    this.move();

    if(this.options.interval) {
      setInterval(this.next.bind(this), this.options.interval);
    }
  }
}

module.exports = Carousel;
