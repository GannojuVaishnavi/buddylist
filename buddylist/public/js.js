
// let users = [{
//     "userId": "USR00001",
//     "name": "Andrew Grudde",
//     "profilePicture": "https://avatarfiles.alphacoders.com/216/thumb-1920-216286.png",
//     "statusMessage": "We become what we think about!",
//     "presence": 1
// },
// {
//     "userId": "USR00002",
//     "name": "Vaishnavi",
//     "profilePicture": "https://avatarfiles.alphacoders.com/216/thumb-1920-216286.png",
//     "statusMessage": "Live life and love life.",
//     "presence": 2
// },
// {
//     "userId": "USR00003",
//     "name": "Kathy Smiley",
//     "profilePicture": "https://avatarfiles.alphacoders.com/216/thumb-1920-216286.png",
//     "statusMessage": "One small positive thought can change your whole day",
//     "presence": 3
// },
// {
//     "userId": "USR00004",
//     "name": "Steve Dunk",
//     "profilePicture": "https://avatarfiles.alphacoders.com/216/thumb-1920-216286.png",
//     "statusMessage": "I am a rock star",
//     "presence": 1
// },
// {
//     "userId": "USR00005",
//     "name": "Maria Dropola",
//     "profilePicture": "https://avatarfiles.alphacoders.com/216/thumb-1920-216286.png",   
//     "statusMessage": "I am using Gradious messenger",
//     "presence": 4
// }];
var arrayobj=localStorage.getItem('buddylist');
var array=JSON.parse(arrayobj);
console.log(array.users);

function fetchUsers() {
    var xhttp = new XMLHttpRequest(); 
    xhttp.open("GET","http://localhost:8080/buddylist",  true);
    xhttp.onreadystatechange = function () {
        if (this.readyState == 4 && this.status == 200) {
            // console.log( this.responseText);
           var data=JSON.parse( this.responseText);
           console.log(data);
           localStorage.setItem('buddylist',JSON.stringify(data));
           display(data);
        }
        else{
            console.log('http error');
        }
    };
    xhttp.send();
}

   window.onload = function(){
        fetchUsers();
};


    function display(userslist) {
        
        const hdiv = document.getElementById("list");
        hdiv.innerHTML='  ';
        hdiv.className="chdiv";

    console.log(userslist.users);


        userslist.users.forEach((user) =>{
            var jdiv = document.createElement("div");
            jdiv.className = "cjdiv";

            var profpic = document.createElement("img");
            profpic.className = "cprofpic";
            profpic.id="profid";

            var profcontainer=document.createElement("div");
            profcontainer.className="profcontainer";
            profcontainer.id="profcontainerid";

            profpic.src=user.profilePicture; 
    
            profcontainer.appendChild(profpic);
            jdiv.appendChild(profcontainer);
            hdiv.appendChild(jdiv);
            var color = document.createElement("div");
            color.className = "color";
    
            profpic.classList.add(getStatusClassName(user.presence));
            jdiv.appendChild(profpic);
            jdiv.appendChild(color);
            var info = document.createElement("div");
            info.innerHTML = `<strong>${user.name}</strong><br>${user.statusMessage}`;
            jdiv.appendChild(info);
            hdiv.appendChild(jdiv);

            var dots = document.createElement("div");
            dots.className = "dots";

            var dropdownContainer = document.createElement("div");
            dropdownContainer.className = "dropdown";
    
            var tButton = document.createElement("i");
            tButton.id="threedots";
            tButton.className = "fa-solid fa-ellipsis-vertical";
            tButton.onclick = function () {
                dropdownMenu.style.display = (dropdownMenu.style.display === "block") ? "none" : "block";
            };

            var dropdownMenu = document.createElement("div");
            dropdownMenu.className = "dropdown-menu";
            dropdownMenu.style.display = "none"; 
    
            var dropdownBox = document.createElement("div");
            dropdownBox.className = "dropdown-box";
    
            var deleteButton = document.createElement("div");
            var deleteBtn = document.createElement("button");
            // deleteBtn.id = user.userId;
            // jdiv.id=user.userId;
            deleteBtn.className = "dropdown-item";
            deleteBtn.textContent = "Delete";
            deleteBtn.onclick = function () {
                jdiv.id=user.userId;
                deleteItem(user.userId);
            };

            deleteButton.appendChild(deleteBtn);
    
            var updateButton = document.createElement("div");
            var updateBtn = document.createElement("button");
            updateBtn.id = `update-${user.userId}`;
            updateBtn.className = "dropdown-item";
            updateBtn.textContent = "Update";
            updateBtn.onclick = function () {
              jdiv.id=user.userId;
              updateItem(user.userId);
            };

            dropdownBox.appendChild(deleteButton);
            dropdownBox.appendChild(updateButton);
            dropdownMenu.appendChild(dropdownBox);
            updateButton.appendChild(updateBtn);
    
            dropdownContainer.appendChild(tButton);
            dropdownContainer.appendChild(dropdownMenu);

            dots.appendChild(dropdownContainer);
            jdiv.appendChild(dots);
            hdiv.appendChild(jdiv);
            // var logo =document.getElementById("ulogo");
            // logo.onclick= toAddBuddy;
            
        });
        var logo =document.getElementById("ulogo");
        logo.onclick= toAddBuddy;
        var add=document.getElementById("add");
        add.onclick=addBuddy;
    }


