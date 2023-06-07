let ss = document.querySelector(".toggle-settings i");
ss.onclick= function(){
    this.classList.toggle("fa-spin");
    document.querySelector(".settings-box").classList.toggle("open");
}

//switch colors
const colorsLi = document.querySelectorAll(".colors-list li");
// console.log(colorsLi);
colorsLi.forEach(li =>{
    li.addEventListener("click", (e)=>{
        //set color on root
        document.documentElement.style.setProperty('--main-color',e.target.dataset.color);
        //set color on local storage
        localStorage.setItem("color_option",e.target.dataset.color);
        //remove active class from all children
       Handleactive(e);
    });
});
//check if there's local storage color option
let maincolors = localStorage.getItem("color_option");
// console.log(maincolors);
if(maincolors !== null){
    document.documentElement.style.setProperty('--main-color',localStorage.getItem("color_option"));
    //remove active class from all colors list item
    document.querySelectorAll(".colors-list li").forEach(element =>{
        element.classList.remove("active");
        //add active class on element with data-color ===localstorage item
        if(element.dataset.color ===maincolors){
            element.classList.add("active");
        }
    });
    

};
//switch random background
const randomBackgroundsElements = document.querySelectorAll(".random-backgrounds span");

randomBackgroundsElements.forEach(span =>{
    span.addEventListener("click", (e)=>{
        
       Handleactive(e);
        if(e.target.dataset.background === 'yes'){
            backgroundOption =true;
            randomizeImgs();
            localStorage.setItem("background_option",true);

        }
        else{
            backgroundOption = false;
            clearInterval(backgroundIntervel);
             localStorage.setItem("background_option",false);
        }
    });
})
// Select Landing page element
let landingPage = document.querySelector(".landing-page");

//get array of imgs
let imgsArray = ["01.jpg", "02.jpg", "03.jpg", "04.jpg", "05.jpg"];

//random background option
let backgroundOption = true;

//variable to control the intervel
let backgroundIntervel;
//check if there's local storage background item
let backgroundLocalItem =localStorage.getItem("background_opotion");

if(backgroundLocalItem !== null){
    if(backgroundLocalItem === 'true'){
        backgroundOption = true;
    }
    else{
        backgroundOption = false;
    }
     //remove active class from all sapn
    document.querySelectorAll(".random-backgrounds span").forEach(element =>{
        element.classList.remove("active");});
        //add active class on element ===localstorage item
        if(backgroundLocalItem ==='true'){
            document.querySelector(".random-backgrounds .yes").classList.add("active");
        }
        else{
            document.querySelector(".random-backgrounds .no").classList.add("active");
        }
}

//function to randomize background
function randomizeImgs(){
    if(backgroundOption === true){
        backgroundIntervel = setInterval(()=>{
    // get random number
        let randomNumber =Math.floor(Math.random() * imgsArray.length);
        // change background image url
        landingPage.style.backgroundImage ='url("img/' + imgsArray[randomNumber] + '")';
    },5000);
    }
};
//************************************************************************************************************************ */
// select skills selector
// Select Skills Selector
let ourSkills = document.querySelector(".skills");

window.onscroll = function () {

  // Skills Offset Top
  let skillsOffsetTop = ourSkills.offsetTop;

  // Skills Outer Height
  let skillsOuterHeight = ourSkills.offsetHeight;

  // Window Height
  let windowHeight = this.innerHeight;

  // Window ScrollTop
  let windowScrollTop = this.pageYOffset;

  if (windowScrollTop > (skillsOffsetTop + skillsOuterHeight - windowHeight)) {

    let allSkills = document.querySelectorAll(".skill-box .skill-progress span");

    allSkills.forEach(skill => {

      skill.style.width = skill.dataset.progress;

    });

  }

};

//createv popup with the images
let ourGallery = document.querySelectorAll(".gallery img");

