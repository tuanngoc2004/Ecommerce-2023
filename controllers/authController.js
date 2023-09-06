import { ComparePassword, hashPassword } from "../helpers/authHelper.js";
import { createUser, findById, findByIdAndUpdate, findEmailAndUpdate, findUserByEmail } from "../models/userModel.js";
import { createUsersTable } from "../models/userModel.js";
import JWT from "jsonwebtoken";

// Run the function to create the users table


export const registerController = async (req, res) => {
    createUsersTable().then((success) => {
        if (success) {
        console.log("Tables created successfully!");
        } else {
        console.log("Error creating tables.");
        }
    })
    .catch((error) => {
        console.error("Error creating tables:", error);
    });

  try {
    const { name, email, password, phone, address, answer } = req.body;

    // Validations
    if (!name) {
      return res.send({ message: "Name is required" });
    }
    if (!email) {
      return res.send({ message: "Email is required" });
    }
    if (!password) {
      return res.send({ message: "Password is required" });
    }
    if (!phone) {
      return res.send({ message: "Phone is required" });
    }
    if (!address) {
      return res.send({ message: "Address is required" });
    }
    if (!answer) {
      return res.send({ message: "Answer is required" });
    }

    // Check if the user already exists
    const existingUser = await findUserByEmail(email);

    if (existingUser) {
      return res.status(200).send({
        success: false,
        message: "Already registered. Please login.", 
      });
    }

    // Hash the password
    const hashedPassword = await hashPassword(password);

    // Register the user
    const success = await createUser(name, email, hashedPassword, phone, address, answer);

    if (success) {
      return res.status(201).send({
        success: true,
        message: "User registered successfully",
      });
    } else {
      return res.status(500).send({
        success: false,
        message: "Error in registration"
      });
    }
  } catch (error) {
    console.error(error);
    return res.status(500).send({
      success: false,
      message: "Error in registration",
      error,
      
    });
  }
};


//POST LOGIN
export const loginController = async (req, res) => {
    try {
        const { email, password } = req.body;
  
        // Kiểm tra xem email và password có tồn tại hay không
        if (!email || !password) {
            return res.status(404).send({
            success: false,
            message: 'Email hoặc mật khẩu không hợp lệ'
            });
        }
  
        // Tìm người dùng trong cơ sở dữ liệu bằng email
        const user = await findUserByEmail(email);
    
        // Kiểm tra xem người dùng có tồn tại hay không
        if (!user) {
            return res.status(404).send({
            success: false,
            message: 'Người dùng không tồn tại'
            });
        }
  
        // So sánh mật khẩu đã nhập với mật khẩu đã lưu trong cơ sở dữ liệu
        const isPasswordMatched = await ComparePassword(password, user.password);
    
        if (isPasswordMatched) {
            // Mật khẩu khớp, tạo token JWT để xác thực người dùng
            // const token = JWT.sign({ _id: user._id }, process.env.JWT_SECRET, {expiresIn:'7d'});
            const token = JWT.sign({ userId: user.id }, process.env.JWT_SECRET, {expiresIn:'7d'});
    
            return res.status(200).send({
            success: true,
            message: 'Đăng nhập thành công',
            user: {
                id: user.id,
                name: user.name,
                email: user.email,
                phone: user.phone,
                address: user.address,
                // answer: user.answer,
                role_as: user.role_as,

            },
            token
            });
        } else {
            // Mật khẩu không khớp
            return res.status(401).send({
                success: false,
                message: 'Mật khẩu không chính xác'
            });
        }
    } catch (error) {
        console.error(error);
        return res.status(500).send({
            success: false,
            message: 'Lỗi trong quá trình đăng nhập',
            error
        });
    }
};


//TEST CONTROLLER
export const testController = (req, res) => {
    try{
        res.send("Prorected routes");
    }catch(e){
        res.send({e});  
    }
}
 

