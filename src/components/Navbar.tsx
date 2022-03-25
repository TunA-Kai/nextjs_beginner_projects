import Link from 'next/link'
import { requests } from '~/utils/requests'

interface NavbarProps {}

function Navbar({}: NavbarProps) {
  return (
    <nav className='relative'>
      <ul className='no-scrollbar flex gap-10 overflow-x-auto whitespace-nowrap px-10'>
        {requests.map(({ title }) => (
          <Link href={{ pathname: '/[genre]', query: { genre: title } }} key={title}>
            <a role='listitem' className='hover:text-white'>
              {title}
            </a>
          </Link>
        ))}
      </ul>
      <div className='absolute top-0 right-0 h-full w-1/12 bg-gradient-to-l from-[#06202a] to-transparent' />
      <div className='absolute top-0 left-0 h-full w-1/12 bg-gradient-to-r from-[#06202a] to-transparent' />
    </nav>
  )
}

export default Navbar
