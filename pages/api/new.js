export default function handler(req, res) {
  const length = req.query.length ?? 16;
  const lowercase = req.query.lowercase ?? true;
  const uppercase = req.query.uppercase ?? true;
  const numbers = req.query.numbers ?? true;
  const symbols = req.query.symbols ?? true;
  const start = req.query.start ?? "left";
  const exclude = req.query.exclude ?? true;
  const multiply = req.query.multiply ?? 2;

  const leftLowercase = "qwert".repeat(multiply) + "asdfg".repeat(multiply) + "yxcvb";
  const leftUppercase = "QWERT".repeat(multiply) + "ASDFG".repeat(multiply) + "YXCVB";
  const leftNumbers = "12345".repeat(3);
  const leftSymbols = "#@".repeat(multiply) + "[]";
  const left = (lowercase && leftLowercase) + (uppercase && leftUppercase) + (numbers && leftNumbers) + (symbols && leftSymbols);

  const rightLowercase = "zuiop".repeat(multiply) + ("hjk" + (!exclude ? "l" : "")).repeat(multiply) + "nm";
  const rightUppercase = ("ZUP" + (!exclude ? "IO" : "")).repeat(multiply) + "HJKL".repeat(multiply) + "NM";
  const rightNumbers = ("789" + (!exclude ? "0" : "")).repeat(3);
  const rightSymbols = "!?.()".repeat(multiply) + "{}<>:";
  const right = (lowercase && rightLowercase) + (uppercase && rightUppercase) + (numbers && rightNumbers) + (symbols && rightSymbols);

  let password = "";
  for (let i = 1; i <= length; i++) {
    if (start === "left" ? i % 2 : (i + 1) % 2) {
      password += left.charAt(Math.floor(Math.random() * left.length));
    } else {
      password += right.charAt(Math.floor(Math.random() * right.length));
    }
  }

  res.status(200).json({ password: password });
}
