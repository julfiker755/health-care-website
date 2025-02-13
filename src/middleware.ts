import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'

 
// This function can be marked `async` if using `await` inside
export function middleware(request: NextRequest) {
    const cookie = request.cookies.get('refreshToken')?.value 
    
    // console.log(cookie)
    // Cookies.set('name',cookie as string)
    // const response = new NextResponse('')
    // response.cookies.set({
    //     name: 'vercel',
    //     value: 'fast',
    //     path: '/',
    //     httpOnly: true,
    //     secure: process.env.NODE_ENV === 'production',
    //     sameSite: 'strict',
    //   })
    
    // console.log(cookie)

}
 
