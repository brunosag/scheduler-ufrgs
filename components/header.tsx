import Link from 'next/link';
import LogoIcon from './logo-icon';

export default function Header() {
	return (
		<header className="supports-backdrop-blur:bg-background/60 sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur">
			<div className="container flex h-14 items-center">
				<Link href="/" className="flex items-center gap-2">
					<LogoIcon className="h-6 w-6" />
					<h1 className="font-bold">scheduler-ufrgs</h1>
				</Link>
			</div>
		</header>
	);
}
