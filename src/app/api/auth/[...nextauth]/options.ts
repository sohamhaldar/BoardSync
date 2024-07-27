import { NextAuthOptions } from 'next-auth';
import CredentialsProvider from 'next-auth/providers/credentials';
import google from "next-auth/providers/google";
import Github from 'next-auth/providers/github';
import bcrypt from 'bcrypt';
import dbConnect from '@/lib/dbConnect';
import User from '@/model/userModel';


export const authOptions: NextAuthOptions = {
    providers: [
      google({ clientId: process.env.GOOGLE_CLIENT_ID as string, clientSecret: process.env.GOOGLE_CLIENT_SECRET as string }),
      Github({clientId:process.env.GITHUB_CLIENT_ID as string,clientSecret:process.env.GITHUB_CLIENT_SECRET as string}),
      CredentialsProvider({
        id: 'credentials',
        name: 'Credentials',
        credentials: {
          email: { label: 'Email', type: 'text' },
          password: { label: 'Password', type: 'password' },
        },
        async authorize(credentials: any): Promise<any> {
          await dbConnect();
        //   console.log(credentials);
          try {
            const user = await User.findOne({
              $or: [
                { email: credentials.identifier },
                { username: credentials.identifier },
              ],
            });
            if (!user) {
              throw new Error('No user found with this email');
            }
            if (!user.isVerified) {
              throw new Error('Please verify your account before logging in');
            }
            
            const isPasswordCorrect = await bcrypt.compare(
              credentials.password,
              user.password
            );
            if (isPasswordCorrect) {
              return user;
            } else {
              throw new Error('Incorrect password');
            }
          } catch (err: any) {
            throw new Error(err);
          }
        },
      }),
    ],
    callbacks: {
      async signIn({user,account}){
        if(account?.provider=='google'){
            try{
                const {email,id,name,image}=user;
                console.log(user);
                console.log(email);
                const foundUser=await User.findOne({
                  $or: [
                    { email: email },
                    { AuthId: id },
                  ],
                });
                if(!foundUser){
                  if(email&&id&&name){
                    const createdUser=await User.create({
                            username:name?.toString(),
                            password:id?.toString(),
                            email:email?.toString(),
                            avatar:image||'',
                            otp:'0000',
                            otpExpiry:new Date(Date.now()+3600000),
                            isVerified:true,
                            AuthId:id.toString()   
                    })
                    console.log(createdUser);
                }
                }
                return true;
            }catch(error){
                throw new Error('Error when creating user');
            }
        }
        if(account?.provider=='github'){
          try{
            dbConnect();
            const {email,id,name,image}=user;
            console.log(user);
            console.log(email);
            const foundUser=await User.findOne({
              $or: [
                { email: email },
                { AuthId: id },
              ],
            });
            if(!foundUser){
                if(email&&id&&name){
                const createdUser=await User.create({
                        username:name?.toString(),
                        password:id?.toString(),
                        email:email?.toString(),
                        avatar:image||'',
                        otp:'0000',
                        otpExpiry:new Date(Date.now()+3600000),
                        isVerified:true,
                        AuthId:id.toString()   
                })
                console.log(createdUser);
            }
            }
            return true;
        }catch(error){
            throw new Error('Error when creating user');
        }
        }
        if(account?.provider=='credentials'){
            return true;
        }
        return false;
    },
      async jwt({ token, user ,trigger,session,account}){

        if(trigger=='update'){
          if(session.isAvatarSet!=undefined){
            token.isAvatarSet=session.isAvatarSet
          }
          if(session.avatar!=''){
            token.avatar=session.avatar
          }
        }

        if (user) {
          console.log('User:',user);
          if(account?.provider=='github'||account?.provider=='google'){
            console.log('entered');
            const foundUser=await User.findOne({
              $or: [
                { email: user.email },
                { AuthId: user.id },
              ],
            });
            token._id = foundUser?._id?.toString(); 
            token.isVerified = foundUser?.isVerified;
            token.username = foundUser?.username;
            token.avatar = foundUser?.avatar;
            token.isAvatarSet=foundUser?.isAvatarSet;
            token.fallbackColor=foundUser?.fallBackColour;

            return token;

          }
          token._id = user._id?.toString(); 
          token.isVerified = user.isVerified;
          token.username = user.username;
          token.avatar = user.avatar;
          token.isAvatarSet=user.isAvatarSet;
          token.fallbackColor=user.fallBackColour;
        }
        return token;
      },
      async session({ session, token,trigger,newSession,user }) {
        if (token) {
          session.user._id = token._id;
          session.user.isVerified = token.isVerified;
          session.user.username = token.username;
          session.user.isAvatarSet = token.isAvatarSet;
          session.user.avatar = token.avatar;
          session.user.fallbackColor = token.fallbackColor;
        }
        console.log('Hi i am here:',token,session,newSession,user);
        if(trigger=='update'){
          if(token?.isAvatarSet!=undefined){
            session.user.isAvatarSet=token.isAvatarSet
          }
          if(token?.avatar!=''){
            session.user.avatar=token.avatar
          }
        }

        return session;
      },
    },
    session: {
      strategy: 'jwt',
    },
    secret: process.env.AUTH_SECRET,
    pages: {
      signIn: '/auth/login',  
    },
  };  


