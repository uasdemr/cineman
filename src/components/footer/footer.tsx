import { useAppSelector } from "../../hooks"

function Footer(): JSX.Element {
  const total = useAppSelector(state => state.DATA.total)
  return (
    <footer className="footer">
      <section className="footer__logo logo logo--smaller">Cinemaddict</section>
      <section className="footer__statistics">
        <p>{total} movies inside</p>
      </section>
    </footer>
  )
}

export default Footer
