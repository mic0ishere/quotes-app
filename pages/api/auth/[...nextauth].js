import NextAuth from "next-auth";
import Providers from "next-auth/providers";

export default NextAuth({
  providers: [
    Providers.Discord({
      clientId: process.env.DISCORD_CLIENT_ID,
      clientSecret: process.env.DISCORD_CLIENT_SECRET,
      scope: "identify",
      profile: (profile) => {
        if (profile.avatar === null) {
          const defaultAvatarNumber = parseInt(profile.discriminator) % 5;
          profile.image_url = `https://cdn.discordapp.com/embed/avatars/${defaultAvatarNumber}.png`;
        } else {
          const format = profile.avatar.startsWith("a_") ? "gif" : "png";
          profile.image_url = `https://cdn.discordapp.com/avatars/${profile.id}/${profile.avatar}.${format}`;
        }
        return {
          id: profile.id,
          name: {
            username: profile.username,
            discriminator: profile.discriminator,
            id: profile.id,
          },
          image: profile.image_url,
          email: profile.email,
        };
      },
    }),
  ],
  callbacks: {
    async redirect(url, baseUrl) {
      return url;
    },
  },
  database: process.env.MONGODB_URI,
});
