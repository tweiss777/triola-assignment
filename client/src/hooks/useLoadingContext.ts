import { useContext } from "react";
import { LoadingContext } from "../contexts/LoadingContext";

export const useLoadingContext = () => useContext(LoadingContext);
