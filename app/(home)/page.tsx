import "@/styles/profile.scss";
import { AuthCheck } from "@/components/AuthCheck";

export default async function Home() {
  return (
    <main>
      <AuthCheck fallback={(
        <h1>You need to be signed it</h1>
      )}>
        <div className="profile-container">
          <div className="profile-card">
            <h1>Hey there!</h1>
          </div>
        </div>
      </AuthCheck>
    </main>
  );
}
