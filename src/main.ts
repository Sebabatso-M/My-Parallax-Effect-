// @ts-ignore
/* import Lenis from '@studio-freight/lenis';

const lenis = new Lenis();

function raf(time: number) {
    lenis.raf(time);
    requestAnimationFrame(raf);
}

requestAnimationFrame(raf); */

const parallaxImgs = document.querySelectorAll('.parallax');

// value by which elements will move in respective directions
let xValue = 0;
let yValue = 0;
let zValue = 0;

let rotateDegree = 0;

// used to set whether images should move based on mouse movement
let followMouseMovement = false;

const imagesContainers = document.querySelectorAll('.imagesContainer');

// change the followMouseMovement attr in order to use for determining if whether images should move based on mouse movement
imagesContainers.forEach((imageContainer) => {
    const section = <HTMLElement>imageContainer;

    section.addEventListener('mouseenter', () => {
        section.dataset.followmousemovement = 'true';
    });
    section.addEventListener('mouseleave', () => {
        section.dataset.followmousemovement = 'false';
    });
});

window.addEventListener('scroll', () => (followMouseMovement = false));

window.addEventListener('mousemove', (e: MouseEvent) => {
    // assign cursor coordinates to respective x and y value
    // coordinates of distance from center
    xValue = e.clientX - window.innerWidth / 2;
    yValue = e.clientY - window.innerHeight / 2;
    zValue = xValue * 1.2;

    // ensures that images are always moving in the positive z-direction
    if (Math.sign(zValue) === -1) {
        zValue *= -1;
    }

    // setting a limit to xValue when positive
    // to reduce the amount in which th pictures move to the right
    if (xValue > 320) {
        xValue = 320;
    }

    // sets a range of -40 to 18
    // should be -40 to 40 but its 18 due to the limit set to xValue(320)
    rotateDegree = (xValue / (window.innerWidth / 2)) * 40;

    parallaxImgs.forEach((element) => {
        const image = <HTMLImageElement>element;
        const parentElement = image.parentElement;

        const xRate = parseFloat(image.dataset.speedx!);
        const yRate = parseFloat(image.dataset.speedy!);
        const zRate = parseFloat(image.dataset.speedz!);
        const rRate = parseFloat(image.dataset.rotate!);

        // used to set whether images should move based on mouse movement
        const followMouseMovement =
            parentElement?.dataset.followmousemovement === 'true'
                ? true
                : false;

        if (followMouseMovement) {
            image.style.transform = `
        translateX(${xValue * xRate}px) 
        translateY(${yValue * yRate}px) 
        translateZ(${zValue * zRate}px)
        rotateY(${rotateDegree * rRate}deg)`;
        } else {
            // reset image transformations
            image.style.transform = `
        translateX(${0}px) 
        translateY(${0}px) 
        translateZ(${0}px)
        rotateY(${0}deg)`;
        }
    });
});

// checks if device is in portrait mode
const isPortrait = window.matchMedia('(orientation: portrait)').matches;

window.addEventListener('resize', setLandscape);

function setLandscape() {
    imagesContainers.forEach((container) => {
        const section = container as HTMLElement;

        if ((isMobile() || isTablet()) && isPortrait) {
            // had to set this implicitly so that top stylings for section can take effect
            document.body.style.width = `100vw`;
            document.body.style.height = `100vh`;

            section.style.width = `100vh`;
            section.style.height = `100vw`;

            section.style.transformOrigin = `center`;
            section.style.left = `50%`;
            section.style.top = `50%`;
            section.style.transform = `translate(-50%,-50%) rotate(90deg)`;
        }
    });
}

// when device is rotated, check if its in landscape
// if in landscape then remove the inline css added using javascript
window
    .matchMedia('(orientation: landscape)')
    .addEventListener('change', (e: MediaQueryListEvent) => {
        resetForLandscape(e.matches);
    });

function resetForLandscape(matches: boolean) {
    const isLandscape = matches;
    imagesContainers.forEach((container) => {
        const section = container as HTMLElement;
        if (isLandscape) {
            section.removeAttribute('style');
        }
    });
}
setLandscape();
// working on loader
window.addEventListener('load', () => {});

// Check if the device is a tablet
function isTablet() {
    const ua = navigator.userAgent.toLowerCase();
    const isTablet =
        /(ipad|android(?!.*mobile)|tablet|kindle)|(windows(?!.*phone)(.*touch))/.test(
            ua
        );
    return isTablet;
}

// Check if the device is a mobile
function isMobile() {
    const ua = navigator.userAgent.toLowerCase();
    const isMobile = /(android|iphone|ipod|windows phone)/.test(ua);
    return isMobile;
}
