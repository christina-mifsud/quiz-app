import { AuthCheck } from "@/components/AuthCheck";
import ProfileForm from "@/components/profileForm";
import "@/styles/profile.scss";

export default async function Home() {
  return (
    <main>
      <AuthCheck fallback={<h1>You need to be signed in</h1>}>
        <div className="profile-container">
          <div className="profile-card">
            <h1>Hey there!</h1>
            <ProfileForm />
          </div>
        </div>
      </AuthCheck>
    </main>
  );
}
