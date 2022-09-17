// Ths code expands and collapses data on left side menu
$( document ).ready(function() {
    $('#arrow_1').on("click", function (e) {
        if ($(this).hasClass('panel-collapsed')) {
            // expand the panel 1
            $('#collapsable_1').slideDown();
            $('#collapsable_1').addClass('active_collapse');
            $(this).removeClass('panel-collapsed');
            
        }
        else {
            // collapse the panel 2
            $('#collapsable_1').slideUp();
            $('#collapsable_1').removeClass('active_collapse');
            $(this).addClass('panel-collapsed');
        }
    });


    $('#arroww_2').on("click", function (e) {
        if ($(this).hasClass('panel-collapsed')) {
            // expand the panel 2
            $('#collapsable_2').slideDown();
            $('#collapsable_2').addClass('active_collapse');
            $(this).removeClass('panel-collapsed');
            
        }
        else {
            // collapse the panel 2
            $('#collapsable_2').slideUp();
            $('#collapsable_2').removeClass('active_collapse');
            $(this).addClass('panel-collapsed');
        }
    });
});

// This function chnages wheather to show page 1 when searching or page 2 
// page 1 is normal page with search bar + hear from out customers etc, and page 2 is page with search results
function change_search(){
    if(document.getElementById("search_input").value==""){
        empty_search()
    }
    else{      
        document.getElementById("search_img").style.display = "none";
        document.getElementById("cross").style.display = "block";
        document.getElementById("part_one").style.display = "none";
        // calls api to get search results
        call_Api()
    }
}

// This function is called to make search bar empty and reset all divs to default
function empty_search(){
    document.getElementById("part_one").style.display = "block";
    document.getElementById("part_two").style.display = "none";
    document.getElementById("search_input").value = "";
    document.getElementById("search_img").style.display = "block";
    document.getElementById("cross").style.display = "none";
    var track = document.getElementsByClassName("track");
    // sets all tracking divs to default
    for (var i=0;i<track.length;i++){
        document.getElementById("track_"+(i+1)).style.border= "1px solid #FF6059";
        document.getElementById("button_"+(i+1)).style.color= "#FF6059";
        document.getElementById("button_"+(i+1)).innerHTML = "Track";
        document.getElementById("loader_"+(i+1)).setAttribute("data-abc","yes");
        var ele = document.getElementById("loader_"+(i+1));
        ele.classList.remove("loader");
    }
}

// This funciton is used to call API
function call_Api(){
    document.getElementById("part_one").style.display = "none";
    document.getElementById("part_two").style.display = "flex";
    var search_query = document.getElementById("search_input").value;
    const api_url = "https://staging.staging.b2brain.com/search/autocomplete_org_all/?q="+search_query;
    getapi(api_url)
}

// Defining async function to get data from API
async function getapi(url) {
    const response = await fetch(url);
    var data = await response.json();
    setData(data);
}

// Global variable to store data from api for future use
var dataa

// Function to define innerHTML for HTML elements based on search results
function setData(data){
    for (var i=0;i<data.length;i++){
        dataa = data
        document.getElementById("name_"+(i+1)).innerHTML = data[i].company;
        document.getElementById("link_"+(i+1)).innerHTML = data[i].website;
        document.getElementById("link_"+(i+1)).href = data[i].website;
        try{
            // sets logo if present else sets logo from data provided in color field of api
            if(data[i].logo != ""){
                document.getElementById("logo_"+(i+1)).src = data[i].logo;
            }
            else{
                // Creates a div element as told in instructions
                const listItem = document.getElementById("logo_"+(i+1));
                const div = document.createElement("div");
                div.style.width = "50px";
                div.id = "logo_"+(i+1);
                div.style.height = "50px";
                div.style.backgroundColor = data[i].color;
                div.style.borderRadius = "10px";
                div.style.display = "flex";
                div.style.marginRight = "20px";
                div.style.justifyContent = "center";
                div.style.alignItems = "center";
                div.style.fontSize = "12px";
                div.style.color = "white";
                div.innerHTML = data[i].company[0].toUpperCase();
                listItem.parentNode.replaceChild(div, listItem);
            }
        }
        catch{
            const listItem = document.getElementById("logo_"+(i+1));
                const div = document.createElement("div");
                div.style.width = "50px";
                div.id = "logo_"+(i+1);
                div.style.height = "50px";
                div.style.backgroundColor = data[i].color;
                div.style.borderRadius = "10px";
                div.style.display = "flex";
                div.style.marginRight = "20px";
                div.style.justifyContent = "center";
                div.style.alignItems = "center";
                div.style.fontSize = "12px";
                div.style.color = "white";
                div.innerHTML = data[i].company[0].toUpperCase();
                listItem.parentNode.replaceChild(div, listItem);
        }
        
    }
}
var idd

// This function is called when track button is clicked and runs loader animation
function start_loader(id){
    if(document.getElementById("loader_"+id).getAttribute("data-abc") == "yes")
    {
        idd = id
        var ele = document.getElementById("loader_"+id);
        ele.classList.remove("spinner");
        setTimeout(changebutton, 3000)

        // here we print info on when track button was pressed
        var name = document.getElementById("name_"+id).innerHTML
        var slug = dataa[id-1].slug
        var time = new Date().toLocaleString();
        console.log(name +" "+slug+" tracked at "+time)
    }
}

// This function is called after 3 seconds to change button to tracking
function changebutton(){
    document.getElementById("track_"+idd).style.border= "1px solid #1AAB2B";
    document.getElementById("button_"+idd).style.color= "#1AAB2B";
    document.getElementById("button_"+idd).innerHTML = "Tracking";
    document.getElementById("loader_"+idd).setAttribute("data-abc","no")
    var ele = document.getElementById("loader_"+idd);
    ele.classList.add("spinner");
    
}