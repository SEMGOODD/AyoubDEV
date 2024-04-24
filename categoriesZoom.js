const container_img = document.querySelector('.container_img');
const image = document.querySelector('.image');
const lens = document.querySelector('.lens');
const result = document.querySelector('.result');

const container_imgRect = container_img.getBoundingClientRect();
const imageRect = image.getBoundingClientRect();
const lensRect = lens.getBoundingClientRect();
const resultRect = result.getBoundingClientRect();

container_img.addEventListener('mousemove', zoomImage);
container_img.addEventListener('mouseleave', hideResultImage);

result.style.backgroundImage = `url(${image.src})`;

function zoomImage(e) {
    const { x, y } = getMousePos(e);

    if (
        x >= imageRect.left &&
        x <= imageRect.right &&
        y >= imageRect.top &&
        y <= imageRect.bottom
    ) {
        result.style.display = 'block';

        lens.style.left = x + 'px';
        lens.style.top = y + 'px';
        lens.style.right = x + 'px';
        lens.style.bottom = y + 'px';

        let fx = resultRect.width / lensRect.width;
        let fy = resultRect.height / lensRect.height;

        result.style.backgroundSize = `${imageRect.width * fx}px ${
            imageRect.height * fy
        }px`;
        result.style.backgroundPosition = `-${x * fx}px -${y * fy}px`;
    } else {
        result.style.display = 'none';
    }
}

function hideResultImage() {
    result.style.display = 'none';
}

function getMousePos(e) {
    let x = e.clientX - container_imgRect.left - lensRect.width / 2;
    let y = e.clientY - container_imgRect.top - lensRect.height / 2;

    let min_X = 0;
    let min_Y = 0;
    let max_X = container_imgRect.width - lensRect.width;
    let max_Y = container_imgRect.height - lensRect.height;
    if (x <= min_X) {
        x = min_X;
    } else if (x >= max_X) {
        x = max_X;
    }
    if (y <= min_Y) {
        y = min_Y;
    } else if (y >= max_Y) {
        y = max_Y;
    }
    return { x, y };
}


