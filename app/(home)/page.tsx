import ProfileForm from "@/components/profileForm";
import "@/styles/profile.scss";

export default async function Home() {
  return (
    <main>
      <div className="profile-container">
        <div className="profile-card">
          <h1>Hey there!</h1>
          <ProfileForm />
        </div>
      </div>
    </main>
  );
}