//FOGOT PASSWORD CONTROLLER


export const forgotPasswordController = async (req, res) => {
  try {
    const { email, answer, password } = req.body;

    if (!email || !answer || !password) {
      return res.status(400).send({ message: 'Email, answer, and new password are required' });
    }
    const hashed = await hashPassword(password);
    const success = await findEmailAndUpdate(email, hashed, answer);
    console.log(hashed);
    //định nghĩa function update user 
    // await findUserById(user.id, {password: hashed});

    if (!success) {
      return res.status(404).send({
        success: false,
        message: 'Wrong email or answer',
      });
    }

    res.status(200).send({
      success: true,
      message: 'Password reset successfully',
    });
  } catch (error) {
    console.log(error);
    res.status(500).send({
      success: false,
      message: 'Something went wrong',
      error,
    });
  }
};


//Login Controller 
// export const loginController = async (req, res) => {
//     try{
//         const {email, password} = req.body;
//         //validation
//         if(!email || !password)
//         {
//             return res.status(404).send({
//                 success: false,
//                 message: 'Invalid email or password'
//             });
//         }
//         //check user
//         const user = await 
//     }catch(e){
//         console.log(e);
//         res.status(500).send({
//             success: false,
//             message: 'Error in Login',
//             error
//         })    
//     }
// };


// update profile
// export const updateProfileController = async (req, res) => {
//   try{
//     const { name, email, password, address, phone } = req.body;
//     const user = await userModel.findById(req.user._id);
//     //password
//     if (password && password.length < 6) {
//       return res.json({ error: "Passsword is required and 6 character long" });
//     }
//     const hashedPassword = password ? await hashPassword(password) : undefined;
//     const updatedUser = await userModel.findByIdAndUpdate(
//       req.user._id,
//       {
//         name: name || user.name,
//         password: hashedPassword || user.password,
//         phone: phone || user.phone,
//         address: address || user.address,
//       },
//       { new: true }
//     );
//     res.status(200).send({
//       success: true,
//       message: "Profile Updated SUccessfully",
//       updatedUser,
//     });
//   }catch(error){
//     console.log(error);
//   }
// }


// Update profile controller
// Import the necessary functions and modules

// ... (Other imports)

// Update Profile Controller
export const updateProfileController = async (req, res) => {
  try {
    const { name, email, password, address, phone } = req.body;

    // Pass the user ID as a parameter
    const user = await findById(req.user.id);

    console.log(user);
    console.log("User ID from req.user.id:", req.user.id);

    if (!user) {
      return res.status(404).send({
        success: false,
        message: 'User not found',
      });
    }

    // Password
    if (password && password.length < 6) {
      return res.json({ error: "Password is required and must be at least 6 characters long" });
    }

    // Update user fields
    user.name = name || user.name;
    user.password = password ? await hashPassword(password) : user.password;
    user.phone = phone || user.phone;
    user.address = address || user.address;

    // Save the updated user
    const updatedUser = await findByIdAndUpdate(user.id, user);

    if (!updatedUser) {
      return res.status(500).send({
        success: false,
        message: 'Error updating profile',
      });
    }

    res.status(200).send({
      success: true,
      message: "Profile Updated Successfully",
      updatedUser,
    });
  } catch (error) {
    console.log(error);
    res.status(500).send({
      success: false,
      message: 'Something went wrong',
      error,
    });
  }
};


// export const updateProfileController = async (req, res) => {
//   try {
//     const { name, email, password, address, phone } = req.body;
//     const user = await findById(req.user.id, req); // Pass the 'req' object here
//     console.log(user);
//     if (!user) {
//       return res.status(404).send({
//         success: false,
//         message: 'User not found',
//       });
//     }

//     // Rest of your controller code...
//   } catch (error) {
//     console.log(error);
//     res.status(500).send({
//       success: false,
//       message: 'Something went wrong',
//       error,
//     });
//   }
// };