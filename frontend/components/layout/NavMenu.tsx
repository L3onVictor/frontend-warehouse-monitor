import Link from "next/link";

export function NavMenu() {
  return (
    <nav className="h-14 bg-blue-600 text-white flex items-center px-6">
      <div className="flex items-center gap-6">
        {/* Logo / Nome */}
        <span className="font-bold text-lg">
            <Link href="/">
          IoT Dashboard
            </Link>
        </span>

        {/* Links */}
        <ul className="flex gap-4 text-sm">
          <li>
            <Link href="/dashboard" className="hover:underline">
              Dashboard
            </Link>
          </li>
          <li>
            <Link href="/dispositivos" className="hover:underline">
              Dispositivos
            </Link>
          </li>
          <li>
            <Link href="/alertas" className="hover:underline">
              Alertas
            </Link>
          </li>
        </ul>
      </div>
    </nav>
  );
}
