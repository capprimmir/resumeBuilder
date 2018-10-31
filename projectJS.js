/* Mariana Perez
    WEB-115 
    FINAL PROJECT */

//---- 2. External javascript with name project.js ----//

//--- (H1) to write NAME with specific style --- //
var nameHeader = document.createElement('h1');
nameHeader.textContent = "Mariana Perez";
nameHeader.style.color ="red";
nameHeader.style.fontFamily = "Tahoma";
nameHeader.style.textAlign = "center";
/* A BETTER OPTION WOULD BE TO ADD A CLASS AND USED THE 
    CLASS TO CHANGE STYLE IN THE .CSS FILE:  
    nameHeader.className = "nameHeader";*/


/*--- (H2) for coruse and section --- 
    THIS PART USES A SHORTER METHOD TO CHANGE THE SYLE USING CLASS NAME 
    AND STYLE IT IN THE .CSS FILE*/
var courseName = document.createElement('h2');
courseName.textContent = "WEB 115 -Section 1101";
//class used to change the style in .css
courseName.className = "courseName";

//variable use to append the Name and Section into the HTML document
var mainTitle = document.getElementById("mainTitle");
mainTitle.appendChild(nameHeader);
mainTitle.appendChild(courseName);

/*-- VALIDATE PHONE --*/
var phoneNumber = document.getElementById("phone");
phoneNumber.addEventListener("change", isValidPhone);

function isValidPhone(e){
    event.preventDefault()

    var targetPhone = e.target.value;
    if(isNaN(targetPhone)){
        alert("Please enter a valid number");
        phoneNumber.value = "";
        phoneNumber.focus();
    }
}

/* ------ 10. VALIDATE EMAIL ------- */
var email = document.getElementById("email");
email.addEventListener("change", isValidEmail);

function isValidEmail(e){
    //check if the @ sign is in the email text
    var regExp = /@/;
    var targetEmail = e.target.value;
    if(regExp.test(targetEmail)){
        console.log("Correct email");
    }
    else{
        alert("Please enter valid email")
        email.value = "";
        email.focus()
    }
}

//-- RESET THE FORM ------
function reset(){
   document.getElementById("reset").reset();
}

//prevent the form from submit when press enter 
document.getElementById("myForm").addEventListener('keydown', function(e){
    if ((e.keyCode == 13) && (e.target.tagName != "TEXTAREA")){
        e.preventDefault()
    }
})
 

//-----19. CREATE RESUME ON-THE-FLY -----
//add event listener to the button that will generate a new Web page.
var resume = document.getElementById("createResume");
resume.addEventListener("click", createResume);

    //variables that hold different HTML elements for the new page. 
    var beginingPage = beginingPage();
    var end = endPage();
    var career = leftColum("Career Objectives");

function createResume(){  

    //variables that will hold different HTML elements with user content for new web page
    var careerDesc = document.getElementById("objectives").value;
    var personalData = leftColum("Personal Data");
    var personalDescrip = document.getElementById("personalData").value;
    var education = leftColum("Education");
    var eduDescrip = document.getElementById("education").value;
    var employment = leftColum("Employment Experience");
    var name = getName();

    //get all entry and all exit dates
    var entryDates = document.querySelectorAll(".entryDate");
    var exitDates = document.querySelectorAll(".exitDate");

    //get list of strings for month's NAMES
    var entryMonths = getMonths(entryDates);
    var exitMonths = getMonths(exitDates);
   
    //get list for years 
    var entryYears = getYears(entryDates);
    var exitYears = getYears(exitDates);

    //get all information about experiences of employments 
    var experiences = document.querySelectorAll(".experience");
    var business = "Business Reference";
    var busReference = document.getElementById("business").value;

    
    
    //VARIABLE THAT WILL HOLD ENTIRE HTML STRUCTURE FOR THE NEW WEB PAGES.
    //Concatenates tag elements in sections. This would facilitate debugging and readability 
    newPage = beginingPage + name + career + rightColum(careerDesc);
    newPage += personalData + rightColum(personalDescrip);
    newPage += education + rightColum(eduDescrip) + employment;

    //For Loop use to concatenate the 4 entry dates, 4 exit dates and each experience desciption.
    for (i=0; i< entryMonths.length; i++){
        newPage += displayEntryDate(entryMonths[i], entryYears[i]) + 
                    displayExitdate(exitMonths[i],exitYears[i]) +
                    rightColum(experiences[i].value);
    }
    
    newPage += leftColum("Character References") + rightColum("Upon Request");
    newPage += leftColum(business) + rightColum(busReference);
    newPage += end;

    //--- CREATES THE NEW WEB PAGE ON-THE-FLY
    var flyWindow = window.open('about:blank', 'myResume', 'width=500', 'height=1000');
    flyWindow.document.write(newPage);
}


//---- FUNCTIONS that return HTML elements to create resume in new web page ----
function beginingPage(){
    return "<html>\n<head>\n<title> Resume </title>\n" + linkCss() + "</head>\n<body>\n<div class='mainDiv'>\n"
}
function endPage(){
    return "</div>\n</body>\n</html>";
}
function linkCss(){
    return "<link rel='stylesheet' href='projectCSS.css'>";
}

//this function returns name/address/phone from user input
function getName(){
    var userName = document.getElementById("userName").value;
    var address = document.getElementById("address").value;    
    var tel = document.getElementById("phone").value; 
    
    return "\n<div class='headerResume'><p>" + userName.toUpperCase() + "</p>\n<p>" + address + "  /  " + tel + "</p></div>\n<hr>";
}

//function that controls two layout for left column by giving it a class and style it in .CSS file 
function leftColum(content){
    return "<div class='leftDiv'>" + content.toUpperCase() + "</div>\n";
}
//function that controls two layout for right column by giving it a class and style it in .CSS file 
function rightColum(content){
    return "<div class='rightDiv'>" + content + "</div>\n";
}

//function that returns list of months from INPUT DATE TYPE
function getMonths(dates){    
    //array to return months
    var months = [];
    
    //forEach function is used because querySelectorAll generates a list and not an HTML collection
    dates.forEach(entry => {
        //convert it to a date object
        var date = new Date(entry.value);
    
       //get month
        var month = date.getMonth();
        if (!isNaN(month)){
            month = monthName(month)
            //add the month to the array
            months.push(month);
        }
        
        
    });
    return months;
}

//function that returns year list from INPUT DATE TYPE
function getYears(dates){
    var years = [];

    //convert each entry into a date object and get the year.
    dates.forEach(entry =>{
        var  dateY = new Date(entry.value);
        var year = dateY.getFullYear();
        if (!isNaN(year)){
            years.push(year);
        }
        
    });
    return years;
}

//update month and year to be display in the new web page inside a tag element 
function displayEntryDate(m , y){
    
    return "\n<div class='leftDiv'>" + m + " " + y + " - ";
}
    
function displayExitdate(m, y){
    return m + " " + y + "</div>\n";
}

//function that accepts month as a number and returns the month name.
function monthName(m){
    var month = new Array();
    month[0] = "January";
    month[1] = "February";
    month[2] = "March";
    month[3] = "April";
    month[4] = "May";
    month[5] = "June";
    month[6] = "July";
    month[7] = "August";
    month[8] = "September";
    month[9] = "October";
    month[10] = "November";
    month[11] = "December";
    return month[m];
}