const pool = require('./index.js');

const getPhotos = (id, callback) => {
  const q = 'SELECT * FROM photos WHERE r_id = $1';

  pool.query(q, [id], (err, res) => {
    if (err) return callback(err);
    callback(null, res);
  });
};

const getPhoto = (id) => {
  const q = 'SELECT * FROM photos WHERE id = $1';

  return new Promise((resolve, reject) => {
    pool.query(q, [id], (err, res) => {
      if (err) return reject(err);
      resolve(res);
    });
  });
};

const addPhoto = (r_id, url, username, date) => {
  const q = 'INSERT INTO photos (r_id, url, username, date, flag) VALUES ($1, $2, $3, $4,false)';

  return new Promise((resolve, reject) => {
    pool.query(q, [r_id, url, username, date], (err, res) => {
      if (err) return reject(err);
      resolve(res);
    });
  });
};

const deletePhoto = (id) => {
  const q = 'DELETE FROM photos WHERE id = $1';

  return new Promise((resolve, reject) => {
    pool.query(q, [id], (err, res) => {
      if (err) return reject(err);
      resolve(res);
    });
  });
};

const updatePhotoURL = (id, url) => {
  const q = 'UPDATE photos SET url = $1 WHERE id = $2';

  return new Promise((resolve, reject) => {
    pool.query(q, [url, id], (err, res) => {
      if (err) return reject(err);
      resolve(res);
    });
  });
};

const updatePhotoUser = (id, username) => {
  const q = 'UPDATE photos SET username = $1 WHERE id = $2';

  return new Promise((resolve, reject) => {
    pool.query(q, [username, id], (err, res) => {
      if (err) return reject(err);
      resolve(res);
    });
  });
};

const flagPhoto = (id) => {
  const q = 'UPDATE photos SET FLAG = TRUE WHERE id = $1';

  return new Promise((resolve, reject) => {
    pool.query(q, [id], (err, res) => {
      if (err) return reject(err);
      resolve(res);
    });
  });
};

const addFlag = (id, reason, date) => {
  const q = 'INSERT INTO flags (reason,date,p_id) VALUES ($1, $2, $3)';

  return new Promise((resolve, reject) => {
    pool.query(q, [reason, date, id], (err, res) => {
      if (err) return reject(err);
      resolve(res);
    });
  });
};

const deleteFlag = (id) => {
  const q = 'DELETE FROM flags WHERE id = $1';

  return new Promise((resolve, reject) => {
    pool.query(q, [id], (err, res) => {
      if (err) return reject(err);
      resolve(res);
    });
  });
};

const deleteFlagsByPhoto = (id) => {
  const q = 'DELETE FROM flags WHERE p_id = $1';

  return new Promise((resolve, reject) => {
    pool.query(q, [id], (err, res) => {
      if (err) return reject(err);
      resolve(res);
    });
  });
};

module.exports = {
  getPhotos,
  getPhoto,
  addPhoto,
  updatePhotoURL,
  updatePhotoUser,
  deletePhoto,
  flagPhoto,
  addFlag,
  deleteFlag,
  deleteFlagsByPhoto,
};
