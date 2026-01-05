export type SignupSuccessResponse = {
  access: string;
  refresh: string;
  user: {
    pk: string;
    email: string;
  };
};

export type SignupErrorResponse = {
  email?: string[];
  password1?: string[];
  password2?: string[];
  non_field_errors?: string[];
};
