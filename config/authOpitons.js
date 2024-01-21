import Google from "next-auth/providers/google";
import Credentials from "next-auth/providers/credentials";
import User from "@models/user";
import { connectToDB } from "@utils/database";
// import Credentials from "next-auth/providers/credentials";

export const authOptions = {
  // Configure one or more authentication providers
  providers: [
    Google({
      clientId: process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET,
    }),
    // Credentials({
    //   credentials: {
    //     email: { label: "email", type: "email", required: true },
    //     password: { label: "password", type: "password", required: true },
    //   },
    //   async authorize(credentials) {
    //     if (!credentials?.email || !credentials.password) {
    //       return null;
    //     }
    //     //MongoDB
    //     await connectToDB();

    //     const currentUser = User.find(
    //       (user) => user.email === credentials.email
    //     );

    //     if (currentUser && currentUser.password === credentials.password) {
    //       const { password, ...userWithoutPass } = currentUser;
    //       return userWithoutPass;
    //     }

    //     return null;
    //   },
    // }),
  ],
  callbacks: {
    async session({ session }) {
      // store the user id from MongoDB to session
      const sessionUser = await User.findOne({ email: session.user.email });
      session.user.id = sessionUser._id.toString();

      return session;
    },
    async signIn({ account, profile, user, credentials }) {
      try {
        await connectToDB();

        // check if user already exists
        const userExists = await User.findOne({ email: profile.email });

        // if not, create a new document and save user in MongoDB
        if (!userExists) {
          const userName = profile.name;

          await User.create({
            email: profile.email,
            username: userName,
            image: profile.picture,
          });
        }

        return true;
      } catch (error) {
        console.log("Error checking if user exists: ", error.message);
        return false;
      }
    },
  },
};
