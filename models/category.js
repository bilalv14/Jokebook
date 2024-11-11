const sqlite3 = require('sqlite3').verbose();
const db = new sqlite3.Database('./identifier.sqlite');

exports.getCategories = () => {
  return new Promise((resolve, reject) => {
    db.all(`SELECT name FROM categories`, (err, rows) => {
      if (err) reject(err);
      else resolve(rows.map(row => row.name));
    });
  });
};
