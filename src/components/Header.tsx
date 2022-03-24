import Image from 'next/image'
import {
  BadgeCheckIcon,
  CollectionIcon,
  HomeIcon,
  LightningBoltIcon,
  SearchIcon,
  UserIcon,
} from '@heroicons/react/outline'
import HeaderItem from './HeaderItem'

interface HeaderProps {}

function Header({}: HeaderProps) {
  return (
    <header className='m-5 flex flex-col items-center justify-between sm:flex-row'>
      <div className='flex max-w-2xl justify-evenly gap-2'>
        <HeaderItem title='Home' Icon={HomeIcon} />
        <HeaderItem title='Trending' Icon={LightningBoltIcon} />
        <HeaderItem title='Verified' Icon={BadgeCheckIcon} />
        <HeaderItem title='Collections' Icon={CollectionIcon} />
        <HeaderItem title='Search' Icon={SearchIcon} />
        <HeaderItem title='Account' Icon={UserIcon} />
      </div>
      <Image src='/logo.svg' layout='fixed' alt='hulu' width='100%' height='100%' />
    </header>
  )
}

export default Header
