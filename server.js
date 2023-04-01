import express from 'express';
const app = express()
const port = 4230

// the actions done between the requset and the response
app.use(express.json({limit: "50mb"})) //with this i tell express that i will be using json with a limit of 50mb

// the Endpoint where the data will be stored
app.post("/api/clients", (req, res) => {
    console.log("dummyEndPoint")
    res.send("You Have Posted Something")
})

app.get('/', (req, res) => {
  res.send('Seems like Express runs jut fine!')
})

app.listen(port, () => {
  console.log(`The server is running on http://localhost:${port}`)
})