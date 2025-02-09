import React, { createContext, useContext, useState, ReactNode } from "react";
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogHeader,
    DialogTitle,
} from "@/components/ui";
import { Button } from "@/components/ui";

interface ConfirmDialogOptions {
    title?: string;
    description?: string;
    confirmText?: string;
    cancelText?: string;
    onConfirm?: () => void;
    onCancel?: () => void;
}

interface ConfirmDialogContextType {
    confirm: (options?: ConfirmDialogOptions) => Promise<boolean>;
}

const ConfirmDialogContext = createContext<ConfirmDialogContextType | undefined>(undefined);

export const ConfirmDialogProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
    const [dialogState, setDialogState] = useState<
        ConfirmDialogOptions & { open: boolean; resolve?: (value: boolean) => void }
    >({
        open: false,
        title: "Delete Confirmation",
        description: "Are you sure you want to delete this item? This action cannot be undone.",
        confirmText: "Delete",
        cancelText: "Cancel",
    });

    const confirm = (options: ConfirmDialogOptions = {}): Promise<boolean> => {
        return new Promise((resolve) => {
            setDialogState((prev) => ({
                ...prev,
                ...options,
                open: true,
                resolve,
            }));
        });
    };

    const handleConfirm = () => {
        if (dialogState.resolve) dialogState.resolve(true);
        closeDialog();
        dialogState.onConfirm?.();
    };

    const handleCancel = () => {
        if (dialogState.resolve) dialogState.resolve(false);
        closeDialog();
        dialogState.onCancel?.();
    };

    const closeDialog = () => {
        setDialogState((prev) => ({ ...prev, open: false }));
    };

    return (
        <ConfirmDialogContext.Provider value={{ confirm }}>
            {children}
            <Dialog open={dialogState.open} onOpenChange={closeDialog}>
                <DialogContent>
                    <DialogHeader>
                        <DialogTitle>{dialogState.title || "Confirm Action"}</DialogTitle>
                        <DialogDescription>{dialogState.description || "Are you sure?"}</DialogDescription>
                    </DialogHeader>
                    <div className="flex justify-end gap-4">
                        <Button variant="outline" onClick={handleCancel}>
                            {dialogState.cancelText || "Cancel"}
                        </Button>
                        <Button variant="danger" onClick={handleConfirm}>
                            {dialogState.confirmText || "Confirm"}
                        </Button>
                    </div>
                </DialogContent>
            </Dialog>
        </ConfirmDialogContext.Provider>
    );
};

export const useConfirmation = (): ConfirmDialogContextType => {
    const context = useContext(ConfirmDialogContext);
    if (!context) {
        throw new Error("useConfirmation must be used within a ConfirmDialogProvider");
    }
    return context;
};
