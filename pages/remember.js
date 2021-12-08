import React, { useState, useEffect } from "react";
import Head from "next/head";

export default function Remember() {
  const [step, setStep] = useState(0);
  const [password, setPassword] = useState("0");
  const [input, setInput] = useState("");
  const [info, setInfo] = useState("Enter a password");

  function suffix(i) {
    var j = i % 10,
      k = i % 100;
    if (j == 1 && k != 11) {
      return i + "st";
    }
    if (j == 2 && k != 12) {
      return i + "nd";
    }
    if (j == 3 && k != 13) {
      return i + "rd";
    }
    return i + "th";
  }

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
    if (password.slice(0, Math.floor(step / 2)) !== input) {
      setStep(step - 2);
      setInfo(`The ${suffix(Math.floor(step / 2))} character is ${password[Math.floor(step / 2) - 1]}`);
    } else {
      setStep(step - 1);
    }
    setInput("");
  };

  const onTryAgain = () => {
    setInput("");
    setStep(step - 1);
  };

  const onReset = () => {
    setStep(0);
    setPassword("0");
    setInput("");
    setInfo("Enter a password");
  };

  useEffect(() => {
    if (step === 0) {
      setInfo("Enter a password");
    } else {
      const character = Math.floor(step / 2);
      if (step % 2 !== 0) {
        if (character === password.length && password.slice(0, character) === input) {
          setInfo("Correct! Now you remember the password!");
        } else {
          if (step === 1) {
            setInfo(`The ${character + 1}st character is ${password[character]}`);
          } else {
            if (password.slice(0, character) === input) {
              setInfo(`Correct! The ${suffix(character + 1)} character is ${password[character]}`);
            } else {
              if (info.slice(0, 3) !== "The") {
                setInfo("Wrong! Try again or go back");
              }
            }
          }
        }
      } else {
        setInfo(`Type the first ${character} character(s)`);
      }
    }
  }, [step, password, input, info]);

  return (
    <>
      <Head>
        <title>Remember | Swiftpass</title>
        <meta name="description" content="Smart password generator" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <main className="remember">
        <div className="container">
          <h1>Remember a password</h1>
          <h2>{info}</h2>
          <div>
            <input
              type="text"
              value={input}
              onChange={(e) => {
                setInput(e.target.value);
              }}
              disabled={step % 2 === 0 ? "" : "disabled"}
            />
            {Math.floor((step - 1) / 2) !== password.length || password.slice(0, Math.floor((step - 1) / 2)) !== input ? (
              step % 2 === 0 ? (
                <button onClick={onEnter} className="btn btn-l btn-secondary">
                  Enter
                </button>
              ) : step === 1 || password.slice(0, Math.floor(step / 2)) === input ? (
                <button onClick={onNext} className="btn btn-l btn-primary">
                  Next
                </button>
              ) : (
                <button onClick={onTryAgain} className="btn btn-l btn-primary">
                  Try again
                </button>
              )
            ) : (
              <button onClick={onReset} className="btn btn-l btn-primary">
                Reset
              </button>
            )}
          </div>
          {step % 2 !== 0 && (step > 1 ? <span onClick={onPrev}>Go back</span> : <span onClick={onReset}>Go back</span>)}
        </div>
      </main>
    </>
  );
}
