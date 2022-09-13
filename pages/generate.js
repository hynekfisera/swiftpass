import React, { useState } from "react";
import { NextSeo } from "next-seo";

export default function Generate() {
  const [form, setForm] = useState({
    length: 16,
    lowercase: true,
    uppercase: true,
    numbers: true,
    symbols: true,
    start: "left",
    excludesimilar: true,
    excluderare: true,
  });

  const [password, setPassword] = useState("Password will appear here");

  const changeForm = (e) => {
    setForm({
      ...form,
      [e.target.name]: e.target.type === "checkbox" ? e.target.checked : e.target.value,
    });
  };

  const changeInput = (e) => {
    setForm({
      ...form,
      length: e.target.value,
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

  const onCopy = (e) => {
    navigator.clipboard.writeText(password);
    e.target.innerText = "Copied!";
    setTimeout(() => (e.target.innerText = "Copy to clipboard"), 1000);
  };

  return (
    <>
      <NextSeo title="Generate" canonical="https://swiftpass.hynekfisera.com/generate" />
      <main className="generate">
        <div className="container">
          <h1>Generate a password</h1>
          <div className="form">
            <div className="range-group">
              <label htmlFor="length" className="label">
                Password length: <input type="number" value={form.length} onChange={changeInput} />
              </label>
              <input type="range" name="length" id="length" min="8" max="128" step="8" value={form.length} onChange={(e) => changeForm(e)} />
            </div>
            <div className="checkbox-group">
              <label htmlFor="lowercase" className="checkbox-container">
                <span>
                  Lowercase letters <i>(abcde)</i>
                </span>
                <input type="checkbox" name="lowercase" id="lowercase" checked={form.lowercase} onChange={(e) => changeForm(e)} />
                <span className="checkmark"></span>
              </label>
            </div>
            <div className="checkbox-group">
              <label htmlFor="uppercase" className="checkbox-container">
                <span>
                  Uppercase letters <i>(ABCDE)</i>
                </span>
                <input type="checkbox" name="uppercase" id="uppercase" checked={form.uppercase} onChange={(e) => changeForm(e)} />
                <span className="checkmark"></span>
              </label>
            </div>
            <div className="checkbox-group">
              <label htmlFor="numbers" className="checkbox-container">
                <span>
                  Numbers <i>(12345)</i>
                </span>
                <input type="checkbox" name="numbers" id="numbers" checked={form.numbers} onChange={(e) => changeForm(e)} />
                <span className="checkmark"></span>
              </label>
            </div>
            <div className="checkbox-group">
              <label htmlFor="symbols" className="checkbox-container">
                <span>
                  Symbols <i>(?!@#/)</i>
                </span>
                <input type="checkbox" name="symbols" id="symbols" checked={form.symbols} onChange={(e) => changeForm(e)} />
                <span className="checkmark"></span>
              </label>
            </div>
            <div className="select-group">
              <label htmlFor="start">Start on:</label>
              <select name="start" id="start" value={form.start} onChange={(e) => changeForm(e)}>
                <option value="left">left side</option>
                <option value="right">right side</option>
              </select>
            </div>
            <div className="checkbox-group">
              <label htmlFor="excludesimilar" className="checkbox-container">
                <span>
                  Exclude similar <i>(O/0,l/I)</i>
                </span>
                <input type="checkbox" name="excludesimilar" id="excludesimilar" checked={form.excludesimilar} onChange={(e) => changeForm(e)} />
                <span className="checkmark"></span>
              </label>
            </div>
            <div className="checkbox-group">
              <label htmlFor="excluderare" className="checkbox-container">
                <span>
                  Exclude rare <i>([]{"{}<>"})</i>
                </span>
                <input type="checkbox" name="excluderare" id="excluderare" checked={form.excluderare} onChange={(e) => changeForm(e)} />
                <span className="checkmark"></span>
              </label>
            </div>
            <button disabled={form.lowercase || form.uppercase || form.numbers || form.symbols ? "" : "disabled"} onClick={sendForm} className="btn btn-l btn-primary">
              Generate
            </button>
          </div>
          <div className="password">
            <span>{password}</span>
            <button onClick={(e) => onCopy(e)} className="btn btn-s btn-secondary">
              Copy to clipboard
            </button>
          </div>
        </div>
      </main>
    </>
  );
}
