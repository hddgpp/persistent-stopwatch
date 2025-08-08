const p = document.querySelector('.p');
const btn = document.querySelector('.btn');
const clear = document.querySelector('.clear');

const obj = JSON.parse(localStorage.getItem('store')) || {
    second: 0,
    mili: 0,
    min: 0,
    hour: 0,
    run: false,
};

let count;

function paragraph() {
    p.textContent = `${obj.hour} : ${obj.min} : ${obj.second} : ${obj.mili}`;
}

function save() {
    localStorage.setItem('store', JSON.stringify(obj));
}

function startCount() {
    obj.run = true;
    save();

    btn.textContent = 'Stop';
  
    btn.classList.add('css-stop')

    count = setInterval(() => {
    obj.mili++;
    if (obj.mili === 100) {
        obj.mili = 0;
        obj.second++;
    }
    if (obj.second === 60) {
        obj.second = 0;
        obj.min++;
    }
    if (obj.min === 60) {
        obj.min = 0;
        obj.hour++;
    }
    paragraph();
    save();
        }, 10);
}

function stopCount() {
    obj.run = false;
    save();

    btn.textContent = 'Start';
    btn.classList.remove('css-stop')
    clearInterval(count);
}

btn.addEventListener('click', () => {
    if (!obj.run) {
    startCount();
        } else {
    stopCount();
        }
});

clear.addEventListener('click', () => {
    obj.second = 0;
    obj.mili = 0;
    obj.min = 0;
    obj.hour = 0;
    obj.run = false;
    paragraph();
    save();
    stopCount()
});

paragraph();
if (obj.run) {
    startCount();
}