'use client'
import { useParams } from 'next/navigation'
import { useQuery } from '@tanstack/react-query'

import getCardDetail from '@/app/_api/card/getCard'
import { QUERY_KEYS } from '@/app/_constants/queryKeys'
import ForSeller from './ForSeller'
import ForBuyer from './ForBuyer'

export default function SellerOrBuyer() {
  const { cardId } = useParams<{ cardId: string }>()
  const { data } = useQuery({
    queryKey: [QUERY_KEYS.cardDetail, cardId],
    queryFn: () => getCardDetail(cardId),
    retry: 0,
  })

  return (
    <>
      {!data?.isOwner && <ForBuyer />}
      {data?.isOwner && <ForSeller />}
    </>
  )
}
