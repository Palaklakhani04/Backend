import { enrollmentSchema } from "../middleware/Validation.js";
import { Course, User, Enrollment } from "../association.js";

export async function getAllEnrollment(req, res) {
    try {
        const enrollments = await Enrollment.findAll({
            attributes:["id","enrolledAt"],
            include : [
                {
                    model: User,
                    attributes:["id"],
                    as:"student"
                },
                {
                    model: Course,
                    attributes:["id"],
                    as:"course"
                }
            ]
        })
        if(!enrollments) return res.status(200).json([])
        return res.status(200).json(enrollments)
    } catch (error) {
        console.log(error)
        return res.status(500).json({ error : error.message})
    }
}

export async function createEnrollment(req, res) {
    try {
        const { error } = enrollmentSchema.validate(req.body)
        if(error) return res.status(400).json({message : error.details[0].error})
        
        const { studentId, courseId } = req.body

        const studentOnly = await User.findOne({
            where: {
                id: studentId,
                userType: "student"
            }
        })

        if(studentOnly){
            const newEnroll = await Enrollment.findOrCreate({
                    where:{
                        studentId: studentId, 
                        courseId : courseId
                    }
                }
            )
            return res.status(201).json(newEnroll)
        }else{
            return res.status(404).json({message: "User not found"})
        }

    } catch (error) {
        console.log(error)
        return res.status(500).json({ error : error.message})
    }
}

export async function deleteEnrollmentById(req, res) {
    try {
        const enrollId = req.params.id
        const enrollment = await Enrollment.findOne({
            where :{
                id: enrollId
            }
        })
        if(!enrollment) return res.status(400).json({message : "Enrollment Id not found."})
        await enrollment.destroy()
        return res.status(200).json({message : "Enrollment deleted."})
    } catch (error) {
        console.log(error)
        return res.status(500).json({ error : error.message})
    }
}