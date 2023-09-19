import { Typography } from "@mui/material";
import { PrimaryButton } from "@src/theme/layout/buttons";
import { useTranslation } from "react-i18next";
import { Main } from "./blocks/Main";

function IndexScreen() {
  const { t, i18n } = useTranslation();
  console.log(t, i18n);
  return <Main />;
}

export { IndexScreen };
