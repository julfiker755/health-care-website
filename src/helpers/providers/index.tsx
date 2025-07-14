"use client";
import { AuthProvider } from "@/components/context/auth-info";
import { ConfirmDialogProvider } from "@/components/context/delete-modal";
import { Provider } from "react-redux";
import { Toaster } from "sonner";
import { makeStore } from "@/redux/store";

export default function Providers({ children }: { children: React.ReactNode }) {
  const store = makeStore();
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
