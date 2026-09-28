import { type ReactNode, useState } from "react";

import { Button, type ButtonProps } from "@/components/ui/button";

import { AppointmentDialog } from "./AppointmentDialog";

type AppointmentTriggerProps = {
    children: ReactNode;
    className?: string;
    variant?: ButtonProps["variant"];
    size?: ButtonProps["size"];
    onClick?: () => void;
    specialistId?: string;
    serviceId?: string;
};

export function AppointmentTrigger({
    children,
    className,
    variant = "default",
    size = "default",
    onClick,
    specialistId,
    serviceId,
}: AppointmentTriggerProps) {
    const [open, setOpen] = useState(false);

    return (
        <>
            <Button
                type="button"
                variant={variant}
                size={size}
                className={className}
                onClick={() => {
                    onClick?.();
                    setOpen(true);
                }}
            >
                {children}
            </Button>

            <AppointmentDialog
                open={open}
                onOpenChange={setOpen}
                {...(specialistId ? { specialistId } : {})}
                {...(serviceId ? { serviceId } : {})}
            />
        </>
    );
}