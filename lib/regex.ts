export const nameRegex = /^[\p{L}\p{S}\s,.'-]{2,20}$/iu;
export const emailRegex =
  /^[a-zA-Z0-9._%+-]{4,60}@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
export const passwordRegex =
  /^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*#?&])[A-Za-z\d@$!%*#?&]{8,20}$/;