function toAddBuddy() {

    const addBuddySection = document.getElementById("add-buddy-section");
    if (addBuddySection.style.display === "none" || addBuddySection.style.display === "") {
        addBuddySection.style.display = "block";
    } else {
        addBuddySection.style.display = "none";
    }
}



function addBuddy() {
    const newName = document.getElementById("newname").value;
    var newProfilePicture = document.getElementById("newprofilepicture").value;
    if (newProfilePicture.value===null||newProfilePicture.value===" "){
         newProfilePicture = "https://htmlcolorcodes.com/assets/images/colors/black-color-solid-background-1920x1080.png";

    }
    const newStatusMessage = document.getElementById("newstatusmessage").value;
    const newPresenceStatus = parseInt(document.getElementById("new-presence-status").value);

    const newUser = {
        "userId": "USR" + (array.users.length + 1).toString().padStart(5, '0'),
        "name": newName,
        "profilePicture": newProfilePicture,
        "statusMessage": newStatusMessage,
        "presence": newPresenceStatus
    };



    array.users.unshift(newUser);
    display(array); 
    document.getElementById("newname").value = "";
    document.getElementById("newprofilepicture").value = "";
    document.getElementById("newstatusmessage").value = "";
    document.getElementById("new-presence-status").value = "1";
    toAddBuddy();

}

function updateItem(userId) {
    const userToUpdate = array.users.find(user => user.userId === userId);


    if (userToUpdate) {
        document.getElementById("newname").value = userToUpdate.name;
        document.getElementById("newprofilepicture").value = userToUpdate.profilePicture;
        document.getElementById("newstatusmessage").value = userToUpdate.statusMessage;
        document.getElementById("new-presence-status").value = userToUpdate.presence;
        toAddBuddy();
        
        const addButton = document.getElementById("add");
        addButton.textContent = "Update profile";
        addButton.onclick = function () {
            saveUser(userId);

        };
    }
}

function saveUser(userId) {
    const userToUpdate = array.users.find(user => user.userId === userId);
    console.log(userToUpdate);

    if (userToUpdate) {
        
        userToUpdate.name = document.getElementById("newname").value;
        userToUpdate.profilePicture = document.getElementById("newprofilepicture").value;
        userToUpdate.statusMessage = document.getElementById("newstatusmessage").value;
        userToUpdate.presence = parseInt(document.getElementById("new-presence-status").value);

        document.getElementById("newname").value = "";
        document.getElementById("newprofilepicture").value = "";
        document.getElementById("newstatusmessage").value = "";
        document.getElementById("new-presence-status").value = "1";
        const addButton = document.getElementById("add");
        addButton.textContent = "Add User";
        addButton.onclick = addBuddy;
        display(array);
        toAddBuddy();
    }
}





    // ----------------------------------------------

     function deleteItem(uid){

            var n=document.getElementById(uid);
            array.users=array.users.filter(user=>user.userId!==uid)
            display(array);
        
        }
    

// ----------------------------------


    
        function getStatusClassName(presence) {
            
            switch (presence) {
                case 1:
                    return "status-online";
                case 2:
                    return "status-busy";
                case 3:
                    return "status-idle";
                case 4:
                    return "status-offline";
                default:
                    return "";
            }
        }
        








    
