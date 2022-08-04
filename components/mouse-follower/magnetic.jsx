import gsap from 'gsap';

export default class Magnetic {
   constructor(el, options = {}) {
      this.el = el;
      this.options = Object.assign(
         {
            y: 0.3,
            x: 0.3,
            s: 0.2,
            rs: 0.7,
         },
         this.el.getAttribute('data-magnetic') || options
      );

      this.y = 0;
      this.x = 0;
      this.width = 0;
      this.height = 0;

      if (this.el.getAttribute('data-magnetic-init')) return;
      this.el.setAttribute('data-magnetic-init', true);

      this.bind();
   }

   bind() {
      this.el.addEventListener('mouseenter', () => {
         this.y = this.el.getBoundingClientRect().top;
         this.x = this.el.getBoundingClientRect().left;
         this.width = this.el.offsetWidth;
         this.height = this.el.offsetHeight;
      });

      this.el.addEventListener('mousemove', (e) => {
         const y = (e.clientY - this.y - this.height / 2) * this.options.y;
         const x = (e.clientX - this.x - this.width / 2) * this.options.x;

         this.move(x, y, this.options.s);
      });

      this.el.addEventListener('mouseleave', (e) => {
         this.move(0, 0, this.options.rs);
      });
   }

   move(x, y, speed) {
      gsap.to(this.el, {
         y: y,
         x: x,
         force3D: true,
         overwrite: true,
         duration: speed,
      });
   }
}
