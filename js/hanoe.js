const items = document.querySelectorAll('.item')
const placeholders = document.querySelectorAll('.placeholder')



for (const item of items) {
    item.addEventListener('dragstart', dragstart);
    item.addEventListener('dragend', dragend);
}


for (const placeholder of placeholders) {
    placeholder.addEventListener('dragover', dragover)
    placeholder.addEventListener('dragenter', dragenter)
    placeholder.addEventListener('dragleave', dragleave)
    placeholder.addEventListener('drop', drop)
}

let selected

function dragstart(event) {
    event.target.classList.add('hold')
    setTimeout(() => {
        selected = event.target
        event.target.classList.add('hide')
        let currentPosition = selected.parentNode.id
        if (currentPosition[2] !== '1') {
            let lowerElementId = currentPosition[0] + '.' + (currentPosition[2] - '1');
            document.getElementById(lowerElementId).firstChild.setAttribute('draggable', 'true')
        }
    }, 0)

}

function dragend(event) {
    event.target.classList.remove('hold', 'hide')
}

function dragover(event) {
    event.preventDefault()
}

function dragenter(event) {
    event.target.classList.add('hovered')
}

function dragleave(event) {
    event.target.classList.remove('hovered')
}

function drop(event) {
    event.target.classList.remove('hovered');
    event.target.append(selected);
    let currentPosition = event.target.id;

    while (1) {
        console.log(currentPosition)
        if (currentPosition[2] === '1') return;

        let lowerElementId = currentPosition[0] + '.' + (currentPosition[2] - '1');
        let lowerChild = document.getElementById(lowerElementId).firstChild;
        console.log(document.getElementById(lowerElementId).childNodes)
        if (lowerChild) {
            console.log('child found')
            lowerChild.setAttribute('draggable', 'false');
            document.getElementById(currentPosition).append(selected);
            return;
        }
        
        currentPosition = lowerElementId;
        document.getElementById(currentPosition).append(selected);
    }



}