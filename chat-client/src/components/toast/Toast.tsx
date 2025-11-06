// components/GlobalToast.tsx
import { Toast, ToastToggle } from "flowbite-react";
import { useToastStore } from "../../stores/useToast";
import { Check } from "../../assets/icons/Check";
import { ErrorIcon } from "../../assets/icons/ErrorIcon";
import { Info } from "../../assets/icons/Info";

const iconMap = {
  success: Check,
  error: ErrorIcon,
  info: Info,
};

const colorMap = {
  success: 'text-green-500',
  error: 'text-red-500',
  info: 'text-blue-500',
};

function CustomToast() {
  const { isVisible, message, type, hideToast } = useToastStore();
  const IconComponent = iconMap[type];

  return (
    <>
      {isVisible && (
        <div className="fixed top-4 right-4 z-50">
          <Toast>
            <div className={`inline-flex h-8 w-8 shrink-0 items-center justify-center rounded-lg ${colorMap[type]}`}>
              <IconComponent className="h-8 w-8" />
            </div>
            <div className={`mx-3 text-sm font-normal ${colorMap[type]}`}>{message}</div>
            <ToastToggle onDismiss={hideToast} />
          </Toast>
        </div>
      )}
    </>
  );
}

export default CustomToast;