// app/(private routes)/profile/page.tsx

import Link from 'next/link';
import { getServerMe } from '@/lib/api/serverApi';
import css from "./ProfilePage.module.css";
import { Metadata } from 'next';
import Image from "next/image";

const Profile = async () => {
  const user = await getServerMe();

  return (
    <main className={css.mainContent}>
  <div className={css.profileCard}>
      <div className={css.header}>
	     <h1 className={css.formTitle}>Profile Page</h1>
	     <Link href="" className={css.editProfileButton}>
	       Edit Profile
	     </Link>
	   </div>
     <div className={css.avatarWrapper}>
      <Image
        src={user.photoUrl ?? "/default-avatar.png"}
        alt="User Avatar"
        width={120}
        height={120}
        className={css.avatar}
      />
    </div>
    <div className={css.profileInfo}>
      <p>
        Username: {user.userName}
      </p>
      <p>
        Email: {user.email}
      </p>
    </div>
  </div>
</main>

  );
};

export async function generateMetadata(): Promise<Metadata> {
  const user = await getServerMe();
  return {
    title: `Profile : ${user.userName}`,
    description: "Your private profile",
    openGraph: {
      title: `Profile : ${user.userName}`,
      description: "Your private profile",
      url: `https://notehub.com/profile`,
      siteName: 'NoteHub',
      images: [
        {
          url: 'https://ac.goit.global/fullstack/react/notehub-og-meta.jpg',
          width: 1200,
          height: 630,
          alt: "notehub",
        },
      ],
      type: 'article',
    },
  }
}

export default Profile;
