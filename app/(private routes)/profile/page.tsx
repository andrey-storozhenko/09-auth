import Link from 'next/link';
import { getServerMe } from '@/lib/api/serverApi';
import css from "./ProfilePage.module.css";
import { Metadata } from 'next';


const Profile = async () => {
  const user = await getServerMe();

  return (
    <main className={css.mainContent}>
      <div className={css.profileCard}>
        <div className={css.header}>
          <h1 className={css.formTitle}>Profile Page</h1>
          <Link href="/profile/edit" className={css.editProfileButton}>
            Edit Profile
          </Link>
        </div>

        <div className={css.avatarWrapper}>
        </div>

        <div className={css.profileInfo}>
          <p>Username: {user.username}</p>
          <p>Email: {user.email}</p>
        </div>
      </div>
    </main>
  );
};

export async function generateMetadata(): Promise<Metadata> {
  const user = await getServerMe();
  return {
    title: `Profile : ${user.username}`,
    description: "Your private profile",
    openGraph: {
      title: `Profile : ${user.username}`,
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
  };
}

export default Profile;