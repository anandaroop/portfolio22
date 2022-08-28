/*
 * Inspired by https://mailtrap.io/blog/email-obfuscation/
 */

import { useEffect } from "react"

interface Props {
  username?: string
  domain?: string
  tld?: string
}

export const Email: React.FC<Props> = ({ username, domain, tld }) => {
  username = username ?? "anandaroop.roy"
  domain = domain ?? "gmail"
  tld = tld ?? "com"

  useEffect(() => {
    if (typeof window !== undefined) {
      const el = document.querySelector("#replace-email")
      if (el) {
        const mailto = `<a class="underline" href="mailto:${username}@${domain}.${tld}?subject=inquiry from website">${username}@${domain}.${tld}</a>`
        el.innerHTML = mailto
      }
    }
  })

  return <span id="replace-email"></span>
}
