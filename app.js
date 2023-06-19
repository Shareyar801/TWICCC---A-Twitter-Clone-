let baseUrl =
            (document.location.protocol === 'https:') ?
                "https://ewewe.cyclic.app"
                :
                "http://localhost:3005";


        function postTodo() {
            let todoText = document.querySelector("#todo").value

            // document.querySelector("#result").innerHTML += todoText;
            // document.querySelector("#result").innerHTML += '<br>';

            axios.post(`${baseUrl}/todo`, {
                text: todoText
            })
                .then(function (response) {
                    console.log(response.data);

                    getAllTodos();

                    document.querySelector("#message").innerHTML = response.data.message
                    setTimeout(() => {
                        document.querySelector("#message").innerHTML = "";
                    }, 2000);

                    // response.data.data.map(eachTodo => {
                    //     document.querySelector("#result").innerHTML += eachTodo
                    //     document.querySelector("#result").innerHTML += '<br>'
                    // })

                })
                .catch(function (error) {
                    console.log(error);
                })

        }

        function getAllTodos() {
            axios.get(`${baseUrl}/todos`)
                .then(function (response) {
                    console.log(response.data);

                    document.querySelector("#result").innerHTML = ""

                    response.data.data.map(eachTodo => {
                        document.querySelector("#result").innerHTML += `<span id='span-${eachTodo._id}'> ${eachTodo.text} </span>`;
                        document.querySelector("#result").innerHTML +=
                            `<form id='form-${eachTodo._id}' style="display: none;" onsubmit="updateTodo('${eachTodo._id}'); return false"> 
                                <input id='input-${eachTodo._id}' value='${eachTodo.text}'  />
                                <button type="submit">Update</button>
                            </form>`;

                        document.querySelector("#result").innerHTML +=
                            `&nbsp;&nbsp; <button onclick="deleteTodo('${eachTodo._id}')" id='delete-${eachTodo._id}'> Delete </button>
                            <button onclick="editTodo('${eachTodo._id}')" id='edit-${eachTodo._id}'> Edit </button>`

                        document.querySelector("#result").innerHTML += '<br>'
                    })

                })
                .catch(function (error) {
                    console.log(error);
                })
        }

        getAllTodos();
        setInterval(getAllTodos, 10000);

        let deleteTodo = async (id) => {
            try {
                let response = await axios.delete(`${baseUrl}/todo/${id}`)

                document.querySelector("#message").innerHTML = response.data.message
                setTimeout(() => {
                    document.querySelector("#message").innerHTML = ""
                }, 2000);

                getAllTodos();

            } catch (error) {
                console.log("error: ", error);
            }


        }
        let deleteAllTodos = async () => {
            try {
                let response = await axios.delete(`${baseUrl}/todos`)

                document.querySelector("#message").innerHTML = response.data.message
                setTimeout(() => {
                    document.querySelector("#message").innerHTML = ""
                }, 2000);

                document.querySelector("#result").innerHTML = "";

            } catch (error) {
                console.log("error: ", error);
            }


        }


        let editTodo = async (id) => {

            console.log("edit id: ", id)
            document.querySelector(`#form-${id}`).style.display = "inline"

            document.querySelector(`#span-${id}`).style.display = "none"
            document.querySelector(`#delete-${id}`).style.display = "none"
            document.querySelector(`#edit-${id}`).style.display = "none"
        }

        let updateTodo = async (id) => {
            console.log("update id: ", id)

            let updatedText = document.querySelector(`#input-${id}`).value

            try {
                let response = await axios.put(`${baseUrl}/todo/${id}`,
                    {
                        text: updatedText
                    })

                document.querySelector("#message").innerHTML = response.data.message
                setTimeout(() => {
                    document.querySelector("#message").innerHTML = ""
                }, 2000);

                getAllTodos();

            } catch (error) {
                console.log("error: ", error);
            }




        }



