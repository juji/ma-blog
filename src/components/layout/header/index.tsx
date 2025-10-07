
import styles from './header.module.css'
import Image from 'next/image'
import Link from 'next/link'
import Search from "@/components/search";

export default function Header({ className }: React.HTMLAttributes<HTMLElement>){

  return <header className={`${className||''} ${styles.header}`}>
    <div className={`${styles.headerContent}`}>
      <div className={`${styles.headerLogo}`}>
        <Link href="/">
          <Image alt="Juji Blog"
            width={148.9093313316228}
            height={63.26752697064496} src="/logo.svg" />
        </Link>
      </div>
      <div><Search /></div>
    </div>
  </header>

}