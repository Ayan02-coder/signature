window.addEventListener('load', () => {
    const canvas = document.getElementById('mycanvas');
    const ctx = canvas.getContext('2d');
    let isDrawing = false;
    let lastX = 0;
    let lastY = 0;

    canvas.width = canvas.offsetWidth;
    canvas.height = canvas.offsetHeight;

    function draw(e) {
        if (!isDrawing) return;
        ctx.strokeStyle = document.getElementById('fontcolor').value;
        ctx.lineJoin = 'round';
        ctx.lineCap = 'round';
        ctx.lineWidth = document.getElementById('font').value;
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

    document.getElementById('clear').addEventListener('click', () => {
        ctx.clearRect(0, 0, canvas.width, canvas.height);
    });

    document.getElementById('save').addEventListener('click', () => {
        const dataUrl = canvas.toDataURL();
        // Code to save dataUrl or display it as an image
    });

    document.getElementById('download').addEventListener('click', () => {
        const dataUrl = canvas.toDataURL();
        const a = document.createElement('a');
        a.href = dataUrl;
        a.download = 'signature.png';
        a.click();
    });

    document.getElementById('fontcolor').addEventListener('change', () => {
        ctx.strokeStyle = document.getElementById('fontcolor').value;
    });

    document.getElementById('backgroundcolor').addEventListener('change', () => {
        canvas.style.backgroundColor = document.getElementById('backgroundcolor').value;
    });

    document.getElementById('font').addEventListener('change', () => {
        ctx.lineWidth = document.getElementById('font').value;
    });
});
