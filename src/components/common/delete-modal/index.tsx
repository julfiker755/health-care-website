import React, { createContext, useContext, useState, ReactNode } from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";


interface ConfirmDialogOptions {
  title?: string;
  description?: string;
  confirmText?: string;
  cancelText?: string;
  onConfirm?: () => void;
  onCancel?: () => void;
}

interface ConfirmDialogContextType {
  confirm: (options: ConfirmDialogOptions) => Promise<boolean>;
}

const ConfirmDialogContext = createContext<ConfirmDialogContextType | undefined>(undefined);

// Provider component to manage dialog state and actions
interface ConfirmDialogProviderProps {
  children: ReactNode;
}

const ConfirmDialogProvider: React.FC<ConfirmDialogProviderProps> = ({ children }) => {
  const [dialogState, setDialogState] = useState<{
    open: boolean;
    title: string;
    description: string;
    onConfirm: (() => void) | undefined;
    onCancel: (() => void) | undefined;
    confirmText: string;
    cancelText: string;
  }>({
    open: false,
    title: '',
    description: '',
    onConfirm: undefined,
    onCancel: undefined,
    confirmText: 'Confirm',
    cancelText: 'Cancel',
  });

  const confirm = ({
    title = 'Delete Confirmation',
    description = 'Are you sure you want to delete this item? This action cannot be undone.',
    confirmText = 'Delete',
    cancelText = 'Cancel',
    onConfirm,
    onCancel,
  }: ConfirmDialogOptions): Promise<boolean> =>
    new Promise((resolve) => {
      setDialogState({
        open: true,
        title,
        description,
        onConfirm: () => {
          resolve(true);
          closeDialog();
          if (onConfirm) onConfirm();
        },
        onCancel: () => {
          resolve(false);
          closeDialog();
          if (onCancel) onCancel();
        },
        confirmText,
        cancelText,
      });
    });

  const closeDialog = () => {
    setDialogState({
      open: false,
      title: '',
      description: '',
      onConfirm: undefined,
      onCancel: undefined,
      confirmText: 'Confirm',
      cancelText: 'Cancel',
    });
  };

  const DialogComponent = dialogState.open && (
    <Dialog open={dialogState.open} onOpenChange={closeDialog}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>{dialogState.title}</DialogTitle>
          <DialogDescription>{dialogState.description}</DialogDescription>
        </DialogHeader>
        <div className="flex justify-end gap-4">
          <Button variant="outline" onClick={dialogState.onCancel ?? (() => {})}>
            {dialogState.cancelText}
          </Button>
          <Button variant="danger" onClick={dialogState.onConfirm ?? (() => {})}>
            {dialogState.confirmText}
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );

  return (
    <ConfirmDialogContext.Provider value={{ confirm }}>
      {children}
      {DialogComponent}
    </ConfirmDialogContext.Provider>
  );
};

// Custom hook to use the confirmation dialog
const useConfirmation = (): ConfirmDialogContextType => {
  const context = useContext(ConfirmDialogContext);
  if (!context) {
    throw new Error("useConfirmation must be used within a ConfirmDialogProvider");
  }
  return context;
};

export { ConfirmDialogProvider, useConfirmation };
