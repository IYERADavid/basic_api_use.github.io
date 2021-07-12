let post_url = 'https://jsonplaceholder.typicode.com/posts?userId=';
let get_posts = (id) => {
    let current_user_posts = document.getElementById("posts_table");
    if (current_user_posts){
        current_user_posts.remove();
    }

    let user_id = id;
    general_url = post_url+user_id;

    Http.open("GET", general_url);
    Http.send();
    Http.onreadystatechange = function() {
        if (this.readyState == 4 && this.status == 200) {
            // Typical action to be performed when the document is ready:
           let posts = JSON.parse(Http.responseText);
           let number_of_posts = posts.length

            let posts_table = () => {
                let user_element = document.getElementById('user');
                let close = document.getElementById('close');
                let standard_messsage = "Posts for ";
                let user_name = document.getElementById(user_id).innerHTML;
                user_element.innerHTML = standard_messsage + user_name;
                close.innerHTML = "&#x2715";

                let table = document.createElement("table");
                let tbl_head = document.createElement("thead");
                let tbl_body = document.createElement("tbody");
                // data for table head
                let row = document.createElement("tr");
                let headings = ['id', 'title', 'body']
                for(let h=0; h<3; h++){
                    let thead = document.createElement("th");
                    let thead_text = document.createTextNode(headings[h]);
                    thead.setAttribute("scope", "col")
                    thead.appendChild(thead_text);
                    row.appendChild(thead);
                }
                tbl_head.appendChild(row);
                table.appendChild(tbl_head);
                for(let r=0; r<number_of_posts; r++){
                    rows = document.createElement("tr");
                    user_post = posts[r];
                    let datas = [ user_post.id, user_post.title, user_post.body];
                    for(let d = 0; d < 3; d++) {
                        let tdata = document.createElement("td");
                        let tdata_text = document.createTextNode(datas[d]);
                        if (d==0){
                            tdata.setAttribute("scope", "row");
                        };
                        tdata.appendChild(tdata_text);
                        rows.appendChild(tdata);
                    };
                    tbl_body.appendChild(rows);
                }
                table.appendChild(tbl_body);
                table.setAttribute("class", "table table-striped table-hover");
                table.setAttribute("id", "posts_table");
                let main_div = document.getElementById('user_posts');
                main_div.appendChild(table);

                let destination = document.getElementById("user_posts");    
                // Scroll to the destination using
                // scrollIntoView method
                destination.scrollIntoView({behavior: 'smooth'});
            }
           posts_table();
        }
    }
}

let Http = new XMLHttpRequest();
const users_url='https://jsonplaceholder.typicode.com/users';
Http.open("GET", users_url);
Http.send();


Http.onreadystatechange = function() {
    if (this.readyState == 4 && this.status == 200) {
       // Typical action to be performed when the document is ready:
       let users = JSON.parse(Http.responseText);
       let table_body = document.getElementById('table_body');
       for(let i=0; i<10; i++){
           user = users[i];
           user_id = i+1;
           let table_row = document.createElement('tr');
           let button = document.createElement('button')
           button.innerHTML = "view"
           button.setAttribute('onclick', `get_posts(${user_id})`);
           button.setAttribute('class', 'btn btn-success');
           let datas = [ user_id, user.username, user.email, button];
           for(d=0;d<4;d++){
                let tdata = document.createElement("td");
                if (d==3){
                    tdata.appendChild(datas[d]);
                    table_row.appendChild(tdata);
                } 
                else{
                    let tdata_text = document.createTextNode(datas[d])
                    if (d==0){
                        tdata.setAttribute("scope", "row");
                    };
                    if (d==1){
                        tdata.setAttribute('id', user_id);
                    }
                    tdata.appendChild(tdata_text);
                    table_row.appendChild(tdata);
                }
           }
           table_body.appendChild(table_row);
           console.log('finsh')
       }  
    }
};

let erase_data = () => {
    let table_dta = document.getElementById('posts_table');
    let user_element = document.getElementById('user');
    let close = document.getElementById('close');
    table_dta.remove();
    user_element.innerHTML = "";
    close.innerHTML = "";

    let destination = document.getElementById("main");    
    // Scroll to the destination using
    // scrollIntoView method
    destination.scrollIntoView({behavior: 'smooth'});
}
