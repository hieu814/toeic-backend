// for create one as well as create many
const create = (model, data) => new Promise((resolve, reject) => {
  model.create(data, (error, result) => {
    if (error) reject(error);
    else resolve(result);
  });
});
const create2 = (model, data, query) => new Promise((resolve, reject) => {
  const uniqueDocs = data.reduce((acc, doc) => {
    const existingDoc = acc.find((d) => d[query.filter] === doc[query.filter]);
    if (!existingDoc) {
      acc.push(doc);
    } else {
      existingDoc.val = doc.val;
    }
    return acc;
  }, []);
  const operations = uniqueDocs.map(doc => ({
    updateOne: {
      filter: { [query.filter]: doc[query.filter] },
      update: { $set: doc },
      upsert: true
    }
  }));

  model.bulkWrite(operations)
    .then((_) => {
      var _filterName = Array.from(uniqueDocs, (val => val[query.filter]))
      model.find({ name: { $in: _filterName } })
        .then((docs) => {
          resolve(docs);
        })
        .catch((err) => {
          reject(err);
        });

    })
    .catch((err) => {
      reject(err);
    });
});
// for create or update
const createWithUpsert = (model, data, query) => new Promise((resolve, reject) => {

  const operations = data.map(doc => ({

    updateOne: {
      filter: { [query.filter]: doc[query.filter] },
      update: { $set: doc },
      upsert: true
    }
  }));

  model.bulkWrite(operations)
    .then((result) => {
      resolve(result);
    })
    .catch((err) => {
      reject(err);
    });

});
// update single document that will return updated document
const updateOne = (model, filter, data, options = { new: true }) => new Promise((resolve, reject) => {
  model.findOneAndUpdate(filter, data, options, (error, result) => {
    if (error) reject(error);
    else resolve(result);
  });
});

// delete single document that will return updated document
const deleteOne = (model, filter, options = { new: true }) => new Promise((resolve, reject) => {
  model.findOneAndDelete(filter, options, (error, result) => {
    if (error) reject(error);
    else resolve(result);
  });
});

// update multiple documents and returns count
const updateMany = (model, filter, data) => new Promise((resolve, reject) => {
  model.updateMany(filter, data, { new: true }, (error, result) => {
    if (error) reject(error);
    else resolve(result.modifiedCount);
  });
});

// delete multiple documents and returns count
const deleteMany = (model, filter) => new Promise((resolve, reject) => {
  model.deleteMany(filter, (error, result) => {
    if (error) reject(error);
    else resolve(result.deletedCount);
  });
});

// find single document by query
const findOne = (model, filter, options = {}) => new Promise((resolve, reject) => {
  if (options.populate) {
    model.findOne(filter).populate(options.populate).exec((error, result) => {
      if (error) reject(error);
      else resolve(result);
    });
  } else {
    model.findOne(filter, options, (error, result) => {
      if (error) reject(error);
      else resolve(result);
    });
  }

});


// find multiple documents
const findMany = (model, filter, options = {}) => new Promise((resolve, reject) => {
  model.find(filter, null, options, (error, result) => {
    if (error) reject(error);
    else resolve(result);
  });
});

// count documents
const count = (model, filter) => new Promise((resolve, reject) => {
  model.countDocuments(filter, (error, result) => {
    if (error) reject(error);
    else resolve(result);
  });
});

// find documents with pagination
const paginate = (model, filter, options) => new Promise((resolve, reject) => {
  model.paginate(filter, options, (error, result) => {
    if (error) reject(error);
    else resolve(result);
  });
});

module.exports = {
  create,
  updateOne,
  updateMany,
  deleteOne,
  deleteMany,
  findOne,
  findMany,
  count,
  paginate,
  createWithUpsert,
  create2
};