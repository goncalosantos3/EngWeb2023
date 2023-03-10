
exports.homePage = function(tasks, data){
    var porCompletar = []
    var completadas = []

    for(let i = 0; i < tasks.length; i++){
        if(tasks[i].completed == 1){ // Tarefa ainda por completar
            completadas.push(tasks[i])
        }else{
            porCompletar.push(tasks[i])
        }
    }

    var pagHTML = `
        <html>
            <head>
                <meta charset="UTF-8"/>
                <link rel="icon" href="tasks.png"/>
                <link rel="stylesheet" href="w3.css"/>
                <title>Tasks Management</title>
            </head>
            <body>
                <div>
                    <h1>Insertion Form</h1>
                    <form class="w3-container" method="POST">
                        <fieldset>
                            <legend>Metadata</legend>
                            <label>Id</label>
                            <input class="w3-input w3-round" type="text" name="id"/>
                            <label>Author</label>
                            <input class="w3-input w3-round" type="text" name="author"/>
                            <label>Due Date</label>
                            <input class="w3-input w3-round" type="text" name="date"/>
                            <label>Desc</label>
                            <input class="w3-input w3-round" type="text" name="desc"/>
                            <label>Completed</label>
                            <input class="w3-check" type="checkbox" name="completed" value="1"/>
                        </fieldset>
                        <br/>
                        <button class="w3-btn w3-purple w3-mb-2" type="submit">Register</button>
                    </form>
                </div>
                <div>
                    <h1>Edition Form</h1>
                    <form class="w3-container" method="POST">
                        <fieldset>
                            <legend>Metadata</legend>
                            <label>Id</label>
                            <input class="w3-input w3-round" type="text" name="id"/>
                            <label>Author</label>
                            <input class="w3-input w3-round" type="text" name="author"/>
                            <label>Due Date</label>
                            <input class="w3-input w3-round" type="text" name="date"/>
                            <label>Desc</label>
                            <input class="w3-input w3-round" type="text" name="desc"/>
                            <label>Completed</label>
                            <input class="w3-check" type="checkbox" name="completed" value="1"/>
                        </fieldset>
                        <br/>
                        <button class="w3-btn w3-purple w3-mb-2" type="submit">Register</button>
                    </form>
                </div>
                <div class="tasks">
                    <div class="child">
                        <h1>To do Tasks</h1>
                        <table class="w3-table w3-striped">
                            <tr>
                                <th>Id</th>
                                <th>Author</th>
                                <th>Due Date</th>
                                <th>Desc</th>
                                <th>Operations<th>
                            </tr>
    `

    for(let i = 0; i < porCompletar.length; i++){
        pagHTML += `
                            <tr>
                                <td>${porCompletar[i].id}</td>
                                <td>${porCompletar[i].author}</td>
                                <td>${porCompletar[i].date}</td>
                                <td>${porCompletar[i].desc}</td>
                                <td>[<a href="/edit/${porCompletar[i].id}">Edit</a>][<a href="/delete/${porCompletar[i].id}">Delete</a>]</td>
                            </tr>        
        `   
    }

    pagHTML += `
                        </table>
                    </div>
                    <div class="child">
                        <h1>Done Tasks</h1>
                        <table class="w3-table w3-striped">
                            <tr>
                                <th>Id</th>
                                <th>Author</th>
                                <th>Due Date</th>
                                <th>Desc</th>
                                <th>Operations<th>
                            </tr>
    `

    for(let i = 0; i < completadas.length; i++){
        pagHTML += `
                            <tr>
                                <td>${completadas[i].id}</td>
                                <td>${completadas[i].author}</td>
                                <td>${completadas[i].date}</td>
                                <td>${completadas[i].desc}</td>
                                <td>[<a href="/edit/${completadas[i].id}">Edit</a>][<a href="/delete/${completadas[i].id}">Delete</a>]</td>
                            </tr>
        `
    }

    pagHTML += `
                        </table>
                    </div>
                </div>
                <footer>
                    <h5>Generated by EngWeb2023 in ${data} - [<a href="/">Return</a>]</h5>
                </footer>
            </body>
        </html>
    `

    return pagHTML
}

