import React, { useState, useEffect } from "react";
import Head from "next/head";

export default function Remember() {
  const [step, setStep] = useState(0);
  const [password, setPassword] = useState(null);
  const [input, setInput] = useState("");
  const [info, setInfo] = useState("Enter a password");

  const onEnter = () => {
    if (input !== "") {
      if (step === 0) {
        setPassword(input);
        setStep(step + 1);
      }
    }
  };

  useEffect(() => {
    if (step === 1) {
      setInput("");
      setInfo("Success! Click next to continue.");
    } else if (step > 0) {
      const character = Math.floor(step / 2);
      if (step % 2 === 0) {
        setInput("");
        setInfo(`Type the ${character} character`);
      } else {
        if (password[character] === input) {
          setInfo("Correct!");
          setStep(step + 1);
          nextStep();
        } else {
          setInfo("Wrong!");
        }
      }
    }
  }, [step]);

  return (
    <>
      <Head>
        <title>Remember | Swiftpass</title>
        <meta name="description" content="Smart password generator" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <main>
        <div className="container">
          <h1>Remember a password</h1>
          <span>
            Step {step} | {info}
          </span>
          <input
            type="text"
            value={input}
            onChange={(e) => {
              setInput(e.target.value);
            }}
          />
          <button onClick={onEnter}>Enter</button>
          <div className="steps">
            <button onClick={() => setStep(step - 1)}>Previous</button>
            <button onClick={() => setStep(step + 1)}>Next</button>
          </div>
          <hr />
          <div className="debug">
            <h2>Step: {step}</h2>
            <h2>Password: {password}</h2>
            <h2>Input: {input}</h2>
            <h2>Info: {info}</h2>
          </div>
        </div>
      </main>
    </>
  );
}
