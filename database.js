import mysql from 'mysql2'

const pool = mysql.createPool({
    host: '127.0.0.1',
    user: 'root',
    password: 'Playaz01!',
    database: 'exercise_record'
}).promise()

export async function getFoods() {
const [rows] = await pool.query("SELECT description, protein, carbohydrate, total_fat from foods;")
return rows
}

export async function getFood() {
    const [rows] = await pool.query(`
    SELECT *
    FROM foods
    WHERE description LIKE '%?%'   
    LIMIT 100; 
    `, [foods])
    return rows[0]
}

const foods = await getFoods()
console.log(foods)