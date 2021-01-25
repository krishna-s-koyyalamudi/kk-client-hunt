window.addEventListener('load', (main) => {
    console.log('page loaded');
});
locationElement.addEventListener('click', (locationHandler) => {
    console.log('click registered')
});
locationElement.addEventListener('touch', (locationHandler) => {
    console.log('touch recognized')
});