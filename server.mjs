import express from 'express';
import cors from 'cors';
import mongoose from 'mongoose';



let todoSchema = new mongoose.Schema({
    text: { type: String, required: true },
    classId: String,
    createdOn: { type: Date, default: Date.now }
});
const todoModel = mongoose.model('Tweet', todoSchema);



const app = express()
const port = process.env.PORT || 3005;


app.use(express.json());
app.use(cors());

app.post('/todo', async (req, res) => {
  try {
    const newTodo = { text: req.body.text };
    const saved = await todoModel.create(newTodo);
    console.log(saved);

    res.send({
      message: "Your todo is saved"
    });
  } catch (error) {
    res.status(500).send({
      message: "Server error"
    });
  }
});






app.get('/todos', async (req, res) => {
  try {
    const data = await todoModel.find({});
    res.send({
      message: "Here is your todo list",
      data: data
    });

    
  } catch (error) {
    console.log(error);
            document.querySelector("#result").innerHTML =
                error.data.message
  }
});




app.put('/todo/:id', async (req, res) => {

    try {
        let data = await todoModel
            .findByIdAndUpdate(
                req.params.id,
                { text: req.body.text },
                { new: true }
            )
            .exec();

        console.log('updated: ', data);

        res.send({
            message: "todo is updated successfully",
            data: data
        })

    } catch (error) {
        res.status(100).send({
            message: "server error"
        })
    }
})


app.delete('/todos', (req, res) => {

    todoModel.deleteMany({}, (err, data) => {
        if (!err) {
            res.send({
                // message: "All Todo has been deleted successfully",
            })
        } else {
            res.status(100).send({
                message: "server error"
            })
        }
    });
})



// app.delete('/todo/:id', (req, res) => {
//     todoModel.deleteOne({ _id: req.params.id }, (err, data) => {
//         if (!err) {
//             res.send({
//                 message: "Your Todo Is Deleted Successfully!!",
//             })
//         } else {
//             res.status(500), send({
//                 message: "Server Error!"
//             })
//         }


//     });


// })



// app.listen(port, () => {
//     console.log(`Example app listening on port ${port}`)
// })





// app.delete('/todo/:id', (req, res) => {

//     todoModel.deleteOne({ _id: req.params.id }, (err, deletedData) => {
//         console.log("deleted: ", deletedData);
//         if (!err) {

//             if (deletedData.deletedCount !== 0) {
//                 res.send({
//                     message: "Todo has been deleted successfully",
//                 })
//             } else {
//                 res.send({
//                     message: "No todo found with this id: " + req.params.id,
//                 })
//             }


//         } else {
//             res.status(500).send({
//                 message: "server error"
//             })
//         }
//     });
// })

// app.listen(port, () => {
//     console.log(`Server app is listening on port ${port}`)
// })


app.delete('/todo/:id', async (req, res) => {
  try {
    const deletedData = await todoModel.deleteOne({ _id: req.params.id });

    console.log("deleted: ", deletedData);

    if (deletedData.deletedCount !== 0) {
      res.send({
        message: "Todo has been deleted successfully",
        
      });
    } else {
      res.send({
        message: "No todo found with this id: " + req.params.id,
      });
    }
  } catch (err) {
    console.log(err);
    res.status(100).send({
      message: "Server error",
    });
  }
});



// app.post("/LoginPage", (req, res) => {
//   console.log("myboy post", new Date() + req.ip);
//   res.send("post by myboy");
// });




app.listen(port, () => {
  console.log(`Server app is listening on port ${port}`);
});








/////////////////////////////////////////////////////////////////////////////////////////////////
let dbURI = 'mongodb+srv://username:username@cluster0.640ylgv.mongodb.net/Tweet-Database?retryWrites=true&w=majority';
mongoose.connect(dbURI);


////////////////mongodb connected disconnected events///////////////////////////////////////////////
mongoose.connection.on('connected', function () {//connected
    console.log("Mongoose is connected");
    // process.exit(1);
});

mongoose.connection.on('disconnected', function () {//disconnected
    console.log("Mongoose is disconnected");
    process.exit(1);
});

mongoose.connection.on('error', function (err) {//any error
    console.log('Mongoose connection error: ', err);
    process.exit(1);
});

process.on('SIGINT', function () {/////this function will run jst before app is closing
    console.log("app is terminating");
    mongoose.connection.close(function () {
        console.log('Mongoose default connection closed');
        process.exit(0);
    });
});
////////////////mongodb connected disconnected events///////////////////////////////////////////////