exports.editTask = function(tasks, task, data){
    var porCompletar = []
    var completadas = []

    for(let i = 0; i < tasks.length; i++){
        if(tasks[i].completed == 1){
            completadas.push(tasks[i])
        }else{
            porCompletar.push(tasks[i])
        }

        if(tasks[i].id == task){
            task = tasks[i]
        }
    }

    var pagHTML = `
        <html>
            <head>
                <meta charset="UTF-8"/>
                <link rel="icon" href="tasks.png"/>
                <link rel="stylesheet" href="w3.css"/>
                <title>Tasks Management</title>
            </head>
            <body>
                <div>
                    <h1>Insertion Form</h1>
                    <form class="w3-container" method="POST">
                        <fieldset>
                            <legend>Metadata</legend>
                            <label>Id</label>
                            <input class="w3-input w3-round" type="text" name="id"/>
                            <label>Author</label>
                            <input class="w3-input w3-round" type="text" name="author"/>
                            <label>Due Date</label>
                            <input class="w3-input w3-round" type="text" name="date"/>
                            <label>Desc</label>
                            <input class="w3-input w3-round" type="text" name="desc"/>
                            <label>Completed</label>
                            <input class="w3-check" type="checkbox" name="completed" value="1"/>
                        </fieldset>
                        <br/>
                        <button class="w3-btn w3-purple w3-mb-2" type="submit">Register</button>
                    </form>
                </div>
                <div>
                    <h1>Edition Form</h1>
                    <form class="w3-container" method="POST">
                        <fieldset>
                            <legend>Metadata</legend>
                            <label>Id</label>
                            <input class="w3-input w3-round" type="text" name="id" value="${task.id}"/>
                            <label>Author</label>
                            <input class="w3-input w3-round" type="text" name="author" value="${task.author}"/>
                            <label>Due Date</label>
                            <input class="w3-input w3-round" type="text" name="date" value="${task.date}"/>
                            <label>Desc</label>
                            <input class="w3-input w3-round" type="text" name="desc" value="${task.desc}"/>
                            <label>Completed</label>
                            <input class="w3-check" type="checkbox" name="completed" value="1"/>
                        </fieldset>
                        <br/>
                        <button class="w3-btn w3-purple w3-mb-2" type="submit">Register</button>
                    </form>
                </div>
                <div class="tasks">
                    <div class="child">
                        <h1>To do Tasks</h1>
                        <table class="w3-table w3-striped">
                            <tr>
                                <th>Id</th>
                                <th>Author</th>
                                <th>Due Date</th>
                                <th>Desc</th>
                                <th>Operations<th>
                            </tr>
    `

    for(let i = 0; i < porCompletar.length; i++){
        pagHTML += `
                            <tr>
                                <td>${porCompletar[i].id}</td>
                                <td>${porCompletar[i].author}</td>
                                <td>${porCompletar[i].date}</td>
                                <td>${porCompletar[i].desc}</td>
                                <td>[<a href="/edit/${porCompletar[i].id}">Edit</a>][<a href="/delete/${porCompletar[i].id}">Delete</a>]</td>
                            </tr>        
        `   
    }

    pagHTML += `
                        </table>
                    </div>
                    <div class="child">
                        <h1>Done Tasks</h1>
                        <table class="w3-table w3-striped">
                            <tr>
                                <th>Id</th>
                                <th>Author</th>
                                <th>Due Date</th>
                                <th>Desc</th>
                                <th>Operations<th>
                            </tr>
    `

    for(let i = 0; i < completadas.length; i++){
        pagHTML += `
                            <tr>
                                <td>${completadas[i].id}</td>
                                <td>${completadas[i].author}</td>
                                <td>${completadas[i].date}</td>
                                <td>${completadas[i].desc}</td>
                                <td>[<a href="/edit/${completadas[i].id}">Edit</a>][<a href="/delete/${completadas[i].id}">Delete</a>]</td>
                            </tr>
        `
    }

    pagHTML += `
                        </table>
                    </div>
                </div>
                <footer>
                    <h5>Generated by EngWeb2023 in ${data} - [<a href="/">Return</a>]</h5>
                </footer>
            </body>
        </html>
    `

    return pagHTML
}