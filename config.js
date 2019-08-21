const Pool = require('pg').Pool
const pool = new Pool({
  user: 'postgres',
  host: 'localhost',
  database: 'mydatabase',
  password: 'password',
  port: 5432,
})
const axios = require('axios')



//get all users
const getUsers = (request, response) => {
  pool.query('SELECT * FROM karyawan ORDER BY id_karyawan ASC', (error, results) => {
    if (error) {
      throw error
    }
    response.status(200).json(results.rows)
  })
}

const getUserById = (request, response) => {
    const id = parseInt(request.params.id)
  
    pool.query('SELECT * FROM karyawan WHERE id_karyawan = $1', [id], (error, results) => {
      if (error) {
        throw error
      }
      response.status(200).json(results.rows)
    })
  }

//absen
const showAllAbsen = async (request, response) => {
    pool.query('SELECT * FROM absensi WHERE status = $1', [1], (error, results) => {
        if (error) {
          throw error
        }
        response.status(200).json(results.rows)
      })
}
const insertAbsen = async (request, response) => {
    const dataJson = await axios.get('http://localhost:3000/users/'+request.params.id)
    .then(function (response) {
        return response.data[0];
    })
    .catch(function (error) {
        console.log(error);
    });
    const { nama_karyawan } = dataJson
  
    pool.query('INSERT INTO absensi (nama_karyawan, tanggal, status) VALUES ($1, $2, $3)', [nama_karyawan, new Date(), 1], (error, results) => {
      if (error) {
        throw error
      }
      response.status(201).send(`Absen added with ID: ${request.params.id}`)
    })
  }

//get data penggajian
const createPayrollReport = (request, response) => {

    pool.query('SELECT COUNT(status) FROM absensi where nama_karyawan = $1',[request.params.id], (error, results) => {
        if (error) {
          throw error
        }
        console.log(results.rows)
        var lama_kerja = results.rows[0].count
        var nilai_kerja = 10000000;

        var total_gaji = lama_kerja * nilai_kerja
        console.log(total_gaji)
        response.status(200).json({total_gaji})
      })

    // pool.query('SELECT * FROM karyawan ORDER BY id_karyawan ASC', (error, results) => {
    //   if (error) {
    //     throw error
    //   }
    //   response.status(200).json(results.rows)
    // })
  }


module.exports = {
  getUsers,
  getUserById,
  showAllAbsen,
  insertAbsen,
  createPayrollReport
}