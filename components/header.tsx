import Link from 'next/link';
import LogoIcon from './logo-icon';
import ModeToggle from './mode-toggle';

export default function Header() {
	return (
		<header className="supports-backdrop-blur:bg-background/60 sticky top-0 z-40 w-full border-b bg-background/95 backdrop-blur">
			<div className="container flex h-14 items-center justify-between">
				<Link href="/" className="flex items-center gap-2">
					<LogoIcon className="h-6 w-6" />
					<h1 className="font-bold">scheduler-ufrgs</h1>
				</Link>
				<ModeToggle />
			</div>
		</header>
	);
}
