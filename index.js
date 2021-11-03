const express = require('express')
const {
    postCurso,
    getCursos,
    deleteCurso,
    putCurso
} = require('./consulta')
const app = express()
app.use(express.json())


app.get("/", (req, res) => {
    res.sendFile(__dirname + "/index.html")
})

app.post("/curso", async (req, res) => {
    const body = req.body
    try {
        const resultado = await postCurso(body)
        res.send(resultado)
    } catch (error) {
        res.send(error)
    }
})

app.get("/cursos", async (req, res) => {
    try {
        const cursos = await getCursos()
        res.send(cursos)
    } catch (error) {
        res.send(error)
    }
})

app.delete("/curso/:id", async (req, res) => {
    const {
        id
    } = req.params
    try {
        const resultado = await deleteCurso(id)
        res.send(resultado)
    } catch (error) {
        res.send(error)
    }
})

app.put('/curso',async (req,res) => {
    const  values  = req.body;
    console.log(values);
       try {
        const result = await putCurso(values);
        res.end("error al editar" + result);
    } catch (e) {
        res.end("ocurrio un error" + e);
    }
    })

app.listen(3000, () => console.log("Terminal OK"))