const nameRegex = /^[\p{L}\p{S}\s,.'-]{2,20}$/iu;
const emailRegex = /^[a-zA-Z0-9._%+-]{4,60}@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
const passwordRegex =
  /^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*#?&])[A-Za-z\d@$!%*#?&]{8,20}$/;
const sectionNameRegex = /^[\p{P}\p{S}\p{L}\s-][\p{L}\d\s-]{3,30}$/u;
const descriptionRegex = /^[\p{L}\p{N}\p{P}\s]{0,255}$/u;
const hexColorRegex = /^#?([0-9a-fA-F]{3}){1,2}$/i;

export const validateProjectValues = (values: {
  name: string | null | undefined;
  color: string | null | undefined;
}): boolean => {
  if (!values.name || !values.color) return false;

  try {
    if (
      !sectionNameRegex.test(values.name) ||
      !hexColorRegex.test(values.color)
    )
      return false;
  } catch (e) {
    console.log(e);
    return false;
  }

  return true;
};

export {
  nameRegex,
  emailRegex,
  passwordRegex,
  sectionNameRegex,
  descriptionRegex,
  hexColorRegex,
};
