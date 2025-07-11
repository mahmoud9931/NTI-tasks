let users = [
    { id: 1, name: "mahmoud", age: 20 },
    { id: 2, name: "ahmed", age: 21 },
    { id: 3, name: "amr", age: 22 },
    { id: 4, name: "mohamed", age: 23 },
];
let posts = [
    { id: 1, title: "First Post", author: "mahmoud" },
    { id: 2, title: "second Post ", author: "ahmed" },
    { id: 3, title: "third Post ", author: "amr" },
];
const http = require("http");


const server = http.createServer((req, res) => {
    res.writeHead(200, { 'Content-Type': 'application/json' });
    if (req.url == "/users" && req.method == "GET") {
        res.end(JSON.stringify(users));
    }
    else if (req.url == "/users" && req.method == "POST") {
        req.on("data", (chunk) => {
            let addedUser = JSON.parse(chunk)
            let exist = users.find((user) => user.id === addedUser.id)
            if (exist) {
                res.end("already exist")
            }
            else {
                users.push(addedUser)
                res.end("success")
            }

        })

    }
    else if (req.url == "/users" && req.method == "DELETE") {
        req.on("data", (chunk) => {
            let { id } = JSON.parse(chunk)
            users = users.filter((users) => users.id != id)
            res.end("delete")
        })
    }
    else if (req.url == "/users" && req.method == "PUT") {
        req.on("data", (chunk) => {
            let updatedUser = JSON.parse(chunk)
            let index = users.findIndex((user) => user.id === updatedUser.id)
            if (index !== -1) {
                users[index] = updatedUser
                res.end("updated")
            } else {
                res.end("user not found")
            }
        })
    }
    /////
    else if (req.url == "/posts" && req.method == "GET") {
        res.end(JSON.stringify(posts));
    }
    else if (req.url == "/posts" && req.method == "POST") {
        req.on("data", (chunk) => {
            let addedPost = JSON.parse(chunk)
            let exist = posts.find((post) => post.id === addedPost.id)
            if (exist) {
                res.end("already exist")
            }
            else {
                posts.push(addedPost)
                res.end("success")
            }
        })
    }
    else if (req.url == "/posts" && req.method == "DELETE") {
        req.on("data", (chunk) => {
            let { id } = JSON.parse(chunk)
            posts = posts.filter((post) => post.id != id)
            res.end("delete")
        })
    }
    else if (req.url == "/posts" && req.method == "PUT") {
        req.on("data", (chunk) => {
            let updatedPost = JSON.parse(chunk)
            let index = posts.findIndex((post) => post.id === updatedPost.id)
            if (index !== -1) {
                posts[index] = updatedPost
                res.end("updated")
            } else {
                res.end("post not found")
            }
        })
    }
    else {
        res.end("done");
    }

});

server.listen(3001, function () {
    console.log("server running");
});
