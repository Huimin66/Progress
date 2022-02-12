
window.addEventListener("load", function(){

    let arrowl = document.querySelector('.arrow-l')
    let arrowr = document.querySelector('.arrow-r')
    let focus = document.querySelector('.focus')
    let ul = focus.querySelector('ul')
    let ol = focus.querySelector('.circle')

    let currentSlider = 0
    let currentcircle = 0

    let focusWidth = focus.offsetWidth; //the width of a slider

    // mouse enter the slider area, show the arrows
    focus.addEventListener('mouseenter', function(){
        arrowl.style.display = 'block'
        arrowr.style.display = 'block'

    })

    // mouse move out of the slider area, hide the arrows
    focus.addEventListener('mouseleave', function(){
        arrowl.style.display = 'none'
        arrowr.style.display = 'none'

    })

    function clearCurrentStyle(){
        for(let i=0; i<ol.children.length; i++){
            ol.children[i].className = '';
        }
    }
    
    // render the same amount of li according to the picture
    for(let i = 0; i<ul.children.length; i++){
        let li = document.createElement('li')       
        ol.appendChild(li)
    }

    // set the current clicked circle a differrent color
    for(let i = 0; i<ul.children.length; i++){
        ol.children[i].addEventListener('click', function(){
            clearCurrentStyle()
            this.className = 'current'
            if(currentSlider == ul.children.length-1){
                currentSlider = 0;
                ul.style.left = 0
            }
            console.log(ul.style.left)
            
            
            // sliders move
            animate(ul, -i * focusWidth)
            currentSlider = i
        })
    }

    // set the first slider to the current style
    ol.children[0].className = 'current'

    // dynamically append a note to ul
    // need an extra slider to perform a better effect
    let first = ul.children[0].cloneNode(true)
    ul.appendChild(first)

    // click the right arrow
    arrowr.addEventListener('click', function(){
    
        if(currentSlider == ul.children.length-1){
            currentSlider = 0;
            ul.style.left = 0
        }
        currentSlider++
        console.log("1 currentSlider " +currentSlider)
        animate(ul, -currentSlider*focusWidth)

        currentcircle = currentSlider%3
        clearCurrentStyle()
        ol.children[currentcircle].className='current'

        // if(currentSlider == ul.children.length-1){
        //     currentSlider = 0;
        //     ul.style.left = 0
        // }
    })
})