ourGallery.forEach(img =>{
    img.addEventListener('click',(e) =>{
        //create overlay element
        let overlay = document.createElement("div");
        console.log(overlay);

        //add class to overlay
        overlay.className = 'popup-overlay';

        document.body.appendChild(overlay);
        //********************************************* */

        let popupBox = document.createElement("div");
        popupBox.className='popup-box';

        if(img.alt !== null){
            let imgHeading = document.createElement("h3");
            let imgText =document.createTextNode(img.alt);
            imgHeading.appendChild(imgText);
            popupBox.appendChild(imgHeading);
        }

        let popupImage = document.createElement("img");
        popupImage.src = img.src;

        popupBox.appendChild(popupImage);
        document.body.appendChild(popupBox);

        //...........................................
        let closeButton = document.createElement("span");
        let closeButtonText = document.createTextNode("X");
        closeButton.appendChild(closeButtonText);

        closeButton.className= 'close-button';
        popupBox.appendChild(closeButton);
    })
});
document.addEventListener('click',(e)=>{
    if(e.target.className == 'close-button'){
        e.target.parentNode.remove();

        document.querySelector(".popup-overlay").remove();
    }});

    //..................................................................

    //select all bullets....

    const allBullets = document.querySelectorAll(".nav-bullets .bullet");

    const allLinks = document.querySelectorAll(".links a");
    function scrolling(elements){
        elements.forEach(ele => {
        ele.addEventListener("click" , (e)=>{
            e.preventDefault();
            document.querySelector(e.target.dataset.section).scrollIntoView({
                behavior:'smooth'
            });
        });


    });
    }
    scrolling(allBullets);
    scrolling(allLinks);
    //................................................................\
    //Handle active function state
    function Handleactive(ev){
        //remove active class from all children
        ev.target.parentElement.querySelectorAll(".active").forEach(element =>{
            element.classList.remove("active");
        });
        //add active class on self
        ev.target.classList.add("active");


    }
    //............................................................................

    let bulletsSpan = document.querySelectorAll(".bullets-option span");

    let bulletsContainer = document.querySelector(".nav-bullets");

    let bulletLocalItem = localStorage.getItem("bullets_option");
    if(bulletLocalItem !== null){
        bulletsSpan.forEach(span =>{
            span.classList.remove("active");
        });
        if(bulletLocalItem === 'block'){
             bulletsContainer.style.display='block';
             document.querySelector(".bullets-option .yes").classList.add("active");
        }
        else{ 
            bulletsContainer.style.display='none';
            document.querySelector(".bullets-option .no").classList.add("active");
        }
        
    }
    bulletsSpan.forEach(span =>{

        span.addEventListener("click", (e)=>{
            if(span.dataset.display === 'show'){
                bulletsContainer.style.display='block';
                localStorage.setItem("bullets_option",'block');
            }
            else{
                bulletsContainer.style.display='none';
                localStorage.setItem("bullets_option",'none');
            }
            Handleactive(e);
        });
    });

    //.......................................
    //reset Button

    document.querySelector(".reset-options").onclick = function(){
        localStorage.clear();
        // localStorage.removeItem("color-option");
        // localStorage.removeItem("background-option");
        // localStorage.removeItem("bullets-option");

        window.location.reload();
    }

    //........................................................................

    //toggle button
    let toggleBtn = document.querySelector(".toggle-menu");
    let tLinks = document.querySelector(".links");

    toggleBtn.onclick = function(e){
        e.stopPropagation();


        this.classList.toggle("menu-active");

        tLinks.classList.toggle("open");


    };

    //click anywhere outside menu and toggle button
    document.addEventListener('click', (e)=>{
        if(e.target !==toggleBtn && e.target!== tLinks) {
            if(tLinks.classList.contains("open")){
                toggleBtn.classList.toggle("menu-active");

                tLinks.classList.toggle("open");
            }
        }
    });
    tLinks.onclick = function(e){
        e.stopPropagation();
    }



