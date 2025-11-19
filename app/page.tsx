import Image from "next/image";
import { logout } from "./login/actions";

export default function Home() {
  return (
    <div>
      <button onClick={() => logout()}>Logout</button>
    </div>
  );
}
