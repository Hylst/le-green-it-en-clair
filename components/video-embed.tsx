"use client"

import { useState } from "react"
import { ExternalLink, Play } from "lucide-react"

/* Lecteur sobre : l’affiche s’affiche d’abord, la vidéo distante
   ne charge qu’au clic. Rien ne part vers l’hébergeur avant. */

interface VideoEmbedProps {
  title: string
  author: string
  duration: string
  pageUrl: string
  embedUrl: string
  posterUrl: string
  license: string
}

export function VideoEmbed({ title, author, duration, pageUrl, embedUrl, posterUrl, license }: VideoEmbedProps) {
  const [playing, setPlaying] = useState(false)

  return (
    <div>
      <div className="overflow-hidden rounded-xl border border-border bg-black">
        {playing ? (
          <iframe
            src={embedUrl}
            title={title}
            className="aspect-video w-full"
            allow="fullscreen"
            allowFullScreen
          />
        ) : (
          <button
            type="button"
            onClick={() => setPlaying(true)}
            className="group relative block w-full"
            aria-label={`Lire la vidéo : ${title}`}
          >
            <img
              src={posterUrl}
              alt=""
              loading="lazy"
              className="aspect-video w-full object-cover opacity-90 transition-opacity group-hover:opacity-100"
            />
            <span className="absolute inset-0 flex items-center justify-center">
              <span className="flex h-16 w-16 items-center justify-center rounded-full bg-primary text-primary-foreground shadow-lg transition-transform group-hover:scale-105">
                <Play className="ml-1 h-7 w-7" aria-hidden="true" />
              </span>
            </span>
            <span className="absolute bottom-3 right-3 rounded bg-black/80 px-2 py-1 text-xs font-medium text-white">
              {duration}
            </span>
          </button>
        )}
      </div>
      <p className="mt-3 font-semibold text-foreground">{title}</p>
      <p className="text-sm text-muted-foreground">{author}</p>
      <p className="mt-2 text-sm">
        <a
          href={pageUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center gap-1 font-medium text-primary hover:underline"
        >
          Voir sur Canal-U
          <ExternalLink className="h-3.5 w-3.5" aria-hidden="true" />
        </a>
        <span className="text-muted-foreground"> · {license}</span>
      </p>
    </div>
  )
}
