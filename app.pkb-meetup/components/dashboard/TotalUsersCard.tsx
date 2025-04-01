import React from 'react'
import { Card, CardContent, CardHeader, CardTitle } from '../ui/card'
import { Users } from 'lucide-react'
import { User } from '@/types/Users'
import { useApi } from '@/hooks/useApi'

export default function TotalUsersCard() {
    const { data: users, error, isLoading } = useApi<User[]>("/api/v1/users");

    if (isLoading) {
        return <TotalUsersCardLoading />;
    }

    if (error) {
        throw new Error("Failed to load users data");
    }

    return (
        <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Players Met</CardTitle>
                <Users className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
                <p className="text-xs text-muted-foreground">
                    {users?.length} Total registered players
                </p>
            </CardContent>
        </Card>
    )
}

export function TotalUsersCardLoading() {
    return (
        <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Players Met</CardTitle>
                <Users className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
                <div className="text-2xl font-bold animate-pulse bg-muted h-6 w-16 rounded"></div>
                <p className="text-xs text-muted-foreground mt-2">
                    Loading players...
                </p>
            </CardContent>
        </Card>
    )
}