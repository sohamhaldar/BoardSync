import dbConnect from '@/lib/dbConnect';
import User from '@/model/userModel';
import { sendVerificationEmail } from '@/email/sendEmail';

export async function POST(request: Request) {
    await dbConnect();
  
    try {
      const { username, email, password } = await request.json();
      if(
        [email,username,password].some((field)=>field?.trim()==="")
    ){
        return Response.json(
            {
              success: false,
              message: 'All fields are required',
            },
            { status: 400 }
          );
    }
  
      const existingVerifiedUserByUsername = await User.findOne({
        username,
        isVerified: true,
      });
  
      if (existingVerifiedUserByUsername) {
        return Response.json(
          {
            success: false,
            message: 'Username is already taken',
          },
          { status: 400 }
        );
      }
  
      const existingUserByEmail = await User.findOne({ email });
      let verifyCode = Math.floor(100000 + Math.random() * 900000).toString();
  
      if (existingUserByEmail) {
        if (existingUserByEmail.isVerified) {
          return Response.json(
            {
              success: false,
              message: 'User already exists with this email',
            },
            { status: 400 }
          );
        } else {
          existingUserByEmail.password = password;
          existingUserByEmail.otp = verifyCode;
          existingUserByEmail.otpExpiry = new Date(Date.now() + 3600000);
          await existingUserByEmail.save();
        }
      } else {
        const expiryDate = new Date();
        expiryDate.setHours(expiryDate.getHours() + 1);
  
        const newUser = new User({
          username,
          email,
          password,
          otp:verifyCode,
          otpExpiry:expiryDate,
          isVerified: false,
          avatar:''
          
        });
  
        await newUser.save();
      }
  
      // Send verification email
      const emailResponse = await sendVerificationEmail(
        email,
        username,
        verifyCode
      );
      if (!emailResponse.success) {
        return Response.json(
          {
            success: false,
            message: emailResponse.message,
          },
          { status: 500 }
        );
      }
  
      return Response.json(
        {
          success: true,
          message: 'User registered successfully. Please verify your account.',
        },
        { status: 201 }
      );
    } catch (error) {
      console.error('Error registering user:', error);
      return Response.json(
        {
          success: false,
          message: 'Error registering user',
        },
        { status: 500 }
      );
    }
  }