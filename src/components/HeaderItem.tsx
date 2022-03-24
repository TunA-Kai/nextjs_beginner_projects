interface HeaderItemProps {
  title: string
  Icon: (props: React.ComponentProps<'svg'>) => JSX.Element
}

function HeaderItem({ title, Icon }: HeaderItemProps) {
  return (
    <button className='group flex w-12 flex-col items-center hover:text-white sm:w-20'>
      <Icon className='peer mb-1 h-8 group-hover:animate-bounce' />
      <p className='uppercase tracking-wider opacity-0 peer-hover:opacity-100'>{title}</p>
    </button>
  )
}

export default HeaderItem
