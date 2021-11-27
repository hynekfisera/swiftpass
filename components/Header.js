import React from "react";
import Link from "next/link";

export default function Header() {
  return (
    <header>
      <div className="container">
        <Link href="/">
          <a>Swiftpass</a>
        </Link>
        <ul>
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
