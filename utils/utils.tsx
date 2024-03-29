export const emailValidator = (email: string) => {
  const re = /\S+@\S+\.\S+/;

  if (!email || email.length <= 0) return "Email est requis.";
  if (!re.test(email)) return "Ooops! email invalide.";

  return "";
};

export const passwordValidator = (password: string) => {
  if (!password || password.length <= 0) return "mot de passe requis.";
  if (password.length < 6) return "mot de passe faible.";

  return "";
};

export const nameValidator = (name: string) => {
  if (!name || name.length <= 0) return "Name cannot be empty.";

  return "";
};
