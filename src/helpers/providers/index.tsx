"use client";
import { AuthProvider } from "@/components/context/auth-info";
import { ConfirmDialogProvider } from "@/components/context/delete-modal";
import { store } from "@/redux/store";
import { Provider } from "react-redux";
import { Toaster } from "sonner";

export default function Providers({ children }: { children: React.ReactNode }) {
  return (
    <Provider store={store}>
      <ConfirmDialogProvider>
        <AuthProvider>
          <Toaster position="top-right" />
          {children}
        </AuthProvider>
      </ConfirmDialogProvider>
    </Provider>
  );
}
