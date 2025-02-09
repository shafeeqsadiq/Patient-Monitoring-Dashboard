const db = require('../config/database');

class Patient {
    static getAll(callback) {
        const sql = 'SELECT * FROM patients';
        db.all(sql, [], (err, rows) => {
            if (err) {
                console.error('Error fetching patients:', err);
                return callback(err);
            }
            console.log('Retrieved patients:', rows); // Debug log
            callback(null, rows);
        });
    }

    static create(patient, callback) {
        const sql = 'INSERT INTO patients (name, age, gender) VALUES (?, ?, ?)';
        db.run(sql, [patient.name, patient.age, patient.gender], function(err) {
            if (err) {
                console.error('Error creating patient:', err);
                return callback(err);
            }
            console.log('Created patient with ID:', this.lastID); // Debug log
            callback(null, this.lastID);
        });
    }

    static delete(id, callback) {
        const sql = 'DELETE FROM patients WHERE id = ?';
        db.run(sql, [id], function(err) {
            if (err) {
                console.error('Error deleting patient:', err);
                return callback(err);
            }
            callback(null);
        });
    }
    

    static findById(id, callback) {
        const sql = 'SELECT * FROM patients WHERE id = ?';
        db.get(sql, [id], (err, row) => {
            if (err) {
                console.error('Error finding patient:', err);
                return callback(err);
            }
            console.log('Found patient:', row); // Debug log
            callback(null, row);
        });
    }
}

module.exports = Patient;
