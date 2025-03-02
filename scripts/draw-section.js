const paintCanvas = document.querySelector('.js-paint');
const drawContext = paintCanvas.getContext('2d');
drawContext.lineCap = 'round';

const colorPicker = document.querySelector('.js-color-picker');

colorPicker.addEventListener('change', event => {
    drawContext.strokeStyle = event.target.value;
});

const lineWidthRange = document.querySelector('.js-line-range');
const lineWidthLabel = document.querySelector('.js-range-value');

lineWidthRange.addEventListener('input', event => {
    const width = event.target.value;
    lineWidthLabel.innerHTML = width;
    drawContext.lineWidth = width;
});

let x = 0, y = 0;
let isMouseDown = false;

const stopDrawing = () => { isMouseDown = false; };
const startDrawing = event => {
    isMouseDown = true;
    [x, y] = [event.offsetX, event.offsetY];
};

const drawLine = event => {
    if (isMouseDown) {
        const newX = event.offsetX;
        const newY = event.offsetY;
        drawContext.beginPath();
        drawContext.moveTo(x, y);
        drawContext.lineTo(newX, newY);
        drawContext.stroke();
        [x, y] = [newX, newY];
    }
};

const startDrawingTouch = event => {
    const rect = paintCanvas.getBoundingClientRect();
    isMouseDown = true;
    [x, y] = [event.touches[0].clientX - rect.left, event.touches[0].clientY - rect.top];
};

const drawLineTouch = event => {
    if (isMouseDown) {
        const rect = paintCanvas.getBoundingClientRect();
        const newX = event.touches[0].clientX - rect.left;
        const newY = event.touches[0].clientY - rect.top;
        drawContext.beginPath();
        drawContext.moveTo(x, y);
        drawContext.lineTo(newX, newY);
        drawContext.stroke();
        [x, y] = [newX, newY];
    }
};


const resizeCanvas = () => {
    const containerWidth = paintCanvas.parentElement.offsetWidth;
    const aspectRatio = 1 / 1;
    const containerHeight = containerWidth / aspectRatio;

    paintCanvas.width = containerWidth;
    paintCanvas.height = containerHeight;

    drawContext.lineCap = 'round';
    drawContext.strokeStyle = colorPicker.value;
    drawContext.lineWidth = lineWidthRange.value;
};
const stopDrawingTouch = () => { isMouseDown = false; };

paintCanvas.addEventListener('mousedown', startDrawing);
paintCanvas.addEventListener('mousemove', drawLine);
paintCanvas.addEventListener('mouseup', stopDrawing);
paintCanvas.addEventListener('mouseout', stopDrawing);

// Добавление обработчиков для сенсорных событий
paintCanvas.addEventListener('touchstart', startDrawingTouch);
paintCanvas.addEventListener('touchmove', drawLineTouch);
paintCanvas.addEventListener('touchend', stopDrawingTouch);
paintCanvas.addEventListener('touchcancel', stopDrawingTouch);  // Для обработки прерванных касаний

// Предотвращение стандартной обработки сенсорных событий
paintCanvas.addEventListener('touchstart', e => e.preventDefault());
paintCanvas.addEventListener('touchmove', e => e.preventDefault());

window.addEventListener('load', resizeCanvas);
window.addEventListener('resize', resizeCanvas);
