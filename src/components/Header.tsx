import Link from 'next/link'

interface HeaderProps {
  pageTitle: string;
}
const Header: React.FC<HeaderProps> = ({ pageTitle }) => {
  return (
    <div className="">{pageTitle}</div>
  )
}

export default Header