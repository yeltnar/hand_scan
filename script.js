let full_screen_click;
let hand_scan;
let body;

let touching = false;

window.addEventListener("load", ()=>{
    full_screen_click = document.querySelector("#full_screen_click");
    hand_scan = document.querySelector("#hand_scan");
    body = document.querySelector("body")

    addEvents(full_screen_click);
    addEvents(hand_scan);

    function addEvents(ele){
        ele.addEventListener("mousedown", clicker_mouse_down);
        full_screen_click.addEventListener("ontouchstart", clicker_mouse_down);
        ele.addEventListener("mouseup", clicker_mouse_up);
        ele.addEventListener("ontouchend", clicker_mouse_up);
    }
});

function clicker_mouse_down(){
    touching = true;
    
    console.log("clicker_mouse_down touching "+touching)

    slideScanBar()
    .then(addApprovedTouch)
    .catch(warnTouch);
}
function clicker_mouse_up(){
    touching=false;
    console.log("clicker_mouse_up touching "+touching)
    removeApprovedTouch()
}

function slideScanBar(){
    return new Promise((resolve, reject)=>{

        const scan = {
            increment:10,
            loop_speed:10
        };

        const div = document.createElement("div");
        div.style.height = "2vh";
        div.style.width = "100vw";
        div.style.backgroundColor = "red";
        div.style.zIndex = 100;
        div.style.position = "absolute";
        div.style.top = 0;
        body.appendChild(div);

        function moveIt(){

            console.log("moveit");

            const bottom = div.getBoundingClientRect().bottom

            if( bottom+scan.increment < window.innerHeight && touching===true ){
                top_int = parseInt(div.style.top)+scan.increment;
                div.style.top = top_int+"px";
                setTimeout(()=>{ moveIt() }, scan.loop_speed);
            }else if( touching===false ){
                div.parentElement.removeChild(div);
                reject();
            }else{
                div.parentElement.removeChild(div);
                resolve();
            }
        }

        moveIt();
    })
}

function addApprovedTouch(){
    return new Promise((resolve, rejcet)=>{
        full_screen_click.classList.add("approved_touch");

        setTimeout(()=>{

        }, 750)

        resolve();
    })
}

function warnTouch(){
    full_screen_click.classList.add("warn_touch");

    setTimeout(()=>{
        full_screen_click.classList.remove("warn_touch");
    }, 750)
}

function removeApprovedTouch(){
    return new Promise((resolve, rejcet)=>{


        setTimeout(()=>{

            full_screen_click.classList.remove("approved_touch");
            resolve();
        }, 750)
    })
}