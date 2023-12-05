import Link from 'next/link'

const Footer = () => {
  return (
    <div className="">
      <menu className="">
        <li>
          <Link href="/price-tracker">Price Tracker</Link>
        </li>
        <li>
          <Link href="/calculator">Calculator</Link>
        </li>
        <li>
          <Link href="/setting">Setting</Link>
        </li>
      </menu>
    </div>
  )
}

export default Footer