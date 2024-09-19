const dvdLogo = document.getElementById('RatingDiv');
let posX = Math.random() * window.innerWidth;
let posY = Math.random() * window.innerHeight;
let velocityX = 2;
let velocityY = 2;
const logoWidth = dvdLogo.offsetWidth;
const logoHeight = dvdLogo.offsetHeight;

const dampingFactor = 0.99;
const minimumSpeed = 2;

let animationId;  // Variable to hold the animation frame ID
let isPaused = false;  // Track if the animation is paused
let isDragging = false; // Track if the logo is being dragged
let dragStartX = 0;  // Store mouse position when drag starts
let dragStartY = 0;  // Store mouse position when drag starts

// Function to move the DVD logo
function moveLogo() {
    if (!isPaused && !isDragging) {
        posX += velocityX;
        posY += velocityY;

        velocityX *= dampingFactor;
        velocityY *= dampingFactor;

        if (Math.abs(velocityX) < minimumSpeed) velocityX = minimumSpeed * Math.sign(velocityX);
        if (Math.abs(velocityY) < minimumSpeed) velocityY = minimumSpeed * Math.sign(velocityY);

        // Bounce off the left and right edges
        if (posX + logoWidth >= window.innerWidth || posX <= 0) {
            velocityX = -velocityX; // Reverse horizontal direction
        }

        // Bounce off the top and bottom edges
        if (posY + logoHeight >= window.innerHeight || posY <= 0) {
            velocityY = -velocityY; // Reverse vertical direction
        }

        // Apply the new position
        dvdLogo.style.left = `${posX}px`;
        dvdLogo.style.top = `${posY}px`;
    }

    // Continuously update the position
    animationId = requestAnimationFrame(moveLogo);
}

// Event listener to start dragging
dvdLogo.addEventListener('mousedown', function (event) {
    isDragging = true;
    dragStartX = event.clientX;
    dragStartY = event.clientY;
    isPaused = true;  // Pause the bouncing while dragging
});

// Event listener to stop dragging and continue the animation
document.addEventListener('mouseup', function (event) {
    if (isDragging) {
        isDragging = false;
        isPaused = false;  // Resume the animation

        // Calculate new velocity based on mouse release direction
        velocityX = (event.clientX - dragStartX) / 10;
        velocityY = (event.clientY - dragStartY) / 10;
    }
});

// Event listener to drag the logo around the screen
document.addEventListener('mousemove', function (event) {
    if (isDragging) {
        posX = event.clientX - logoWidth / 2;
        posY = event.clientY - logoHeight / 2;

        // Apply the new position while dragging
        dvdLogo.style.left = `${posX}px`;
        dvdLogo.style.top = `${posY}px`;
    }
});

// Start the animation
moveLogo();
