// @ts-ignore
import Lenis from '@studio-freight/lenis';

const lenis = new Lenis();

function raf(time: any) {
    lenis.raf(time);
    requestAnimationFrame(raf);
}

requestAnimationFrame(raf);

const parallaxImgs = document.querySelectorAll('.parallax');

// value by which elements will move in respective directions
let xValue = 0;
let yValue = 0;
let zValue = 0;

let rotateDegree = 0;

window.addEventListener('mousemove', (e: MouseEvent) => {
    // assign cursor coordinates to respective x and y value
    // coordinates of distance from center
    xValue = e.clientX - window.innerWidth / 2;
    yValue = e.clientY - window.innerHeight / 2;
    rotateDegree = (xValue / (window.innerWidth / 2)) * 20;

    parallaxImgs.forEach((element) => {
        const image = <HTMLImageElement>element;

        zValue = e.clientX - parseFloat(getComputedStyle(image).left);

        const xRate = parseFloat(image.dataset.speedx!);
        const yRate = parseFloat(image.dataset.speedy!);
        const zRate = parseFloat(image.dataset.speedz!);
        const rRate = parseFloat(image.dataset.rotate!);

        image.style.transform = `
        translateX(${-xValue * xRate}px) 
        translateY(${yValue * yRate}px) 
        translateZ(${zValue * zRate}px)
        rotateY(${rotateDegree * rRate}deg)`;
    });
});
