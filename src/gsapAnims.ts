import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

gsap.to('.textContainer', {
    scale: 1.2,
    y: 280,
    duration: 2,
    scrollTrigger: {
        trigger: '.textContainer',
        start: 5,
        scrub: 1,
    },
});

/* const boxes = gsap.utils.toArray('.parallax');
boxes.forEach((image) => {
    gsap.to(image, {
        // this will animate ALL boxes
        scale: 1.2,
        scrollTrigger: {
            trigger: image, // this will use the first box as the trigger
            scrub: true,
        },
    });
});
 */

let sections = gsap.utils.toArray('.imagesContainer');

/* gsap.to(sections, {
    yPercent: -100 * (sections.length - 1),
    ease: 'none',
    scrollTrigger: {
        trigger: '.cont',
        pin: true,
        start: 'top top',
        scrub: 0.5,
        snap: 1 / (sections.length - 1),
        end: () => {
            const element = <HTMLElement>document.querySelector('.cont');

            return `+=${element.offsetHeight}`;
        },
        markers: { fontSize: '1.2rem', endColor: 'white' },
    },
    duration: 10,
}); */

// window.addEventListener('resize', setPinSpacerHeight);
// window.addEventListener('DOMContentLoaded', setPinSpacerHeight);

// solves the issues off extra space at the end of wrapper div due to yPercent in scrollTrigger
function setPinSpacerHeight() {
    const spacer = <HTMLElement>document.querySelector('.pin-spacer');
    const section = <HTMLElement>document.querySelector('section');

    spacer.style.maxHeight = `${section.clientHeight * 4}px`;
}
