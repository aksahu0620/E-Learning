import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
import { Card, CardContent } from '@/components/ui/card'
import { Badge } from "@/components/ui/badge";

import React from 'react'

const Course = () => {
    return (
        <Card className="overflow-hidden rounded-lg dark:bg-gray-800 bg-white shadow-lg hover:shadow-2xl transform hover:scale-105 transition-all duration-300">
            <div className="relative">
                <img src="https://imgs.search.brave.com/H48Wp2LJr9JHe3M22JLcDeFHfpH900HYpGpkKzMUie0/rs:fit:860:0:0:0/g:ce/aHR0cHM6Ly9jb2Rl/d2l0aG1vc2guY29t/L19uZXh0L2ltYWdl/P3VybD1odHRwczov/L2Nkbi5maWxlc3Rh/Y2tjb250ZW50LmNv/bS84TWJ0SjRoVEFh/T2szS1BjcHRxWiZ3/PTM4NDAmcT03NQ" alt="Course"
                    className='w-full h-36 object-cover rounded-t-lg'
                />
            </div>
            <CardContent className="px-5 py-4 space-y-3">
                <h1 className="hover:underline font-bold text-lg truncate">NextJs Complete Course 2025 In Hindi</h1>
                <div className="flex items-center justify-between">
                    <div className="flex items-center gap-3">
                        <Avatar className="h-8 w-8">
                            <AvatarImage src="https://github.com/shadcn.png" alt="@shadcn" />
                            <AvatarFallback>CN</AvatarFallback>
                        </Avatar>
                        <h1 className="font-medium text-sm">Akshay Mernstack</h1>
                    </div>
                    <Badge className={'bg-blue-600 text-white px-2 py-1 text-xs rounded-full'}>
                        Advance
                    </Badge>

                </div>
                <div className="text-lg font-bold">
                    <span>₹499</span>
                </div>
            </CardContent>

        </Card>
    )
}

export default Course