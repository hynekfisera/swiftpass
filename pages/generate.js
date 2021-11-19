import React from "react";
import Head from "next/head";
import { useState } from "react";

export default function Generate() {
  const [form, setForm] = useState({
    length: 16,
    lowercase: true,
    uppercase: true,
    numbers: true,
    symbols: true,
    start: "left",
  });

  const [password, setPassword] = useState("Password will appear here");

  const changeForm = (e) => {
    setForm({
      ...form,
      [e.target.name]: e.target.type === "checkbox" ? e.target.checked : e.target.value,
    });
  };

  const sendForm = () => {
    let params = "";
    Object.keys(form).map(function (key) {
      params += `${key}=${form[key]}&`;
    });
    console.log(params);
    fetch(`/api/new?${params}`)
      .then((response) => response.json())
      .then((data) => setPassword(data.password));
  };

  return (
    <>
      <Head>
        <title>Generate | Swiftpass</title>
        <meta name="description" content="Smart password generator" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <main>
        <div className="container">
          <h1>Generate a password</h1>
          <div className="form">
            <div className="range-group">
              <label htmlFor="length">Password length: {form.length}</label>
              <input type="range" name="length" id="length" min="8" max="128" step="8" value={form.length} onChange={(e) => changeForm(e)} />
            </div>
            <div className="checkbox-group">
              <label htmlFor="lowercase">Lowercase letters (abcde)</label>
              <input type="checkbox" name="lowercase" id="lowercase" checked={form.lowercase} onChange={(e) => changeForm(e)} />
            </div>
            <div className="checkbox-group">
              <label htmlFor="uppercase">Uppercase letters (ABCDE)</label>
              <input type="checkbox" name="uppercase" id="uppercase" checked={form.uppercase} onChange={(e) => changeForm(e)} />
            </div>
            <div className="checkbox-group">
              <label htmlFor="numbers">Numbers (12345)</label>
              <input type="checkbox" name="numbers" id="numbers" checked={form.numbers} onChange={(e) => changeForm(e)} />
            </div>
            <div className="checkbox-group">
              <label htmlFor="symbols">Symbols (?!@#/)</label>
              <input type="checkbox" name="symbols" id="symbols" checked={form.symbols} onChange={(e) => changeForm(e)} />
            </div>
            <div className="select-group">
              <label htmlFor="start">Start on:</label>
              <select name="start" id="start" value={form.start} onChange={(e) => changeForm(e)}>
                <option value="left">left side</option>
                <option value="right">right side</option>
              </select>
            </div>
            <button disabled={form.lowercase || form.uppercase || form.numbers || form.symbols ? "" : "disabled"} onClick={sendForm}>
              Generate
            </button>
          </div>
          <div className="password">
            <span>{password}</span>
            <button onClick={() => navigator.clipboard.writeText(password)}>Copy to clipboard</button>
          </div>
        </div>
      </main>
    </>
  );
}
