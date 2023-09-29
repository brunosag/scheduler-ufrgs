import Cadeiras from '@/components/cadeiras';

export default function Home() {
	return (
		<div className="container h-full items-start justify-center gap-5 grid lg:grid-cols-2 xl:grid-cols-3 py-5">
			<Cadeiras />
		</div>
	);
}
