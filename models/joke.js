const sqlite3 = require('sqlite3').verbose();
const db = new sqlite3.Database('./identifier.sqlite');

exports.getJokesByCategory = (category, limit) => {
  return new Promise((resolve, reject) => {
    db.get(`SELECT id FROM categories WHERE name = ?`, [category], (err, row) => {
      if (err) return reject(err);
      if (!row) return reject('Category not found');

      db.all(`SELECT setup, delivery FROM jokes WHERE category_id = ? LIMIT ?`, [row.id, limit || -1], (err, jokes) => {
        if (err) reject(err);
        else resolve(jokes);
      });
    });
  });
};

exports.addJoke = (category, setup, delivery) => {
  return new Promise((resolve, reject) => {
    db.get(`SELECT id FROM categories WHERE name = ?`, [category], (err, row) => {
      if (err) return reject(err);
      if (!row) return reject('Category not found');

      db.run(`INSERT INTO jokes (category_id, setup, delivery) VALUES (?, ?, ?)`, [row.id, setup, delivery], function (err) {
        if (err) reject(err);
        else resolve({ id: this.lastID, setup, delivery });
      });
    });
  });
};
