import Link from "next/link"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { ArrowRight } from "lucide-react"

interface RelatedLink {
  href: string
  label: string
  description: string
}

interface RelatedLinksProps {
  links: RelatedLink[]
  title?: string
}

export function RelatedLinks({ links, title = "Pour aller plus loin" }: RelatedLinksProps) {
  return (
    <Card className="bg-gradient-to-br from-emerald-50 to-green-50 border-emerald-200">
      <CardHeader>
        <CardTitle className="text-emerald-900">{title}</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-3">
          {links.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className="group flex items-start gap-3 rounded-lg border border-emerald-200 bg-white p-4 transition-all hover:border-emerald-400 hover:shadow-md"
            >
              <div className="flex-1">
                <div className="font-semibold text-emerald-900 group-hover:text-emerald-700">{link.label}</div>
                <div className="text-sm text-slate-600 mt-1">{link.description}</div>
              </div>
              <ArrowRight className="h-5 w-5 text-emerald-600 transition-transform group-hover:translate-x-1" />
            </Link>
          ))}
        </div>
      </CardContent>
    </Card>
  )
}
