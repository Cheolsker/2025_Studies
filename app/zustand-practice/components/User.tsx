"use client";

import { useState } from "react";
import { useUserStore } from "../store/user";

export function User() {
  const user = useUserStore((state) => state.user);
  const { signIn, setDisplayName } = useUserStore((state) => state.actions);

  const [changeDisplayName, setChangeDisplayName] = useState("");

  return (
    <section className="p-5">
      <h2>User Information</h2>
      <div>
        <p>Email: {user?.email}</p>
        <p>Name: {user?.displayName}</p>
      </div>
      <div>
        <button
          className="bg-blue-500 text-white p-2 rounded"
          onClick={() => signIn()}
        >
          Sign In
        </button>
      </div>
      <div>
        <input
          type="text"
          className="border p-2"
          value={changeDisplayName}
          onChange={(e) => setChangeDisplayName(e.target.value)}
          onClick={() => setDisplayName(changeDisplayName)}
        />
      </div>
    </section>
  );
}
