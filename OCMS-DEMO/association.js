import Categorie from "./models/categoriesModel.js";
import Course from "./models/courseModel.js";
import Enrollment from "./models/enrollmentModel.js";
import User from "./models/userModel.js";

User.hasMany(Course, {
    foreignKey: "instructorId",
    as: "instructor",
    onDelete: "CASCADE",
})

User.hasMany(Enrollment, {
    foreignKey:"studentId",
    as:"student",
    onDelete:"CASCADE"
})

Course.belongsTo(User, {
    foreignKey: "instructorId",
    as: "instructor" ,
    
})

Course.belongsTo(Categorie, {
    foreignKey: "categorieId",
    as: "category"
})

Course.hasMany(Enrollment, {
    foreignKey:"courseId",
    as:"course",
    onDelete:"CASCADE"
})

Categorie.hasMany(Course, {
    foreignKey: "categorieId",
})

Enrollment.belongsTo(User, {
    foreignKey:"studentId",
    as:"student"
})

Enrollment.belongsTo(Course, {
    foreignKey:"courseId",
    as:"course"
})
export {Categorie, User, Course, Enrollment}