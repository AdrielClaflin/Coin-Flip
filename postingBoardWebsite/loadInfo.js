window.onload = function(){
    document.getElementById("title").innerHTML = localStorage.getItem("currentLocTitle");
    document.getElementById("category").innerHTML = localStorage.getItem("currentLocCategory");
    document.getElementById("content").innerHTML = localStorage.getItem("currentLocContent");
    document.getElementById("picture").src = localStorage.getItem("currentLocPicture");
}