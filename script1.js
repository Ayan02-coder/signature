window.addEventListener('load', () => {
    const canvas = document.getElementById('mycanvas');
    const ctx = canvas.getContext('2d');
    let isDrawing = false;
    let lastX = 0;
    let lastY = 0;

    function draw(e) {
        if (!isDrawing) return;
        ctx.strokeStyle = document.getElementById('fontcolor').value; // color of the signature
        ctx.lineJoin = 'round';
        ctx.lineCap = 'round';
        ctx.lineWidth = parseInt(document.getElementById('font').value); // width of the signature line
        ctx.beginPath();
        ctx.moveTo(lastX, lastY);
        ctx.lineTo(e.offsetX, e.offsetY);
        ctx.stroke();
        [lastX, lastY] = [e.offsetX, e.offsetY];
    }

    canvas.addEventListener('mousedown', (e) => {
        isDrawing = true;
        [lastX, lastY] = [e.offsetX, e.offsetY];
    });

    canvas.addEventListener('mousemove', draw);
    canvas.addEventListener('mouseup', () => isDrawing = false);
    canvas.addEventListener('mouseout', () => isDrawing = false);

    // Prevent scrolling while drawing on mobile devices
    canvas.addEventListener('touchstart', (e) => {
        e.preventDefault();
        isDrawing = true;
        [lastX, lastY] = [e.touches[0].clientX - canvas.offsetLeft, e.touches[0].clientY - canvas.offsetTop];
    });

    canvas.addEventListener('touchmove', (e) => {
        e.preventDefault();
        if (!isDrawing) return;
        const x = e.touches[0].clientX - canvas.offsetLeft;
        const y = e.touches[0].clientY - canvas.offsetTop;
        drawTouch(x, y);
    });

    canvas.addEventListener('touchend', () => {
        isDrawing = false;
    });

    function drawTouch(x, y) {
        ctx.strokeStyle = document.getElementById('fontcolor').value;
        ctx.lineJoin = 'round';
        ctx.lineCap = 'round';
        ctx.lineWidth = document.getElementById('font').value;
        ctx.beginPath();
        ctx.moveTo(lastX, lastY);
        ctx.lineTo(x, y);
        ctx.stroke();
        [lastX, lastY] = [x, y];
    }

    document.getElementById('clear-btn').addEventListener('click', () => {
        ctx.clearRect(0, 0, canvas.width, canvas.height);
    });

    document.getElementById("save").addEventListener('click', () => {
        alert("This Feature will be added soon!");
    });

    document.getElementById('download-btn').addEventListener('click', () => {
        const dataUrl = canvas.toDataURL();
        const a = document.createElement('a');
        a.href = dataUrl;
        a.download = 'signature.png';
        a.click();
    });
	
	
});
