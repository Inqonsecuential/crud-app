import mongoose from 'mongoose';

const employeeSchema = new mongoose.Schema({
  photo: String,
  name: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
  },
  department: String,
  phone: String,
});

const Employee =
  mongoose.models.Employee || mongoose.model('Employee', employeeSchema);
export default Employee;
