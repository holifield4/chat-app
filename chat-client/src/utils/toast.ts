import { useToastStore } from "../stores/useToast";

export const toast = (
  message: string,
  type?: "success" | "error" | "info"
) => {
  const { showToast } = useToastStore.getState();
  showToast(message, type);
};

export const useToast = () => {
  const { showToast } = useToastStore();
  return showToast;
};
