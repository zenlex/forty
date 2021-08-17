function onControlClick(event) {
    switch (event.target.id) {
        case 'dec':
            updateCounter(-1, counter);
            return false;
        case 'inc':
            updateCounter(1, counter);
            return false;
        case 'reset':
            updateCounter(0, counter);
            return false;
        default:
            return false;
    }
}

function updateCounter(change, elem) {
    if (change) {
        count += change;
    } else {
        count = 0;
    }
    elem.classList.remove('posnum', 'negnum');
    if (count > 0) {
        elem.classList.add('posnum');
    }
    if (count < 0) {
        elem.classList.add('negnum')
    }
    elem.classList.add
    elem.innerHTML = count;
}