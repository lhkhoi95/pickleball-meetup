import { Card, CardContent, CardHeader, CardTitle } from "../ui/card";

interface ErrorProps {
    title?: string;
    message: string;
}

export default function ErrorPage({ title = "Error", message }: ErrorProps) {
    return (
        <Card className="border-destructive">
            <CardHeader className="flex flex-row items-center gap-2 space-y-0 pb-2">
                <span className="h-4 w-4 rounded-full bg-destructive" />
                <CardTitle className="text-sm font-medium text-destructive">{title}</CardTitle>
            </CardHeader>
            <CardContent>
                <p className="text-sm text-muted-foreground">{message}</p>
            </CardContent>
        </Card>
    );
}