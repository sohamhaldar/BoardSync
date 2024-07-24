import dbConnect from "@/lib/dbConnect";
import User from "@/model/userModel";

export async function POST(request:Request){
    try {
        await dbConnect();
        const {username,otp}=await request.json();
        const decodedUsername=decodeURIComponent(username);
        const user = await User.findOne({ username: decodedUsername });
    
        if (!user) {
          return Response.json(
            { success: false, message: 'User not found' },
            { status: 404 }
          );
        }
    
        const isCodeValid=user.otp==otp;
        const isCodeNotExpired = new Date(user.otpExpiry) > new Date();
        if (isCodeValid && isCodeNotExpired) {
            // Update the user's verification status
            user.isVerified = true;
            await user.save();
      
            return Response.json(
              { success: true, message: 'Account verified successfully' },
              { status: 200 }
            );
          } else if (!isCodeNotExpired) {
            // Code has expired
            return Response.json(
              {
                success: false,
                message:
                  'Verification code has expired. Please sign up again to get a new code.',
              },
              { status: 400 }
            );
          } else {
            // Code is incorrect
            return Response.json(
              { success: false, message: 'Incorrect verification code' },
              { status: 400 }
            );
          }
    } catch (error) {
        console.error('Error verifying user:', error);
        return Response.json(
            { success: false, message: 'Error verifying user' },
            { status: 500 }
        );
    }
}