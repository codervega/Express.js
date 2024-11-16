const noteSchema = require("../model/noteSchema");

exports.createNote = async (req, res) => {
  let payload = await noteSchema.create(req.body);
  res.status(200).json({
    success: true,
    message: 'Data is inserted',
    payload
  });
};


exports.fetchSingleData = async (req, res) => {
  let payload = await noteSchema.findById(req.params.id);
  res.status(200).json({
    success: true,
    message: 'Single data is fetched',
    payload
  });
};

exports.deletedata = async (req, res) => {
  await noteSchema.findByIdAndDelete(req.params.id);
  res.status(200).send("Data is deleted");
};


exports.updatedata = async (req, res) => {
  let payload = await noteSchema.findByIdAndUpdate(
    req.params.id,
    { $set: req.body },
    { new: true }
  );

  res.status(200).send("Data is updated successfully");
};
