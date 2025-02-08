import { ImageResponse } from 'next/og'

import { pmkin } from '@/app/lib/pmkin'

export const contentType = 'image/png'
export const size = {
  width: 1200,
  height: 630
}
export const runtime = 'edge'

export default async function Image({ params }: { params: { slug: string } }) {
  const document = await pmkin.findDocumentBySlug(
    decodeURIComponent(params.slug)
  )

  return new ImageResponse(
    (
      <div
        style={{
          alignItems: 'center',
          background:
            'linear-gradient(135deg, rgba(243,140,68,1) 10%, rgba(251,193,86,1) 100%)',
          color: '#000',
          display: 'flex',
          fontSize: 64,
          height: '100%',
          justifyContent: 'center',
          textAlign: 'center',
          width: '100%'
        }}
      >
        <div style={{ maxWidth: '75%' }}>
          {document?.title ?? 'My Travel Blog'}
        </div>
      </div>
    ),
    size
  )
}
