export const verifyKey = (req, res, next) => {
  const key = req.body["key"];
  if (key === "RacingCampeonCopaArgentina2026") {
    next();
  } else {
    res.status(403).json({ error: "Key invalida" });
  }
};
