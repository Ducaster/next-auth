// 세션. 유저가 만든 post read api

import { verifyJwt } from '@/app/lib/jwt'
import prisma from '@/app/lib/prisma'

export async function GET(
  request: Request,
  { params }: { params: { id: string } },
) {
    
    // 로그인되지 않은 상태에서는 api를 사용할 수 없도록 설정
    const accessToken = request.headers.get('authorization')
    if (!accessToken || !verifyJwt(accessToken)) {
      return new Response(JSON.stringify({ error: 'No Authorization' }), {
        status: 401,
      })
    }

  console.log(params)

  const id = Number(params.id)

  const userPosts = await prisma.post.findMany({
    where: {
      authorId: id,
    },
    include: {
      author: {
        select: {
          email: true,
          name: true,
        },
      },
    },
  })
  return new Response(JSON.stringify(userPosts))
}