import React from "react";
import Link from "next/link";

export default function Header() {
  return (
    <header>
      <div className="container">
        <span>Swiftpass</span>
        <ul>
          <li>
            <Link href="/">
              <a>Home</a>
            </Link>
          </li>
          <li>
            <Link href="/remember">
              <a>Remember</a>
            </Link>
          </li>
          <li>
            <Link href="/generate">
              <a>Generate</a>
            </Link>
          </li>
        </ul>
      </div>
    </header>
  );
}
