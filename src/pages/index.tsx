import classNames from 'classnames'

export default function Home() {
  return (
    <div
      className={classNames('m-2 text-3xl text-sky-600', {
        'font-black': true,
        'font-mono': false,
      })}
    >
      Hello world
    </div>
  )
}
