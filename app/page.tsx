import styles from "./page.module.css";
import SignInButton from "./components/SignInButton";

export default function Home() {
  return (
    <main className={styles.main}>
      <h1>IntheK page 1
      </h1>
      <SignInButton />
    </main>
  );
}