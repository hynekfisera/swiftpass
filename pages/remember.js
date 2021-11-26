import React, { useState, useEffect } from "react";
import Head from "next/head";

export default function Remember() {
  const [step, setStep] = useState(0);
  const [password, setPassword] = useState("0");
  const [input, setInput] = useState("");
  const [info, setInfo] = useState("Enter a password");

  const onEnter = () => {
    if (input !== "") {
      if (step === 0) {
        setPassword(input);
      }
    }
    setStep(step + 1);
  };

  const onNext = () => {
    setInput("");
    setStep(step + 1);
  };

  const onPrev = () => {
    setInput("");
    setStep(step - 1);
  };

  useEffect(() => {
    if (step === 0) {
      setInfo("Enter a password");
    } else {
      const character = Math.floor(step / 2);
      if (step % 2 !== 0) {
        if (character === password.length) {
          setInfo("Correct! Now you remember the password!");
        } else {
          if (step === 1) {
            setInfo(`The ${character + 1} character is ${password[character]}`);
          } else {
            if (password.slice(0, character) === input) {
              setInfo(`Correct! The ${character + 1} character is ${password[character]}`);
            } else {
              setInfo("Wrong! Go back or try again");
            }
          }
        }
      } else {
        setInfo(`Type the first ${character} character(s)`);
      }
    }
  }, [step, password, input]);

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
          <span>{info}</span>
          <input
            type="text"
            value={input}
            onChange={(e) => {
              setInput(e.target.value);
            }}
            disabled={step % 2 === 0 ? "" : "disabled"}
          />
          {Math.floor(step / 2) !== password.length && (step % 2 === 0 ? <button onClick={onEnter}>Enter</button> : <button onClick={onNext}>Next</button>)}
          {step > 1 && <span onClick={onPrev}>Go back</span>}
        </div>
      </main>
    </>
  );
}
