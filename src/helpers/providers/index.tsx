"use client";
import { ConfirmDialogProvider } from "@/components/common";
import { store } from "@/redux/store";
import { Provider } from "react-redux";
import { Toaster } from "sonner";

export default function Providers({ children }: { children: React.ReactNode }) {
  return (
    <Provider store={store}>
      <ConfirmDialogProvider>
        <Toaster position="top-right" />
        {children}
      </ConfirmDialogProvider>
    </Provider>
  );
}
