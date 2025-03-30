import * as yup from "yup";

export const ContactDTOSchema = yup.object({
  // name: yup.string().required("EL nombre es requerido"),
  // email: yup.string().required("EL email es requerido"),
  // photo: yup.string().required("La foto es requerido "),
  // userId: yup.string().required("el user id es requerido"),
  contactNick: yup.string().required("el user nick es requerido"),
});

export type ConctactoDTO = yup.InferType<typeof ContactDTOSchema>;
