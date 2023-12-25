const nameRegex = /^[\p{L}\p{S}\s,.'-]{2,20}$/iu;
const emailRegex = /^[a-zA-Z0-9._%+-]{4,60}@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
const passwordRegex =
  /^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*#?&])[A-Za-z\d@$!%*#?&]{8,20}$/;
const sectionNameRegex = /^[\p{L}\d\s_,.-]{2,40}$/u;
const descriptionRegex = /^[\p{L}\p{N}\p{P}\s]{0,255}$/u;
const hexColorRegex = /^#?([0-9a-fA-F]{3}){1,2}$/i;

export {
  nameRegex,
  emailRegex,
  passwordRegex,
  sectionNameRegex,
  descriptionRegex,
  hexColorRegex,
};
