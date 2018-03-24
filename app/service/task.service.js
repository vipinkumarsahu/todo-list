const taskModal = require('../models/TaskModel');

module.exports.listProject = async function list() {
  try{
    let data = await taskModal.find();
    return data;
  }catch (error){
    throw error;
  }
}