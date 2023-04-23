const moon = document.querySelector(".moon");
const path = document.querySelector(".path");
var space = document.querySelector(".space").getBoundingClientRect();
const apoapsisInput = document.querySelector("#apoapsis");
const periapsisInput = document.querySelector("#periapsis");
const eccentricityInput = document.querySelector("#eccentricity");
const speedInput = document.querySelector("#speed");

// reset the value of the space on resize to update orbit
window.addEventListener('resize', function() {
  space = document.querySelector(".space").getBoundingClientRect();
  path.style.left = ( space.width / 2 ) + ( (apoapsis - periapsis) / 2 ) + "px";
});

// default value for periapsis, apoapsis...
var periapsis = 100;
var apoapsis = 200;
var eccentricity = 50; //%

// (periapsis + apoapsis) / 4 is the max eccentricity, 0 is the min
var foci = (eccentricity / 100) * ((periapsis + apoapsis) / 4);

// define the major and minor axis of the ellipse
var major_axis = periapsis + apoapsis;
var minor_axis = 2 * Math.sqrt(Math.pow(major_axis/2, 2) - Math.pow(foci, 2));

// just in case :)
console.log(`minor_axis : ${minor_axis} | major_axis : ${major_axis}`);

// let the user change the values with range input
apoapsisInput.addEventListener("input", (event) => {
  apoapsis = Number(event.target.value);
  foci = (eccentricity / 100) * ((periapsis + apoapsis) / 4);
  major_axis = periapsis + apoapsis;
  minor_axis = 2 * Math.sqrt(Math.pow(major_axis/2, 2) - Math.pow(foci, 2));
  path.style.left = ( space.width / 2 ) + ( (apoapsis - periapsis) / 2 ) + "px";
  path.style.width = major_axis + "px";
  path.style.height = minor_axis + "px";
});

periapsisInput.addEventListener("input", (event) => {
  periapsis = Number(event.target.value);
  foci = (eccentricity / 100) * ((periapsis + apoapsis) / 4);
  major_axis = periapsis + apoapsis;
  minor_axis = 2 * Math.sqrt(Math.pow(major_axis/2, 2) - Math.pow(foci, 2));
  path.style.left = ( space.width / 2 ) + ( (apoapsis - periapsis) / 2 ) + "px";
  path.style.width = major_axis + "px";
  path.style.height = minor_axis + "px";
  x = (major_axis / 2) * Math.cos(180 * Math.PI / 180);
  y = (minor_axis / 2) * Math.sin(180 * Math.PI / 180);
  distance = Math.sqrt(Math.pow(x + ((apoapsis - periapsis) / 2), 2) + Math.pow(y, 2));
  forceOfAttractionMax = ((G * m * M) / Math.pow(distance, 2)) / 10e30 + 1;
});

eccentricityInput.addEventListener("input", (event) => {
  eccentricity = Number(event.target.value);
  foci = (eccentricity / 100) * ((periapsis + apoapsis) / 4);
  major_axis = periapsis + apoapsis;
  minor_axis = 2 * Math.sqrt(Math.pow(major_axis/2, 2) - Math.pow(foci, 2));
  path.style.left = ( space.width / 2 ) + ( (apoapsis - periapsis) / 2 ) + "px";
  path.style.width = major_axis + "px";
  path.style.height = minor_axis + "px";
});

path.style.left = ( space.width / 2 ) + ( (apoapsis - periapsis) / 2 ) + "px";
path.style.width = major_axis + "px";
path.style.height = minor_axis + "px";

// calculate period of orbit using Kepler's third law
const a = (periapsis + apoapsis) / 2; // average distance from Earth
const G = 6.6743e-11; // gravitational constant
const M = 5.9722e24; // mass of Earth
const m = 7.4e22;

// calculate position of the moon for every angle from 0 to 360 degree then start again
let angle = 0;
let speedAccent = 3;

let x = (major_axis / 2) * Math.cos(180 * Math.PI / 180);
let y = (minor_axis / 2) * Math.sin(180 * Math.PI / 180);
let distance = Math.sqrt(Math.pow(x + ((apoapsis - periapsis) / 2), 2) + Math.pow(y, 2));
let forceOfAttractionMax = ((G * m * M) / Math.pow(distance, 2)) / 10e30 + 1;

speedInput.addEventListener("input", (event) => {
  speedAccent = Number(event.target.value);
});

const updatePosition = () => {

  // calculate the speed using Newton's formula
  const forceOfAttraction = (G * m * M) / Math.pow(distance, 2);
  const speed = (forceOfAttractionMax - (forceOfAttraction / 10e30)) / speedAccent;
  //console.log(speed);

  const x = (major_axis / 2) * Math.cos(angle * Math.PI / 180);
  const y = (minor_axis / 2) * Math.sin(angle * Math.PI / 180);
  const xPos = (space.width / 2) + (x + ((apoapsis - periapsis) / 2));
  const yPos = (space.height / 2) + y;

  moon.style.top = yPos + "px";
  moon.style.left = xPos + "px";
  
  clearInterval(interval);
  interval = setInterval(updatePosition, speed);

  // update distance for next iteration
  distance = Math.sqrt(Math.pow(x + ((apoapsis - periapsis) / 2), 2) + Math.pow(y, 2));

  angle++;
  if (angle >= 360) {
    angle = 0;
  }
};

let interval = setInterval(updatePosition, 10); // initial interval of 10ms
