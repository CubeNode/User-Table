
const userTable = document.querySelector('#user-table');

// Activate cell
let addActive = (el) => {
    document.getElementById(el).classList.add('active');
}

// Inactivate cell
let removeActive = (e) => {
    for (const cell of document.querySelectorAll("td.active")) {
        cell.classList.remove("active");
      }
      e.currentTarget.classList.add("active");
}

// Show selected user posts
let getUserPosts = (e) => {
    let user = e.target.dataset.num;
    let users = document.querySelectorAll(".user");
    
    removeActive(e);
    addActive(e.target.id);

    fetch('https://jsonplaceholder.typicode.com/posts')
    .then(res => res.json())
    .then(data => {
        addPosts(data, parseInt(user));
      
    })
   
}


// Add user posts to the table
let addPosts = (userPosts, userId) => {
    let posts = userPosts.filter(post => post.userId === userId)

    for(i = 0; i < userTable.rows.length - 1; i++) {
        let post = document.createTextNode(posts[i].body);
        userTable.rows[i + 1].cells[1].innerHTML = post.textContent;
        
    }
}

// Add users to the table
let addUsers = (users) => {
    users.forEach(user => {
        let newRow = userTable.insertRow()
        let userCell = newRow.insertCell()
        let postCell = newRow.insertCell()
        let name = document.createTextNode(user.name);

        postCell.className = 'posts';

        userCell.id = `user${String(user.id)}`
        userCell.classList.add("user");
        userCell.setAttribute("data-num", user.id);
        userCell.appendChild(name);

        userCell.onclick = (e) => {
            getUserPosts(e)
        }
    });
    addActive('user1');
}

let data = fetch('https://jsonplaceholder.typicode.com/users')
    .then(res => res.json())
    .then(data => {
        addUsers(data);

        return fetch('https://jsonplaceholder.typicode.com/posts')
    })
    .then(res => res.json())
    .then(data => {
        addPosts(data, 1);
    })
    .catch(err => {
        console.error('Request failed', err)
    });


    