import Course from "./models/courseModel.js";
import Employee from "./models/employeeModel.js";
import Post from "./models/postModel.js";
import Profile from "./models/profile.js";
import Student from "./models/studentModel.js";

// one to one
Employee.hasOne(Profile, {
    foreignKey: 'emId',
    as : 'profile'
})

Profile.belongsTo(Employee, {
    foreignKey: 'emId',
    as : 'employee info'
})

// one to many
Employee.hasMany(Post, {
    foreignKey: 'emId',
    as : 'post'
})

Post.belongsTo(Employee, {
    foreignKey: 'emId',
    as : 'employee info'
})

// many to many

Student.belongsToMany(Course, {through : "studentCourses"})
Course.belongsToMany(Student, {through : "studentCourses"})
