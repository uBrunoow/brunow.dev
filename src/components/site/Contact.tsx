'use client'

import { CV_PATH } from '@/content/cv-path'
import { contact } from '@/content/profile'
import { useTranslations } from 'next-intl'
import { useRef, useState } from 'react'
import { ArrowUpRight, Download, Mail } from './Icons'
import { Logo } from './Logo'
import { Marquee } from './Marquee'

/** The close: a hire dialog whose address field is the thing to copy. */
export function Contact({ hasCv }: { hasCv: boolean }) {
  const t = useTranslations('Contact')
  const [status, setStatus] = useState(t('ready'))
  const address = useRef<HTMLOutputElement>(null)

  async function copy() {
    try {
      await navigator.clipboard.writeText(contact.email)
      setStatus(t('copied'))
    } catch {
      // Clipboard refused: select the address so it can be copied by hand
      const range = document.createRange()
      if (address.current) range.selectNodeContents(address.current)
      const selection = window.getSelection()
      selection?.removeAllRanges()
      selection?.addRange(range)
      setStatus(t('selected'))
    }
  }

  return (
    <section className="contact" id="contato" aria-labelledby="contact-title">
      <Marquee text={t('marquee1')} className="c1" />
      <Marquee text={t('marquee2')} className="c2" reverse />

      <div className="win dialog">
        <div className="win-bar">
          <span className="win-title">{t('file')}</span>
          <span className="win-btns" aria-hidden="true">
            <i>×</i>
          </span>
        </div>
        <div className="dialog-body">
          <span className="dialog-ico" aria-hidden="true">
            <Logo />
          </span>
          <div>
            <h2 id="contact-title" className="wide">
              {t('title')}
            </h2>
            <p>{t('lead')}</p>
          </div>
          <div className="mail">
            <output ref={address}>{contact.email}</output>
            <button type="button" className="btn95 hot" onClick={copy}>
              {t('copy')}
            </button>
          </div>
          <div className="dialog-actions">
            <a className="btn95" href={`mailto:${contact.email}`}>
              <Mail />
              {t('write')}
            </a>
            {hasCv && (
              <a className="btn95" href={CV_PATH} download>
                <Download />
                {t('cv')}
              </a>
            )}
            <a className="btn95" href={contact.github} target="_blank" rel="noopener noreferrer">
              GitHub
              <ArrowUpRight />
            </a>
            <a className="btn95" href={contact.linkedin} target="_blank" rel="noopener noreferrer">
              LinkedIn
              <ArrowUpRight />
            </a>
          </div>
        </div>
        <div className="win-status">
          <span aria-live="polite">{status}</span>
          <span>PT · EN</span>
        </div>
      </div>
    </section>
  )
}
