import classNames from 'classnames'
import Link from 'next/link'
import { useRouter } from 'next/router'
import { requests } from '~/utils/requests'

interface NavbarProps {}

function Navbar({}: NavbarProps) {
  const router = useRouter()
  return (
    <nav className='relative'>
      <ul className='no-scrollbar flex gap-10 overflow-x-auto whitespace-nowrap px-10'>
        {requests.map(({ title }) => (
          <Link href={{ pathname: '/', query: { genre: title } }} key={title}>
            <a
              role='listitem'
              className={classNames('hover:text-white', {
                'text-green-400':
                  title === router.query.genre || (title === 'Trending' && !router.query.genre),
              })}
            >
              {title}
            </a>
          </Link>
        ))}
      </ul>
      <div className='absolute top-0 right-0 h-full w-1/12 bg-gradient-to-l from-[#06202a] to-transparent' />
    </nav>
  )
}

export default Navbar
