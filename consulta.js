const {
    Pool
} = require('pg')


const config = {
    user: "postgres",
    password: "123123123",
    server: "localhost",
    port: 5432,
    database: "postgres"
}
const pool = new Pool(config)

const postCurso = async (curso) => {
    const valores = Object.values(curso)
    const cliente = await pool.connect()
    const {
        rows: resultado
    } = await cliente.query(`INSERT INTO cursos(nombre, nivel, fecha, duracion) VALUES($1, $2, $3, $4) RETURNING *;`, valores)
    console.log(resultado)
    return resultado
}

const getCursos = async () => {
    const cliente = await pool.connect()
    const {
        rows: resultado
    } = await cliente.query(`SELECT * FROM cursos;`)
    return resultado
}

const deleteCurso = async (id) => {
    const cliente = await pool.connect()
    const resultado = await cliente.query(`DELETE FROM cursos WHERE id='${id}' RETURNING *;`)
    return resultado
}

const putCurso = async (curso) => {
    const valores = Object.values(curso);
 console.log(valores);
    const consulta = {
        text: "UPDATE cursos SET nombre=$1, nivel=$2, fecha=$3,duracion=$4 WHERE id=$5 RETURNING *",
        valores
    };
    const resultado = await pool.query(consulta);
    return resultado;
}

module.exports = {
    postCurso,
    getCursos,
    deleteCurso,
    putCurso
}