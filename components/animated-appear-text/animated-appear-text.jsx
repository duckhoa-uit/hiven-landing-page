import gsap, { Circ } from 'gsap';

// function AnimatedAppearText1({ sentence }) {
//    useEffect(() => {
//       let textWrapper = document.querySelector('.textWrapper');
//       let textWrapperContent = '';

//       for (let i = 0; i < sentence.length; i++) {
//          let content =
//             `
//                     <div class="wordContainer">
//               <div class="word">
//                 <p>` +
//             sentence[i] +
//             `</p>
//                         </div>
//                     </div>`;
//          textWrapperContent += content;
//       }

//       this.textWrapper.innerHTML = textWrapperContent;

//       let easing = Circ.easeInOut,
//          words = document.querySelectorAll('.word');

//       gsap.to(
//          words,
//          //  0.8,
//          {
//             transform: 'translateY(0%)',
//             ease: easing,
//             stagger: 0.15,
//          }
//          //  0.15
//       );
//    }, []);

//    return <></>;
// }

export default class AnimatedAppearText {
   constructor() {
      this.easing = Circ.easeInOut;
      this.words = document.querySelectorAll('.word');

      this.bind();
   }

   bind() {
      gsap.timeline().to(this.words, {
         transform: 'translateY(0%)',
         ease: this.easing,
         stagger: 0.15,
      });
   }
}
