function getCookie(name) {
    var cookieValue = null;
    if (document.cookie && document.cookie !== '') {
        var cookies = document.cookie.split(';');
        for (var i = 0; i < cookies.length; i++) {
            var cookie = cookies[i].trim();
            // Does this cookie string begin with the name we want?
            if (cookie.substring(0, name.length + 1) === (name + '=')) {
                cookieValue = decodeURIComponent(cookie.substring(name.length + 1));
                break;
            }
        }
    }
    return cookieValue;
}
var csrftoken = getCookie('csrftoken');

var activeItem = null;

// var list_snapshot = [];

buildList();
function buildList() {

    var wrapper = document.getElementById('list-wrapper');

    wrapper.innerHTML = '';




    var url = 'http://127.0.0.1:8000/api/';

    fetch(url)
        .then((response) => response.json())
        .then(function (data) {

            var list = data;
            // console.log(data);

            for (var i in list){


                // try{
                //     document.getElementById(`data-row-${i}`).remove()
                // }catch(err){
                //
                // }


                var title = `<span class="title">${list[i].title}</span>`;

                if(list[i].completed === true){
                    var title = `<strike class="title">${list[i].title}</strike>`
                }

                var item =
                    `  
                        <div id="item-row-${i}" class="task-wrapper flex-wrapper">
                            <div style="flex:7">
                                ${title}
                            </div>
                            <div style="flex:1">
                                <button class="btn btn-sm btn-outline-info edit">Edit</button>
                            </div>
                            <div style="flex:1">
                                <button class="btn btn-sm btn-outline-dark delete">-</button>
                            </div>
                        </div>          
                    `;
                wrapper.innerHTML += item;

            }

            // if (list_snapshot.length > list.length){
            //     for (var i = list.length; i < list_snapshot.length; i++){
            //         document.getElementById(`data-row-${i}`).remove()
            //     }
            // }
            //
            // list_snapshot = list;

            for (var i in list){
                // console.log(list[i]);
                var editBtn = document.getElementsByClassName('edit')[i];
                var deleteBtn = document.getElementsByClassName('delete')[i];
                var title = document.getElementsByClassName('title')[i];


                editBtn.addEventListener('click',(function (item) {
                    return function () {
                        editItem(item);
                        activeItem = item;
                        document.getElementById('title').value = activeItem.title;
                        
                    }

                    })(list[i]))

                deleteBtn.addEventListener('click',(function (item) {
                    return function () {
                        deleteItem(item);
                        activeItem = item;
                        document.getElementById('title').value = activeItem.title;

                    }

                    })(list[i]));



                title.addEventListener('click',(function (item) {
                    return function () {
                        strikeUnstrike(item);
                    }

                    })(list[i]))


                }
        })
}


var form = document.getElementById('form-wrapper');

form.addEventListener('submit', function (e) {
    e.preventDefault();

    var url = 'http://127.0.0.1:8000/api/task/create/';

    if (activeItem != null){
        var url = `http://127.0.0.1:8000/api/task/${activeItem.id}/update/`;
        activeItem = null;
    }

    console.log(url);

    var title = document.getElementById('title').value;

    var form = document.getElementById('form');

    fetch(url, {
        method:'POST',
        headers:{
            'Content-type':'application/json',
            'X-CSRFToken':csrftoken,
        },
        body:JSON.stringify({'title':title}),
    }).then(function (response) {

        buildList();
        form.reset();


    })
});


function editItem(item) {
    console.log(item)

}


function deleteItem(item) {

    var url = `http://127.0.0.1:8000/api/task/${item.id}/delete/`;
    var form = document.getElementById('form');

    fetch(url,{
        method:'DELETE',
        headers:{
           'Content-type':'application/json',
           'X-CSRFToken':csrftoken,
       },
    }).then((response) =>{
       buildList();
       form.reset();
    })


}


function strikeUnstrike(item) {

    item.completed = !item.completed;
    console.log(item);

    var url = `http://127.0.0.1:8000/api/task/${item.id}/update/`;
    fetch(url,{
        method:'POST',
        headers:{
            'Content-type':'application/json',
            'X-CSRFToken':csrftoken,
        },
        body:JSON.stringify({'title':item.title, 'completed':item.completed})
    }).then((response) =>{
        buildList();
    })



}