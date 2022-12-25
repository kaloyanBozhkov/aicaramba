import NavLink from 'next/link'

const renderNavlinks = (navLinks: { to: string; label: string }[]) =>
  navLinks.map(({ to, label }) => (
    <NavLink key={to} href={to}>
      {label}
    </NavLink>
  ))

export default renderNavlinks
