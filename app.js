const defaultText = document.querySelector("#normal")
const throttleText = document.querySelector("#throttle")

let normalFunction = () => {
    incrementCount(defaultText)
}

let throttleFunction = throttle(() => {
    incrementCount(throttleText)
})

function incrementCount(element){

    element.textContent = (parseInt(element.innerText) || 0) + 1;
}

function throttle(callback, delay = 1000) {
    let shouldWait;
    let pendingArgs;
    const timeoutFunc = () => {
        if(pendingArgs == null) {
            shouldWait = false
        } else {
            callback(...pendingArgs)
            pendingArgs = null
            setTimeout(timeoutFunc, delay)
        }
    }
    return (...args) => {
        if(shouldWait){
            pendingArgs = args
            return
        }
        //acá llega solo la primera en e comienzo de la iteración. 
        //Y después se queda ejecutando recursivamente hasta el último movimiento de la iteración.
        callback(...args)
        shouldWait = true
        setTimeout(timeoutFunc, delay)
    }
}

document.addEventListener("mousemove", (e) => {
    normalFunction()
    throttleFunction()
})
