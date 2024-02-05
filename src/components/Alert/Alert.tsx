import {
    AlertDialog,
    AlertDialogContent,
    AlertDialogHeader,
    AlertDialogTitle,
    AlertDialogTrigger,
    AlertDialogDescription,
    AlertDialogFooter,
    AlertDialogCancel,
    AlertDialogAction
} from "@/components/ui/alert-dialog"
import { Button } from "../ui/button"

const Alert = ({ onAction }: { onAction: React.MouseEventHandler<HTMLButtonElement> | undefined }) => {
    return (
        <AlertDialog>
            <AlertDialogTrigger asChild>
                <Button>Sign out</Button>
            </AlertDialogTrigger>
            <AlertDialogContent>
                <AlertDialogHeader>
                    <AlertDialogTitle>Sign out</AlertDialogTitle>
                    <AlertDialogDescription>Are you sure you want to sign out?</AlertDialogDescription>
                </AlertDialogHeader>
                <AlertDialogFooter>
                    <AlertDialogCancel>Cancel</AlertDialogCancel>
                    <AlertDialogAction onClick={onAction}>SignOut</AlertDialogAction>
                </AlertDialogFooter>
            </AlertDialogContent>
        </AlertDialog>
    )
}

export default Alert